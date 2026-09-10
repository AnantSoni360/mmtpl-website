import { cn } from '@/lib/utils'
import { forwardRef, type SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <select
          ref={ref}
          className={cn(
            'flex w-full rounded-[var(--radius-control)] border',
            'bg-[var(--color-paper)] px-4 py-3 appearance-none',
            'font-switzer text-[var(--text-body)] text-[var(--color-obsidian)]',
            'border-[var(--color-silver)] transition-colors',
            'focus:outline-none focus:border-[var(--color-obsidian)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-[13px] text-red-500 font-switzer font-medium mt-1">
            {error}
          </span>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'
