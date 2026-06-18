'use client'

import { useState, useEffect, useRef } from 'react'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { services } from '@/data/services'
import { Card } from '@/components/ui/Card'
import { PenTool, Building2, Warehouse, Hammer, Factory, Waves, Flame, Thermometer, Layers, Zap, Wrench, Maximize2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const iconProps = { className: "w-8 h-8 text-[var(--color-obsidian)]", strokeWidth: 1.5 }

const iconMap: Record<string, React.ReactNode> = {
  PenTool: <PenTool {...iconProps} />,
  Building2: <Building2 {...iconProps} />,
  Warehouse: <Warehouse {...iconProps} />,
  Hammer: <Hammer {...iconProps} />,
  Factory: <Factory {...iconProps} />,
  Waves: <Waves {...iconProps} />,
  Flame: <Flame {...iconProps} />,
  Thermometer: <Thermometer {...iconProps} />,
  Layers: <Layers {...iconProps} />,
  Zap: <Zap {...iconProps} />,
  Wrench: <Wrench {...iconProps} />,
}

const videoMap: Record<string, string> = {
  // TODO: Paste the direct Cloudinary .mp4 URLs below.
  // The URL should look something like: https://res.cloudinary.com/dnjci8etz/video/upload/...
  Flame: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771478/refractory_ttf6cf.mp4', // Refractory
  Hammer: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771477/structural_ck2sig.mp4', // Structural
  Factory: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771477/equipment_tqe4jm.mp4', // Equipment
  Building2: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771477/civil_whyx1m.mp4', // Civil
  Waves: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771475/piping_aummaw.mp4', // Piping
  Zap: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771477/electrical_hcwhzd.mp4', // Electrical
  Wrench: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771475/operations_j97tpz.mp4', // Operations
  Thermometer: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771475/thermal_jx0scm.mp4', // Thermal
  Layers: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771475/sheeting_pomeuo.mp4', // Sheeting
  PenTool: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771476/design_z4unpn.mp4', // Design
  Warehouse: 'https://res.cloudinary.com/dnjci8etz/video/upload/v1781771475/ml2yecvvpthdnlw3umoo.mp4', // Sheds
}

// Video element is only injected into DOM on first hover — prevents all 11 videos
// from pre-loading on page mount. Once loaded, the node is kept alive (hidden) for instant replay.
const ServiceBackgroundEffect = ({ iconName, isHovered }: { iconName: string; isHovered: boolean }) => {
  const videoSrc = videoMap[iconName]
  const [shouldPlay, setShouldPlay] = useState(false)

  // Debounce the video load to prevent massive memory spikes when dragging mouse across multiple cards
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isHovered) {
      // Only load the heavy YouTube player if they hover for at least 300ms
      timer = setTimeout(() => setShouldPlay(true), 300)
    } else {
      // Immediately destroy the YouTube player when mouse leaves to free up RAM
      setShouldPlay(false)
    }
    return () => clearTimeout(timer)
  }, [isHovered])

  if (videoSrc) {
    return (
      <div className={`absolute inset-0 overflow-hidden rounded-[var(--radius-card)] pointer-events-none transition-opacity duration-500 z-0 ${shouldPlay ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[var(--color-obsidian)]/60 transition-colors duration-500 z-10" />
        {shouldPlay && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)]/80 via-[var(--color-obsidian)]/20 to-transparent z-10" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 overflow-hidden rounded-[var(--radius-card)] pointer-events-none transition-opacity duration-700 z-0 bg-[var(--color-obsidian)] ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      <motion.div 
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] via-transparent to-[var(--color-obsidian)] opacity-90" />
    </div>
  )
}

export default function Services() {
  const [hoveredService, setHoveredService] = useState<typeof services[0] | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (hoveredService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [hoveredService])

  // Typewriter animation variants
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.4, staggerChildren: 0.05 },
    },
  }
  
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12 relative">
      
      {/* ── MASSIVE CLICK-TO-ENLARGE OVERLAY ── */}
      <AnimatePresence>
        {hoveredService && (
          <motion.div 
            key="overlay-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            onClick={() => setHoveredService(null)}
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            
            {/* Massive Card */}
            <motion.div 
              key={hoveredService.id} 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-[var(--color-obsidian)] p-10 md:p-16 rounded-[var(--radius-card-lg)] w-full max-w-[1100px] shadow-2xl flex flex-col items-center text-center overflow-hidden border border-[var(--color-silver)]"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            >
              {/* Close Button */}
              <button 
                onClick={() => setHoveredService(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors z-30 backdrop-blur-md border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Background for Massive Card — only mounted when modal opens */}
              {videoMap[hoveredService.icon] && videoMap[hoveredService.icon] !== 'CLOUDINARY_URL_HERE' && (
                <>
                  <video 
                    autoPlay loop muted playsInline preload="none"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-screen"
                  >
                    <source src={videoMap[hoveredService.icon]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)] via-[var(--color-obsidian)]/70 to-transparent z-10" />
                </>
              )}
              
              <div className="relative z-20 w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md">
                 <div className="text-white scale-150">
                   {iconMap[hoveredService.icon]}
                 </div>
              </div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="display text-white mb-10 text-4xl md:text-5xl relative z-20 max-w-[800px]"
              >
                {hoveredService.title}
              </motion.h2>

              <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-left w-full mt-4 bg-white/5 p-8 rounded-[var(--radius-card)] border border-white/10 backdrop-blur-sm">
                 <div>
                   <h4 className="text-[var(--color-lilac-bloom)] font-switzer font-medium mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[var(--color-lilac-bloom)]" />
                     Service Overview
                   </h4>
                   <motion.p 
                     variants={sentenceVariants}
                     initial="hidden"
                     animate="visible"
                     className="body-text text-xl md:text-2xl text-gray-300 leading-relaxed"
                   >
                     {hoveredService.description?.split(' ').map((word, index) => (
                       <motion.span key={`${word}-${index}`} variants={wordVariants} className="inline-block mr-2">
                         {word}
                       </motion.span>
                     ))}
                   </motion.p>
                 </div>
                 
                 <div>
                   <h4 className="text-[var(--color-lilac-bloom)] font-switzer font-medium mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[var(--color-lilac-bloom)]" />
                     Key Capabilities
                   </h4>
                   <ul className="flex flex-col gap-4">
                     {[
                       'End-to-end turnkey execution',
                       'Adherence to global safety standards',
                       'Experienced workforce and engineers',
                       'On-time project delivery',
                       'Advanced equipment & machinery'
                     ].map((highlight, idx) => (
                       <motion.li 
                         key={idx}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.4 + (idx * 0.1), duration: 0.4 }}
                         className="flex items-start gap-3 text-gray-300 text-lg md:text-xl"
                       >
                         <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0" />
                         <span className="body-text">{highlight}</span>
                       </motion.li>
                     ))}
                   </ul>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[800px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="lilac" className="mb-8">Our Expertise</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Comprehensive Industrial Solutions
          </h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p className="body-text text-[var(--color-graphite)] text-lg">
            From foundation to final commissioning, MMTPL delivers technical excellence across all major engineering disciplines.
          </p>
        </FadeUp>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <Card 
                className="h-full flex flex-col group hover:border-[var(--color-obsidian)] relative overflow-hidden bg-[var(--color-paper)] cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-1" 
                id={service.slug}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setHoveredService(service)}
              >
                
                {/* Custom Hover Animation Overlay — video only loads on first hover */}
                <ServiceBackgroundEffect iconName={service.icon} isHovered={hoveredCard === service.id} />
                
                {/* Expand Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/40 p-2.5 rounded-full backdrop-blur-md border border-white/20">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                
                {/* Foreground Content */}
                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  <div className="flex items-center justify-between mb-6 pr-14">
                    <div className="p-4 rounded-[var(--radius-control)] bg-[var(--color-bone)] border border-[var(--color-silver)] w-max shadow-sm group-hover:bg-white/10 group-hover:border-white/20 transition-colors duration-500">
                      <div className="group-hover:text-white transition-colors duration-500">
                        {iconMap[service.icon]}
                      </div>
                    </div>
                    {service.category && (
                      <TagPill variant={service.category === 'Core' ? 'paper' : service.category === 'Long-term' ? 'lilac' : 'bone'} className="text-xs group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500">
                        {service.category}
                      </TagPill>
                    )}
                  </div>
                  <h3 className="subheading text-[var(--color-obsidian)] mb-4 group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="body-text text-[var(--color-slate)] flex-grow text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

    </div>
  )
}
