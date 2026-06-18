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
import { ArrowRight, Hammer, Building2, Zap, Briefcase, Wrench, Factory, ShieldCheck, TrendingUp, Users, PenTool, Warehouse, Waves, Flame, Thermometer, Layers, MapPin, ChevronRight } from 'lucide-react'
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

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-main)] to-transparent" />
      </section>

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
          {services.slice(0, 3).map((service) => (
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
