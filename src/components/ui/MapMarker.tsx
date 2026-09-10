"use client";

import { motion } from "framer-motion";

interface MapMarkerProps {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  label: string;
  delay?: number;
}

export function MapMarker({ x, y, label, delay = 0 }: MapMarkerProps) {
  return (
    <div 
      className="absolute flex items-center justify-center cursor-pointer group z-10"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.5, type: "spring" }}
        className="relative flex items-center justify-center"
      >
        {/* Pulsing background ring */}
        <div className="absolute w-full h-full bg-[#3b82f6] rounded-full animate-ping opacity-40 scale-[2.5]" />
        
        {/* Solid core dot */}
        <div className="relative w-3 h-3 bg-[#3b82f6] rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)] border border-white/40" />
        
        {/* Hover Label */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          <div className="bg-[#0a1128] text-white font-switzer text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-[#3b82f6]/30">
            {label}
            {/* Tooltip Arrow */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a1128] rotate-45 border-t border-l border-[#3b82f6]/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
