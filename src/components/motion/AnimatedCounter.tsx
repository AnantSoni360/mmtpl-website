'use client'

import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'

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
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(v) {
          let formatted = v.toFixed(decimals)
          if (decimals === 0) {
            formatted = Intl.NumberFormat('en-US').format(Math.round(v))
          }
          node.textContent = `${prefix}${formatted}${suffix}`
        }
      })
      return () => controls.stop()
    }
  }, [isInView, value, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
