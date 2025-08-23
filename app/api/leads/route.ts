import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import net from 'net';

// If RESEND_API_KEY is present we can optionally use Resend HTTP API instead of raw SMTP.
const USE_RESEND = !!process.env.RESEND_API_KEY;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Simple in-memory rate limiter (note: for serverless may reset on cold starts)
interface RateBucket { count: number; expires: number }
const rateMap = new Map<string, RateBucket>();
function checkRateLimit(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = rateMap.get(ip);
  if (!bucket || bucket.expires < now) {
    rateMap.set(ip, { count: 1, expires: now + windowMs });
    return true;
  }
  if (bucket.count >= max) return false;
  bucket.count += 1;
  return true;
}

// Expect env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL, FROM_EMAIL, BASE_URL

function buildIcs(data: { preferredDate: string; preferredTime: string; name: string }) {
  try {
    const start = new Date(`${data.preferredDate}T${data.preferredTime}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const toICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@windoor`; 
    return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Windoor//Booking//ES\nCALSCALE:GREGORIAN\nMETHOD:REQUEST\nBEGIN:VEVENT\nUID:${uid}\nDTSTAMP:${toICSDate(new Date())}\nDTSTART:${toICSDate(start)}\nDTEND:${toICSDate(end)}\nSUMMARY:Visita Showroom Windoor\nDESCRIPTION:Reserva de visita al showroom\nLOCATION:Remeros Plaza Shopping, Nordelta\nEND:VEVENT\nEND:VCALENDAR`; 
  } catch {
    return '';
  }
}

export async function POST(req: NextRequest) {
  try {
  const url = new URL(req.url);
  const debugFlag = url.searchParams.get('debug') === '1' || process.env.DEBUG_EMAIL_RESPONSE === 'true';
  const pingFlag = url.searchParams.get('ping') === '1';
  const body = await req.json().catch(()=>({}));

    // Raw connectivity ping (no email send). Call: /api/leads?ping=1
    if (pingFlag) {
      const secure = (process.env.SMTP_SECURE || '').toLowerCase() === 'true';
      const host = process.env.SMTP_HOST;
      const port = Number(process.env.SMTP_PORT || (secure ? 465 : 587));
      if (!host) return NextResponse.json({ ok:false, error:'MISSING_SMTP_HOST' }, { status:400 });
      const start = Date.now();
      const timeoutMs = Number(process.env.SMTP_CONNECTION_TIMEOUT || 10000);
      const result: any = { host, port, timeoutMs };
      try {
        await new Promise<void>((resolve, reject) => {
          const socket = net.createConnection({ host, port, timeout: timeoutMs }, () => {
            result.connectedMs = Date.now() - start;
          });
          socket.once('data', (d) => {
            result.banner = d.toString().slice(0,120);
            socket.destroy();
            resolve();
          });
          socket.on('timeout', () => {
            result.timeoutMsActual = Date.now() - start;
            socket.destroy();
            reject(new Error('TIMEOUT_WAITING_BANNER'));
          });
          socket.on('error', (err) => {
            result.error = err.message;
            reject(err);
          });
        });
        return NextResponse.json({ ok:true, ping: result });
      } catch (e:any) {
        result.failed = true;
        return NextResponse.json({ ok:false, ping: result }, { status: 504 });
      }
    }

    // Honeypot check
    const honeypotField = process.env.HONEYPOT_FIELD || 'website';
    if (body[honeypotField]) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Rate limit
    const max = Number(process.env.RATE_LIMIT_MAX || 0) || 5;
    const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip, max, windowMs)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    const required = ['name','email','phone','clientType','productType'];
    for (const f of required) if (!body[f]) return NextResponse.json({ error: `Falta ${f}` }, { status: 400 });

    // Merge defaults
    const preferredDate = body.preferredDate || '';
    const preferredTime = body.preferredTime || '';

    // If using SMTP we need these vars
    const requiredSmtp = ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS'];
    const missing = !USE_RESEND ? requiredSmtp.filter(v => !process.env[v]) : [];
    if (missing.length) {
      return NextResponse.json({ ok: false, error: 'MISSING_SMTP_CONFIG', details: missing }, { status: 500 });
    }

  // Use inferred transport type to avoid issues if types not fully available.
    // Reuse a cached transporter between warm invocations
    const globalForTransport = global as any;
    if (!globalForTransport.__SMTP_TRANSPORT__ && !USE_RESEND) {
      try {
        const secure = (process.env.SMTP_SECURE || '').toLowerCase() === 'true';
        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT || (secure ? 465 : 587));
        const requireTLS = (process.env.SMTP_REQUIRE_TLS || 'false').toLowerCase() === 'true';
        const family = process.env.SMTP_FAMILY === '4' ? 4 : process.env.SMTP_FAMILY === '6' ? 6 : undefined;
        const debugEnabled = process.env.SMTP_DEBUG === 'true';
        const baseOptions: any = {
          host,
            port,
            secure,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
            connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 10000),
            greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 10000),
            socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 20000),
            requireTLS,
            logger: debugEnabled,
            debug: debugEnabled,
            family,
        };
        if (process.env.SMTP_SKIP_VERIFY === 'true') {
          baseOptions.tls = { rejectUnauthorized: false };
        }
        globalForTransport.__SMTP_TRANSPORT__ = nodemailer.createTransport(baseOptions);
        if (process.env.SMTP_SKIP_VERIFY !== 'true') {
          await globalForTransport.__SMTP_TRANSPORT__.verify();
        }
      } catch (verErr: any) {
        console.error('SMTP init/verify failed', {
          message: verErr?.message,
          code: verErr?.code,
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: (process.env.SMTP_SECURE || '').toLowerCase() === 'true'
        });
        return NextResponse.json({ ok: false, error: 'EMAIL_CONNECTION_FAILED' }, { status: 502 });
      }
    }
    const transporter: ReturnType<typeof nodemailer.createTransport> | null = !USE_RESEND ? globalForTransport.__SMTP_TRANSPORT__ : null;

    const notify = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
    const from = process.env.FROM_EMAIL || notify;

    const ics = preferredDate && preferredTime ? buildIcs({ preferredDate, preferredTime, name: body.name }) : '';

    const adminHtml = `<h2>Nueva reserva / consulta</h2><ul>${Object.entries(body).map(([k,v])=>`<li><b>${k}:</b> ${v}</li>`).join('')}</ul>`;
    const userHtml = `<p>Hola ${body.name},</p><p>Recibimos tu consulta${preferredDate?` y tu solicitud de visita para <b>${preferredDate} ${preferredTime}hs</b>`:''}. Te enviaremos un correo de confirmación en unos minutos.</p><p>Windoor.</p>`;

    // Unified send with fallback order. Configure EMAIL_FALLBACK="smtp,resend" or "resend,smtp".
    const fallbackOrder = (process.env.EMAIL_FALLBACK || (USE_RESEND ? 'resend,smtp' : 'smtp,resend'))
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    async function sendViaSmtp() {
      if (!transporter) throw new Error('SMTP_NOT_AVAILABLE');
      const tasks: Promise<any>[] = [];
      tasks.push(transporter.sendMail({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml }));
      if (body.email) {
        tasks.push(transporter.sendMail({ from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml, icalEvent: ics ? { filename: 'reserva.ics', method: 'REQUEST', content: ics } : undefined }));
      }
      const [adminInfo, userInfo] = await Promise.all(tasks);
      return {
        method: 'smtp',
        admin: adminInfo ? { accepted: adminInfo.accepted, rejected: adminInfo.rejected, id: adminInfo.messageId } : undefined,
        user: userInfo ? { accepted: userInfo.accepted, rejected: userInfo.rejected, id: userInfo.messageId } : undefined
      };
    }

    async function sendViaResend() {
      if (!process.env.RESEND_API_KEY) throw new Error('RESEND_NOT_CONFIGURED');
      const apiKey = process.env.RESEND_API_KEY as string;
      const icsAttachment = ics ? Buffer.from(ics).toString('base64') : null;
      const send = async (payload: any) => fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const adminRes = await send({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml });
      const result: any = { method: 'resend', admin: { ok: adminRes.ok, status: adminRes.status } };
      if (!adminRes.ok) result.admin.text = await adminRes.text();
      if (body.email) {
        const userPayload: any = { from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml };
        if (icsAttachment) userPayload.attachments = [{ filename: 'reserva.ics', content: icsAttachment, type: 'text/calendar' }];
        const userRes = await send(userPayload);
        result.user = { ok: userRes.ok, status: userRes.status };
        if (!userRes.ok) result.user.text = await userRes.text();
      }
      if (!result.admin.ok || (result.user && !result.user.ok)) {
        throw Object.assign(new Error('RESEND_SEND_FAILED'), { detail: result });
      }
      return result;
    }

    async function sendWithFallback(debug = false) {
      const attempts: any[] = [];
      for (const method of fallbackOrder) {
        try {
          let r;
          if (method === 'smtp') r = await sendViaSmtp();
          else if (method === 'resend') r = await sendViaResend();
          else continue;
          attempts.push({ method, ok: true, result: r });
          return debug ? { attempts, final: r } : r;
        } catch (e: any) {
          attempts.push({ method, ok: false, error: e?.message || String(e), detail: (e as any)?.detail });
        }
      }
      const err = new Error('ALL_METHODS_FAILED');
      (err as any).attempts = attempts;
      if (debug) return { attempts, finalError: 'ALL_METHODS_FAILED' };
      throw err;
    }

    // If not in debug mode: fire & forget (original behavior)
    if (!debugFlag) {
      (async () => {
        try {
          await sendWithFallback(false);
        } catch (sendErr: any) {
          console.error('Async email send failed', sendErr?.message || sendErr, sendErr?.attempts || '');
        }
      })();
      return NextResponse.json({ ok: true, queued: true });
    }

    // Debug mode: perform send synchronously and return status details
    const debugResult: any = { mode: 'debug', transport: USE_RESEND ? 'resend' : 'smtp' };
    try {
      const res = await sendWithFallback(true);
      return NextResponse.json({ ok: true, debug: { mode: 'debug', ...res } });
    } catch (sendErr: any) {
      debugResult.error = sendErr?.message || String(sendErr);
      return NextResponse.json({ ok: false, error: 'SEND_FAILED', debug: { mode: 'debug', error: debugResult.error, attempts: sendErr?.attempts } }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Lead API error', err);
  return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
