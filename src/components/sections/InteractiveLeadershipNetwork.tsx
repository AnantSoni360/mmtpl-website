'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
// --- Data Types & Mock Data ---
type Leader = {
  id: string
  name: string
  title: string
  department: string
  experience: string
  responsibilities: string[]
  photo: string
}
const md: Leader = { 
  id: 'md', 
  name: 'Azghar Ahmed', 
  title: 'Managing Director', 
  department: 'Executive Board', 
  experience: '25+ Years', 
  responsibilities: ['Strategic Vision', 'Global Expansion', 'Corporate Governance'], 
  photo: '/images/team/Azghar-Ahmed.jpeg' 
}
const directors: Leader[] = [
  { id: 'd1', name: 'D.S. Bhowmik', title: 'Director Technical', department: 'Technical', experience: '20+ Years', responsibilities: ['Technical Strategy', 'Project Engineering'], photo: '/logo.png' },
  { id: 'd2', name: 'Akheel Ahmed', title: 'Director Operation', department: 'Operations', experience: '22+ Years', responsibilities: ['Operational Excellence', 'Resource Management'], photo: '/logo.png' },
  { id: 'd3', name: 'Madhusudhan', title: 'Director Mechanical Projects', department: 'Mechanical Projects', experience: '18+ Years', responsibilities: ['Mechanical Erection', 'Heavy Machinery'], photo: '/logo.png' },
  { id: 'd4', name: 'Kasim Vali', title: 'Director F & A', department: 'Finance & Accounts', experience: '15+ Years', responsibilities: ['Financial Planning', 'Corporate Audits'], photo: '/images/team/Kasim-Vali.jpeg' }
]
const gms: Leader[] = [
  { id: 'g1', name: 'Abhishek Soni', title: 'GM - Planning, Billing, HR', department: 'Planning, Commercial & HR', experience: '15+ Years', responsibilities: ['Project Planning', 'Cost Control', 'Procurement', 'Human Resources'], photo: '/images/team/Abhishek-Soni.jpeg' },
  { id: 'g2', name: 'Musthiaq Mohammad', title: 'GM - Project Refractory', department: 'Refractory Division', experience: '18+ Years', responsibilities: ['Refractory Execution', 'Quality Assurance'], photo: '/logo.png' },
  { id: 'g3', name: 'M V Bhaskar', title: 'GM - Projects Mechanical', department: 'Mechanical Division', experience: '20+ Years', responsibilities: ['Site Management', 'Equipment Erection'], photo: '/images/team/MV-Bhaskar.jpeg' },
  { id: 'g4', name: 'Sharana', title: 'GM - F & A', department: 'Finance & Accounts', experience: '14+ Years', responsibilities: ['Accounting', 'Financial Reporting'], photo: '/images/team/Sharana-N.jpeg' },
  { id: 'g5', name: 'Kamal Deshmukh', title: 'GM - Safety', department: 'HSE', experience: '16+ Years', responsibilities: ['Safety Standards', 'Site Compliance'], photo: '/logo.png' }
]
const keyPersonnel: Leader[] = [
  { id: 'k2', name: 'Mr. Rafiq', title: 'Refractory Project', department: 'Refractory Division', experience: '15+ Years', responsibilities: ['Project Supervision', 'Material Management'], photo: '/logo.png' },
  { id: 'k3', name: 'Mastan K', title: 'Site Incharge', department: 'Operations', experience: '14+ Years', responsibilities: ['Site Logistics', 'Daily Operations'], photo: '/logo.png' },
  { id: 'k4', name: 'G. Sudharshan', title: 'Refractory Maint.', department: 'Maintenance', experience: '10+ Years', responsibilities: ['Preventive Maintenance', 'Troubleshooting'], photo: '/logo.png' },
  { id: 'k5', name: 'Chaitanyay', title: 'Safety Officer', department: 'HSE', experience: '8+ Years', responsibilities: ['Safety Inspections', 'Hazard Control'], photo: '/logo.png' }
]
type ConnectionLine = {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  length: number
}
// Custom hook to track component resizes for responsive lines
function useWindowResize(callback: () => void) {
  useEffect(() => {
    window.addEventListener('resize', callback)
    // Small delay on mount to ensure layout is complete
    const timeoutId = setTimeout(callback, 100)
    return () => {
      window.removeEventListener('resize', callback)
      clearTimeout(timeoutId)
    }
  }, [callback])
}
const LeaderCard = ({ leader, refCb, delay = 0, variant = "dark", onClick }: { leader: Leader, refCb: React.Ref<HTMLDivElement>, delay?: number, variant?: "dark" | "light", onClick: () => void }) => {
  const isDark = variant === "dark"
  return (
    <motion.div
      ref={refCb}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative z-10 w-[160px] md:w-[200px]"
    >
      {/* Float via CSS — no JS RAF loop */}
      <div
        onClick={onClick}
        style={{ animationDelay: `${delay}s` }}
        className={`leader-float cursor-pointer group flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border backdrop-blur-sm shadow-lg transition-all duration-300
          ${isDark 
            ? 'bg-[var(--color-obsidian)] border-[var(--color-obsidian)] hover:border-[#3b82f6] text-[var(--color-paper)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]' 
            : 'bg-[var(--color-paper)] border-[var(--color-silver)] hover:border-[#3b82f6] text-[var(--color-obsidian)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]'
          }
          hover:scale-105 hover:-translate-y-2
        `}
      >
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-2xl transition-colors duration-300 -z-10" />
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#3b82f6] transition-colors duration-300 shadow-inner">
          <Image 
            src={leader.photo} 
            alt={leader.name} 
            width={80} 
            height={80} 
            loading="lazy"
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className={`font-switzer font-bold text-center text-[13px] md:text-sm leading-tight mb-1 group-hover:text-[#3b82f6] transition-colors`}>
          {leader.name}
        </h3>
        <p className={`text-[10px] md:text-xs text-center font-medium uppercase tracking-wider opacity-80`}>
          {leader.title}
        </p>
      </div>
    </motion.div>
  )
}
export function InteractiveLeadershipNetwork() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mdRef = useRef<HTMLDivElement>(null)
  const dirRefs = useRef<(HTMLDivElement | null)[]>([])
  const gmRefs = useRef<(HTMLDivElement | null)[]>([])
  const keyRefs = useRef<(HTMLDivElement | null)[]>([])
  const [lines, setLines] = useState<ConnectionLine[]>([])
  const calculateLines = () => {
    if (!containerRef.current || !mdRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const getCenter = (el: HTMLDivElement | null) => {
      if (!el) return { x: 0, y: 0 }
      const rect = el.getBoundingClientRect()
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2
      }
    }
    const newLines: ConnectionLine[] = []
    const addLine = (id: string, start: {x: number, y: number}, end: {x: number, y: number}) => {
      if (start.x === 0 || end.x === 0) return
      const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
      newLines.push({ id, x1: start.x, y1: start.y, x2: end.x, y2: end.y, length })
    }
    const mdCenter = getCenter(mdRef.current)
    // MD to Directors
    dirRefs.current.forEach((dir, i) => {
      if (dir) {
        const dirCenter = getCenter(dir)
        addLine(`md-dir-${i}`, mdCenter, dirCenter)
        // Director to GMs (Mesh pattern)
        const gmIndices = i === 0 ? [0, 1] : i === 1 ? [1, 2] : i === 2 ? [2, 3] : [3, 4]
        gmIndices.forEach(gmIndex => {
          const gm = gmRefs.current[gmIndex]
          if (gm) {
            addLine(`dir-${i}-gm-${gmIndex}`, dirCenter, getCenter(gm))
          }
        })
      }
    })
    // GMs to Key Personnel
    gmRefs.current.forEach((gm, i) => {
      if (gm) {
        const gmCenter = getCenter(gm)
        const keyIndices = i === 0 ? [0] : i === 1 ? [1, 2] : i === 2 ? [2, 3] : i === 3 ? [3, 4] : [4]
        keyIndices.forEach(kIndex => {
          const keyP = keyRefs.current[kIndex]
          if (keyP) {
            addLine(`gm-${i}-key-${kIndex}`, gmCenter, getCenter(keyP))
          }
        })
      }
    })
    setLines(newLines)
  }
  useWindowResize(calculateLines)
  return (
    <div className="relative w-full py-16" ref={containerRef}>
      {/* BACKGROUND SVG LINES */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {lines.map((line, i) => (
          <g key={line.id}>
            {/* Base Line — animated in once on scroll */}
            <motion.line
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.04 }}
            />
            {/* Travelling dot — CSS animation, no JS RAF */}
            <line
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray={`5 ${line.length}`}
              strokeDashoffset={line.length}
              style={{
                animation: `dashTravel ${2.5 + (i % 3) * 0.5}s linear ${(i % 5) * 0.4}s infinite`,
                filter: 'drop-shadow(0px 0px 3px rgba(59,130,246,0.7))'
              }}
            />
          </g>
        ))}
      </svg>
      {/* FOREGROUND CARDS NETWORK */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 flex flex-col gap-12 md:gap-20 items-center">
        {/* Level 1: MD */}
        <div className="flex justify-center w-full">
          <LeaderCard leader={md} refCb={mdRef} delay={0.1} variant="dark" onClick={() => setSelectedLeader(md)} />
        </div>
        {/* Level 2: Directors */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 w-full">
          {directors.map((director, i) => (
            <LeaderCard 
              key={director.id} 
              leader={director} 
              refCb={(el: HTMLDivElement | null) => { dirRefs.current[i] = el }} 
              delay={0.2 + i * 0.1} 
              variant="dark"
              onClick={() => setSelectedLeader(director)}
            />
          ))}
        </div>
        {/* Level 3: GMs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 w-full">
          {gms.map((gm, i) => (
            <LeaderCard 
              key={gm.id} 
              leader={gm} 
              refCb={(el: HTMLDivElement | null) => { gmRefs.current[i] = el }} 
              delay={0.4 + i * 0.1} 
              variant="light"
              onClick={() => setSelectedLeader(gm)}
            />
          ))}
        </div>
        {/* Level 4: Key Personnel */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 w-full opacity-90 scale-95">
          {keyPersonnel.map((person, i) => (
            <LeaderCard 
              key={person.id} 
              leader={person} 
              refCb={(el: HTMLDivElement | null) => { keyRefs.current[i] = el }} 
              delay={0.6 + i * 0.1} 
              variant="light"
              onClick={() => setSelectedLeader(person)}
            />
          ))}
        </div>
      </div>
      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLeader(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-paper)] w-full max-w-2xl rounded-[var(--radius-card-lg)] shadow-2xl overflow-hidden border border-[var(--color-silver)] relative flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full transition-colors"
              >
                <X size={18} className="text-[var(--color-obsidian)]" />
              </button>
              {/* Photo Section */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-[var(--color-bone)]">
                <Image 
                  src={selectedLeader.photo} 
                  alt={selectedLeader.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </div>
              {/* Details Section */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4 w-max border border-blue-100">
                  {selectedLeader.department}
                </div>
                <h2 className="display text-[var(--color-obsidian)] mb-1 text-3xl">
                  {selectedLeader.name}
                </h2>
                <p className="body-text text-[var(--color-graphite)] font-medium text-lg mb-6">
                  {selectedLeader.title}
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-slate)] mb-2 font-semibold">Experience</h4>
                    <p className="font-switzer font-medium text-[var(--color-obsidian)]">{selectedLeader.experience}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-slate)] mb-3 font-semibold">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {selectedLeader.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight size={16} className="text-[#3b82f6] mt-0.5 shrink-0" />
                          <span className="text-sm text-[var(--color-graphite)] leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
