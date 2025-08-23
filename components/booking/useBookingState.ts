"use client";

import { useState, useMemo, useCallback } from "react";

export interface BookingStateOptions {
  initialOpen?: boolean;
}

export function useBookingState(options: BookingStateOptions = {}) {
  const { initialOpen = false } = options;
  const [open, setOpen] = useState(initialOpen);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());

  const maxDate = useMemo(() => {
    const d = new Date();
    // Limitar a un mes hacia adelante (misma fecha o último día disponible si mes siguiente más corto)
    d.setMonth(d.getMonth() + 1);
    return d;
  }, []);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Array<{
      date: Date;
      day: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      isWeekend: boolean;
      isBeyondLimit: boolean;
      dateString: string;
    }> = [];
    const today = new Date();
    const todayMid = today.setHours(0,0,0,0);

    const maxDateMid = new Date(maxDate).setHours(0,0,0,0);
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const isCurrentMonth = date.getMonth() === month;
      const dateMid = new Date(date).setHours(0,0,0,0);
      const isPast = dateMid < todayMid;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isBeyondLimit = dateMid > maxDateMid; // más de un mes adelante
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isWeekend,
        isBeyondLimit,
        dateString: date.toISOString().split("T")[0],
      });
    }

    return days;
  }, [currentMonth, maxDate]);

  const monthNames = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  // Horarios laborales: bloques de 1h desde 10 a 19 (último turno inicia 18:00)
  const availableTimes = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

  const prevMonth = useCallback(() => {
    setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1));
  }, []);
  const nextMonth = useCallback(() => {
    setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1));
  }, []);

  const reset = useCallback(() => {
    setSelectedDate("");
    setSelectedTime("");
  }, []);

  return {
    open, setOpen,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    currentMonth, setCurrentMonth,
    calendarDays, monthNames, availableTimes,
    maxDate,
    prevMonth, nextMonth,
    reset,
  };
}
