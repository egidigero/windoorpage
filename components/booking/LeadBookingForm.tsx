"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState, forwardRef, useRef, useEffect } from "react";
import { useBookingState } from "./useBookingState";
import { DateTimePicker } from "./DateTimePicker";

export interface LeadBookingFormProps {
  className?: string;
  submitLabel?: string;
  showSubmitButton?: boolean;
  withInlinePreferredDateTime?: boolean; // show simple date/time inputs inline
  defaultProductType?: string;
  defaultClientType?: string;
  controlledDate?: string; // controlled from external picker (modal)
  controlledTime?: string;
  readOnlyControlledDateTime?: boolean; // show the controlled values but not editable
  onSubmit?: (payload: Record<string, any>) => Promise<void> | void;
  showInlineSuccessMessage?: boolean;
  autoReset?: boolean;
  maxDate?: Date; // para validar en modo inline
  useCalendarInline?: boolean; // usar calendario avanzado en vez de inputs simples
}

export const LeadBookingForm = forwardRef<HTMLFormElement, LeadBookingFormProps>(function LeadBookingFormInternal({
  className,
  submitLabel = "Enviar Consulta",
  showSubmitButton = true,
  withInlinePreferredDateTime = true,
  defaultProductType = "",
  defaultClientType = "",
  controlledDate,
  controlledTime,
  readOnlyControlledDateTime = true,
  onSubmit,
  showInlineSuccessMessage = true,
  autoReset = true,
  maxDate,
  useCalendarInline = false,
}, ref) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const mountedRef = useRef(true);
  useEffect(() => () => { mountedRef.current = false; }, []);

  // Determina si necesitamos calendario inline avanzado
  const needInlineCalendar = useCalendarInline && withInlinePreferredDateTime && !controlledDate && !controlledTime;
  const inlineState = useBookingState(); // siempre creado (ligero) para poder usar condicionalmente

  const inlineDate = needInlineCalendar ? inlineState.selectedDate : undefined;
  const inlineTime = needInlineCalendar ? inlineState.selectedTime : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
  const formEl = e.currentTarget;
  const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());

    // Merge controlled date/time if provided
    if (controlledDate) data["preferredDate"] = controlledDate;
    if (controlledTime) data["preferredTime"] = controlledTime;
    if (needInlineCalendar) {
      data["preferredDate"] = inlineDate || "";
      data["preferredTime"] = inlineTime || "";
      if (!inlineDate || !inlineTime) {
        toast({ title: "Seleccioná fecha y horario", description: "Debés elegir ambos antes de enviar.", variant: "destructive" });
        setSubmitting(false);
        return;
      }
    }

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // envío a la API por defecto
        try {
          const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          if (!res.ok) {
            throw new Error('Error API');
          }
        } catch (apiErr) {
          console.error(apiErr);
          toast({ title: 'Error', description: 'No se pudo enviar el formulario.', variant: 'destructive' });
          setSubmitting(false);
          return;
        }
      }
      setSuccess(true);
      toast({ title: "Consulta enviada", description: "Nos pondremos en contacto a la brevedad." });
      if (autoReset && mountedRef.current && formEl && document.contains(formEl)) {
        try { formEl.reset(); } catch {}
      }
    } catch (err) {
      console.error(err);
  toast({ title: "Error", description: "Ocurrió un problema al enviar. Intentalo nuevamente.", variant: "destructive" });
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <form ref={ref} className={cn("space-y-6", className)} onSubmit={handleSubmit}>
      {/* Honeypot hidden field (anti-spam). Bots often fill every input. */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name={process.env.NEXT_PUBLIC_HONEYPOT_FIELD || 'website'} tabIndex={-1} autoComplete="off" />
      </div>
      {success && showInlineSuccessMessage && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
          <p className="font-medium mb-1">¡Consulta enviada correctamente!</p>
          <p>Te contactaremos a la brevedad. Podés enviar otra consulta si lo necesitás.</p>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
          <input name="name" required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent" placeholder="Tu nombre completo" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
          <input name="phone" required pattern="[0-9]+" type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent" placeholder="Tu número de teléfono" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input name="email" required type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent" placeholder="tu@email.com" />
      </div>

      {withInlinePreferredDateTime && !controlledDate && !controlledTime && (
        needInlineCalendar ? (
          <div className="space-y-4">
            <DateTimePicker state={inlineState as any} />
            <input type="hidden" name="preferredDate" value={inlineDate || ""} />
            <input type="hidden" name="preferredTime" value={inlineTime || ""} />
            {!inlineDate || !inlineTime ? (
              <p className="text-xs text-gray-500">Seleccioná fecha y horario para habilitar el envío.</p>
            ) : (
              <div className="flex items-center text-xs text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1 w-fit">Fecha y hora seleccionadas.</div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha preferida</label>
              <input name="preferredDate" required type="date" min={new Date().toISOString().split('T')[0]} max={maxDate ? maxDate.toISOString().split('T')[0] : undefined} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora preferida</label>
              <select name="preferredTime" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent">
                <option value="">Seleccionar hora *</option>
                {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )
      )}

      {(controlledDate || controlledTime) && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha seleccionada</label>
            <input value={controlledDate || ""} readOnly={readOnlyControlledDateTime} name="preferredDate" type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora seleccionada</label>
            <input value={controlledTime || ""} readOnly={readOnlyControlledDateTime} name="preferredTime" type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50" />
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cliente *</label>
          <select name="clientType" required defaultValue={defaultClientType} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent">
            <option value="">Seleccionar tipo</option>
            <option value="particular">Particular</option>
            <option value="profesional">Profesional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de producto *</label>
          <select name="productType" required defaultValue={defaultProductType} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent">
            <option value="">Seleccionar producto</option>
            <option value="aberturas-pvc">Aberturas de PVC</option>
            <option value="placares-vestidores-banos">Placares, Vestidores y Baños</option>
            <option value="puertas-interior">Puertas de interior</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje / Medidas / Observaciones</label>
        <textarea name="message" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent resize-none" placeholder="Contanos sobre tu proyecto, medidas aproximadas, o cualquier detalle que consideres importante..." />
      </div>

    {showSubmitButton && !success && (
        <div className="text-center pt-6">
          <Button disabled={submitting || (needInlineCalendar && (!inlineDate || !inlineTime))} type="submit" size="lg" className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50">
            {submitting ? "Enviando..." : submitLabel}
          </Button>
        </div>
      )}
      {showSubmitButton && success && (
        <div className="text-center pt-4">
          <Button type="button" variant="outline" onClick={() => setSuccess(false)} className="px-8">Enviar otra</Button>
        </div>
      )}
    </form>
  );
});
