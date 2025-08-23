# Windoor – Aberturas y Soluciones de Interiores

Sitio web construido con **Next.js (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS**, orientado a generación de leads (reservas de visita al showroom) y posicionamiento SEO local.

## 1. Características Clave

- Formulario único modular de reserva / contacto con validación estricta y calendario integrado.
- Booking modal global disparable desde cualquier lugar (evento + provider global).
- Envío de emails (administración + cliente) con **ICS (evento calendario)** adjunto.
- Rate limiting básico en memoria + honeypot anti‑bot.
- Optimizaciones de performance: paralelización y fire‑and‑forget de envío de correos, reducción JS crítico, dynamic imports para secciones bajo el pliegue.
- SEO avanzado: metadata enriquecida, Open Graph, Twitter Cards, canonical, sitemap, robots, JSON‑LD (Organization, LocalBusiness, Website), optimización de titles & descriptions.
- Accesibilidad: `main` landmark, skip link, aria-live para toasts, labels explícitas, contraste en hero.
- Internacionalización contextual (es-AR) y enfoque local (geo meta / schema).
- Instrumentación Web Vitals (LCP, INP, CLS, FCP, TTFB) lista para extender a endpoint de métricas.

## 2. Tech Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS + Radix UI primitives |
| Formularios | react-hook-form + zod (validaciones) |
| Email | Nodemailer (SMTP) + ICS manual |
| Estado booking | Context Provider + window event bus |
| Análisis perf | web-vitals (cliente) |

## 3. Estructura Principal

```
app/              # Rutas (App Router)
  api/leads/      # Endpoint reservas/email
  productos/      # Páginas producto (SEO estático)
  proyectos/      # Página proyectos
  layout.tsx      # Metadata global + JSON-LD + provider
  page.tsx        # Home (hero, servicios, contacto)
components/       # UI y booking (LeadBookingForm, modal, etc.)
hooks/            # Hooks reutilizables (mobile, toast)
lib/              # Utilidades (formato, helpers)
public/           # Imágenes y assets
```

## 4. Variables de Entorno

| Nombre | Descripción |
|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL pública para metadata / schema |
| `SMTP_HOST` / `SMTP_PORT` | Servidor SMTP |
| `SMTP_USER` / `SMTP_PASS` | Credenciales SMTP |
| `BOOKING_ADMIN_EMAIL` | Email receptor interno |
| `SMTP_SKIP_VERIFY` (opcional) | Saltar verificación TLS en entornos restringidos |
| `RESEND_API_KEY` (opcional) | Fallback provider (si se integra) |

## 5. Scripts

| Script | Acción |
|--------|-------|
| `pnpm dev` | Desarrollo |
| `pnpm build` | Build producción |
| `pnpm start` | Servir build |

## 6. Flujo de Reserva (Lead)

1. Usuario abre modal / formulario inline.
2. Selecciona fecha (máx +1 mes) y hora dentro de rango válido.
3. Validación zod + honeypot + rate limit.
4. API responde rápido (`queued`) mientras emails se envían asincrónicamente.
5. Admin recibe detalles + invitación calendario; cliente recibe confirmación.

## 7. SEO Implementado

- Canonical y metadata base configurada.
- JSON-LD: Organization, LocalBusiness, Website (SearchAction).
- Sitemap dinámico y robots.txt.
- Títulos y descripciones orientados a intención (aberturas, interiores, Nordelta).
- Imágenes con `alt` descriptivo principal.

## 8. Accesibilidad

- Skip link para saltar al contenido.
- `aria-live` para toasts (feedback inmediato).
- Campos de formulario etiquetados + focus management modal.
- Evitados layout shifts (CLS bajo) estableciendo dimensiones / placeholders.

## 9. Performance

| Aspecto | Mejora |
|---------|--------|
| API Lead | Fire-and-forget + paralelización envío correo |
| Imagen Hero | Prioritaria + blur placeholder (optimizable a local comprimida) |
| JS inicial | Separación en secciones dinámicas bajo el pliegue |
| Caching | Páginas productos/proyectos con revalidate 1h |
| Transporte email | Reuso de transporter SMTP global |

## 10. Próximos Pasos Recomendados

- Comprimir y servir hero local (WebP/AVIF) para bajar LCP móvil.
- Endpoint `/api/metrics` para persistir Web Vitals reales.
- FAQ + Breadcrumb JSON-LD (rich results adicionales).
- Persistir rate limit (Redis / Upstash) + logging básico.
- Configurar SPF, DKIM, DMARC (mejor deliverability).

## 11. Desarrollo Local

```bash
pnpm install
pnpm dev
```
Abrir: http://localhost:3000

## 12. Licencia

Privado (uso interno Windoor).

---
Reporte detallado de implementaciones en: `docs/IMPLEMENTATION_REPORT.md`.
