"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { achievements } from "@/data/achievements";
import { Trophy, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function AchievementCommandCenter() {
  const [visibleCount, setVisibleCount] = useState(6);
  return (
    <section className="py-24 relative bg-[var(--color-bg-main)]">
      {/* Subtle grid background for the "Command Center" feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(var(--color-obsidian) 1px, transparent 1px), linear-gradient(90deg, var(--color-obsidian) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-sm text-[var(--color-obsidian)] mb-12 uppercase tracking-widest">
              Major Accomplishments & Achievements
            </h2>

            {/* Top Stats Dashboard */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 border-y border-[var(--color-silver)] py-8 bg-[var(--color-bone)]/30 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <div className="display text-[#3b82f6] font-bold">3000 MT+</div>
                <div className="text-sm uppercase tracking-widest text-[var(--color-graphite)] mt-2 font-medium">Equipment Erection</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-[var(--color-silver)]" />
              <div className="text-center">
                <div className="display text-[#3b82f6] font-bold">6500 MT+</div>
                <div className="text-sm uppercase tracking-widest text-[var(--color-graphite)] mt-2 font-medium">Structural Steel</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-[var(--color-silver)]" />
              <div className="text-center">
                <div className="display text-[#3b82f6] font-bold">55,000 Sqm</div>
                <div className="text-sm uppercase tracking-widest text-[var(--color-graphite)] mt-2 font-medium">Sheeting Works</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Milestone Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.slice(0, visibleCount).map((ach) => (
            <motion.div 
              key={ach.id}
              variants={itemVariants}
              className="group relative bg-[var(--color-paper)] border border-[var(--color-silver)] p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:border-[#3b82f6]/50 flex flex-col justify-between"
            >
              {/* Card Content */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-slate)] bg-[var(--color-bone)] px-3 py-1 rounded-full">
                    {ach.location || 'India'}
                  </span>
                </div>
                <h3 className="text-lg font-switzer font-bold text-[var(--color-obsidian)] mb-3 leading-tight group-hover:text-[#3b82f6] transition-colors">
                  {ach.title}
                </h3>
                <p className="text-sm text-[var(--color-graphite)] leading-relaxed mb-6">
                  {ach.description}
                </p>
              </div>

              {/* Badges */}
              <div className="mt-auto pt-4 border-t border-[var(--color-silver)]/50">
                {ach.isRecord ? (
                  <div className="flex items-center gap-2 text-[#eab308] font-bold text-sm tracking-wide animate-pulse">
                    <Trophy size={18} />
                    <span>RECORD EXECUTION</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#10b981] font-medium text-sm tracking-wide">
                    <CheckCircle2 size={18} />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More / Show Less */}
        <div className="flex flex-col items-center justify-center gap-4 mt-12">
          <div className="flex gap-4">
            {visibleCount < achievements.length && (
              <motion.button
                onClick={() => setVisibleCount(v => Math.min(v + 6, achievements.length))}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-obsidian)] text-[var(--color-paper)] font-switzer font-semibold text-sm tracking-wide shadow-md hover:bg-opacity-90 transition-all duration-300"
              >
                <span>Read More</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </motion.button>
            )}
            {visibleCount > 6 && (
              <motion.button
                onClick={() => setVisibleCount(6)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[var(--color-obsidian)] text-[var(--color-obsidian)] font-switzer font-semibold text-sm tracking-wide hover:bg-[var(--color-obsidian)] hover:text-[var(--color-paper)] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <span>Show Less</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Awards Gallery Section */}
        <div className="mt-32 border-t border-[var(--color-silver)] pt-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-sm text-[var(--color-obsidian)] mb-12 uppercase tracking-widest">
              Awards & Recognition
            </h2>
            
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                { src: '/award-gallery/10 th anniversary.jpg', alt: '10th Anniversary' },
                { src: '/award-gallery/team photo.jpg', alt: 'Team Photo' },
                { src: '/award-gallery/Picture1.jpg', alt: 'Award 1' },
                { src: '/award-gallery/Picture2.png', alt: 'Award 2' },
                { src: '/award-gallery/Picture3.png', alt: 'Award 3' },
              ].map((img, i) => (
                <div key={i} className="relative w-64 h-48 md:w-80 md:h-64 rounded-xl overflow-hidden shadow-lg border border-[var(--color-silver)] hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
