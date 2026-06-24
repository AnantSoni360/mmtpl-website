import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center min-h-[300px]", className)}>
      <div className="w-16 h-16 bg-[var(--color-bone)] rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[var(--color-slate)] opacity-80" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-obsidian)] font-switzer mb-1">
        {title}
      </h3>
      <p className="text-[14px] text-[var(--color-slate)] font-switzer max-w-[350px] mb-6">
        {description}
      </p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
