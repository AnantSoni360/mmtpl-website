import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn() merges Tailwind classes intelligently:
// cn('px-4 py-2', condition && 'bg-lilac-bloom', 'px-6')
// → 'py-2 bg-lilac-bloom px-6'  (px-6 wins over px-4, deduped)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
