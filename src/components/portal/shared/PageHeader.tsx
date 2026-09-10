import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function PageHeader({ title, breadcrumbs, actionLabel, onAction, actionHref }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[18px] font-semibold text-[var(--color-obsidian)] font-clash tracking-wide mb-1">
          {title}
        </h1>
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center text-[13px] text-[var(--color-slate)] font-switzer">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3 h-3 mx-2 opacity-50" />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[var(--color-obsidian)] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[var(--color-obsidian)]/80">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {actionLabel && (
        <div>
          {actionHref ? (
            <Link href={actionHref}>
              <Button size="sm">{actionLabel}</Button>
            </Link>
          ) : (
            <Button size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
