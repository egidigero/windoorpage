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
      dateString: string;
    }> = [];
    const today = new Date();
    const todayMid = today.setHours(0,0,0,0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const isCurrentMonth = date.getMonth() === month;
      const dateMid = new Date(date).setHours(0,0,0,0);
      const isPast = dateMid < todayMid;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isWeekend,
        dateString: date.toISOString().split("T")[0],
      });
    }

    return days;
  }, [currentMonth]);

  const monthNames = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  const availableTimes = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"];

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
    prevMonth, nextMonth,
    reset,
  };
}
