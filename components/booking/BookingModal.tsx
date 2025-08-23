"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingState } from "./useBookingState";
import { DateTimePicker } from "./DateTimePicker";
import { LeadBookingForm } from "./LeadBookingForm";
import { useToast } from "@/hooks/use-toast";

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

  if (!open) return null;

  const handleSubmit = async (payload: Record<string, any>) => {
    if (!state.selectedDate || !state.selectedTime) {
      toast({ title: "Falta seleccionar fecha y horario", description: "Elegí ambos antes de confirmar." });
      return;
    }
    const merged = { ...payload, preferredDate: state.selectedDate, preferredTime: state.selectedTime };
    await onConfirm?.(merged);
    toast({ title: "Reserva confirmada", description: `Reserva para ${state.selectedDate} ${state.selectedTime} enviada.` });
    onOpenChange(false);
    state.reset();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
          <Button disabled={!state.selectedDate || !state.selectedTime} onClick={() => {
            // programmatically submit form via hidden button? Instead rely on user to fill + click Confirm
            const form = document.querySelector<HTMLFormElement>("form");
            form?.requestSubmit();
          }} className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 disabled:opacity-50">Confirmar Reserva</Button>
        </div>
      </div>
    </div>
  );
}
