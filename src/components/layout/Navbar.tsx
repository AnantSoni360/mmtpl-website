'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X, ArrowUpRight, ChevronRight, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'About', href: '/about', desc: 'Our story & legacy' },
  { name: 'Services', href: '/services', desc: 'Engineering capabilities' },
  { name: 'Projects', href: '/projects', desc: 'Portfolio of work' },
  { name: 'Clients', href: '/clients', desc: 'Trusted partners' },
  { name: 'Safety', href: '/safety', desc: 'HSE protocols' },
  { name: 'Careers', href: '/careers', desc: 'Join our team' },
]

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close on route change
  useEffect(() => {
    setIsExpanded(false)
    setMobileMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => setIsExpanded(false), 200)
  }

  return (
    <>
      {/* ── DESKTOP NAVIGATION ── */}
      <div className="fixed top-5 left-0 right-0 z-50 px-6 pointer-events-none hidden md:flex justify-between items-start">
        
        {/* Left Space (Flex balancer) */}
        <div className="flex-1" />

        {/* Center: Expandable Hover Pill */}
        <div className="flex-shrink-0 flex justify-center pointer-events-auto">
          <motion.div
            layout
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="overflow-hidden bg-[var(--color-paper)]/90 backdrop-blur-xl border border-[var(--color-silver)]/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full flex items-center p-1.5"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 px-3 py-1 flex-shrink-0">
              <Image src="/logo.png" alt="MMTPL" width={32} height={32} priority className="rounded-full object-cover bg-white" />
              <span className="font-editorial font-bold text-[var(--color-obsidian)] text-[17px]">MMTPL</span>
            </Link>

            {/* Separator */}
            <div className="w-px h-6 bg-[var(--color-silver)]/80 mx-1 flex-shrink-0" />

            {/* Expandable Links Area */}
            <div className="relative flex items-center">
              {/* Collapsed State */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isExpanded ? 0 : 1, 
                  y: isExpanded ? -10 : 0,
                  filter: isExpanded ? 'blur(4px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-1.5 whitespace-nowrap",
                  isExpanded ? "absolute pointer-events-none" : "relative"
                )}
              >
                <span className="text-sm font-semibold text-[var(--color-slate)]">
                  {navLinks.find(l => l.href === pathname)?.name ?? 'Home'}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
              </motion.div>

              {/* Expanded State */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isExpanded ? 1 : 0, 
                  y: isExpanded ? 0 : 10,
                  filter: isExpanded ? 'blur(0px)' : 'blur(4px)'
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "flex items-center gap-1 px-2 whitespace-nowrap",
                  !isExpanded ? "absolute pointer-events-none" : "relative"
                )}
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsExpanded(false)}
                      className={cn(
                        "px-4 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 whitespace-nowrap",
                        isActive 
                          ? "text-[#3b82f6] bg-[#3b82f6]/10" 
                          : "text-[var(--color-graphite)] hover:text-[var(--color-obsidian)] hover:bg-[var(--color-bone)]"
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right: Static Actions */}
        <div className="flex-1 flex justify-end gap-3 pointer-events-auto items-center">
          <div className="bg-[var(--color-paper)]/80 backdrop-blur-xl border border-[var(--color-silver)]/60 p-1.5 rounded-full flex items-center shadow-sm">
            <ThemeSwitcher />
          </div>
          
          <Link href="/contact" className="bg-[var(--color-paper)]/80 backdrop-blur-xl border border-[var(--color-silver)]/60 px-5 py-2.5 rounded-full shadow-sm hover:bg-[var(--color-bone)] transition-colors group flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--color-obsidian)]">Contact</span>
            <ArrowUpRight size={16} className="text-[var(--color-graphite)] group-hover:text-[var(--color-obsidian)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--color-obsidian)] text-[var(--color-paper)] hover:bg-[var(--color-obsidian)]/90 shadow-sm transition-colors group"
          >
            Portal Login
            <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── MOBILE HEADER ── */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300",
        isScrolled ? "py-3" : "py-4"
      )}>
        <div className="flex items-center justify-between px-4">
          {/* Mobile Logo pill */}
          <Link href="/" className="flex items-center gap-2.5 bg-[var(--color-paper)]/90 backdrop-blur-xl border border-[var(--color-silver)]/60 px-3 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <Image src="/logo.png" alt="MMTPL" width={28} height={28} priority className="rounded-full object-cover bg-white" />
            <span className="font-editorial font-bold text-[var(--color-obsidian)] text-base">MMTPL</span>
          </Link>

          {/* Mobile actions pill */}
          <div className="flex items-center gap-2 bg-[var(--color-paper)]/90 backdrop-blur-xl border border-[var(--color-silver)]/60 p-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <ThemeSwitcher />
            <div className="w-px h-6 bg-[var(--color-silver)]/80 mx-1" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full hover:bg-[var(--color-bone)] transition-colors text-[var(--color-obsidian)]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE SIDE DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-[var(--color-obsidian)]/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-[320px] bg-[var(--color-paper)] flex flex-col shadow-2xl md:hidden border-l border-[var(--color-silver)]/40"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-silver)]/50">
                <span className="font-editorial text-2xl font-bold text-[var(--color-obsidian)]">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-bone)] hover:bg-[var(--color-silver)]/50 transition-colors">
                  <X size={20} className="text-[var(--color-obsidian)]" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between p-4 rounded-2xl transition-all',
                          isActive ? 'bg-[#3b82f6]/10 text-[#3b82f6]' : 'hover:bg-[var(--color-bone)] text-[var(--color-obsidian)]'
                        )}
                      >
                        <span className="font-semibold text-[17px]">{link.name}</span>
                        <ChevronRight size={18} className={isActive ? 'text-[#3b82f6]' : 'text-[var(--color-slate)]'} />
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <div className="p-6 border-t border-[var(--color-silver)]/50 flex flex-col gap-3 bg-[var(--color-bone)]/30">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[var(--color-silver)] text-[var(--color-obsidian)] font-semibold text-[15px] bg-[var(--color-paper)] shadow-sm hover:shadow-md transition-all">
                  Contact Us <ArrowUpRight size={16} />
                </Link>
                  <Link 
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[var(--color-obsidian)] text-[var(--color-paper)] font-semibold text-[15px] shadow-sm hover:bg-[var(--color-obsidian)]/90 transition-colors"
                  >
                    Portal Login <ArrowUpRight size={16} />
                  </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
