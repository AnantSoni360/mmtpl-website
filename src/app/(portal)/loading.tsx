export default function PortalLoading() {
  return (
    <div className="space-y-6 w-full max-w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-[200px] bg-gray-200 dark:bg-gray-800 rounded-[var(--radius-control)]"></div>
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-[var(--radius-control)]"></div>
        </div>
      </div>

      {/* Stats/Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-[var(--radius-card)]"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-[#0F1117] border border-gray-200 dark:border-white/10 rounded-[var(--radius-card)] overflow-hidden">
        <div className="flex bg-gray-50 dark:bg-[#161821] border-b border-gray-200 dark:border-white/10 p-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 rounded mx-2"></div>
          ))}
        </div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex border-b border-gray-200 dark:border-white/10 p-4 last:border-0">
            {[1, 2, 3, 4, 5].map(j => (
              <div key={j} className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 rounded mx-2"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
