"use client";
import { useState, useCallback } from 'react';
import { BookingModal } from './BookingModal';
import { FloatingBookingButton } from './FloatingBookingButton';

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const handleConfirm = useCallback(async (_data: Record<string, any>) => {
    // The LeadBookingForm inside modal already posts to API; here we could add tracking.
  }, []);
  return (
    <>
      {children}
      <FloatingBookingButton onClick={() => setOpen(true)} />
      <BookingModal open={open} onOpenChange={setOpen} onConfirm={handleConfirm} />
    </>
  );
}
