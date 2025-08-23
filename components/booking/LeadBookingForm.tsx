"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
}

export function LeadBookingForm({
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
}: LeadBookingFormProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Merge controlled date/time if provided
    if (controlledDate) data["preferredDate"] = controlledDate;
    if (controlledTime) data["preferredTime"] = controlledTime;

    try {
      await onSubmit?.(data);
      toast({
        title: "Consulta enviada",
        description: "Nos pondremos en contacto a la brevedad.",
      });
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Ocurrió un problema al enviar. Intentalo nuevamente.",
        variant: "destructive" as any,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={cn("space-y-6", className)} onSubmit={handleSubmit}>
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
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha preferida</label>
            <input name="preferredDate" type="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora preferida</label>
            <select name="preferredTime" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent">
              <option value="">Seleccionar hora</option>
              {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
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

      {showSubmitButton && (
        <div className="text-center pt-6">
          <Button disabled={submitting} type="submit" size="lg" className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50">
            {submitting ? "Enviando..." : submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}
