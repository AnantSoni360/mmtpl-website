"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { TagPill } from "@/components/ui/TagPill";
import { cn } from "@/lib/utils";

const REGIONS = ["India Operations", "Overseas Operations"] as const;
type Region = typeof REGIONS[number];

const X_POINTS = [50, 250, 450, 650, 850, 950];
const YEARS = [2012, 2014, 2016, 2018, 2020, 2021];

// Manually mapping hover data to provide context
const DATA = {
  "India Operations": {
    max: 189,
    prefix: "₹",
    suffix: " Cr",
    multiplierLabel: "20X Growth",
    values: [9.45, 47.25, 94.5, 141.75, 170.1, 189],
    projects: [
      "Initial Refractory Installation Projects",
      "Expansion in Non-Recovery Coke Ovens",
      "JSW Blast Furnaces & Gerdau Steel",
      "Major Turnkey Projects Initiated",
      "Diversification in Steel Melt Shops",
      "JSPL, JSL & Lloyds Metals Mega Projects",
    ],
  },
  "Overseas Operations": {
    max: 10,
    prefix: "USD ",
    suffix: "M",
    multiplierLabel: "20X Growth",
    values: [0.5, 1, 2, 5, 8, 10],
    projects: [
      "Initial Overseas Explorations",
      "Early Refractory Maintenance",
      "Establishing Base in GCC",
      "Jindal Shadeed, Oman - Complete Casting Works",
      "MISCO, Oman - SMS & Sheeting Turnkey",
      "Carmeuse Majan LLC & Uma Lime Turnkey LCPs",
    ],
  },
};

function AnimatedCounter({ value, prefix = "", suffix = "", isVisible }: { value: number, prefix?: string, suffix?: string, isVisible: boolean }) {
  if (!isVisible) return null;
  const formatted = value % 1 === 0 ? value.toString() : value.toFixed(2);
  return <span>{prefix}{formatted}{suffix}</span>;
}

export function GrowthMountain() {
  const [activeRegion, setActiveRegion] = useState<Region>("India Operations");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const currentData = DATA[activeRegion];
  
  // Calculate Y points based on 300px effective height (50 to 350)
  const yPoints = currentData.values.map(val => 350 - (val / currentData.max) * 300);
  
  // Create SVG path string
  const pathD = `M ${X_POINTS[0]} ${yPoints[0]} ` + X_POINTS.slice(1).map((x, i) => `L ${x} ${yPoints[i + 1]}`).join(" ");

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <TagPill variant="bone" className="mb-6">Financial Milestones</TagPill>
            <h2 className="display text-[var(--color-obsidian)] mb-8">Financial Growth & Business Expansion</h2>
          </motion.div>

          {/* Region Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex bg-[var(--color-bone)] p-1.5 rounded-full border border-[var(--color-silver)]"
          >
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-switzer font-medium transition-all relative",
                  activeRegion === region ? "text-[var(--color-paper)]" : "text-[var(--color-graphite)] hover:text-[var(--color-obsidian)]"
                )}
              >
                {activeRegion === region && (
                  <motion.div
                    layoutId="activeRegion"
                    className="absolute inset-0 bg-[var(--color-obsidian)] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{region}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Mountain Chart Container */}
        <div className="relative w-full max-w-[1000px] mx-auto h-[400px] md:h-[500px] mt-10">
          
          {/* Top Label */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
            className="absolute top-0 right-[5%] md:right-[10%] text-center z-20 pointer-events-none"
          >
            <div className="text-[#3B82F6] font-editorial text-5xl md:text-6xl font-bold drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              {currentData.multiplierLabel}
            </div>
            <div className="text-[var(--color-slate)] font-switzer text-sm uppercase tracking-wider mt-2 font-medium">
              Since 2012
            </div>
          </motion.div>

          {/* SVG Graph */}
          <svg 
            viewBox="0 0 1000 400" 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Grid lines (horizontal) */}
            {[50, 125, 200, 275, 350].map((y, i) => (
              <line key={`grid-${i}`} x1="0" y1={y} x2="1000" y2={y} stroke="var(--color-silver)" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Glowing Gradient Definition */}
            <defs>
              <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>

            {/* The Mountain Area (Under path) */}
            <motion.path
              d={`${pathD} L 950 400 L 50 400 Z`}
              fill="url(#glowGradient)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            />

            {/* The Line Path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--color-obsidian)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1, d: pathD } : { pathLength: 0 }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.4 },
                d: { type: "spring", stiffness: 60, damping: 15 } // Morphing transition when toggling
              }}
            />

            {/* Milestone Nodes */}
            {X_POINTS.map((x, i) => (
              <g key={`node-${i}`} 
                 onMouseEnter={() => setHoveredIndex(i)} 
                 onMouseLeave={() => setHoveredIndex(null)}
                 className="cursor-pointer outline-none group"
                 tabIndex={0}
              >
                {/* Invisible hover target for larger hit area */}
                <circle cx={x} cy={yPoints[i]} r={40} fill="transparent" />
                
                {/* Outer Glow on hover */}
                <motion.circle
                  cx={x}
                  cy={yPoints[i]}
                  r={14}
                  fill="rgba(59, 130, 246, 0.2)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredIndex === i ? 2 : (isInView ? 1 : 0),
                    opacity: hoveredIndex === i ? 1 : (isInView ? 0 : 0),
                    cx: x,
                    cy: yPoints[i]
                  }}
                  transition={{ 
                    duration: 0.3,
                    cy: { type: "spring", stiffness: 60, damping: 15 }
                  }}
                />

                {/* Inner Dot */}
                <motion.circle
                  cx={x}
                  cy={yPoints[i]}
                  r={7}
                  fill={hoveredIndex === i ? "#3B82F6" : "var(--color-obsidian)"}
                  stroke="var(--color-paper)"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  animate={isInView ? { 
                    scale: hoveredIndex === i ? 1.2 : 1, 
                    cx: x, 
                    cy: yPoints[i] 
                  } : { scale: 0 }}
                  transition={{ 
                    scale: { delay: isInView && hoveredIndex === null ? 0.8 + (i * 0.15) : 0, type: "spring" },
                    cy: { type: "spring", stiffness: 60, damping: 15 },
                    cx: { duration: 0 }
                  }}
                  className="transition-colors duration-300 drop-shadow-sm"
                />

                {/* X-Axis Year Labels */}
                <motion.text
                  x={x}
                  y={380}
                  textAnchor="middle"
                  className="font-switzer text-[14px] font-medium fill-[var(--color-graphite)] group-hover:fill-[var(--color-obsidian)] transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.8 + (i * 0.15) }}
                >
                  {YEARS[i]}
                </motion.text>
              </g>
            ))}
          </svg>

          {/* Tooltip HTML Overlay */}
          {X_POINTS.map((x, i) => (
            <motion.div
              key={`tooltip-${i}`}
              className="absolute pointer-events-none z-30"
              style={{
                left: `calc(${(x / 1000) * 100}% - 125px)`,
                top: `calc(${(yPoints[i] / 400) * 100}% - 140px)`,
                width: "250px"
              }}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={hoveredIndex === i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="bg-[var(--color-paper)] p-5 rounded-[var(--radius-card)] border border-[var(--color-silver)] shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative">
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-[var(--color-paper)] border-b border-r border-[var(--color-silver)] rotate-45" />
                
                <div className="text-[var(--color-slate)] font-switzer text-xs mb-1 font-semibold tracking-wider">
                  {activeRegion.split(' ')[0]} REVENUE — {YEARS[i]}
                </div>
                <div className="text-[var(--color-obsidian)] font-editorial text-3xl font-bold mb-3 border-b border-[var(--color-bone)] pb-3">
                  <AnimatedCounter 
                    value={currentData.values[i]} 
                    prefix={currentData.prefix} 
                    suffix={currentData.suffix} 
                    isVisible={hoveredIndex === i} 
                  />
                </div>
                <div className="text-[var(--color-graphite)] font-switzer text-sm leading-relaxed">
                  <span className="block text-[11px] text-[var(--color-slate)] mb-1 font-semibold uppercase tracking-wider">Major Projects & Milestones:</span>
                  {currentData.projects[i]}
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
