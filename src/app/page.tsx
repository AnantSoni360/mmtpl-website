'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { ArrowRight, Hammer, Building2, Zap, Briefcase, Wrench, Factory, ShieldCheck, TrendingUp, Users, PenTool, Warehouse, Waves, Flame, Thermometer, Layers, MapPin, ChevronRight, Landmark, FlaskConical, Mountain } from 'lucide-react'
import React from 'react'

const iconProps = { className: "w-7 h-7 text-[#3b82f6]", strokeWidth: 1.5 }

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

const stats = [
  { label: 'Total Workforce', value: '2,500+', suffix: '' },
  { label: 'Gross Contracts India', value: '₹348', suffix: 'Cr' },
  { label: 'Overseas Projects', value: '11', suffix: '+' },
  { label: 'Years in Operation', value: '20', suffix: '+' },
]

export default function Home() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="flex flex-col -mt-24">
      
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20">
          <Image 
            src="/hero-image.webp" 
            alt="MMTPL Industrial Infrastructure" 
            fill 
            priority
            quality={85}
            className="object-cover scale-105"
          />
        </div>
        {/* Multi-layer gradient overlays for depth */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Animated accent lines */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-[1px] h-64 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent" />
          <div className="absolute top-1/3 right-1/4 w-[1px] h-48 bg-gradient-to-b from-transparent via-blue-300/20 to-transparent" />
        </div>

        <div className="container mx-auto px-6 max-w-[var(--page-max-width)] z-10 pt-32 pb-24">
          <div className="max-w-[780px]">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-[0.2em] border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Concept to Commissioning
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-white mb-6 leading-[1.1]"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400 }}
            >
              Building Industrial<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-white">
                Infrastructure
              </span>{' '}
              for Tomorrow
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-[580px]"
            >
              MMTPL delivers end-to-end engineering, construction, and project execution services — driving operational excellence through quality, safety, and innovation.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/projects">
                <button className="group flex items-center gap-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] text-base">
                  Explore Our Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 text-base">
                  Request a Consultation
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Floating stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-20"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">
                <span className="text-2xl font-bold text-white">{s.value}<span className="text-blue-300">{s.suffix}</span></span>
                <span className="text-xs text-gray-400 uppercase tracking-wider leading-tight max-w-[80px]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade — hero image fades to dark for seamless transition to award ticker */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020917] to-transparent pointer-events-none" />
      </section>

      {/* ── AWARD TICKER ── */}
      <div className="relative w-full overflow-hidden bg-[#020917] border-y border-blue-500/20">
        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="flex items-stretch">
          {/* Left Badge — fixed anchor */}
          <div className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] border-r border-blue-400/30 shadow-[4px_0_20px_rgba(59,130,246,0.4)] z-10">
            <span className="text-2xl leading-none" aria-hidden>🏆</span>
            <div className="flex flex-col">
              <span className="text-white text-[9px] font-bold uppercase tracking-[0.18em] leading-none opacity-80">Major Award</span>
              <span className="text-white text-xs font-semibold tracking-wide leading-tight mt-0.5">SABIC Contract</span>
            </div>
          </div>

          {/* Scrolling text */}
          <div className="flex-1 overflow-hidden relative">
            {/* Fade masks at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020917] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020917] to-transparent z-10 pointer-events-none" />

            <div className="flex items-center h-full py-3.5 animate-marquee whitespace-nowrap">
              {[
                { icon: '🇸🇦', text: 'Awarded 5-Year General Service Contract by SABIC, Saudi Arabia' },
                { icon: '💰', text: 'Contract value: USD 15 Million per year — one of the largest overseas awards in MMTPL history' },
                { icon: '🌍', text: 'Serving SABIC at Jubail Industrial City, Kingdom of Saudi Arabia' },
                { icon: '⚡', text: 'Scope: Complete industrial plant operations & maintenance services' },
              ].concat([
                { icon: '🇸🇦', text: 'Awarded 5-Year General Service Contract by SABIC, Saudi Arabia' },
                { icon: '💰', text: 'Contract value: USD 15 Million per year — one of the largest overseas awards in MMTPL history' },
                { icon: '🌍', text: 'Serving SABIC at Jubail Industrial City, Kingdom of Saudi Arabia' },
                { icon: '⚡', text: 'Scope: Complete industrial plant operations & maintenance services' },
              ]).map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2.5 mx-10">
                  <span className="text-base leading-none">{item.icon}</span>
                  <span className="text-sm font-switzer font-medium text-blue-100/90 tracking-wide">{item.text}</span>
                  <span className="mx-6 text-blue-500/50 text-lg leading-none">◆</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Badge */}
          <div className="flex-shrink-0 flex items-center px-5 bg-gradient-to-l from-[#0a1128] to-transparent border-l border-blue-500/20">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/70 rotate-90 origin-center whitespace-nowrap">Live</span>
          </div>
        </div>
      </div>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-[var(--section-gap)] container mx-auto px-6 max-w-[var(--page-max-width)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Image side */}
          <FadeUp className="relative">
            <div className="relative h-[560px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/about-home.webp" 
                alt="MMTPL Engineers on Site" 
                fill 
                loading="lazy"
                className="object-cover"
              />
              {/* Overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1128]/60 to-transparent" />
            </div>
            {/* Floating card overlay */}
            <div className="absolute -bottom-6 -right-6 bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-2xl p-6 shadow-xl flex flex-col gap-1">
              <span className="text-4xl font-bold text-[var(--color-obsidian)]">20<span className="text-[#3b82f6]">+</span></span>
              <span className="text-sm text-[var(--color-slate)] font-medium uppercase tracking-wider">Years of Excellence</span>
            </div>
          </FadeUp>

          {/* Text side */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <TagPill variant="bone">Who We Are</TagPill>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="font-editorial text-[var(--color-obsidian)] leading-[1.15]" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Pioneering Industrial Growth Through{' '}
                <span className="text-[#3b82f6]">Engineering Mastery.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-[var(--color-graphite)] text-lg leading-relaxed">
                MMTPL (Man Machine Technocrats Pvt. Ltd.) is a trusted engineering and construction partner specializing in industrial installation, pipeline construction, structural works, and project execution across India and overseas.
              </p>
            </FadeUp>

            {/* Highlight list */}
            <FadeUp delay={0.4}>
              <div className="flex flex-col gap-4">
                {[
                  'Founded 2004, headquartered in India',
                  'Operations in Oman, UAE, Saudi Arabia, Abu Dhabi',
                  'Workforce of 2,500+ skilled professionals',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center flex-shrink-0">
                      <ChevronRight size={12} className="text-[#3b82f6]" />
                    </div>
                    <span className="text-[var(--color-graphite)] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.5}>
              <Link href="/about">
                <button className="group flex items-center gap-2 text-[var(--color-obsidian)] font-semibold hover:text-[#3b82f6] transition-colors">
                  Learn more about our legacy
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── WHY MMTPL (COMPETENCIES) ── */}
      <section className="py-[var(--section-gap)] bg-[var(--color-bone)]">
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)]">
          <div className="text-center mb-20">
            <FadeUp>
              <TagPill variant="paper" className="mb-6">The MMTPL Advantage</TagPill>
              <h2 className="font-editorial text-[var(--color-obsidian)] max-w-[600px] mx-auto" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Built on a foundation of reliability and precision.
              </h2>
            </FadeUp>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
                title: 'Uncompromising Safety',
                desc: 'Safety is at the core of every project. We follow strict protocols, conduct regular training, and ensure compliance with all industry standards to keep every site productive and protected.',
                num: '01'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
                title: 'Record-Breaking Execution',
                desc: 'We have a proven track record of completing complex projects ahead of schedule — from 125m chimney installations in 26 days to 8-strand billet casters in 4.5 months.',
                num: '02'
              },
              {
                icon: <Users className="w-8 h-8 text-[#3b82f6]" strokeWidth={1.5} />,
                title: 'Expert Workforce',
                desc: 'Our 2,500+ professionals — engineers, supervisors, and technicians — bring deep expertise in every discipline of industrial construction and commissioning.',
                num: '03'
              }
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="group bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-2xl p-8 h-full flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] hover:border-[#3b82f6]/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-[#3b82f6]/8 border border-[#3b82f6]/15">
                      {item.icon}
                    </div>
                    <span className="text-5xl font-bold text-[var(--color-silver)] group-hover:text-[#3b82f6]/20 transition-colors font-editorial">{item.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-obsidian)] mb-3">{item.title}</h3>
                  <p className="text-[var(--color-slate)] leading-relaxed flex-grow">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-[var(--section-gap)] container mx-auto px-6 max-w-[var(--page-max-width)]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <FadeUp>
            <TagPill variant="bone" className="mb-6">Our Capabilities</TagPill>
            <h2 className="font-editorial text-[var(--color-obsidian)]" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              End-to-end industrial<br />engineering solutions.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link href="/services">
              <button className="group flex items-center gap-2 text-[var(--color-graphite)] hover:text-[#3b82f6] font-semibold text-sm uppercase tracking-wider transition-colors border-b border-[var(--color-silver)] hover:border-[#3b82f6] pb-1">
                View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </FadeUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <StaggerItem key={service.id}>
              <Link href={`/services#${service.slug}`}>
                <div className="group bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-2xl p-7 h-full flex flex-col hover:border-[#3b82f6]/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-5 p-3.5 rounded-xl bg-[#3b82f6]/8 border border-[#3b82f6]/15 w-max group-hover:bg-[#3b82f6]/15 transition-colors">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-obsidian)] mb-3 group-hover:text-[#3b82f6] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-slate)] text-sm leading-relaxed mb-5 flex-grow line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#3b82f6] uppercase tracking-wider mt-auto">
                    Read more <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="py-[var(--section-gap)] bg-[#060d1a] relative overflow-hidden">
        {/* Atmospheric orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[700px] h-[400px] bg-blue-600/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-purple-600/6 rounded-full blur-[120px]" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
          {/* Header — split layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <FadeUp>
              <span className="inline-flex items-center gap-2 text-blue-400 text-[11px] font-bold uppercase tracking-[0.22em] border border-blue-400/25 bg-blue-500/8 px-4 py-2 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Industries We Serve
              </span>
              <h2 className="font-editorial text-white leading-[1.08]" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
                Every major<br />industrial sector.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-gray-400 max-w-[360px] text-lg leading-relaxed">
                From steel melt shops to petrochemical plants — MMTPL brings deep specialist expertise across all core sectors.
              </p>
            </FadeUp>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" style={{ gridAutoRows: '180px' }}>

            {/* STEEL — hero card: 2 cols × 2 rows */}
            <FadeUp delay={0} className="col-span-2 row-span-2">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-blue-500/50 transition-all duration-700 cursor-default">
                {/* Hover fill */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/25 via-blue-900/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Decorative glow dot */}
                <div className="absolute top-8 right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Large watermark number */}
                <div className="absolute -bottom-6 -right-6 text-[160px] font-editorial font-bold text-white/[0.025] leading-none select-none group-hover:text-white/[0.05] transition-colors duration-700 pointer-events-none">01</div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-500">
                    <Layers className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
                  </div>
                  {/* Content */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400/60 mb-3 font-switzer">Primary Sector</div>
                    <div className="text-4xl md:text-5xl font-editorial font-bold text-white mb-3 leading-none">Steel</div>
                    <div className="text-gray-400 text-sm leading-relaxed max-w-[280px]">Blast furnaces, coke ovens, BOF shops, steel melt shops — our largest sector with 10+ major plants.</div>
                    <div className="mt-4 inline-flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                      <span className="w-4 h-px bg-blue-500" />
                      ₹180 Cr+ in contracts
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* CEMENT */}
            <FadeUp delay={0.1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-amber-500/50 transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-3 -right-3 text-[90px] font-editorial font-bold text-white/[0.025] leading-none select-none pointer-events-none">02</div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-500">
                    <Building2 className="w-6 h-6 text-amber-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xl font-editorial font-bold text-white leading-none">Cement</div>
                    <div className="text-xs text-amber-400/70 font-switzer font-medium mt-1.5">6 major clients</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* POWER */}
            <FadeUp delay={0.15}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-yellow-500/50 transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-3 -right-3 text-[90px] font-editorial font-bold text-white/[0.025] leading-none select-none pointer-events-none">03</div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.35)] transition-all duration-500">
                    <Zap className="w-6 h-6 text-yellow-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xl font-editorial font-bold text-white leading-none">Power</div>
                    <div className="text-xs text-yellow-400/70 font-switzer font-medium mt-1.5">E&I specialists</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* MINING */}
            <FadeUp delay={0.2}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-orange-500/50 transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-3 -right-3 text-[90px] font-editorial font-bold text-white/[0.025] leading-none select-none pointer-events-none">04</div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.35)] transition-all duration-500">
                    <Mountain className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xl font-editorial font-bold text-white leading-none">Mining</div>
                    <div className="text-xs text-orange-400/70 font-switzer font-medium mt-1.5">Pellet plant experts</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* CHEMICAL — 2 cols wide */}
            <FadeUp delay={0.25} className="col-span-2">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-emerald-500/50 transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/20 via-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-3 right-4 text-[90px] font-editorial font-bold text-white/[0.025] leading-none select-none pointer-events-none">05</div>
                <div className="relative z-10 p-6 h-full flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-500 flex-shrink-0">
                    <FlaskConical className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xl font-editorial font-bold text-white leading-none">Chemical & Petrochemical</div>
                    <div className="text-xs text-emerald-400/70 font-switzer font-medium mt-1.5">SABIC — USD 15M/yr contract · Jubail, Saudi Arabia</div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* INFRASTRUCTURE — full 4 cols */}
            <FadeUp delay={0.3} className="col-span-2 md:col-span-4">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] hover:border-purple-500/50 transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 via-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Decorative lines */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-px bg-white" style={{ height: `${30 + i * 14}px` }} />
                  ))}
                </div>
                <div className="absolute -bottom-3 right-12 text-[90px] font-editorial font-bold text-white/[0.025] leading-none select-none pointer-events-none">06</div>
                <div className="relative z-10 p-6 h-full flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all duration-500 flex-shrink-0">
                    <Landmark className="w-6 h-6 text-purple-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xl font-editorial font-bold text-white leading-none">Civil Infrastructure</div>
                    <div className="text-xs text-purple-400/70 font-switzer font-medium mt-1.5">Structural steel · Industrial buildings · Civil works · Plant foundations</div>
                  </div>
                  <div className="ml-auto flex items-center gap-6 pr-4 hidden md:flex">
                    {['Structural', 'Civil', 'Foundations', 'Industrial Sheds'].map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors font-switzer font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-[var(--section-gap)] bg-[var(--color-bone)]">
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <FadeUp>
              <TagPill variant="paper" className="mb-6">Featured Work</TagPill>
              <h2 className="font-editorial text-[var(--color-obsidian)]" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Delivering excellence<br />across industries.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link href="/projects">
                <button className="group flex items-center gap-2 text-[var(--color-graphite)] hover:text-[#3b82f6] font-semibold text-sm uppercase tracking-wider transition-colors border-b border-[var(--color-silver)] hover:border-[#3b82f6] pb-1">
                  View All Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </FadeUp>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <div className="group bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-400">
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-[var(--color-obsidian)] mb-2 group-hover:text-[#3b82f6] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[var(--color-slate)] text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-silver)] text-xs">
                      <div className="flex items-center gap-1.5 text-[var(--color-slate)]">
                        <MapPin size={13} />
                        <span>{project.location}</span>
                      </div>
                      <span className="font-semibold text-[var(--color-graphite)]">{project.client}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── EXPERTISE TICKER ── */}
      <div className="py-6 bg-[#0a1128] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {['Refractory Installation', 'Structural Steel Erection', 'Pipeline Construction', 'Mechanical Equipment Erection', 'E&I Works', 'Project Management', 'Operations & Maintenance', 'Coke Oven Construction', 'Pellet Plant Works', 'LCP Refractory Lining'].concat(['Refractory Installation', 'Structural Steel Erection', 'Pipeline Construction', 'Mechanical Equipment Erection', 'E&I Works', 'Project Management', 'Operations & Maintenance', 'Coke Oven Construction', 'Pellet Plant Works', 'LCP Refractory Lining']).map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white/60 text-sm font-medium uppercase tracking-widest mx-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <section className="py-[var(--section-gap)] container mx-auto px-6 max-w-[var(--page-max-width)]">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden bg-[#0a1128]">
            {/* Decorative gradient orbs */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
            {/* Fine grid pattern */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 py-20 px-8 md:px-16 text-center">
              <span className="inline-flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-[0.2em] border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Ready to Build?
              </span>
              <h2 className="font-editorial text-white mb-6 mx-auto" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: '700px' }}>
                Ready to Build Your Next Industrial Project?
              </h2>
              <p className="text-gray-400 mb-10 max-w-[560px] mx-auto text-lg leading-relaxed">
                Partner with MMTPL for reliable engineering, construction, and execution services tailored to your requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <button className="group flex items-center justify-center gap-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-10 py-5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] text-base">
                    Request a Consultation
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/projects">
                  <button className="flex items-center justify-center gap-3 bg-white/8 hover:bg-white/15 backdrop-blur-sm text-white font-semibold px-10 py-5 rounded-full border border-white/15 hover:border-white/30 transition-all duration-300 text-base">
                    Explore Our Projects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  )
}
