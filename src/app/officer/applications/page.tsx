'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SlaIndicator } from '@/components/ui/SlaIndicator';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Building2,
  FileCheck
} from 'lucide-react';

export default function OfficerApplicationsQueuePage() {
  const { applications, businessProfile } = useAppStore();

  const [activeFilter, setActiveFilter] = useState<'All' | 'In Review' | 'Inspection Pending' | 'Documents Required'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = applications.filter(app => {
    if (activeFilter !== 'All' && app.status !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        app.applicationId.toLowerCase().includes(q) ||
        app.approvalName.toLowerCase().includes(q) ||
        app.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Departmental Application Scrutiny Queue</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Single Window Scrutiny
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Review applicant submissions, inspect pre-validated statutory documents, raise clarifications, and issue clearances.
          </p>
        </div>

        <span className="text-xs text-[#667085] font-medium">
          Circle: <strong>Chhatrapati Sambhajinagar</strong>
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D9E1E8] rounded p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {(['All', 'In Review', 'Inspection Pending', 'Documents Required'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeFilter === tab
                  ? 'bg-[#1F4E79] text-white font-bold'
                  : 'bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] font-medium'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Application ID, Clearance..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Application ID & Clearance</th>
                <th className="py-3 px-4">Enterprise / Applicant</th>
                <th className="py-3 px-4">Department Wing</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">SLA Elapsed</th>
                <th className="py-3 px-4 text-right">Desk Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-[#F5F7FA] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#17324D]">{app.approvalName}</span>
                      <span className="text-[11px] font-mono text-[#667085]">{app.applicationId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#17202A]">{businessProfile.businessName}</span>
                      <span className="text-[11px] text-[#667085]">Rahul Sharma (Partner)</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475467] font-medium">{app.department}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="py-3 px-4">
                    <SlaIndicator elapsedDays={app.elapsedDays} slaDays={app.slaDays} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/officer/applications/${app.applicationId}`}
                      className="px-3 py-1.5 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>Review Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
