import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  elevated?: boolean
}

export function Card({ children, className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card-bg border border-[var(--color-silver)]',
        elevated ? 'rounded-[var(--radius-card-lg)] shadow-[var(--shadow-card)] p-8 md:p-12' : 'rounded-[var(--radius-card)] p-6 md:p-8',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
