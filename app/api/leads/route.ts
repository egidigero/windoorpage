import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
  const body = await req.json();

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

    // If not in debug mode: fire & forget (original behavior)
    if (!debugFlag) {
      (async () => {
        try {
          if (USE_RESEND) {
            const apiKey = process.env.RESEND_API_KEY as string;
            const icsAttachment = ics ? Buffer.from(ics).toString('base64') : null;
            const send = async (payload: any) => fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            const adminRes = await send({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml });
            if (!adminRes.ok) {
              console.error('Resend admin send failed', await adminRes.text());
            }
            if (body.email) {
              const userPayload: any = { from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml };
              if (icsAttachment) {
                userPayload.attachments = [{ filename: 'reserva.ics', content: icsAttachment, type: 'text/calendar' }];
              }
              const userRes = await send(userPayload);
              if (!userRes.ok) {
                console.error('Resend user send failed', await userRes.text());
              }
            }
          } else if (transporter) {
            const tasks: Promise<any>[] = [];
            tasks.push(transporter.sendMail({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml }));
            if (body.email) {
              tasks.push(transporter.sendMail({ from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml, icalEvent: ics ? { filename: 'reserva.ics', method: 'REQUEST', content: ics } : undefined }));
            }
            await Promise.all(tasks);
          }
        } catch (sendErr) {
          console.error('Async email send failed', sendErr);
        }
      })();
      return NextResponse.json({ ok: true, queued: true });
    }

    // Debug mode: perform send synchronously and return status details
    const debugResult: any = { mode: 'debug', transport: USE_RESEND ? 'resend' : 'smtp' };
    try {
      if (USE_RESEND) {
        const apiKey = process.env.RESEND_API_KEY as string;
        const icsAttachment = ics ? Buffer.from(ics).toString('base64') : null;
        const send = async (payload: any) => fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const adminRes = await send({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml });
        debugResult.admin = { ok: adminRes.ok, status: adminRes.status, text: adminRes.ok ? undefined : await adminRes.text() };
        if (body.email) {
          const userPayload: any = { from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml };
          if (icsAttachment) userPayload.attachments = [{ filename: 'reserva.ics', content: icsAttachment, type: 'text/calendar' }];
          const userRes = await send(userPayload);
          debugResult.user = { ok: userRes.ok, status: userRes.status, text: userRes.ok ? undefined : await userRes.text() };
        }
      } else if (transporter) {
        const adminInfo = await transporter.sendMail({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml });
        debugResult.admin = { accepted: adminInfo.accepted, rejected: adminInfo.rejected, messageId: adminInfo.messageId };
        if (body.email) {
          const userInfo = await transporter.sendMail({ from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml, icalEvent: ics ? { filename: 'reserva.ics', method: 'REQUEST', content: ics } : undefined });
          debugResult.user = { accepted: userInfo.accepted, rejected: userInfo.rejected, messageId: userInfo.messageId };
        }
      }
      return NextResponse.json({ ok: true, debug: debugResult });
    } catch (sendErr: any) {
      debugResult.error = sendErr?.message || String(sendErr);
      console.error('Debug email send failed', sendErr);
      return NextResponse.json({ ok: false, error: 'SEND_FAILED', debug: debugResult }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Lead API error', err);
  return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
