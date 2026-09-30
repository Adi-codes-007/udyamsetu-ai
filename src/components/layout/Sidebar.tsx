'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  Building2,
  Map,
  GitFork,
  Files,
  ScanText,
  ClipboardList,
  Award,
  Sliders,
  Sparkles,
  Bell,
  Settings,
  HelpCircle,
  CalendarCheck,
  BarChart3,
  ShieldCheck,
  BookOpen,
  Users,
  LineChart,
  Zap,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, notifications } = useAppStore();
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Entrepreneur Links
  const entrepreneurNav = [
    { label: 'Overview', href: '/entrepreneur/dashboard', icon: LayoutDashboard },
    { label: 'Business Profile', href: '/entrepreneur/business-profile', icon: Building2 },
    { label: 'Approval Roadmap', href: '/entrepreneur/approval-roadmap', icon: Map },
    { label: 'Dependency Graph', href: '/entrepreneur/dependency-graph', icon: GitFork },
    { label: 'Cross-Audit & Deadlocks', href: '/entrepreneur/deadlock-resolver', icon: Zap, badge: 'NEW' },
    { label: 'Document Center', href: '/entrepreneur/documents', icon: Files },
    { label: 'Document OCR AI', href: '/entrepreneur/documents/ocr', icon: ScanText },
    { label: 'Application Tracker', href: '/entrepreneur/applications', icon: ClipboardList },
    { label: 'Government Support', href: '/entrepreneur/schemes', icon: Award },
    { label: 'Scenario Simulator', href: '/entrepreneur/simulator', icon: Sliders },
    { label: 'Regulatory Copilot', href: '/entrepreneur/copilot', icon: Sparkles, badge: 'AI' },
    { label: 'Notifications', href: '/entrepreneur/notifications', icon: Bell, count: unreadNotifCount },
  ];

  // Officer Links
  const officerNav = [
    { label: 'Officer Dashboard', href: '/officer/dashboard', icon: LayoutDashboard },
    { label: 'Application Queue', href: '/officer/applications', icon: ClipboardList },
    { label: 'Inspection Management', href: '/officer/inspections', icon: CalendarCheck },
    { label: 'Department Analytics', href: '/officer/analytics', icon: BarChart3 },
  ];

  // Admin Links
  const adminNav = [
    { label: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Approval Rules', href: '/admin/rules', icon: ShieldCheck },
    { label: 'Regulatory Sources', href: '/admin/sources', icon: BookOpen },
    { label: 'Government Schemes', href: '/admin/schemes', icon: Award },
    { label: 'System Users', href: '/admin/users', icon: Users },
    { label: 'System Analytics', href: '/admin/analytics', icon: LineChart },
  ];

  let currentNav = entrepreneurNav;
  let sectionHeading = 'ENTREPRENEUR PORTAL';

  if (currentUser.role === 'officer') {
    currentNav = officerNav;
    sectionHeading = 'OFFICER SCRUTINY';
  } else if (currentUser.role === 'admin') {
    currentNav = adminNav;
    sectionHeading = 'ADMINISTRATION';
  }

  return (
    <aside className="w-64 bg-white border-r border-[#D9E1E8] flex flex-col justify-between shrink-0 h-[calc(100vh-80px)] sticky top-[80px] select-none">
      <div className="flex flex-col py-4 overflow-y-auto">
        <div className="px-5 mb-2">
          <span className="text-[10px] font-bold tracking-wider text-[#667085] uppercase">
            {sectionHeading}
          </span>
        </div>

        <nav className="space-y-1 px-3">
          {currentNav.map(item => {
            const isActive = pathname === item.href || (item.href !== '/entrepreneur/dashboard' && pathname?.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1F4E79] text-white'
                    : 'text-[#344054] hover:bg-[#F5F7FA] hover:text-[#17202A]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#667085]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isActive ? 'bg-sky-200 text-[#17324D]' : 'bg-[#edf4fa] text-[#1F4E79] border border-[#c8dced]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.count && item.count > 0 ? (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#1F4E79]' : 'bg-[#c93636] text-white'
                    }`}
                  >
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom utility links & session indicator */}
      <div className="p-3 border-t border-[#D9E1E8] bg-[#F5F7FA] space-y-1">
        <Link
          href="/entrepreneur/settings"
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-[#667085] hover:text-[#17202A] hover:bg-white transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Platform Settings</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-[#667085] hover:text-[#17202A] hover:bg-white transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Public Landing Page</span>
        </Link>

        <div className="pt-2 mt-1 border-t border-[#D9E1E8] px-3">
          <p className="text-[10px] text-[#667085]">UdyamSetu AI Core v2.4</p>
          <p className="text-[10px] font-mono text-[#16855b]">● Engine Online</p>
        </div>
      </div>
    </aside>
  );
}
