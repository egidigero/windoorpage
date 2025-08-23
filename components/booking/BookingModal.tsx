"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingState } from "./useBookingState";
import { DateTimePicker } from "./DateTimePicker";
import { LeadBookingForm } from "./LeadBookingForm";
import { useToast } from "@/hooks/use-toast";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: Record<string, any>) => Promise<void> | void; // fired after form submit & date/time chosen
  defaultProductType?: string;
  defaultClientType?: string;
}

export function BookingModal({ open, onOpenChange, onConfirm, defaultProductType, defaultClientType }: BookingModalProps) {
  const state = useBookingState();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);
  // debug logs removed
  // Scroll lock while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);
  if (!open) return null;

  const handleSubmit = async (payload: Record<string, any>) => {
    try {
      if (!state.selectedDate || !state.selectedTime) {
        toast({ title: "Falta seleccionar fecha y horario", description: "Elegí ambos antes de confirmar." });
        return;
      }
      const merged = { ...payload, preferredDate: state.selectedDate, preferredTime: state.selectedTime };
      // Envío a la API para correo (mismo mecanismo que formularios inline)
      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(merged)
        });
        if (!res.ok) {
          let msg = 'Hubo un error. Intentá reservar nuevamente.';
          try {
            const j = await res.json();
            switch (j?.error) {
              case 'EMAIL_CONNECTION_FAILED':
                msg = 'No se pudo conectar al servicio de correo. Intentá más tarde.'; break;
              case 'MISSING_SMTP_CONFIG':
                msg = 'Configuración de correo incompleta. Intentalo más tarde.'; break;
              case 'EMAIL_SEND_FAILED':
                msg = 'No se pudo enviar el correo. Reintentá.'; break;
              case 'EMAIL_SEND_FAILED_USER':
                msg = 'Reserva recibida pero el email de confirmación falló.'; break;
            }
          } catch {}
          toast({ title: 'Error', description: msg, variant: 'destructive' });
          return;
        }
      } catch (apiErr) {
        console.error('[BookingModal] API send error', apiErr);
        toast({ title: 'Error', description: 'Hubo un error. Intentá reservar nuevamente.', variant: 'destructive' });
        return; // no cerrar si falló
      }
      // Callback opcional (tracking) después del envío
      await onConfirm?.(merged);
      toast({ title: "Reserva confirmada", description: `Reserva para ${state.selectedDate} ${state.selectedTime} enviada.` });
      onOpenChange(false);
      state.reset();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[BookingModal] Error en handleSubmit', err);
  toast({ title: 'Error', description: 'Hubo un error. Intentá reservar nuevamente.', variant: 'destructive' });
    }
  };

  let content;
  try {
    content = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={(e) => {
  if (e.target === e.currentTarget) { // click directo sobre el backdrop
          onOpenChange(false);
          state.reset();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Agendar Visita al Showroom</h3>
          <button onClick={() => { onOpenChange(false); state.reset(); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Cerrar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <DateTimePicker state={state} className="mb-8" />

        <div className="pt-6 border-t">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Tus Datos</h4>
          <LeadBookingForm
            ref={formRef}
            showSubmitButton={false}
            withInlinePreferredDateTime={false}
            defaultClientType={defaultClientType}
            defaultProductType={defaultProductType}
            controlledDate={state.selectedDate}
            controlledTime={state.selectedTime}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-8">
  <Button variant="outline" onClick={() => { onOpenChange(false); state.reset(); }} className="px-6 py-3">Cancelar</Button>
          <Button
            disabled={!state.selectedDate || !state.selectedTime}
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 disabled:opacity-50"
          >
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
    );
  } catch (err) {
    console.error('[BookingModal] render error', err);
    content = (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 text-white">
        <div className="bg-red-600 p-6 rounded-xl max-w-md w-full text-sm space-y-3">
          <p className="font-bold">Error cargando el modal.</p>
          <pre className="whitespace-pre-wrap break-words">{String(err)}</pre>
          <button className="underline" onClick={() => onOpenChange(false)}>Cerrar</button>
        </div>
      </div>
    );
  }
  // Portal to body (after mounting client-side)
  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  return content;
}
