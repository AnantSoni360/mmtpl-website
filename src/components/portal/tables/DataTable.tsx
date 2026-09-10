import React from 'react';
import { cn } from '@/lib/utils';
import { FileSearch, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmptyState } from '@/components/portal/shared/EmptyState';
import Link from 'next/link';

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
}

interface PaginationProps {
  page: number;
  totalPages: number;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  pagination?: PaginationProps;
}

export function DataTable<T>({ data, columns, className, pagination }: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-hidden rounded-[16px] border-[0.5px] border-[var(--color-silver)] bg-[var(--color-paper)] shadow-[var(--shadow-card)] flex flex-col", className)}>
      <div className="overflow-auto custom-scrollbar flex-1">
        <table className="w-full text-left border-collapse text-[13px] font-switzer min-w-max">
          <thead className="sticky top-0 bg-[var(--color-paper)] z-10 shadow-sm border-b-[0.5px] border-[var(--color-silver)]">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 font-medium text-[var(--color-slate)] uppercase tracking-wider whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8">
                  <EmptyState 
                    icon={FileSearch}
                    title="No data found"
                    description="There are no records to display in this table."
                  />
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr 
                  key={i} 
                  className={cn(
                    "border-b-[0.5px] border-[var(--color-silver)] last:border-0 transition-colors hover:bg-black/5 dark:hover:bg-white/5",
                    i % 2 === 0 ? 'bg-[var(--color-paper)]' : 'bg-[var(--color-bone)]'
                  )}
                >
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-4 text-[var(--color-obsidian)]">
                      {col.cell ? col.cell(item) : (item as any)[col.accessorKey as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="border-t-[0.5px] border-[var(--color-silver)] px-6 py-3 flex items-center justify-between bg-[var(--color-paper)]">
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex items-center gap-2">
            {pagination.page > 1 ? (
              <Link href={`?page=${pagination.page - 1}`} className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--color-silver)] transition-colors text-[var(--color-obsidian)] border border-[var(--color-silver)]">
                <ChevronLeft size={18} />
              </Link>
            ) : (
              <div className="p-1 rounded-[var(--radius-control)] text-gray-300 border border-gray-100 dark:border-gray-800 dark:text-gray-700 cursor-not-allowed">
                <ChevronLeft size={18} />
              </div>
            )}
            
            {pagination.page < pagination.totalPages ? (
              <Link href={`?page=${pagination.page + 1}`} className="p-1 rounded-[var(--radius-control)] hover:bg-[var(--color-silver)] transition-colors text-[var(--color-obsidian)] border border-[var(--color-silver)]">
                <ChevronRight size={18} />
              </Link>
            ) : (
              <div className="p-1 rounded-[var(--radius-control)] text-gray-300 border border-gray-100 dark:border-gray-800 dark:text-gray-700 cursor-not-allowed">
                <ChevronRight size={18} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
