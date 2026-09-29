'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ApplicationItem, ApplicationStatus } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SlaIndicator } from '@/components/ui/SlaIndicator';
import { 
  ClipboardList, 
  Search, 
  Clock, 
  Building, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Calendar, 
  X, 
  ArrowRight,
  ShieldCheck,
  FileText,
  UserCheck
} from 'lucide-react';

function ApplicationTrackerContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('id');

  const { applications, currentUser } = useAppStore();

  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Query Raised' | 'Inspection Pending' | 'Approved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(() => {
    if (highlightId) {
      return applications.find(a => a.applicationId === highlightId) || applications[0] || null;
    }
    return applications[0] || null;
  });

  const filteredApps = applications.filter(app => {
    if (activeTab === 'In Progress' && app.status !== 'In Review') return false;
    if (activeTab === 'Query Raised' && app.status !== 'Query Raised' && app.status !== 'Documents Required') return false;
    if (activeTab === 'Inspection Pending' && app.status !== 'Inspection Pending') return false;
    if (activeTab === 'Approved' && app.status !== 'Approved') return false;

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
            <h1 className="text-xl font-bold text-[#17324D]">Inter-Departmental Application Tracker</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Live Gateway
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Real-time status tracking and statutory SLA monitoring across MPCB, Directorate of Fire Services, DISH, and MSEDCL.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#667085]">
          <span>Prototype Notice: All SLA timings reflect statutory RTS norms.</span>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="bg-white border border-[#D9E1E8] rounded p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {(['All', 'In Progress', 'Query Raised', 'Inspection Pending'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === tab
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
            placeholder="Search by ID or Department..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
          />
        </div>
      </div>

      {/* Main Grid: Application List Table & Live Milestone Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Applications Table */}
        <div className="lg:col-span-7 bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#D9E1E8]">
            <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
              Submitted Clearances Dossiers ({filteredApps.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-3">Application ID & Name</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">SLA Status</th>
                  <th className="py-3 px-3 text-right">Scrutiny</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
                {filteredApps.map(app => {
                  const isSelected = selectedApp?.id === app.id;
                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#edf4fa]' : 'hover:bg-[#F5F7FA]'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#17324D]">{app.approvalName}</span>
                          <span className="text-[10px] font-mono text-[#667085]">{app.applicationId}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[#475467] font-medium">{app.department}</td>
                      <td className="py-3 px-3">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="py-3 px-3">
                        <SlaIndicator elapsedDays={app.elapsedDays} slaDays={app.slaDays} />
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            isSelected ? 'bg-[#1F4E79] text-white' : 'bg-white border border-[#D9E1E8] text-[#1F4E79]'
                          }`}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Detailed Application Milestone Timeline */}
        <div className="lg:col-span-5 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          {selectedApp ? (
            <div className="space-y-4">
              <div className="border-b border-[#D9E1E8] pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded border border-[#c8dced]">
                    {selectedApp.applicationId}
                  </span>
                  <StatusBadge status={selectedApp.status} />
                </div>
                <h3 className="text-sm font-bold text-[#17324D] mt-2">{selectedApp.approvalName}</h3>
                <p className="text-xs text-[#667085]">{selectedApp.department}</p>
              </div>

              {/* Scrutiny Stage and SLA Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs p-3 bg-[#F5F7FA] rounded border border-[#D9E1E8]">
                <div>
                  <span className="text-[#667085]">Current Stage:</span>
                  <p className="font-bold text-[#17202A] mt-0.5">{selectedApp.currentStage}</p>
                </div>
                <div>
                  <span className="text-[#667085]">Assigned Officer:</span>
                  <p className="font-bold text-[#17202A] mt-0.5">{selectedApp.assignedOfficer || 'Desk Officer'}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-[#D9E1E8]">
                  <span className="text-[#667085] block mb-1">Right to Public Services (RTS) SLA:</span>
                  <SlaIndicator elapsedDays={selectedApp.elapsedDays} slaDays={selectedApp.slaDays} />
                </div>
              </div>

              {/* Deficiency Notice if Query Raised */}
              {selectedApp.queryNotes && (
                <div className="p-3 rounded bg-[#fdfaf5] border border-[#f6deb9] text-xs text-[#c06c1c]">
                  <strong>Department Clarification Note:</strong>
                  <p className="mt-0.5 leading-relaxed">{selectedApp.queryNotes}</p>
                </div>
              )}

              {/* Historical Audit Event Timeline */}
              <div>
                <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-3">
                  Departmental Scrutiny Trail
                </h4>

                <div className="space-y-3 relative before:absolute before:inset-0 before:left-2.5 before:w-0.5 before:bg-[#D9E1E8] pl-6 text-xs">
                  {selectedApp.events.map((event, idx) => (
                    <div key={event.id || idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#1F4E79] ring-4 ring-white" />
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#17202A]">{event.title}</span>
                          <span className="text-[10px] text-[#667085]">{event.date}</span>
                        </div>
                        <p className="text-[11px] text-[#475467] mt-0.5 leading-relaxed">{event.description}</p>
                        <span className="text-[10px] text-[#667085] font-medium mt-0.5 block">Actor: {event.actor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#667085]">
              Select an application on the left to inspect its complete SLA history.
            </div>
          )}

          <div className="pt-4 border-t border-[#D9E1E8] mt-4 flex items-center justify-between text-xs text-[#667085]">
            <span>Need official escalation?</span>
            <span className="font-semibold text-[#1F4E79]">Single Window Grievance Cell</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ApplicationTrackerPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-[#667085]">Loading Application Tracker...</div>}>
      <ApplicationTrackerContent />
    </React.Suspense>
  );
}
