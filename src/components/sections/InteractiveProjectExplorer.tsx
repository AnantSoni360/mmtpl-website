"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryProjects, GalleryProject } from "@/data/galleryData";
import { TagPill } from "@/components/ui/TagPill";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

type PhysicsState = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
};

export function InteractiveProjectExplorer() {
  const [openProject, setOpenProject] = useState<GalleryProject | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [speedMode, setSpeedMode] = useState<'slow' | 'medium' | 'natural'>('natural');

  // Physics Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const spheresRef = useRef<(HTMLDivElement | null)[]>([]);
  const physicsState = useRef<PhysicsState[]>([]);
  const animationRef = useRef<number>(0);
  const isPaused = useRef<boolean>(false);
  const hoveredIdRef = useRef<string | null>(null);
  const speedRef = useRef<number>(1.0);

  // Sync hovered state to ref for physics loop
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    speedRef.current = speedMode === 'slow' ? 0.3 : speedMode === 'medium' ? 0.6 : 1.0;
  }, [speedMode]);

  // Initialize Physics state (Run ONCE)
  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth: w, clientHeight: h } = containerRef.current;
    
    // Create random scattering only if empty
    if (physicsState.current.length === 0) {
      physicsState.current = galleryProjects.map((p) => {
        const radius = window.innerWidth < 768 ? 64 : 80; // 128px or 160px diameter
        return {
          id: p.name,
          x: radius + Math.random() * Math.max(1, w - radius * 2),
          y: radius + Math.random() * Math.max(1, h - radius * 2),
          vx: (Math.random() - 0.5) * 4, // Faster random speed
          vy: (Math.random() - 0.5) * 4, 
          radius: radius,
          mass: 1
        };
      });
    }

    const updatePhysics = () => {
      if (!isPaused.current && containerRef.current) {
        const cw = containerRef.current.clientWidth;
        const ch = containerRef.current.clientHeight;
        const ps = physicsState.current;
        const currentHovered = hoveredIdRef.current;

        // 1. Update Positions & Wall Collisions
        const speed = speedRef.current;
        for (let i = 0; i < ps.length; i++) {
          const p = ps[i];
          if (currentHovered === p.id) continue; // Freeze hovered sphere

          p.x += p.vx * speed;
          p.y += p.vy * speed;

          if (p.x - p.radius < 0) { p.x = p.radius; p.vx *= -1; }
          if (p.x + p.radius > cw) { p.x = cw - p.radius; p.vx *= -1; }
          if (p.y - p.radius < 0) { p.y = p.radius; p.vy *= -1; }
          if (p.y + p.radius > ch) { p.y = ch - p.radius; p.vy *= -1; }
        }

        // 2. Sphere-Sphere Elastic Collisions
        for (let i = 0; i < ps.length; i++) {
          for (let j = i + 1; j < ps.length; j++) {
            const p1 = ps[i];
            const p2 = ps[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDist = p1.radius + p2.radius;

            if (distance < minDist) {
              const overlap = minDist - distance;
              const nx = dx / distance;
              const ny = dy / distance;
              
              // If hovered, give it infinite mass so it doesn't move when bumped
              const m1 = currentHovered === p1.id ? 10000 : p1.mass;
              const m2 = currentHovered === p2.id ? 10000 : p2.mass;
              const sumM = m1 + m2;
              
              // Resolve overlap
              const move1 = overlap * (m2 / sumM);
              const move2 = overlap * (m1 / sumM);
              if (currentHovered !== p1.id) { p1.x -= nx * move1; p1.y -= ny * move1; }
              if (currentHovered !== p2.id) { p2.x += nx * move2; p2.y += ny * move2; }

              // Resolve velocities (1D elastic collision along normal)
              // If frozen, its velocity doesn't transfer energy into the system
              const vx1 = currentHovered === p1.id ? 0 : p1.vx;
              const vy1 = currentHovered === p1.id ? 0 : p1.vy;
              const vx2 = currentHovered === p2.id ? 0 : p2.vx;
              const vy2 = currentHovered === p2.id ? 0 : p2.vy;
              
              const kx = vx1 - vx2;
              const ky = vy1 - vy2;
              const p_val = 2 * (nx * kx + ny * ky) / sumM;
              
              if (currentHovered !== p1.id) {
                p1.vx -= p_val * m2 * nx;
                p1.vy -= p_val * m2 * ny;
              }
              if (currentHovered !== p2.id) {
                p2.vx += p_val * m1 * nx;
                p2.vy += p_val * m1 * ny;
              }
            }
          }
        }

        // 3. Render Transforms
        for (let i = 0; i < ps.length; i++) {
          const el = spheresRef.current[i];
          if (el) {
            el.style.transform = `translate3d(${ps[i].x - ps[i].radius}px, ${ps[i].y - ps[i].radius}px, 0)`;
          }
        }
      }
      animationRef.current = requestAnimationFrame(updatePhysics);
    };

    animationRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationRef.current);
  }, []); // Empty dependency array so loop never restarts!

  // Pause physics when gallery is open
  useEffect(() => {
    isPaused.current = !!openProject;
  }, [openProject]);

  // Handle Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImageIndex !== null) setLightboxImageIndex(null);
        else if (openProject) setOpenProject(null);
      }
      if (e.key === "ArrowLeft" && lightboxImageIndex !== null) {
        setLightboxImageIndex(prev => (prev! > 0 ? prev! - 1 : openProject!.images.length - 1));
      }
      if (e.key === "ArrowRight" && lightboxImageIndex !== null) {
        setLightboxImageIndex(prev => (prev! < openProject!.images.length - 1 ? prev! + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openProject, lightboxImageIndex]);

  return (
    <section className="py-24 relative bg-[var(--color-bg-main)]">
      {/* Sliding Marquee for the Gallery CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-track-fast {
          animation: custom-marquee 30s linear infinite;
        }
        .animate-marquee-track-fast:hover {
          animation-play-state: paused;
        }
        .sphere-bg {
           background: radial-gradient(circle at 30% 30%, #ffffff 0%, hsl(var(--project-hue), 80%, 85%) 30%, hsl(var(--project-hue), 70%, 65%) 90%);
        }
        .sphere-glow {
           background-color: hsl(var(--project-hue), 80%, 60%);
           opacity: 0.5;
        }
        .dark .sphere-bg {
           background: radial-gradient(circle at 30% 30%, hsl(var(--project-hue), 60%, 35%) 0%, hsl(var(--project-hue), 70%, 15%) 50%, #050505 100%);
        }
      `}} />

      <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-2xl"
          >
            <TagPill variant="bone" className="mb-6">Interactive Explorer</TagPill>
            <h2 className="display text-[var(--color-obsidian)] mb-6">Physics Collision Gallery</h2>
            <p className="body-text text-[var(--color-graphite)]">
              Hover over any floating capsule to freeze it, and click to reveal a sliding gallery of execution photographs.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start lg:items-end gap-3"
          >
            <span className="text-sm font-switzer font-medium text-[var(--color-slate)] uppercase tracking-wider">Simulation Speed</span>
            <div className="flex bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-full p-1 shadow-inner">
              {(['slow', 'medium', 'natural'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSpeedMode(mode)}
                  className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    speedMode === mode 
                      ? 'bg-[#3b82f6] text-white shadow-md' 
                      : 'text-[var(--color-graphite)] hover:bg-[var(--color-silver)]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2D Physics Bounds Container */}
      <div className="relative w-full overflow-hidden">
        <div 
          ref={containerRef} 
          className="relative w-full h-[600px] border-y border-[var(--color-silver)] bg-[var(--color-bone)]/50 shadow-inner"
        >
          {galleryProjects.map((project, i) => (
            <div
              key={project.name}
              ref={el => { spheresRef.current[i] = el; }}
              className="absolute top-0 left-0"
              style={{ willChange: 'transform' }} // Optimize for direct DOM manipulation
            >
              <ProjectSphere 
                project={project} 
                isActive={openProject?.name === project.name || hoveredId === project.name}
                onMouseEnter={() => setHoveredId(project.name)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  setHoveredId(project.name);
                  setOpenProject(project);
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sliding Images Gallery */}
      <AnimatePresence>
        {openProject && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-[var(--color-obsidian)] border-y border-[var(--color-silver)] relative overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-8 flex justify-between items-center relative z-20">
              <div>
                <h3 className="heading-sm text-[var(--color-paper)]">{openProject.name}</h3>
                <p className="text-sm font-switzer text-[var(--color-silver)] mt-1">{openProject.images.length} Photographs</p>
              </div>
              <button 
                onClick={() => setOpenProject(null)}
                className="p-3 bg-[var(--color-paper)] rounded-full hover:bg-[var(--color-silver)] text-[var(--color-obsidian)] transition-all border border-transparent hover:scale-110"
              >
                <X size={24} />
              </button>
            </div>

            {/* Images Marquee */}
            <div className="relative w-full overflow-hidden pb-12 pt-4">
              <div className="flex w-max animate-marquee-track-fast">
                <div className="flex gap-8 pr-8">
                  {openProject.images.map((img, idx) => (
                    <ImageCard 
                      key={`img-a-${idx}`} 
                      img={img} 
                      onClick={() => setLightboxImageIndex(idx)} 
                    />
                  ))}
                </div>
                <div className="flex gap-8 pr-8">
                  {openProject.images.map((img, idx) => (
                    <ImageCard 
                      key={`img-b-${idx}`} 
                      img={img} 
                      onClick={() => setLightboxImageIndex(idx)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {openProject && lightboxImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxImageIndex(null)}
          >
            <button 
              onClick={() => setLightboxImageIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex(prev => (prev! > 0 ? prev! - 1 : openProject.images.length - 1));
              }}
              className="absolute left-4 md:left-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div 
              key={lightboxImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-6xl h-[80vh] px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={openProject.images[lightboxImageIndex]} 
                alt="Large photo" 
                fill 
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </motion.div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex(prev => (prev! < openProject.images.length - 1 ? prev! + 1 : 0));
              }}
              className="absolute right-4 md:right-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            >
              <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-switzer text-sm tracking-widest uppercase">
              {lightboxImageIndex + 1} / {openProject.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ImageCard({ img, onClick }: { img: string, onClick: () => void }) {
  return (
    <div
      className="relative w-[300px] md:w-[400px] aspect-[4/3] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 border-[3px] border-transparent hover:border-[#3b82f6] shadow-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:scale-105 group bg-[var(--color-paper)]"
      onClick={onClick}
    >
      <Image 
        src={img} 
        alt="Project execution" 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 300px, 400px"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
        <div className="bg-[#3b82f6] p-3 rounded-full text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          <Maximize2 size={24} />
        </div>
      </div>
    </div>
  );
}

function ProjectSphere({ project, onClick, onMouseEnter, onMouseLeave, isActive }: { project: GalleryProject, onClick: () => void, onMouseEnter: () => void, onMouseLeave: () => void, isActive: boolean }) {
  // Generate a consistent hue (0-360) based on the project name
  const hue = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < project.name.length; i++) {
      hash = project.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
  }, [project.name]);

  return (
    <div
      className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center p-4 cursor-pointer transition-shadow duration-300 group shadow-[0_20px_40px_rgba(0,0,0,0.15)] sphere-bg ${
        isActive 
          ? 'shadow-[0_0_50px_rgba(59,130,246,0.8)] border-[3px] border-[#3b82f6]' 
          : 'hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] border border-[var(--color-silver)]'
      }`}
      style={{
        '--project-hue': hue,
      } as React.CSSProperties}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Glossy reflection */}
      <div className="absolute inset-0 rounded-full border-[1.5px] border-white/40 pointer-events-none" />
      <div className="absolute top-3 left-5 w-14 h-6 rounded-full bg-white/30 blur-md rotate-[-40deg] pointer-events-none" />
      
      {/* Glowing Aura on Hover */}
      <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-300 -z-10 pointer-events-none sphere-glow ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
      
      {/* Project Name inside the ball */}
      <h3 className={`relative z-10 font-switzer font-bold text-center text-[11px] md:text-sm leading-snug transition-transform duration-300 line-clamp-4 text-[var(--color-obsidian)] ${
        isActive ? 'scale-110' : 'group-hover:scale-105'
      }`}>
        {project.name}
      </h3>
    </div>
  );
}
