"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export interface ReservationData {
  date: string
  time: string
  name?: string
  phone?: string
  email?: string
  clientType?: string
  productType?: string
  message?: string
}

interface ReservationModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: (data: ReservationData) => void
  productTypePreset?: string
  title?: string
}

// Extracted calendar / time selection logic to be reused anywhere
export function ReservationModal({
  open,
  onClose,
  onConfirm,
  productTypePreset,
  title = "Agendar Visita al Showroom",
}: ReservationModalProps) {
  const { toast } = useToast()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    clientType: "",
    productType: productTypePreset || "",
    message: "",
  })

  // Reset when modal opens / closes
  useEffect(() => {
    if (!open) {
      setSelectedDate("")
      setSelectedTime("")
      setForm({
        name: "",
        phone: "",
        email: "",
        clientType: "",
        productType: productTypePreset || "",
        message: "",
      })
      setCurrentMonth(new Date())
    }
  }, [open, productTypePreset])

  const availableTimes = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const generateCalendarDays = useCallback(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: Array<{ date: Date; day: number; isCurrentMonth: boolean; isPast: boolean; isWeekend: boolean; dateString: string }> = []
    const today = new Date()
    const todayMid = today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const isCurrentMonth = date.getMonth() === month
      const isPast = date.getTime() < todayMid
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isWeekend,
        dateString: date.toISOString().split("T")[0],
      })
    }
    return days
  }, [currentMonth])

  const disabledConfirm = !selectedDate || !selectedTime || !form.name || !form.phone || !form.email || !form.clientType || !form.productType

  const handleConfirm = () => {
    if (disabledConfirm) return
    const data: ReservationData = {
      date: selectedDate,
      time: selectedTime,
      name: form.name,
      phone: form.phone,
      email: form.email,
      clientType: form.clientType,
      productType: form.productType,
      message: form.message,
    }
    toast({
      title: "Reserva confirmada",
      description: `Reserva confirmada para el ${selectedDate} a las ${selectedTime}`,
    })
    onConfirm?.(data)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Seleccionar Fecha</h4>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium min-w-[120px] text-center">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                  <div key={day} className="text-xs font-medium text-gray-500 text-center py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <button
                    key={index}
                    onClick={() => !day.isPast && !day.isWeekend && day.isCurrentMonth && setSelectedDate(day.dateString)}
                    disabled={day.isPast || day.isWeekend || !day.isCurrentMonth}
                    className={`p-2 text-sm rounded transition-colors ${day.isCurrentMonth ? "text-gray-900" : "text-gray-300"} ${day.isPast || day.isWeekend ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"} ${selectedDate === day.dateString ? "bg-[#E6D5C3] text-gray-900 font-medium" : ""}`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>

          {/* Time Selection */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Seleccionar Horario</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  disabled={!selectedDate}
                  className={`p-3 text-sm rounded-lg border transition-colors ${!selectedDate ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"} ${selectedTime === time ? "bg-[#E6D5C3] border-[#E6D5C3] text-gray-900 font-medium" : "border-gray-200"}`}
                >
                  {time}
                </button>
              ))}
            </div>

            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Resumen de tu visita:</h5>
                <p className="text-sm text-gray-600">
                  Fecha:{" "}
                  {new Date(selectedDate).toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600">Horario: {selectedTime} hs</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Data */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Tus Datos</h4>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]+"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="Tu número de teléfono"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cliente *</label>
                <select
                  required
                  value={form.clientType}
                  onChange={(e) => setForm((f) => ({ ...f, clientType: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="particular">Particular</option>
                  <option value="profesional">Profesional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de producto *</label>
                <select
                  required
                  value={form.productType}
                  onChange={(e) => setForm((f) => ({ ...f, productType: e.target.value }))}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje / Medidas / Observaciones</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Contanos sobre tu proyecto, medidas aproximadas, o cualquier detalle importante..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6D5C3] focus:border-transparent resize-none"
              />
            </div>
          </form>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={onClose} className="px-6 py-3">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={disabledConfirm}
            className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
  )
}

// Simple floating button that triggers the modal - optional helper
export function ReservationFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <Calendar className="w-5 h-5 mr-2" /> Agendar Visita
    </Button>
  )
}
