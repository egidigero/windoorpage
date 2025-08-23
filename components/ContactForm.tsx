"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  className?: string
  submitLabel?: string
  showSubmitButton?: boolean
  includeDateTime?: boolean
  onSubmit?: (data: Record<string, FormDataEntryValue>) => void | Promise<void>
}

export default function ContactForm({
  className,
  submitLabel = "Enviar Consulta",
  showSubmitButton = true,
  includeDateTime = true,
  onSubmit,
}: ContactFormProps) {
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    if (onSubmit) {
      await onSubmit(data)
    }

    toast({
      title: "Consulta enviada",
      description: "Nos pondremos en contacto a la brevedad.",
    })

    event.currentTarget.reset()
  }

  return (
    <form className={cn("space-y-6", className)} onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            required
            pattern="[0-9]+"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
            placeholder="Tu número de teléfono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>

      {includeDateTime && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha preferida
            </label>
            <input
              type="date"
              name="preferredDate"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora preferida
            </label>
            <select
              name="preferredTime"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
            >
              <option value="">Seleccionar hora</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de cliente *
          </label>
          <select
            name="clientType"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
          >
            <option value="">Seleccionar tipo</option>
            <option value="particular">Particular</option>
            <option value="profesional">Profesional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de producto *
          </label>
          <select
            name="productType"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
          >
            <option value="">Seleccionar producto</option>
            <option value="aberturas-pvc">Aberturas de PVC y aluminio</option>
            <option value="placares-vestidores-banos">Placares, Vestidores y Baños</option>
            <option value="puertas-interior">Puertas de interior</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mensaje / Medidas / Observaciones
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent resize-none"
          placeholder="Contanos sobre tu proyecto, medidas aproximadas, o cualquier detalle que consideres importante..."
        />
      </div>

      {showSubmitButton && (
        <div className="text-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  )
}

