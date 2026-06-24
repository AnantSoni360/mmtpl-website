import { cn } from '@/lib/utils';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  default: 'bg-[var(--color-bone)] text-[var(--color-obsidian)] border border-[var(--color-silver)]',
};

// Auto-detect variant based on status string if not provided
const detectVariant = (status: string): BadgeVariant => {
  const lower = status.toLowerCase();
  if (lower.includes('success') || lower.includes('completed') || lower.includes('approved') || lower.includes('paid')) return 'success';
  if (lower.includes('pending') || lower.includes('progress') || lower.includes('warning') || lower.includes('draft')) return 'warning';
  if (lower.includes('error') || lower.includes('failed') || lower.includes('rejected') || lower.includes('overdue')) return 'error';
  if (lower.includes('info') || lower.includes('new') || lower.includes('active')) return 'info';
  return 'default';
};

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const finalVariant = variant || detectVariant(status);
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-switzer font-medium whitespace-nowrap',
        variantStyles[finalVariant],
        className
      )}
    >
      {status}
    </span>
  );
}
