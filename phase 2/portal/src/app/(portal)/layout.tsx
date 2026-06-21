import Link from "next/link";
import { ReactNode } from "react";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 font-bold text-xl text-[#185FA5]">
          MMTPL Portal
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3 text-sm font-medium">
            {/* Quick links to navigate around for testing */}
            <li><Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-gray-100">Admin</Link></li>
            <li><Link href="/employee" className="block px-3 py-2 rounded-md hover:bg-gray-100">Employee</Link></li>
            <li><Link href="/client" className="block px-3 py-2 rounded-md hover:bg-gray-100">Client</Link></li>
            <li><Link href="/jobs" className="block px-3 py-2 rounded-md hover:bg-gray-100">Jobs</Link></li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md font-medium">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Notifications</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">U</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
