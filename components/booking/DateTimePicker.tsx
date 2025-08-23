"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingState } from "./useBookingState";
import { memo } from "react";

export interface DateTimePickerProps {
  state: ReturnType<typeof useBookingState>;
  className?: string;
  onDateSelected?: (date: string) => void;
  onTimeSelected?: (time: string) => void;
  disabled?: boolean;
}

function DateTimePickerComponent({ state, className, onDateSelected, onTimeSelected, disabled }: DateTimePickerProps) {
  const { calendarDays, monthNames, currentMonth, prevMonth, nextMonth, selectedDate, setSelectedDate, selectedTime, setSelectedTime, availableTimes } = state;

  return (
    <div className={cn("grid md:grid-cols-2 gap-8", className)}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-gray-900">Seleccionar Fecha</h4>
          <div className="flex items-center space-x-2">
            <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded transition-colors" aria-label="Mes anterior">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded transition-colors" aria-label="Mes siguiente">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"].map(day => (
            <div key={day} className="text-xs font-medium text-gray-500 text-center py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            const disabledDay = disabled || day.isPast || day.isWeekend || !day.isCurrentMonth;
            return (
              <button key={i} type="button" disabled={disabledDay} onClick={() => {
                if (disabledDay) return;
                setSelectedDate(day.dateString);
                onDateSelected?.(day.dateString);
              }} className={cn("p-2 text-sm rounded transition-colors", day.isCurrentMonth ? "text-gray-900" : "text-gray-300", disabledDay ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100", selectedDate === day.dateString && "bg-[#E6D5C3] text-gray-900 font-medium")}>{day.day}</button>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Seleccionar Horario</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableTimes.map(time => {
            const disabledTime = disabled || !selectedDate;
            return (
              <button key={time} type="button" disabled={disabledTime} onClick={() => {
                if (disabledTime) return;
                setSelectedTime(time);
                onTimeSelected?.(time);
              }} className={cn("p-3 text-sm rounded-lg border transition-colors", disabledTime ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50", selectedTime === time ? "bg-[#E6D5C3] border-[#E6D5C3] text-gray-900 font-medium" : "border-gray-200")}>{time}</button>
            );
          })}
        </div>
        {selectedDate && selectedTime && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Resumen de tu visita:</h5>
            <p className="text-sm text-gray-600">Fecha: {new Date(selectedDate).toLocaleDateString("es-AR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            <p className="text-sm text-gray-600">Horario: {selectedTime} hs</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const DateTimePicker = memo(DateTimePickerComponent);
