import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-medium text-[var(--color-slate)] font-switzer uppercase tracking-wider">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-[var(--color-bone)] flex items-center justify-center">
          <Icon size={18} className="text-[var(--color-obsidian)]" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-[32px] font-semibold text-[var(--color-obsidian)] font-switzer leading-none">
          {value}
        </div>
        {trend && (
          <div className={cn(
            'text-[13px] font-medium font-switzer flex items-center gap-1',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}
