import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number; // percentage
    isPositive: boolean;
    label?: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-[16px] border border-[var(--color-silver)]/50 p-6 flex flex-col shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-[12px] font-medium text-[var(--color-slate)] uppercase tracking-wider font-switzer">
          {label}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-[var(--color-bone)] flex items-center justify-center text-[var(--color-slate)]">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end gap-3 mt-auto">
        <span className="text-[32px] font-medium text-[var(--color-obsidian)] font-switzer leading-none">
          {value}
        </span>
        
        {trend && (
          <div className={cn(
            "flex items-center text-[12px] font-medium font-switzer mb-1",
            trend.isPositive ? "text-emerald-600" : trend.value < 0 ? "text-red-600" : "text-gray-500"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
            ) : trend.value < 0 ? (
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
            ) : (
              <Minus className="w-3.5 h-3.5 mr-1" />
            )}
            {Math.abs(trend.value)}% {trend.label && <span className="ml-1 text-gray-400 font-normal">{trend.label}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
