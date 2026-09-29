'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SlaIndicator } from '@/components/ui/SlaIndicator';
import { 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Send, 
  CalendarCheck, 
  ShieldCheck, 
  Check, 
  Eye,
  Sparkles,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { ApplicationStatus } from '@/types';

export default function OfficerApplicationReviewPage() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;

  const { applications, businessProfile, updateApplicationStatus, documents, scheduleInspection } = useAppStore();

  const application = applications.find(a => a.applicationId === appId) || applications[0];

  const [activeAction, setActiveAction] = useState<'Approve' | 'Clarification' | 'Incomplete' | 'Inspection'>('Approve');
  const [officerNote, setOfficerNote] = useState('');
  const [actionDone, setActionDone] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Officer Decision Submissions
  const handleApprove = () => {
    updateApplicationStatus(application.applicationId, 'Approved', officerNote || 'All statutory requirements and technical drawings cleared by Reviewing Officer.');
    setSuccessMessage('Clearance Approved and Digital Certificate Dispatched!');
    setActionDone(true);
  };

  const handleRequestClarification = () => {
    if (!officerNote.trim()) {
      alert('Please specify the deficiency note for the applicant.');
      return;
    }
    updateApplicationStatus(application.applicationId, 'Query Raised', officerNote);
    setSuccessMessage('Clarification Notice Dispatched to Applicant!');
    setActionDone(true);
  };

  const handleMarkIncomplete = () => {
    updateApplicationStatus(application.applicationId, 'Documents Required', officerNote || 'Marked incomplete. Missing certified attachments.');
    setSuccessMessage('Application marked as Documents Required.');
    setActionDone(true);
  };

  const handleScheduleInspection = () => {
    updateApplicationStatus(application.applicationId, 'Inspection Pending', 'Inspection order issued for site verification.');
    scheduleInspection({
      id: `insp-${Date.now()}`,
      applicationId: application.applicationId,
      approvalName: application.approvalName,
      businessName: businessProfile.businessName,
      department: application.department,
      scheduledDate: '2026-10-12',
      timeSlot: '11:30 AM - 01:30 PM',
      officerName: 'Suresh Patil',
      officerDesignation: 'Joint Director of Industries (Chhatrapati Sambhajinagar)',
      status: 'Scheduled',
      venue: `Plot No. E-42, ${businessProfile.industrialArea}, ${businessProfile.city}`,
      notes: officerNote || 'Site physical inspection to verify setback passages and environmental treatment plant.',
    });
    setSuccessMessage('Site Safety Inspection Scheduled & Officer Dispatched!');
    setActionDone(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs">
            <Link href="/officer/applications" className="text-[#1F4E79] hover:underline flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Scrutiny Queue</span>
            </Link>
            <span className="text-[#D9E1E8]">/</span>
            <span className="font-mono text-[#667085]">{application?.applicationId}</span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">{application?.approvalName}</h1>
            <StatusBadge status={application?.status} />
          </div>
          <p className="text-xs text-[#667085] mt-0.5">
            Applicant: <strong className="text-[#17202A]">{businessProfile.businessName}</strong> ({businessProfile.industry})
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-[#667085] block">Statutory RTS SLA:</span>
          <div className="mt-1">
            <SlaIndicator elapsedDays={application?.elapsedDays || 0} slaDays={application?.slaDays || 30} />
          </div>
        </div>
      </div>

      {actionDone && (
        <div className="p-4 bg-[#e8f5ef] border border-[#c2e5d5] rounded text-xs text-[#16855b] font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#16855b]" />
            <span>{successMessage}</span>
          </div>
          <Link href="/officer/applications" className="underline font-bold">
            Return to Queue →
          </Link>
        </div>
      )}

      {/* 3-COLUMN SPLIT DESK REVIEW INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN 1: Application & Enterprise Dossier (Left) */}
        <div className="lg:col-span-4 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-[#D9E1E8] pb-3">
            <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#1F4E79]" />
              <span>Enterprise Profile Info</span>
            </h2>
            <p className="text-[11px] text-[#667085]">Verified enterprise master parameters</p>
          </div>

          <div className="space-y-2.5 text-xs text-[#344054]">
            <div>
              <span className="text-[#667085] text-[11px]">Business Entity:</span>
              <p className="font-bold text-[#17202A]">{businessProfile.businessName}</p>
            </div>
            <div>
              <span className="text-[#667085] text-[11px]">Industrial Classification:</span>
              <p className="font-semibold text-[#17202A]">{businessProfile.industry}</p>
            </div>
            <div>
              <span className="text-[#667085] text-[11px]">Site Location:</span>
              <p className="font-semibold text-[#17202A]">{businessProfile.industrialArea}, {businessProfile.district}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#D9E1E8]">
              <div>
                <span className="text-[#667085] text-[11px]">Investment Outlay:</span>
                <p className="font-bold text-[#17324D]">₹{businessProfile.investmentAmountCr} Cr</p>
              </div>
              <div>
                <span className="text-[#667085] text-[11px]">Direct Workers:</span>
                <p className="font-bold text-[#17324D]">{businessProfile.employeesCount} Personnel</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#D9E1E8]">
              <div>
                <span className="text-[#667085] text-[11px]">Power Contract:</span>
                <p className="font-bold text-[#17324D]">{businessProfile.electricityRequirementKw} kW</p>
              </div>
              <div>
                <span className="text-[#667085] text-[11px]">Pollution Class:</span>
                <p className="font-bold text-amber-700">{businessProfile.pollutionCategory} Category</p>
              </div>
            </div>
          </div>

          {/* Audit Trail Snippet */}
          <div className="pt-3 border-t border-[#D9E1E8]">
            <h3 className="text-[11px] font-bold text-[#17324D] uppercase tracking-wider mb-2">
              Recent Scrutiny Trail
            </h3>
            <div className="space-y-2 text-[11px]">
              {application?.events.slice(-3).map((ev, i) => (
                <div key={i} className="p-2 rounded bg-[#F5F7FA] border border-[#D9E1E8]">
                  <div className="flex items-center justify-between font-semibold text-[#17202A]">
                    <span>{ev.title}</span>
                    <span className="text-[10px] text-[#667085]">{ev.date.split(',')[0]}</span>
                  </div>
                  <p className="text-[#667085] text-[10px] mt-0.5">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: Submitted Documents & Pre-Validation Status (Center) */}
        <div className="lg:col-span-4 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-[#D9E1E8] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1F4E79]" />
                <span>Submitted Documents ({documents.length})</span>
              </h2>
              <p className="text-[11px] text-[#667085]">AI-assisted pre-screen results</p>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {documents.slice(0, 6).map(doc => (
              <div key={doc.id} className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-1.5 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-[#17202A] block leading-tight">{doc.title}</span>
                    <span className="text-[10px] font-mono text-[#667085]">{doc.fileName}</span>
                  </div>
                  <StatusBadge status={doc.verificationStatus} />
                </div>

                {doc.extractedData && (
                  <div className="p-2 bg-white rounded border border-[#D9E1E8] text-[11px] text-[#344054] space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-[#1F4E79]">Machine Extraction (98% Conf)</span>
                      <span className="text-emerald-700 font-bold">✓ Pre-validated</span>
                    </div>
                    <p className="text-[#667085] leading-snug text-[10px]">
                      {doc.extractedData.remarks}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3: Review Decision Panel (Right) */}
        <div className="lg:col-span-4 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F4E79]" />
                <span>Officer Decision Console</span>
              </h2>
              <p className="text-[11px] text-[#667085]">Adjudicate this statutory clearance</p>
            </div>

            {/* Action Tabs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveAction('Approve')}
                className={`py-2 px-2.5 rounded font-bold transition-colors ${
                  activeAction === 'Approve' ? 'bg-[#16855b] text-white' : 'bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] border border-[#D9E1E8]'
                }`}
              >
                ✓ Approve
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('Clarification')}
                className={`py-2 px-2.5 rounded font-bold transition-colors ${
                  activeAction === 'Clarification' ? 'bg-[#d9822b] text-white' : 'bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] border border-[#D9E1E8]'
                }`}
              >
                Raise Query
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('Inspection')}
                className={`py-2 px-2.5 rounded font-bold transition-colors ${
                  activeAction === 'Inspection' ? 'bg-[#1F4E79] text-white' : 'bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] border border-[#D9E1E8]'
                }`}
              >
                Schedule Visit
              </button>

              <button
                type="button"
                onClick={() => setActiveAction('Incomplete')}
                className={`py-2 px-2.5 rounded font-bold transition-colors ${
                  activeAction === 'Incomplete' ? 'bg-[#c93636] text-white' : 'bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] border border-[#D9E1E8]'
                }`}
              >
                Mark Incomplete
              </button>
            </div>

            {/* Officer Observation / Remarks Field */}
            <div className="text-xs">
              <label className="block font-semibold text-[#344054] mb-1">
                Officer Notes / Order Memo:
              </label>
              <textarea
                rows={4}
                value={officerNote}
                onChange={e => setOfficerNote(e.target.value)}
                placeholder={
                  activeAction === 'Approve'
                    ? 'Enter conditions of sanction, ETP discharge thresholds, or formal clearance notes...'
                    : activeAction === 'Clarification'
                    ? 'Detail specific document discrepancies or missing technical plans for applicant response...'
                    : activeAction === 'Inspection'
                    ? 'Specify inspection objectives, focus areas, and required on-site personnel...'
                    : 'List defective enclosures and missing statutory certifications...'
                }
                className="w-full p-2.5 text-xs bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
              />
            </div>
          </div>

          {/* Action Execution Button */}
          <div className="pt-4 border-t border-[#D9E1E8]">
            {activeAction === 'Approve' && (
              <button
                type="button"
                onClick={handleApprove}
                className="w-full py-2.5 px-4 rounded bg-[#16855b] hover:bg-[#126b48] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Execute Formal Approval & Issue Clearance
              </button>
            )}

            {activeAction === 'Clarification' && (
              <button
                type="button"
                onClick={handleRequestClarification}
                className="w-full py-2.5 px-4 rounded bg-[#d9822b] hover:bg-[#b56b20] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Dispatch Deficiency Query to Applicant
              </button>
            )}

            {activeAction === 'Inspection' && (
              <button
                type="button"
                onClick={handleScheduleInspection}
                className="w-full py-2.5 px-4 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Schedule Site Verification Inspection
              </button>
            )}

            {activeAction === 'Incomplete' && (
              <button
                type="button"
                onClick={handleMarkIncomplete}
                className="w-full py-2.5 px-4 rounded bg-[#c93636] hover:bg-[#a82a2a] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Mark Dossier Documents Incomplete
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
