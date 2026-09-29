'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { InspectionItem } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Plus, 
  X, 
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function InspectionManagementPage() {
  const { inspections, updateInspectionStatus, scheduleInspection, businessProfile } = useAppStore();

  const [selectedInsp, setSelectedInsp] = useState<InspectionItem | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newInspection, setNewInspection] = useState<Partial<InspectionItem>>({
    approvalName: 'Fire Safety NOC (Provisional)',
    businessName: businessProfile.businessName,
    department: 'Directorate of Maharashtra Fire Services',
    scheduledDate: '2026-10-15',
    timeSlot: '11:00 AM - 01:00 PM',
    officerName: 'Suresh Patil',
    officerDesignation: 'Joint Director of Industries / Inspecting Officer',
    venue: `Plot No. E-42, ${businessProfile.industrialArea}, ${businessProfile.city}`,
    notes: 'Verify 6m clear perimeter driveway and ETP civil tank foundation.',
  });

  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleComplete = (id: string) => {
    updateInspectionStatus(id, 'Completed');
    setFeedbackMsg('Site inspection marked as Completed & Report filed in dossier.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleReschedule = (id: string, newDate: string) => {
    updateInspectionStatus(id, 'Rescheduled', newDate);
    setFeedbackMsg(`Inspection rescheduled to ${newDate}.`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InspectionItem = {
      id: `insp-${Date.now()}`,
      applicationId: 'APP-2026-00219',
      approvalName: newInspection.approvalName || 'Fire Safety NOC',
      businessName: newInspection.businessName || businessProfile.businessName,
      department: newInspection.department || 'Directorate of Fire Services',
      scheduledDate: newInspection.scheduledDate || '2026-10-15',
      timeSlot: newInspection.timeSlot || '10:00 AM - 12:00 PM',
      officerName: newInspection.officerName || 'Suresh Patil',
      officerDesignation: newInspection.officerDesignation || 'Inspecting Officer',
      status: 'Scheduled',
      venue: newInspection.venue || 'Plot E-42, MIDC Waluj',
      notes: newInspection.notes || 'Routine physical verification.',
    };

    scheduleInspection(created);
    setShowScheduleModal(false);
    setFeedbackMsg('New site inspection visit scheduled successfully.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Inspection Scheduling & Field Management</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
              Field Operations
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Coordinate joint site inspections across MPCB, Fire Services, DISH, and Revenue authorities to eliminate repeated applicant visits.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 rounded text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Site Visit</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-[#e8f5ef] border border-[#c2e5d5] rounded text-xs text-[#16855b] font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Inspections Table */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#D9E1E8]">
          <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Circle Field Inspection Roster ({inspections.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Clearance & Application</th>
                <th className="py-3 px-4">Enterprise & Site Venue</th>
                <th className="py-3 px-4">Date & Time Slot</th>
                <th className="py-3 px-4">Inspecting Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {inspections.map(insp => (
                <tr key={insp.id} className="hover:bg-[#F5F7FA]">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#17324D]">{insp.approvalName}</span>
                      <span className="text-[10px] text-[#667085]">{insp.department}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#17202A]">{insp.businessName}</span>
                      <span className="text-[11px] text-[#667085] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#1F4E79]" /> {insp.venue}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#17202A]">{insp.scheduledDate}</span>
                      <span className="text-[11px] text-[#667085]">{insp.timeSlot}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#17202A]">{insp.officerName}</span>
                      <span className="text-[10px] text-[#667085]">{insp.officerDesignation}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={insp.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {insp.status !== 'Completed' && (
                        <button
                          onClick={() => handleComplete(insp.id)}
                          className="px-2.5 py-1 rounded bg-[#16855b] hover:bg-[#126b48] text-white text-[11px] font-semibold"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleReschedule(insp.id, '2026-10-18')}
                        className="px-2 py-1 rounded bg-white hover:bg-slate-50 text-[#344054] border border-[#D9E1E8] text-[11px] font-semibold"
                      >
                        Reschedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHEDULE INSPECTION MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-[#D9E1E8] rounded shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <h3 className="text-base font-bold text-[#17324D]">Schedule Site Inspection</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInspection} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#344054] mb-1">Clearance Purpose</label>
                <input
                  type="text"
                  value={newInspection.approvalName}
                  onChange={e => setNewInspection({ ...newInspection, approvalName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#344054] mb-1">Target Date & Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    required
                    value={newInspection.scheduledDate}
                    onChange={e => setNewInspection({ ...newInspection, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                  />
                  <input
                    type="text"
                    required
                    value={newInspection.timeSlot}
                    onChange={e => setNewInspection({ ...newInspection, timeSlot: e.target.value })}
                    placeholder="e.g. 11:00 AM - 01:00 PM"
                    className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#344054] mb-1">Assigned Inspecting Officer</label>
                <input
                  type="text"
                  required
                  value={newInspection.officerName}
                  onChange={e => setNewInspection({ ...newInspection, officerName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#344054] mb-1">Site Venue Address</label>
                <input
                  type="text"
                  required
                  value={newInspection.venue}
                  onChange={e => setNewInspection({ ...newInspection, venue: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#344054] mb-1">Inspection Objectives & Scope</label>
                <textarea
                  rows={2}
                  value={newInspection.notes}
                  onChange={e => setNewInspection({ ...newInspection, notes: e.target.value })}
                  className="w-full p-2 bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div className="pt-3 border-t border-[#D9E1E8] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 rounded bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold shadow-xs"
                >
                  Issue Inspection Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
