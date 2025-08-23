import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const secure = (process.env.SMTP_SECURE || '').toLowerCase() === 'true';
  const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // Verificar conexión (opcional, rápido)
    try {
      await transporter.verify();
    } catch (verErr) {
      console.error('SMTP verify failed', verErr);
      return NextResponse.json({ ok: false, error: 'EMAIL_CONNECTION_FAILED' }, { status: 502 });
    }

    const notify = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
    const from = process.env.FROM_EMAIL || notify;

    const ics = preferredDate && preferredTime ? buildIcs({ preferredDate, preferredTime, name: body.name }) : '';

    const adminHtml = `<h2>Nueva reserva / consulta</h2><ul>${Object.entries(body).map(([k,v])=>`<li><b>${k}:</b> ${v}</li>`).join('')}</ul>`;
    const userHtml = `<p>Hola ${body.name},</p><p>Recibimos tu consulta${preferredDate?` y tu solicitud de visita para <b>${preferredDate} ${preferredTime}hs</b>`:''}. Te contactaremos pronto.</p><p>Windoor.</p>`;

    await transporter.sendMail({ from, to: notify, subject: 'Nueva reserva / consulta Windoor', html: adminHtml });
    if (body.email) {
      await transporter.sendMail({ from, to: body.email, subject: 'Confirmación de tu solicitud - Windoor', html: userHtml, icalEvent: ics ? { filename: 'reserva.ics', method: 'REQUEST', content: ics } : undefined });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Lead API error', err);
  return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 });
  }
}
