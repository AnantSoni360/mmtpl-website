'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number       // stagger delay in seconds e.g. 0.1, 0.2
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,        // animate once, not every scroll
    rootMargin: '0px 0px -40px 0px',
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
