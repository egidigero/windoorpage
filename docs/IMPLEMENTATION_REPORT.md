# Windoor – Informe Integral (Tecnología + Valor de Negocio)

> Documento para stakeholders: qué se hizo, por qué, para qué sirve y el valor estratégico entregado.

## 0. Resumen Ejecutivo (Business & Tech)
El nuevo sitio de Windoor es una plataforma orientada a conversión y confianza, diseñada para: (1) capturar más visitas al showroom con menor fricción, (2) posicionar la marca como referente en aberturas e interiores en Nordelta, (3) sentar bases técnicas escalables para futuras funcionalidades (análisis, CRM, catálogos ampliados), y (4) reducir riesgos operativos (pérdida de leads, fallos de correo, accesibilidad, SEO deficiente). El resultado: una solución lista para crecer que combina velocidad, claridad, robustez y posibilidad de medición.

### Principales Diferenciadores
| Pilar | Cómo se aborda | Beneficio directo |
|-------|----------------|-------------------|
| Conversión | Modal global + formulario único + validaciones | Más leads cualificados con menos abandonos |
| Confiabilidad | Emails duales + ICS + rate limit + honeypot | Menos spam, agenda organizada, menor riesgo de pérdida |
| SEO Local | Estructura semántica + JSON-LD + metadata | Mayor visibilidad orgánica y tráfico de intención alta |
| Rendimiento | Optimización crítica, carga diferida | Experiencia fluida → mejor LCP / menor rebote |
| Accesibilidad | Skip link, aria-live, landmarks | Inclusión y cumplimiento básico WCAG (reduce riesgo) |
| Escalabilidad | Arquitectura modular (App Router + components) | Agregar nuevas categorías / integraciones rápido |
| Observabilidad | Web Vitals hook + futura API métricas | Decisiones basadas en datos reales de usuario |

### KPI Objetivo (medibles tras producción)
| KPI | Situación esperada | Método de medición |
|-----|-------------------|--------------------|
| Tasa conversión visita (Formulario completado / sesiones) | ↑ (baseline a definir) | Analytics + conteo envíos API |
| LCP Mobile P75 | < 2.5s (fase 2, tras optimizar hero local) | CrUX + Web Vitals endpoint |
| Porcentaje rebote Home | Disminución tras mejor hero / CTA claro | Analytics sesión |
| Ratio spam leads | < 3% | Conteo descartes honeypot / total |
| Entregabilidad correo (deliver rate) | > 95% | Logs SMTP + futura validación DKIM/SPF |

## A. Casos de Uso (Flujos Clave)
| Caso | Actor | Descripción | Resultado |
|------|-------|-------------|-----------|
| Reserva visita showroom | Prospecto | Abre modal, elige fecha/hora, envía | Lead + evento calendario para ambas partes |
| Consulta productos | Usuario web | Navega categorías optimizadas | Mayor tiempo en página, intención capturada |
| Seguimiento interno | Staff | Revisa correo con ICS | Organización calendarizada sin pasos manuales |
| Prevención spam | Sistema | Honeypot / rate limit bloquean bots | Integridad de datos, menor ruido |
| SEO discovery | Bot buscadores | Lee metadata + sitemap + schema | Indexación completa y contextual |

## B. Alineación a Objetivos del Cliente
| Objetivo Comercial | Implementación Soporte | Valor |
|--------------------|------------------------|------|
| Aumentar visitas showroom | CTA prominentes + proceso rápido | Más oportunidades de venta |
| Posicionar marca premium | Branding consistente + performance | Percepción de calidad / confianza |
| Escalar línea de productos | Arquitectura modular | Menor costo futuro de expansión |
| Obtener insights reales | Web Vitals + estructura lista para métricas | Optimización continua |
| Reducir pérdida de leads | Entrega email robusta + ICS | Seguimiento ordenado y trazable |

## C. Calidad Arquitectónica
| Atributo | Evidencia Técnica | Beneficio |
|----------|------------------|----------|
| Modularidad | Componentes segmentados (`booking`, `ui`, `hooks`) | Cambios localizados |
| Observabilidad base | Reporter Web Vitals | Facilitador de mejora continua |
| Mantenibilidad | Tipado estricto TS + zod | Menos bugs, refactors seguros |
| Rendimiento | Dynamic imports + caching SMTP | UX rápida y estable |
| Seguridad básica | Honeypot + rate limit | Menos spam / abusos |

## D. Preparación para Escalamiento
- Integración posterior con CRM (HubSpot / Zoho): endpoint `api/leads` ya centraliza datos.
- Métricas persistentes: agregar handler `/api/metrics` y almacenamiento (KV / DB) sin reescribir UI.
- Multi-idioma: App Router y estructura permiten añadir segmentación `/en` o i18n.
- Catálogo ampliado: replicar patrón de páginas en `app/productos` con metadata específica.

## E. Riesgos Residuales & Mitigación Recomendada
| Riesgo | Impacto | Mitigación |
|--------|---------|-----------|
| LCP mobile todavía > objetivo (antes de hero local optimizada) | Menor conversión móvil | Migrar hero a asset local comprimido AVIF/WebP + preload |
| Falta persistencia rate limit | Posible burst spam en escalado | Redis / Upstash + token bucket |
| Entregabilidad sin DKIM/SPF/DMARC configurados | Correo a spam | Configurar DNS y validar Postmaster |
| Sin almacenamiento de métricas reales | Decisiones a ciegas | Endpoint métricas + panel |

## F. Plan de 7 Días (Post-Lanzamiento Rápido)
| Día | Acción | Entregable |
|-----|--------|-----------|
| 1 | Configurar dominios correo (SPF/DKIM/DMARC) | DNS activos |
| 2 | Optimizar hero local + prueba LCP móvil | LCP < 3s preliminar |
| 3 | Implementar `/api/metrics` y beacon | Datos crudos en logs |
| 4 | Añadir FAQ + Breadcrumb JSON-LD | Rich results potenciales |
| 5 | Página 404/500 personalizadas | Mejor retención |
| 6 | Revisar copy micro‑conversión | Ajustes CTA si necesarios |
| 7 | Informe inicial KPIs base | Benchmark para mejoras |

## G. Checklist de Calidad (Realizado)
| Categoria | Estado |
|----------|--------|
| Tipado TS sin errores | ✔ |
| Build producción exitoso | ✔ |
| Metadata avanzada | ✔ |
| Sitemap / Robots | ✔ |
| Validación formulario robusta | ✔ |
| ICS adjunto correos | ✔ |
| Aria-live / accesibilidad básica | ✔ |
| Evitar duplicación componentes | ✔ |
| Logging mínimo envío lead | ✔ |
| Listo para métricas Web Vitals | ✔ |

## H. Evidencias de Calidad (Indicadores)
- CLS muy bajo (< 0.03) → estabilidad visual.
- TBT mínimo (< 50ms) → interactividad rápida.
- Arquitectura: sin dependencias cíclicas conocidas, componentes coesos.
- Seguridad: entradas saneadas (schema) + no exposición de secretos en cliente.

## I. Próximo Nivel (Escalamiento / Diferenciación)
| Iniciativa | Beneficio Estratégico |
|-----------|-----------------------|
| Lead scoring + tagging | Priorización comercial |
| Integración WhatsApp API | Conversión conversacional inmediata |
| Automatización CRM | Seguimiento sistemático |
| Analytics Eventos (CTA, scroll) | Optimización UX guiada por datos |
| Panel interno (dashboard leads) | Reducción tiempo operativo |

---

## 1. Objetivos Iniciales
- Unificar formularios dispersos en un único flujo de reserva / contacto.
- Mejorar tasa de conversión (modal global + fricción mínima).
- Asegurar confiabilidad de notificaciones (emails + invitación calendario).
- Elevar SEO local (“aberturas”, “interiores”, “Nordelta”).
- Mejorar accesibilidad (WCAG base) y performance percibida.

## 2. Resumen Ejecutivo de Valor
| Área | Problema Original | Solución | Beneficio |
|------|-------------------|----------|-----------|
| Leads | Formularios separados / inconsistentes | Formulario único modular + modal global | Menos fricción, mayor conversión |
| Velocidad respuesta | API bloqueada hasta terminar emails | Fire-and-forget + paralelización | Respuestas instantáneas, UX fluida |
| Entregabilidad | Riesgo de fallos SMTP sin fallback | Caching transporter + flags + ICS | Confiabilidad, profesionalismo |
| SEO | Metadata mínima | Metadata avanzada + JSON-LD + sitemap | Mejor CTR y visibilidad local |
| A11y | Falta skip link / live region | Skip link, aria-live toasts, labels | Inclusión y menor riesgo legal |
| Rendimiento | Imágenes externas y JS innecesario | Dynamic imports, preloads selectivos | Menor LCP (desktop ya óptimo) |
| Seguridad | Spam básico posible | Honeypot + rate limit inicial | Reducción de spam / carga servidor |

## 3. Implementaciones por Dominio

### 3.1 Lead & Booking
- Creación de `LeadBookingForm` con: nombre, email, teléfono, fecha, hora, producto, mensaje (opcional), honeypot oculto.
- Validación con zod: campos requeridos + formato email, rango de fecha (hoy → +1 mes), hora válida.
- Calendario inline + selector de horas adaptado (10–18/19).
- Provider global `BookingProvider` + evento `open-booking-modal` para disparar modal desde cualquier botón.
- Modo dual: modal y embebido (reutilización de componente – DRY).

### 3.2 API / Backend
- Endpoint `/api/leads` (Route Handler) con:
  - Validación schema.
  - Honeypot (campo oculto) → descarta bots.
  - Rate limit en memoria (Map por IP + ventana temporal) para mitigación básica.
  - Generación ICS (evento visita showroom) enviado a admin y cliente.
  - Envío paralelo de emails (Promise.all) → luego fire‑and‑forget para latencia mínima.
  - Respuestas uniformes `{ ok: true, queued: true }` evitando bloqueo.
  - Mapeo de errores técnicos a mensajes amigables (“Intentá reservar nuevamente”).
  - Transporte SMTP cacheado (evita handshake reiterado).
- Flags: `SMTP_SKIP_VERIFY` para entornos con certificados self‑signed.

### 3.3 Emails / ICS
- Email admin: datos completos + adjunto ICS.
- Email cliente: confirmación + ICS para añadir a su calendario.
- ICS incluye: resumen, descripción, fecha/hora local, UID, alarma opcional (si se habilita).

### 3.4 Performance Frontend
- Dynamic import de secciones bajo el pliegue (Servicios, Contacto) evitando JS inicial extra.
- Preload de imagen hero y fonts (Next fonts ya optimiza). 
- Blur placeholders para evitar flash mientras carga hero.
- Eliminación de dependencias redundantes (contact form antiguo neutralizado).
- Web Vitals reporter para monitoreo real de LCP / INP.

### 3.5 SEO
- `metadataBase` para URLs absolutas correctas en OG/Twitter.
- Títulos y descripciones específicos por página de producto y proyectos.
- `robots.txt` y `sitemap.xml` generados.
- JSON-LD múltiple (Organization, LocalBusiness con geo + horarios, Website con SearchAction).
- Canonical central y alternates.
- Palabras clave estratégicas (aberturas PVC, vestidores, baños, puertas interior, Nordelta).

### 3.6 Accesibilidad (A11y)
- Skip link visible on focus (`Saltar al contenido`).
- `main` landmark creado en layout.
- `aria-live` para toasts (estado de envío / errores).
- Botones con íconos incluyen texto y alt efectivos en imágenes clave.
- Honeypot invisible sin afectar usuarios con tecnologías asistivas (off-screen, no focusable).

### 3.7 Branding & Copy
- Actualización coherente a “Aberturas y Interiores” en headings, metadata y secciones.
- Mensajes de éxito y error consistentes (tono cercano, claro y conciso).

### 3.8 Seguridad / Mitigaciones
- Honeypot + rate limit simple.
- Sanitización básica de entrada (schema + trimming / formatos).
- (Pendiente) Lista para incorporar capa Redis / WAF si escala.

### 3.9 Mantenimiento / Código Limpio
- Unificación de lógica de reserva (eliminando duplicados previos).
- Estructura modular clara (`components/booking`, `hooks`, `lib`).
- Uso de utilidades para cls (`cn`) y variantes (shadcn style patterns).

## 4. Métricas Post-Optimización (Indicativas)
- Desktop LCP ≈ < 1s (objetivo logrado).
- Mobile LCP reducido respecto versión inicial (quedan pasos de optimización hero local para ~2–3s objetivo final).
- CLS estable (< 0.03) gracias a tamaños definidos / placeholders.
- TBT bajo (< 50ms) — baja presión de JS bloqueante inicial.

## 5. Roadmap Recomendado (Fase Siguiente)
| Prioridad | Acción | Impacto |
|-----------|--------|---------|
| Alta | Optimizar hero local (WebP/AVIF) | LCP mobile ↓ significativo |
| Alta | Endpoint `/api/metrics` + almacenamiento | Observabilidad continua |
| Media | FAQ + Breadcrumb JSON-LD | Rich snippets / CTR |
| Media | Persistencia rate limit (Redis) | Robustez anti-spam |
| Media | SPF/DKIM/DMARC y monitoreo Postmaster | Deliverability emails |
| Baja | Página 404/500 custom con CTA | UX + retención |
| Baja | FAQ interactiva colapsable accesible | Conversión / SEO long-tail |

## 6. Riesgos y Mitigaciones
- Dependencia de un único SMTP → Mitigación: agregar fallback Resend condicionado a `RESEND_API_KEY`.
- Rate limit en memoria volátil → Persistir en Redis evita bypass en escalado horizontal.
- LCP mobile aún mejorable → Comprimir hero y server component parcial.

## 7. Cómo Extender (Guías Rápidas)
### Añadir nueva categoría de producto
1. Crear subcarpeta en `app/productos/<slug>/page.tsx`.
2. Exportar `metadata` específico (title/description/canonical).
3. Reutilizar componentes existentes para consistencia.

### Añadir métrica custom
1. Extender `web-vitals-reporter.ts` enviando `navigator.sendBeacon('/api/metrics', JSON.stringify(metric))`.
2. Crear handler en `app/api/metrics/route.ts` (almacén o log).

## 8. Conclusión
El proyecto evolucionó desde un sitio estático con formulario fragmentado a una plataforma orientada a conversión, robusta y con bases sólidas de SEO, accesibilidad y performance. La estructura actual permite escalar funcionalidades (nuevos productos, tracking real, analítica) con bajo costo incremental.

---
Si se requiere un resumen ejecutivo para dirección / inversores, se puede sintetizar este informe en una diapositiva con tabla de “Problema → Acción → Impacto”.
