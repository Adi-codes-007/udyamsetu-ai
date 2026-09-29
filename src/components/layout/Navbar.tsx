'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore, DEMO_USERS } from '@/lib/store';
import { Logo } from '@/components/brand/Logo';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  Building2, 
  ShieldCheck, 
  Sliders, 
  ExternalLink,
  CheckCircle,
  FileText,
  Clock,
  LogOut,
  Sparkles
} from 'lucide-react';
import { UserRole } from '@/types';

export function Navbar() {
  const router = useRouter();
  const { 
    currentUser, 
    setCurrentRole, 
    businessProfile, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useAppStore();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setShowRoleMenu(false);
    if (role === 'entrepreneur') {
      router.push('/entrepreneur/dashboard');
    } else if (role === 'officer') {
      router.push('/officer/dashboard');
    } else if (role === 'admin') {
      router.push('/admin/dashboard');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/entrepreneur/approval-roadmap?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D9E1E8]">
      {/* Official Government / SIH Top banner */}
      <div className="bg-[#17324D] text-white text-[11px] px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#8dc7ff]">SIH 2026 Problem Statement 26130</span>
          <span className="text-[#6287a8]">|</span>
          <span className="hidden sm:inline text-slate-200">Industrial Approvals & Single Window Orchestration Platform</span>
          <span className="text-[#6287a8] hidden sm:inline">|</span>
          <span className="text-emerald-300 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Prototype Environment
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-300 hidden md:inline">Government of Maharashtra Reference Model</span>
          <span className="text-[#6287a8] hidden md:inline">•</span>
          <span className="text-amber-200 font-mono text-[10px] bg-[#102336] px-2 py-0.5 rounded border border-[#2b4c6e]">
            MAITRI-COMPLIANT
          </span>
        </div>
      </div>

      {/* Main navigation toolbar */}
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Logo href={currentUser.role === 'entrepreneur' ? '/entrepreneur/dashboard' : currentUser.role === 'officer' ? '/officer/dashboard' : '/admin/dashboard'} showTagline={false} />
          
          {/* Active Business Indicator for Entrepreneur */}
          {currentUser.role === 'entrepreneur' && (
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-[#D9E1E8] text-xs">
              <Building2 className="w-3.5 h-3.5 text-[#1F4E79]" />
              <div className="flex flex-col">
                <span className="font-bold text-[#17202A] leading-tight">{businessProfile.businessName}</span>
                <span className="text-[11px] text-[#667085] leading-tight">{businessProfile.industrialArea}, {businessProfile.district}</span>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-2 relative">
          <Search className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search approvals, NOCs, documents, schemes (e.g. MPCB, Fire, DISH)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F7FA] border border-[#D9E1E8] rounded focus:outline-none focus:border-[#1F4E79] focus:bg-white text-[#17202A] placeholder-[#667085] transition-colors"
          />
        </form>

        {/* Right side controls: Role Quick Switcher, Notifications, User profile */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-medium border border-[#D9E1E8] bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#17202A] transition-colors"
              title="Click to switch persona (Judge Demo Mode)"
            >
              <div className="w-2 h-2 rounded-full bg-[#1F4E79]" />
              <span className="text-[#667085] text-[11px]">Persona:</span>
              <span className="font-semibold capitalize text-[#17324D]">{currentUser.role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085]" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-[#D9E1E8] rounded shadow-lg z-50 py-1 text-xs">
                <div className="px-3 py-1.5 border-b border-[#D9E1E8] bg-[#F5F7FA]">
                  <p className="font-semibold text-[#17202A]">Switch Demo Persona</p>
                  <p className="text-[10px] text-[#667085]">Instant navigation for Hackathon judges</p>
                </div>

                <button
                  onClick={() => handleRoleSelect('entrepreneur')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#F5F7FA] transition-colors ${
                    currentUser.role === 'entrepreneur' ? 'bg-[#edf4fa] font-semibold text-[#1F4E79]' : 'text-[#344054]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-[#17202A]">Rahul Sharma</span>
                    <span className="text-[10px] text-[#667085]">Entrepreneur (Shree Foods)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-100 text-sky-800 font-medium">Applicant</span>
                </button>

                <button
                  onClick={() => handleRoleSelect('officer')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#F5F7FA] transition-colors ${
                    currentUser.role === 'officer' ? 'bg-[#edf4fa] font-semibold text-[#1F4E79]' : 'text-[#344054]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-[#17202A]">Suresh Patil</span>
                    <span className="text-[10px] text-[#667085]">Joint Director (Industries/MPCB)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-medium">Officer</span>
                </button>

                <button
                  onClick={() => handleRoleSelect('admin')}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#F5F7FA] transition-colors ${
                    currentUser.role === 'admin' ? 'bg-[#edf4fa] font-semibold text-[#1F4E79]' : 'text-[#344054]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-[#17202A]">Dr. Anjali Mehta</span>
                    <span className="text-[10px] text-[#667085]">State Single Window Administrator</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800 font-medium">Admin</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded text-[#344054] hover:text-[#17202A] hover:bg-[#F5F7FA] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c93636] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-1 w-80 sm:w-96 bg-white border border-[#D9E1E8] rounded shadow-xl z-50 py-2">
                <div className="px-4 py-2 border-b border-[#D9E1E8] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#17202A]">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-[#edf4fa] text-[#1F4E79] rounded">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-[#1F4E79] hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#edf2f7]">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationAsRead(n.id);
                        if (n.actionUrl) router.push(n.actionUrl);
                        setShowNotifMenu(false);
                      }}
                      className={`p-3 text-xs cursor-pointer hover:bg-[#F5F7FA] transition-colors ${
                        !n.read ? 'bg-[#f8fafc]' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={`font-semibold ${!n.read ? 'text-[#17324D]' : 'text-[#344054]'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[#667085] whitespace-nowrap">{n.date}</span>
                      </div>
                      <p className="text-[11px] text-[#667085] mt-1 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>

                <div className="px-3 pt-2 border-t border-[#D9E1E8] text-center">
                  <Link
                    href="/entrepreneur/notifications"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-[11px] font-semibold text-[#1F4E79] hover:underline"
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#D9E1E8]">
            <div className="w-8 h-8 rounded bg-[#1F4E79] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {currentUser.avatarInitials}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-[#17202A] leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-[#667085] leading-tight truncate max-w-[120px]">
                {currentUser.role === 'entrepreneur' ? 'Shree Foods' : currentUser.role === 'officer' ? 'Directorate of Industries' : 'Single Window Admin'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
