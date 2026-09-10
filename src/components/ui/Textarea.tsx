import { cn } from '@/lib/utils'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <textarea
          ref={ref}
          className={cn(
            'flex w-full rounded-[var(--radius-control)] border',
            'bg-[var(--color-paper)] px-4 py-3 min-h-[120px]',
            'font-switzer text-[var(--text-body)] text-[var(--color-obsidian)]',
            'border-[var(--color-silver)] transition-colors',
            'focus:outline-none focus:border-[var(--color-obsidian)]',
            'placeholder:text-[var(--color-slate)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-y',
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
Textarea.displayName = 'Textarea'
