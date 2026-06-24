'use client';

import { Bell, Search, User as UserIcon, Menu, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface TopbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user?: { name: string; email: string; avatarUrl: string | null };
  role?: string;
}

export function Topbar({ isOpen, setIsOpen, user, role }: TopbarProps) {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial fetch
    fetchUnreadCount();

    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch('/api/notifications/unread');
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDropdown = async () => {
    if (!isDropdownOpen) {
      await fetchNotifications();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const markAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllRead: true })
      });
      setUnreadCount(0);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotificationClick = async (notification: any) => {
    if (!notification.isRead) {
      try {
        await fetch('/api/notifications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: notification.id })
        });
        setUnreadCount(prev => Math.max(0, prev - 1));
        setNotifications(notifications.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
      } catch (e) {
        console.error(e);
      }
    }
    
    setIsDropdownOpen(false);
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const handleLogout = async () => {
    router.push('/auth/login');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-[64px] bg-[var(--color-paper)] border-b border-[var(--color-silver)] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors text-[var(--color-obsidian)]"
        >
          <Menu size={20} />
        </button>
        
        {/* Search could go here */}
        <div className="relative hidden md:block ml-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-[240px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button 
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors relative"
        >
          <Bell size={18} className="text-[var(--color-obsidian)]" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--color-lilac-bloom)] rounded-full border border-[var(--color-paper)]"></span>
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-12 right-12 w-80 bg-[var(--color-paper)] border-[0.5px] border-[var(--color-silver)] rounded-[12px] shadow-[var(--shadow-card)] z-50 overflow-hidden flex flex-col max-h-[400px]">
            <div className="p-3 border-b border-[var(--color-silver)] flex items-center justify-between bg-[var(--color-bone)]">
              <h3 className="font-semibold text-[var(--color-obsidian)] font-switzer text-[14px]">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[11px] text-[var(--color-lilac-bloom)] hover:underline flex items-center gap-1 font-switzer">
                  <Check size={12} /> Mark all read
                </button>
              )}
            </div>
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-[13px] text-[var(--color-slate)] font-switzer">
                  No notifications yet.
                </div>
              ) : (
                notifications.map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => handleNotificationClick(n)}
                    className={`p-3 border-b border-[var(--color-silver)] last:border-b-0 cursor-pointer hover:bg-[var(--color-bone)] transition-colors ${!n.isRead ? 'bg-black/5 dark:bg-white/5' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-[13px] font-switzer ${!n.isRead ? 'font-semibold text-[var(--color-obsidian)]' : 'font-medium text-[var(--color-slate)]'}`}>
                        {n.title}
                      </h4>
                      {!n.isRead && <span className="w-2 h-2 bg-[var(--color-lilac-bloom)] rounded-full shrink-0 mt-1"></span>}
                    </div>
                    <p className="text-[12px] text-[var(--color-slate)] font-switzer line-clamp-2">{n.body}</p>
                    <span className="text-[10px] text-[var(--color-slate)] mt-1 block opacity-70">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        <div className="w-px h-6 bg-[var(--color-silver)] mx-1"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[13px] font-semibold text-[var(--color-obsidian)] leading-none">{user?.name || 'User'}</span>
            <span className="text-[11px] text-[var(--color-slate)] mt-1 leading-none capitalize">{role?.toLowerCase() || 'Guest'}</span>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center hover:opacity-80 transition-opacity">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-[var(--color-silver)]" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[var(--color-lilac-bloom)] flex items-center justify-center border border-[var(--color-silver)] text-[12px] font-bold text-[var(--color-obsidian)]">
                {getInitials(user?.name)}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
