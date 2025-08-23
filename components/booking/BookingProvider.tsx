"use client";
import { useState, useCallback, useEffect } from 'react';
import { BookingModal } from './BookingModal';
import { FloatingBookingButton } from './FloatingBookingButton';

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  // Auto-open for debug if ?testModal=1 or window.BOOKING_FORCE_OPEN
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('testModal') === '1' || (window as any).BOOKING_FORCE_OPEN) {
        if (process.env.NODE_ENV !== 'production') console.log('[BookingProvider] auto-open via query/flag');
        setOpen(true);
      }
      // Escuchar evento global para abrir desde cualquier parte (Header, etc.)
      const handler = () => {
        if (process.env.NODE_ENV !== 'production') console.log('[BookingProvider] open-booking-modal event');
        setOpen(true);
      };
      window.addEventListener('open-booking-modal', handler as EventListener);
      // Exponer helper global opcional
      (window as any).openBookingModal = () => handler();
      return () => {
        window.removeEventListener('open-booking-modal', handler as EventListener);
      };
    }
  }, []);
  const handleConfirm = useCallback(async (_data: Record<string, any>) => {
    // The LeadBookingForm inside modal already posts to API; here we could add tracking.
  }, []);
  return (
    <>
      {children}
      <FloatingBookingButton onClick={() => {
        if (process.env.NODE_ENV !== 'production') console.log('[BookingProvider] click floating button -> setOpen(true)');
        setOpen(true);
      }} />
      {process.env.NODE_ENV !== 'production' && (
        <div style={{position:'fixed',bottom:4,left:4,fontSize:10,background:'#000',color:'#fff',padding:'2px 4px',borderRadius:4,opacity:0.5,zIndex:49}}>
          modal:{String(open)}
        </div>
      )}
      <BookingModal open={open} onOpenChange={setOpen} onConfirm={handleConfirm} />
    </>
  );
}
