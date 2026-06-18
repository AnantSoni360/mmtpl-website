import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          ref={ref}
          className={cn(
            'flex w-full rounded-[var(--radius-control)] border',
            'bg-[var(--color-paper)] px-4 py-3',
            'font-switzer text-[var(--text-body)] text-[var(--color-obsidian)]',
            'border-[var(--color-silver)] transition-colors',
            'focus:outline-none focus:border-[var(--color-obsidian)]',
            'placeholder:text-[var(--color-slate)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-[13px] text-red-500 font-switzer font-medium mt-1">
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
