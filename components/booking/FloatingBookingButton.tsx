"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FloatingBookingButtonProps {
  onClick: () => void;
  label?: string;
}

export function FloatingBookingButton({ onClick, label = "Agendar Visita" }: FloatingBookingButtonProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button onClick={onClick} className="bg-[#E6D5C3] hover:bg-[#DCC9B8] text-black font-semibold px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <Calendar className="w-5 h-5 mr-2" />
        {label}
      </Button>
    </div>
  );
}
