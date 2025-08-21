"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import ContactForm from "@/components/ContactForm"

interface ReservationModalProps {
  open: boolean
  onClose: () => void
  onReservation: (date: string, time: string) => void
}

export default function ReservationModal({ open, onClose, onReservation }: ReservationModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentMonth(new Date())
  }, [])

  const generateCalendarDays = () => {
    if (!currentMonth) return []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isPast = date.getTime() < today.setHours(0, 0, 0, 0)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      days.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isWeekend,
        dateString: date.toISOString().split("T")[0],
      })
    }

    return days
  }

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

  const handlePrevMonth = () => {
    if (currentMonth) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }
  }

  const handleNextMonth = () => {
    if (currentMonth) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    }
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onReservation(selectedDate, selectedTime)
      setSelectedDate("")
      setSelectedTime("")
      onClose()
    }
  }

  if (!open || !currentMonth) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Agendar Visita al Showroom</h3>
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
                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded transition-colors">
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
                  onClick={() =>
                    !day.isPast && !day.isWeekend && day.isCurrentMonth && setSelectedDate(day.dateString)
                  }
                  disabled={day.isPast || day.isWeekend || !day.isCurrentMonth}
                  className={`p-2 text-sm rounded transition-colors ${
                    day.isCurrentMonth ? "text-gray-900" : "text-gray-300"
                  } ${
                    day.isPast || day.isWeekend ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
                  } ${selectedDate === day.dateString ? "bg-[#E6D5C3] text-gray-900 font-medium" : ""}`}
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
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    !selectedDate ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
                  } ${
                    selectedTime === time
                      ? "bg-[#E6D5C3] border-[#E6D5C3] text-gray-900 font-medium"
                      : "border-gray-200"
                  }`}
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

        {/* Updated contact form with all required fields and validations */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Tus Datos</h4>
          <ContactForm className="space-y-4" includeDateTime={false} showSubmitButton={false} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={onClose} className="px-6 py-3">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
  )
}
