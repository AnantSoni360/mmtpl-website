'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { InteractiveLeadershipNetwork } from '@/components/sections/InteractiveLeadershipNetwork'
import { GrowthMountain } from '@/components/sections/GrowthMountain'
import { AchievementCommandCenter } from '@/components/sections/AchievementCommandCenter'
import { IndiaOperationsMap } from '@/components/sections/IndiaOperationsMap'
import { OverseasOperationsMap } from '@/components/sections/OverseasOperationsMap'

const TIMELINE_DATA = [
  { year: '2004', label: 'Coke Oven Project', text: 'First Refractory Installation Contract for Coke Oven Project at JSW Steel, India. Massive coke oven battery under construction, refractory workers installing fire bricks inside industrial chambers.', image: '/images/timeline/timeline_2004_1781691394409.png' },
  { year: '2005', label: 'Maintenance Contract', text: 'Industrial maintenance team performing refractory maintenance inside iron making units of a steel plant, engineers inspecting furnace lining, safety helmets, industrial shutdown environment.', image: '/images/timeline/timeline_2005_1781691407708.png' },
  { year: '2006', label: 'Non-Recovery Coke Ovens', text: 'Large non-recovery coke oven plant under construction, structural steel erection, mechanical installation activities, cranes lifting heavy equipment, industrial mega project.', image: '/images/timeline/timeline_2006_1781691419439.png' },
  { year: '2007–08', label: 'Recovery Coke Oven', text: 'Recovery Coke Oven Plant construction at a major steel facility, multiple coke oven batteries, workers, cranes, steel structures, large industrial complex.', image: '/images/timeline/timeline_2007_2008_1781691433154.png' },
  { year: '2009–11', label: 'Coke Oven Battery', text: 'Massive recovery coke oven battery project nearing completion, industrial infrastructure stretching across the horizon, engineering excellence, heavy construction equipment.', image: '/images/timeline/timeline_2009_2011_1781691446880.png' },
  { year: '2011', label: 'Tata Steel Project', text: 'Tata Steel coke oven project, large industrial steel plant, refractory installation works, engineers supervising construction, modern steel manufacturing facility.', image: '/images/timeline/timeline_2011_1781691466627.png' },
  { year: '2012', label: 'Iron Ore Pellet Plant', text: '0.6 MTPA Iron Ore Pellet Plant turnkey project, structural steel, piping networks, mechanical equipment, commissioning engineers, large pelletization plant.', image: '/images/timeline/timeline_2012_1781691479183.png' },
  { year: '2013', label: 'Kalinganagar Project', text: 'Kalinganagar steel plant coke oven project, heavy industrial construction site, cranes, structural steel erection, refractory works.', image: '/images/timeline/timeline_2013_1781691492960.png' },
  { year: '2014', label: 'Non-Recovery Project', text: 'Non-recovery coke oven plant for steel production, industrial battery structures, refractory construction activities, large scale engineering project.', image: '/images/timeline/timeline_2014_1781691507100.png' },
  { year: '2015', label: 'Gerdau', text: 'Advanced coke oven facility under construction, workers installing refractory systems, heavy machinery, industrial engineering excellence.', image: '/images/timeline/timeline_2015_gerdau_1781691520067.png' },
  { year: '2015', label: 'Blast Furnace Stove', text: 'Blast furnace hot stove installation, glowing industrial furnace structures, refractory brickwork, engineers inspecting equipment.', image: '/images/timeline/timeline_2015_bf_stove_1781691542769.png' },
  { year: '2015', label: 'Blast Furnace #1', text: 'Large blast furnace complex in a steel plant, towering industrial structure, mechanical installation activities, workers and cranes.', image: '/images/timeline/timeline_2015_bf_1_1781691557360.png' },
  { year: '2016', label: 'Modern Blast Furnace', text: 'Modern blast furnace construction project, steel manufacturing infrastructure, industrial engineering workforce, heavy equipment installation.', image: '/images/timeline/timeline_2016_1781691570091.png' },
  { year: '2017', label: 'Jindal Shadeed & Moon Iron', text: 'Large steel melt shop construction in Oman, structural steel erection, piping, electrical works, engineers coordinating mega project activities.', image: '/images/timeline/timeline_2017_jindal_1781691582651.png' },
  { year: '2017', label: 'Manufacturing Expansion', text: 'Steel billet manufacturing facility, induction furnace operation, molten steel pouring, industrial production line, modern manufacturing plant.', image: '/images/timeline/timeline_2017_mfg_1781691597419.png' },
  { year: '2018', label: 'Billet Caster', text: '6 Strand Billet Caster commissioning project, molten steel processing equipment, engineers celebrating successful startup, modern steel manufacturing technology.', image: '/images/timeline/timeline_2018_1781691618921.png' },
  { year: '2019', label: 'SABIC', text: 'Large petrochemical and industrial complex in Saudi Arabia, engineers and maintenance teams working on major industrial infrastructure, world-class industrial services.', image: '/images/timeline/timeline_2019_sabic_1781691633017.png' },
  { year: '2019', label: 'Carmeuse Majan', text: '400 TPD Lime Calcination Plant in Oman, vertical lime kiln, industrial plant construction, mechanical and refractory installation activities.', image: '/images/timeline/timeline_2004_1781691394409.png' },
  { year: '2021', label: 'Steel Melt Shop', text: 'Steel Melt Shop fabrication and erection project, structural steel framework, industrial construction workforce, heavy lifting cranes, mega industrial project.', image: '/images/timeline/timeline_2005_1781691407708.png' },
  { year: '2022', label: 'Coke Oven #5', text: 'Coke Oven #5 construction project, refractory installation and mechanical works, large industrial steel facility, workers executing complex engineering tasks.', image: '/images/timeline/timeline_2006_1781691419439.png' },
  { year: '2023', label: 'Modern Steel Melt Shop', text: 'Modern steel melt shop and lime calcination plant construction, mechanical installation works, industrial engineering team, advanced manufacturing facility.', image: '/images/timeline/timeline_2007_2008_1781691433154.png' },
  { year: '2024', label: 'Integrated Expansion', text: 'Integrated steel plant expansion project, coke oven, steel melt shop, refractory and mechanical works in progress, large industrial construction site.', image: '/images/timeline/timeline_2009_2011_1781691446880.png' },
  { year: '2025', label: 'Lloyds Metals Equipment', text: 'Large coke oven and CDQ equipment installation project, heavy mechanical equipment erection, cranes, industrial engineering workforce.', image: '/images/timeline/timeline_2011_1781691466627.png' },
  { year: '2025', label: 'Lloyds Metals Refractory', text: 'CDQ refractory application works, workers installing refractory lining inside industrial structures, advanced thermal engineering project.', image: '/images/timeline/timeline_2012_1781691479183.png' }
]


const INITIAL_VISIBLE = 6
const LOAD_MORE_COUNT = 6

export default function About() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const visibleItems = TIMELINE_DATA.slice(0, visibleCount)
  const hasMore = visibleCount < TIMELINE_DATA.length

  return (
    <div className="flex flex-col gap-[var(--section-gap)] pb-[var(--section-gap)] pt-12">
      
      {/* ── HERO ── */}
      <section className="container mx-auto px-6 max-w-[900px] text-center">
        <FadeUp delay={0.1}>
          <TagPill variant="bone" className="mb-8">About MMTPL</TagPill>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="display-lg text-[var(--color-obsidian)] mb-8">
            Engineered for Excellence. Built to Last.
          </h1>
        </FadeUp>
        <FadeUp delay={0.3} className="mt-12 text-left w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column - The Journey & Impact (Pars 1 & 3) */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              {/* Par 1 */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#3b82f6] mb-5 font-switzer">Our Origins</h3>
                <p className="text-[1.35rem] leading-relaxed text-[var(--color-obsidian)] font-light">
                  <span className="font-editorial font-medium">Founded in 2004, MAN MACHINE TECHNOCRATS PRIVATE LIMITED (MMTPL)</span> commenced its journey as a specialized Refractory Installation Contracting Company, serving the evolving needs of India's industrial sector.
                </p>
                <p className="text-lg text-[var(--color-graphite)] mt-5 leading-relaxed font-switzer">
                  Under the guidance of a visionary leadership team and a well-defined strategic growth plan, the company progressively expanded its capabilities, diversified its service offerings, and established a strong presence across major core industries.
                </p>
              </div>

              <div className="w-full h-px bg-[var(--color-silver)]" />

              {/* Par 3 */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#3b82f6] mb-5 font-switzer">Our Commitment</h3>
                <p className="text-lg text-[var(--color-graphite)] leading-relaxed font-switzer">
                  Driven by a commitment to <strong className="text-[var(--color-obsidian)] font-medium">quality, safety, innovation, and operational excellence</strong>, MMTPL consistently delivers projects that meet the highest industry standards while ensuring timely execution and customer satisfaction. Today, the company stands as a reliable partner to leading industrial organizations, contributing to the development of robust and sustainable industrial infrastructure across India.
                </p>
              </div>
            </div>

            {/* Right Column - The Transformation (Par 2) */}
            <div className="lg:col-span-5">
              <div className="bg-[var(--color-paper)] border border-[var(--color-silver)] p-8 md:p-10 h-full relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
                {/* Accent line top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3b82f6] to-blue-300" />
                
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-slate)] mb-6 font-switzer">The Transformation</h3>
                
                <p className="font-editorial text-2xl text-[var(--color-obsidian)] leading-tight mb-6">
                  Over the past two decades, MMTPL has transformed into a trusted turnkey engineering and contracting organization, delivering integrated <span className="text-[#3b82f6] italic">"Concept to Commissioning"</span> solutions for complex industrial projects.
                </p>
                
                <p className="text-base text-[var(--color-slate)] leading-relaxed font-switzer">
                  The company's multidisciplinary expertise encompasses engineering, construction, mechanical erection, piping systems, refractory installation, electrical and instrumentation works, commissioning, and comprehensive project management services.
                </p>
              </div>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── AT A GLANCE (STATS) ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)]">
        <div className="bg-[var(--color-bone)] rounded-[var(--radius-card)] p-10 border border-[var(--color-silver)]">
          <div className="text-center mb-10">
            <h2 className="heading-sm text-[var(--color-obsidian)]">MMTPL At a Glance</h2>
          </div>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            {[
              { value: '20+', label: 'Years in operation' },
              { value: '₹348 Cr', label: 'Gross contracts India' },
              { value: 'USD 20M', label: 'Peak India turnover' },
              { value: 'USD 10M', label: 'Peak overseas turnover' },
              { value: '2,500+', label: 'Total workforce' },
              { value: '18', label: 'India contracts listed' },
              { value: '11+', label: 'Overseas projects' },
              { value: '5', label: 'Countries operated in' },
            ].map((stat, i) => (
              <StaggerItem key={i} className="flex flex-col items-center text-center px-2">
                <span className="display text-[var(--color-obsidian)] mb-2">{stat.value}</span>
                <span className="caption text-[var(--color-slate)] uppercase tracking-wider">{stat.label}</span>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── ALTERNATING TIMELINE ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] relative z-10">
        <div className="text-center mb-20 relative z-10">
          <FadeUp>
            <TagPill variant="bone" className="mb-6">Our History</TagPill>
            <h2 className="display text-[var(--color-obsidian)]">Company Growth Journey</h2>
          </FadeUp>
        </div>
        
        <div className="flex flex-col gap-24 relative pb-24">
           {/* Vertical Center Line */}
           <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-silver)] via-[var(--color-silver)] to-transparent -translate-x-1/2" />

           {visibleItems.map((item, i) => {
             const isEven = i % 2 === 0;
             return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 className={`flex flex-col lg:flex-row items-center gap-10 md:gap-16 ${isEven ? '' : 'lg:flex-row-reverse'} relative`}
               >
                 {/* Timeline Node Dot */}
                 <div className="hidden lg:block absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-[var(--color-obsidian)] border-4 border-[var(--color-paper)] -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 transition-transform duration-500 hover:scale-150" />

                 {/* Image Side */}
                 <div className="w-full lg:w-1/2 flex justify-center group relative z-10">
                   <motion.div 
                     initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full max-w-[540px] overflow-hidden rounded-[var(--radius-card-lg)] aspect-[16/9] relative shadow-[var(--shadow-card)] border border-[var(--color-silver)]"
                   >
                     {/* Parallax / Subtle Zoom on Scroll Effect */}
                     <motion.div 
                       initial={{ scale: 1.25 }}
                       whileInView={{ scale: 1 }}
                       viewport={{ once: false, margin: "-10%" }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="absolute inset-0 w-full h-full"
                     >
                       <Image 
                         src={item.image} 
                         alt={item.year} 
                         fill 
                         sizes="(max-width: 1024px) 100vw, 50vw"
                         className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                       />
                       {/* Subtle dark overlay that fades on hover */}
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                     </motion.div>
                   </motion.div>
                 </div>

                 {/* Text Side */}
                 <div className={`w-full lg:w-1/2 flex flex-col relative z-10 ${isEven ? 'lg:pl-8 text-left' : 'lg:pr-8 lg:text-right'}`}>
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                   >
                     {/* Background Faded Year Watermark */}
                     <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-0' : 'left-0'} text-9xl font-editorial font-bold text-[var(--color-obsidian)] opacity-[0.02] select-none pointer-events-none -z-10`}>
                       {item.year}
                     </div>

                     <span className="display text-[var(--color-obsidian)] text-5xl md:text-6xl mb-2">{item.year}</span>
                     <span className="text-[#3b82f6] font-bold text-sm tracking-widest uppercase mb-4 block">{item.label}</span>
                     <p className="body-text text-[var(--color-graphite)] text-lg leading-relaxed max-w-lg">{item.text}</p>
                   </motion.div>
                 </div>
               </motion.div>
             )
           })}
        </div>

        {/* Load More / Show Less */}
        <div className="flex flex-col items-center gap-4 pt-4 pb-12">
          <p className="text-sm text-[var(--color-slate)] font-switzer">
            Showing {Math.min(visibleCount, TIMELINE_DATA.length)} of {TIMELINE_DATA.length} milestones
          </p>
          <div className="flex gap-4">
            {hasMore && (
              <motion.button
                onClick={() => setVisibleCount(v => Math.min(v + LOAD_MORE_COUNT, TIMELINE_DATA.length))}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-obsidian)] text-[var(--color-paper)] font-switzer font-semibold text-sm tracking-wide hover:bg-[var(--color-graphite)] transition-colors duration-300 shadow-md"
              >
                <span>Load More</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </motion.button>
            )}
            {visibleCount > INITIAL_VISIBLE && (
              <motion.button
                onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[var(--color-silver)] bg-[var(--color-paper)] text-[var(--color-graphite)] font-switzer font-semibold text-sm tracking-wide hover:border-[var(--color-graphite)] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <span>Show Less</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* ── FINANCIAL GROWTH MOUNTAIN ── */}
      <GrowthMountain />

      {/* ── VISION & MISSION ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeUp delay={0.1}>
            <div className="bg-[var(--color-paper)] p-10 rounded-[var(--radius-card)] border border-[var(--color-silver)] h-full hover:border-[var(--color-graphite)] transition-colors">
              <h2 className="display text-[var(--color-obsidian)] mb-6">Vision</h2>
              <p className="body-text text-[var(--color-graphite)] text-lg leading-relaxed">
                To be a globally competitive leader in industrial installation and engineering services by embracing innovation, advanced technologies, and operational excellence. We strive to create sustainable value for our stakeholders while upholding the highest standards of integrity, business ethics, and professionalism, contributing to the growth of industry and enhancing the quality of life in the communities we serve.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="bg-[var(--color-obsidian)] p-10 rounded-[var(--radius-card)] h-full relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[var(--color-sky-veil)] opacity-20 rounded-full blur-2xl" />
              <h2 className="display text-[var(--color-paper)] mb-6">Mission</h2>
              <p className="body-text text-[var(--color-paper)] opacity-80 text-lg leading-relaxed relative z-10">
                To deliver exceptional engineering, construction, and industrial installation services across our core sectors by maintaining the highest standards of quality, safety, professionalism, and timely execution. We are committed to exceeding customer expectations, fostering innovation, and creating long-term value for our clients, employees, and stakeholders.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ── */}
      <section className="w-full bg-[var(--color-bone)] border-y border-[var(--color-silver)] py-16 overflow-hidden">
        <div className="container mx-auto px-6 max-w-[var(--page-max-width)]">
          <div className="text-center mb-16 relative z-10 flex flex-col items-center">
            <FadeUp>
              <TagPill variant="bone" className="mb-6">Our People</TagPill>
              <h2 className="display text-[var(--color-obsidian)] mb-8">Leadership Network</h2>
              
              <div className="max-w-[800px] mx-auto flex flex-col gap-6">
                <h3 className="font-editorial text-2xl md:text-[28px] text-[#3b82f6] leading-snug font-medium">
                  The Strategic Minds Driving MMTPL's Growth and Industrial Excellence
                </h3>
                
                <p className="text-lg md:text-xl text-[var(--color-graphite)] leading-relaxed font-light">
                  At MMTPL, our leadership team brings together decades of industry experience, technical expertise, and strategic vision. Their collective knowledge and commitment to excellence drive the company's growth, operational efficiency, and successful execution of complex industrial projects across diverse sectors.
                </p>

                <div className="flex items-center justify-center gap-4 py-3 opacity-60">
                   <div className="w-16 h-px bg-[var(--color-silver)]" />
                   <div className="w-2 h-2 rounded-full border border-[#3b82f6] bg-transparent" />
                   <div className="w-16 h-px bg-[var(--color-silver)]" />
                </div>
                
                <p className="text-base md:text-lg text-[var(--color-slate)] leading-relaxed">
                  Focused on <strong className="text-[var(--color-obsidian)] font-medium tracking-wide">innovation, customer satisfaction, safety, and sustainable development</strong>, our leaders foster a culture of accountability, collaboration, and continuous improvement. Through strong governance and forward-thinking decision-making, they guide MMTPL in delivering world-class engineering and construction solutions while creating long-term value for clients, employees, and stakeholders.
                </p>
              </div>
            </FadeUp>
          </div>

          <InteractiveLeadershipNetwork />
        </div>
      </section>

      {/* ── OUR OPERATIONS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] pb-12">
        <div className="text-center mb-12">
          <FadeUp>
            <TagPill variant="bone" className="mb-6">Global Footprint</TagPill>
            <h2 className="display text-[var(--color-obsidian)]">Company Operations</h2>
          </FadeUp>
        </div>

        <div className="flex flex-col gap-12">
          {/* India Operations */}
          <FadeUp delay={0.1}>
            <IndiaOperationsMap />
          </FadeUp>

          {/* Overseas Operations */}
          <FadeUp delay={0.2}>
            <OverseasOperationsMap />
          </FadeUp>
        </div>
      </section>

      {/* ── TODAY (CLOSING) ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] pb-12">
        <FadeUp>
          <div className="bg-gradient-to-br from-[var(--color-bone)] to-[var(--color-paper)] rounded-[var(--radius-card)] p-10 md:p-16 border border-[var(--color-silver)] text-center">
            <h2 className="heading-sm text-[var(--color-obsidian)] mb-6">MMTPL Today</h2>
            <p className="body-text text-[var(--color-graphite)] text-lg leading-relaxed max-w-[800px] mx-auto">
              From a refractory installation contractor to a leading turnkey industrial solutions provider, MMTPL continues to deliver engineering excellence across steel, mining, energy, infrastructure, and manufacturing sectors. With decades of experience, a skilled workforce, and a commitment to safety, quality, and innovation, MMTPL remains dedicated to building industrial infrastructure that drives sustainable growth.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── ACHIEVEMENTS & AWARDS ── */}
      <AchievementCommandCenter />

    </div>
  )
}
