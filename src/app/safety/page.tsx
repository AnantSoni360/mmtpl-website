'use client'

import { motion } from 'framer-motion'
import { TagPill } from '@/components/ui/TagPill'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { Card } from '@/components/ui/Card'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { 
  ShieldCheck, HardHat, FileCheck2, Activity, 
  Users, Stethoscope, AlertTriangle, GraduationCap, 
  SearchCheck, CheckCircle2, Factory
} from 'lucide-react'

// Static Metrics Data
const safetyMetrics = [
  { id: 1, title: 'Total Man Hours', value: '1,705,785', icon: Factory, color: 'text-blue-500', bg: 'bg-blue-500/10 dark:bg-blue-500/20' },
  { id: 2, title: 'People Worked (Current Month)', value: '272', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10 dark:bg-indigo-500/20' },
  { id: 3, title: 'First Aid Cases', value: 'NIL', icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', isSuccess: true },
  { id: 4, title: 'Lost Time Injury (LTI)', value: 'NIL', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', isSuccess: true },
  { id: 5, title: 'Near Misses Recorded', value: '9', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10 dark:bg-amber-500/20' },
  { id: 6, title: 'Employees HSE Trained', value: '323', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10 dark:bg-purple-500/20' },
  { id: 7, title: 'Total Training Hours', value: '1,436', icon: GraduationCap, color: 'text-pink-500', bg: 'bg-pink-500/10 dark:bg-pink-500/20' },
  { id: 8, title: 'HSE Audits Performed', value: '36', icon: SearchCheck, color: 'text-cyan-500', bg: 'bg-cyan-500/10 dark:bg-cyan-500/20' },
  { id: 9, title: 'Safety Meetings', value: '24', icon: Users, color: 'text-teal-500', bg: 'bg-teal-500/10 dark:bg-teal-500/20' },
  { id: 10, title: 'LTI Frequency (LTIF)', value: 'NIL', icon: Factory, color: 'text-emerald-500', bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', isSuccess: true },
]

export default function Safety() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-[var(--color-bg-main)]">
      
      {/* ── CINEMATIC HERO ── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
           <motion.div 
             animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0"
             style={{
               backgroundImage: `linear-gradient(var(--color-graphite) 1px, transparent 1px), linear-gradient(90deg, var(--color-graphite) 1px, transparent 1px)`,
               backgroundSize: '60px 60px'
             }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-main)] via-transparent to-[var(--color-bg-main)]" />
        </div>
        
        {/* Deep Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lilac-bloom opacity-10 dark:opacity-20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-veil opacity-10 dark:opacity-20 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-[900px]">
          <FadeUp delay={0.1}>
            <TagPill variant="lilac" className="mb-8 mx-auto backdrop-blur-md border border-lilac-bloom/30">
              <ShieldCheck className="w-4 h-4 mr-2 inline-block" /> 
              Safety First Culture
            </TagPill>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="display-lg text-obsidian mb-8 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-veil to-purple-500">Zero Harm</span> Policy
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="body-text text-graphite text-xl md:text-2xl leading-relaxed">
              At MMTPL, we believe that every accident is preventable. Safety is not just a priority; it is a core value integrated into the DNA of every project we execute.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── INTERACTIVE TOP STATS ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] -mt-16 relative z-20 mb-[var(--section-gap)]">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <StaggerItem>
            <Card className="relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 bg-white/60 dark:bg-[#0a1128]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 h-full text-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ShieldCheck className="w-12 h-12 mx-auto text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="display text-obsidian mb-2 text-4xl">
                <AnimatedCounter value={1.7} decimals={1} suffix="M+" />
              </div>
              <div className="caption text-slate uppercase tracking-wider font-semibold">Safe Man Hours</div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 bg-white/60 dark:bg-[#0a1128]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 h-full text-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <HardHat className="w-12 h-12 mx-auto text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="display text-obsidian mb-2 text-4xl">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="caption text-slate uppercase tracking-wider font-semibold">PPE Compliance</div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 bg-white/60 dark:bg-[#0a1128]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 h-full text-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Activity className="w-12 h-12 mx-auto text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="display text-obsidian mb-2 text-4xl">
                <AnimatedCounter value={0} />
              </div>
              <div className="caption text-slate uppercase tracking-wider font-semibold">Fatalities</div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card className="relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 bg-white/60 dark:bg-[#0a1128]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 h-full text-center p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-obsidian/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FileCheck2 className="w-12 h-12 mx-auto text-obsidian mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <div className="display text-obsidian mb-2 text-4xl">ISO</div>
              <div className="caption text-slate uppercase tracking-wider font-semibold">45001:2018 Certified</div>
            </Card>
          </StaggerItem>

        </StaggerChildren>
      </section>

      {/* ── DASHBOARD METRICS GRID ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] mb-[var(--section-gap)]">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h2 className="display text-obsidian text-3xl md:text-4xl">Safety Statistics Dashboard</h2>
              <p className="body-text text-slate mt-2 text-lg">Current & Cumulative Live Record Tracking</p>
            </div>
            <div className="mt-6 md:mt-0 flex items-center gap-3 bg-bone dark:bg-[#162033] px-5 py-2.5 rounded-full border border-silver shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-xs font-bold text-obsidian uppercase tracking-widest">Live Report</span>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyMetrics.map((metric, i) => (
            <FadeUp key={metric.id} delay={i * 0.05} className="h-full">
              <Card className="p-6 h-full flex flex-col justify-between group hover:border-obsidian dark:hover:border-white/30 transition-all duration-300 bg-paper hover:shadow-lg">
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-3.5 rounded-xl ${metric.bg} border border-silver dark:border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} strokeWidth={2} />
                  </div>
                  <div className="text-mist text-xs font-mono font-bold">#{metric.id.toString().padStart(2, '0')}</div>
                </div>
                
                <div>
                  <h3 className="body-text text-slate text-sm uppercase tracking-wider mb-2 font-medium">{metric.title}</h3>
                  <div className={`text-3xl font-switzer font-bold tracking-tight ${metric.isSuccess ? 'text-emerald-500 dark:text-emerald-400' : 'text-obsidian'}`}>
                    {metric.value}
                  </div>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CORE COMMITMENTS (SPLIT LAYOUT) ── */}
      <section className="container mx-auto px-6 max-w-[var(--page-max-width)] mb-[var(--section-gap)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Quality Panel */}
          <FadeUp className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-veil/20 to-transparent rounded-[var(--radius-card-lg)] blur-xl transition-all duration-700 group-hover:blur-2xl opacity-50" />
            <div className="relative h-full bg-white/80 dark:bg-[#162033]/90 backdrop-blur-xl border border-silver dark:border-white/10 p-10 md:p-14 rounded-[var(--radius-card-lg)] overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-veil opacity-20 rounded-full blur-3xl pointer-events-none" />
              
              <TagPill variant="bone" className="mb-6 bg-white dark:bg-white/5 border border-silver shadow-sm">Quality Focus</TagPill>
              <h2 className="display text-obsidian mb-8 text-3xl md:text-4xl">Quality Commitment</h2>
              
              <div className="space-y-6 relative z-10">
                {[
                  "Periodically reviewing and improving processes for sustainable development.",
                  "Enhancing QMS effectiveness focused on customer satisfaction.",
                  "Deploying strictly trained manpower for technical execution.",
                  "Establishing good teamwork and safe work practices.",
                  "Maintaining high-end equipment in perfect operational condition."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 group/item">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-sky-veil/20 flex items-center justify-center group-hover/item:scale-110 group-hover/item:bg-sky-veil group-hover/item:shadow-[0_0_12px_var(--color-sky-veil)] transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4 text-obsidian" />
                    </div>
                    <p className="body-text text-graphite text-lg leading-relaxed group-hover/item:text-obsidian transition-colors duration-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Safety Panel */}
          <FadeUp delay={0.2} className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-bl from-lilac-bloom/30 to-transparent rounded-[var(--radius-card-lg)] blur-xl transition-all duration-700 group-hover:blur-2xl opacity-60" />
            <div className="relative h-full bg-[#0a1128] border border-white/10 p-10 md:p-14 rounded-[var(--radius-card-lg)] overflow-hidden shadow-2xl">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-lilac-bloom opacity-20 rounded-full blur-3xl pointer-events-none" />
              
              <TagPill variant="lilac" className="mb-6 bg-white/10 border border-white/20 text-white backdrop-blur-md">Safety Environment</TagPill>
              <h2 className="display text-white mb-8 text-3xl md:text-4xl">Zero Accident Culture</h2>
              
              <div className="space-y-6 relative z-10">
                {[
                  "Regular safety training, toolbox talks, and emergency drills.",
                  "Strict enforcement of personal protective equipment (PPE).",
                  "Periodic safety audits and hazard identification studies.",
                  "Clear safety procedures for high-risk activities.",
                  "Proactive reporting mechanisms for near misses.",
                  "Well-equipped first-aid facilities and emergency teams."
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 group/item">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-lilac-bloom/20 flex items-center justify-center group-hover/item:scale-110 group-hover/item:bg-lilac-bloom group-hover/item:shadow-[0_0_12px_var(--color-lilac-bloom)] transition-all duration-300">
                      <ShieldCheck className="w-4 h-4 text-white group-hover/item:text-[#0a1128] transition-colors duration-300" />
                    </div>
                    <p className="body-text text-gray-300 text-lg leading-relaxed group-hover/item:text-white transition-colors duration-300">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

    </div>
  )
}
