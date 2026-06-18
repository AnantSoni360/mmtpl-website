'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

export function AnimatedCounter({ 
  value, 
  decimals = 0,
  prefix = '',
  suffix = ''
}: { 
  value: number, 
  decimals?: number,
  prefix?: string,
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format with correct decimal places
        let formatted = latest.toFixed(decimals)
        
        // Add commas for large numbers if no decimals are used
        if (decimals === 0) {
            formatted = Intl.NumberFormat('en-US').format(Math.round(latest))
        }
        
        ref.current.textContent = `${prefix}${formatted}${suffix}`
      }
    })
  }, [springValue, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
