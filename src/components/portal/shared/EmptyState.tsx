import React from 'react';
import { Button } from '@/components/ui/Button';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-[16px] bg-white border border-[var(--color-silver)]/30 border-dashed">
      <div className="w-16 h-16 rounded-full bg-[var(--color-bone)] flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[var(--color-slate)] opacity-80" />
      </div>
      <h3 className="text-[16px] font-semibold text-[var(--color-obsidian)] font-clash mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[14px] text-[var(--color-slate)] max-w-md mx-auto mb-6 font-switzer">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
