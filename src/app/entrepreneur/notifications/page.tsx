'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  CalendarCheck, 
  FileText, 
  Award, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAppStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Notifications & Milestone Alerts</h1>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#c93636] text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Real-time updates regarding application progress, upcoming inspections, and document deficiency notices.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#1F4E79] border border-[#D9E1E8] transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs divide-y divide-[#D9E1E8]">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
              !n.read ? 'bg-[#f8fafc]' : 'hover:bg-[#F5F7FA]'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center shrink-0 mt-0.5">
                {n.type === 'inspection' && <CalendarCheck className="w-4 h-4" />}
                {n.type === 'document' && <FileText className="w-4 h-4" />}
                {n.type === 'sla' && <Clock className="w-4 h-4" />}
                {n.type === 'scheme' && <Award className="w-4 h-4" />}
                {n.type === 'approval' && <ShieldCheck className="w-4 h-4" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`text-xs font-bold ${!n.read ? 'text-[#17324D]' : 'text-[#344054]'}`}>
                    {n.title}
                  </h3>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
                  )}
                </div>
                <p className="text-xs text-[#475467] mt-1 leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-[#667085] mt-1 block">{n.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {n.actionUrl && (
                <Link
                  href={n.actionUrl}
                  onClick={() => markNotificationAsRead(n.id)}
                  className="px-3 py-1.5 rounded bg-white hover:bg-slate-50 text-[#1F4E79] border border-[#D9E1E8] text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
              {!n.read && (
                <button
                  onClick={() => markNotificationAsRead(n.id)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 text-xs"
                  title="Mark as read"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
