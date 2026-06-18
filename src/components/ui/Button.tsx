import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'lilac' | 'dark' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  // Primary action — "Filled Lilac CTA"
  lilac: [
    'btn-primary',
    'shadow-[var(--shadow-control)]',
  ].join(' '),

  // Secondary action — "Filled Dark CTA"
  dark: [
    'bg-[var(--color-obsidian)] text-[var(--color-paper)]',
    'hover:bg-[var(--color-graphite)]',
    'shadow-[var(--shadow-control)]',
  ].join(' '),

  // Tertiary — transparent with border
  ghost: [
    'bg-transparent text-[var(--color-obsidian)]',
    'border border-[var(--color-silver)]',
    'hover:bg-[var(--color-bone)]',
  ].join(' '),

  // Outline dark
  outline: [
    'bg-transparent text-[var(--color-obsidian)]',
    'border border-[var(--color-obsidian)]',
    'hover:bg-[var(--color-obsidian)] hover:text-[var(--color-paper)]',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm:  'px-[16px] py-[10px] text-[14px]',
  md:  'px-[20px] py-[14px] text-[16px]',
  lg:  'px-[28px] py-[16px] text-[16px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'lilac', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base — all buttons
          'inline-flex items-center justify-center gap-2',
          'font-medium font-switzer leading-none',
          'rounded-[var(--radius-control)]',
          'transition-all duration-150',
          'cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-obsidian)]',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
