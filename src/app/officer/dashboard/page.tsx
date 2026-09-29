'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SlaIndicator } from '@/components/ui/SlaIndicator';
import { 
  Building2, 
  ClipboardList, 
  CalendarCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight, 
  FileText, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

export default function OfficerDashboard() {
  const { currentUser, applications, inspections } = useAppStore();

  const workloadData = [
    { department: 'MPCB (Pollution Control)', count: 68, slaRisk: 4, barWidth: '78%' },
    { department: 'Fire Safety Directorate', count: 42, slaRisk: 3, barWidth: '55%' },
    { department: 'DISH (Industrial Safety)', count: 34, slaRisk: 2, barWidth: '45%' },
    { department: 'MSEDCL (Power Infrastructure)', count: 26, slaRisk: 1, barWidth: '35%' },
    { department: 'Local Municipal / Town Planning', count: 14, slaRisk: 1, barWidth: '22%' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">
              Officer Scrutiny & Single Window Desk
            </h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Departmental Authority
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Welcome, <strong>{currentUser.name}</strong> ({currentUser.designation || 'Joint Director of Industries'}). Division: Chhatrapati Sambhajinagar Circle.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/officer/applications"
            className="px-4 py-2 rounded text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Process Application Queue</span>
          </Link>
          <Link
            href="/officer/inspections"
            className="px-3.5 py-2 rounded text-xs font-semibold bg-white hover:bg-slate-50 text-[#344054] border border-[#D9E1E8] transition-colors"
          >
            Inspection Calendar
          </Link>
        </div>
      </div>

      {/* Official KPIs Row as specified */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Total Applications</span>
          <p className="text-2xl font-bold text-[#17324D] mt-1">184</p>
          <span className="text-[10px] text-[#667085]">All circle dossiers</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">New Submissions</span>
          <p className="text-2xl font-bold text-[#1F4E79] mt-1">24</p>
          <span className="text-[10px] text-[#1F4E79]">Awaiting desk assignment</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Under Review</span>
          <p className="text-2xl font-bold text-[#2F6B8A] mt-1">73</p>
          <span className="text-[10px] text-[#2F6B8A]">In active scrutiny</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Inspection Pending</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">31</p>
          <span className="text-[10px] text-amber-700">Site visits queued</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Active Queries</span>
          <p className="text-2xl font-bold text-purple-700 mt-1">19</p>
          <span className="text-[10px] text-purple-700">Applicant replies awaited</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs border-l-4 border-l-[#c93636]">
          <span className="text-[11px] font-semibold text-[#667085]">SLA At Risk</span>
          <p className="text-2xl font-bold text-[#c93636] mt-1">11</p>
          <span className="text-[10px] text-[#c93636]">Escalation threshold</span>
        </div>
      </div>

      {/* DEPARTMENT WORKLOAD HEATMAP / CHARTS & PRIORITY ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Department Workload Visualization (Left Column) */}
        <div className="lg:col-span-7 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
            <div>
              <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                Inter-Departmental Workload Distribution
              </h2>
              <p className="text-[11px] text-[#667085]">Active dossier backlog across participating single-window wings</p>
            </div>
            <Link
              href="/officer/analytics"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center gap-1"
            >
              <span>Detailed Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-4 pt-1">
            {workloadData.map(item => (
              <div key={item.department} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#17202A]">{item.department}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#667085]">{item.count} Active</span>
                    <span className="text-[10px] font-bold text-[#c93636] bg-[#fcedec] px-1.5 py-0.2 rounded">
                      {item.slaRisk} at SLA risk
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#e8eef3] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1F4E79] h-full rounded-full transition-all duration-500"
                    style={{ width: item.barWidth }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D9E1E8] text-[11px] text-[#667085] flex items-center justify-between">
            <span>Average Inter-Departmental Disposal Rate: <strong>16.4 Days</strong></span>
            <span className="font-semibold text-emerald-700">89.2% Statutory SLA Adherence</span>
          </div>
        </div>

        {/* Priority Applications Requiring Officer Action (Right Column) */}
        <div className="lg:col-span-5 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                Action-Pending Submissions ({applications.length})
              </h2>
              <span className="text-[10px] text-[#667085]">Chhatrapati Sambhajinagar</span>
            </div>

            <div className="space-y-3 mt-3">
              {applications.slice(0, 3).map(app => (
                <div key={app.id} className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#17202A]">{app.approvalName}</span>
                      <p className="text-[11px] text-[#667085] font-mono">{app.applicationId} • {app.department}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#D9E1E8] text-[11px]">
                    <span className="text-[#667085]">Submitted: {app.submittedDate}</span>
                    <Link
                      href={`/officer/applications/${app.applicationId}`}
                      className="font-bold text-[#1F4E79] hover:underline flex items-center gap-1"
                    >
                      <span>Review Dossier</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <Link
              href="/officer/applications"
              className="w-full py-2 px-3 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold text-center block transition-colors shadow-xs"
            >
              Open Full Scrutiny Queue →
            </Link>
          </div>
        </div>

      </div>

      {/* Upcoming Scheduled Inspections Preview */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#D9E1E8] flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
              Upcoming Site Safety & Environmental Inspections
            </h2>
            <p className="text-[11px] text-[#667085]">Field inspection visits assigned to circle officers</p>
          </div>
          <Link
            href="/officer/inspections"
            className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center gap-1"
          >
            <span>Full Inspection Calendar</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Application & Clearance</th>
                <th className="py-3 px-4">Enterprise / Site</th>
                <th className="py-3 px-4">Scheduled Date & Time</th>
                <th className="py-3 px-4">Assigned Inspector</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {inspections.map(insp => (
                <tr key={insp.id} className="hover:bg-[#F5F7FA]">
                  <td className="py-3 px-4 font-bold text-[#17324D]">{insp.approvalName}</td>
                  <td className="py-3 px-4 text-[#475467]">{insp.businessName}</td>
                  <td className="py-3 px-4 font-semibold text-[#17202A]">{insp.scheduledDate} ({insp.timeSlot})</td>
                  <td className="py-3 px-4 text-[#475467]">{insp.officerName}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={insp.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/officer/inspections"
                      className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-[#1F4E79] border border-[#D9E1E8] text-xs font-semibold transition-colors"
                    >
                      Manage Slot
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
