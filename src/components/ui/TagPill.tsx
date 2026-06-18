import { cn } from '@/lib/utils'

interface TagPillProps {
  children: React.ReactNode
  variant?: 'lilac' | 'bone' | 'paper'
  className?: string
}

export function TagPill({ children, variant = 'lilac', className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-block font-switzer font-medium text-[14px] text-obsidian',
        'px-[12px] py-[5px] rounded-[var(--radius-pill)] shadow-sm',
        variant === 'lilac' ? 'bg-lilac-bloom' : 
        variant === 'bone' ? 'bg-bone' : 
        'bg-paper',
        className
      )}
    >
      {children}
    </span>
  )
}
