"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface LeadFormProps {
  showPreferredDateTime?: boolean
  productTypeDefault?: string
  submitLabel?: string
  compact?: boolean
  onSubmit?: (data: Record<string, string>) => void
}

export function LeadForm({
  showPreferredDateTime = true,
  productTypeDefault = "",
  submitLabel = "Enviar Consulta",
  compact = false,
  onSubmit,
}: LeadFormProps) {
  const { toast } = useToast()
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    clientType: "",
    productType: productTypeDefault,
    message: "",
  })

  const handleChange = (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Consulta enviada",
      description: "Nos contactaremos a la brevedad para asesorarte.",
    })
    onSubmit?.(data)
    // Reset form (keep product type preset)
    setData({
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      clientType: "",
      productType: productTypeDefault,
      message: "",
    })
  }

  return (
    <form className={`space-y-6 ${compact ? "space-y-4" : ""}`} onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={handleChange("name")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
              placeholder="Tu nombre completo"
            />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
            <input
              type="tel"
              required
              value={data.phone}
              onChange={handleChange("phone")}
              pattern="[0-9]+"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
              placeholder="Tu número de teléfono"
            />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          required
          value={data.email}
          onChange={handleChange("email")}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>

      {showPreferredDateTime && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha preferida</label>
            <input
              type="date"
              value={data.preferredDate}
              onChange={handleChange("preferredDate")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora preferida</label>
            <select
              value={data.preferredTime}
              onChange={handleChange("preferredTime")}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
            >
              <option value="">Seleccionar hora</option>
              {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cliente *</label>
          <select
            required
            value={data.clientType}
            onChange={handleChange("clientType")}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
          >
            <option value="">Seleccionar tipo</option>
            <option value="particular">Particular</option>
            <option value="profesional">Profesional</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de producto *</label>
          <select
            required
            value={data.productType}
            onChange={handleChange("productType")}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
          >
            <option value="">Seleccionar producto</option>
            <option value="aberturas-pvc">Aberturas de PVC</option>
            <option value="vestidores-banos">Vestidores y baños</option>
            <option value="puertas-interior">Puertas de interior</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje / Medidas / Observaciones</label>
        <textarea
          rows={4}
          value={data.message}
          onChange={handleChange("message")}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent resize-none"
          placeholder="Contanos sobre tu proyecto, medidas aproximadas, o cualquier detalle que consideres importante..."
        />
      </div>

      <div className="text-center pt-2">
        <Button
          type="submit"
          size="lg"
          className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-12 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
