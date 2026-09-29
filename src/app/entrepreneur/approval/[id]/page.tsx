'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ArrowLeft, Clock, Building, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ApprovalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { approvals } = useAppStore();

  const approval = approvals.find(a => a.id === id || a.approvalCode === id) || approvals[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex items-center justify-between">
        <div>
          <Link
            href="/entrepreneur/approval-roadmap"
            className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Approval Roadmap</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">{approval.approvalName}</h1>
            <StatusBadge status={approval.status} />
          </div>
          <p className="text-xs text-[#667085] mt-0.5">{approval.authority} ({approval.department})</p>
        </div>

        <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2.5 py-1 rounded border border-[#c8dced]">
          {approval.approvalCode}
        </span>
      </div>

      <div className="bg-white border border-[#D9E1E8] rounded p-6 shadow-xs space-y-6 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5F7FA] rounded border border-[#D9E1E8]">
          <div>
            <span className="text-[#667085]">Statutory Timeline:</span>
            <p className="font-bold text-[#17202A] mt-0.5">{approval.estimatedTimelineDays} Days</p>
          </div>
          <div>
            <span className="text-[#667085]">Priority Level:</span>
            <p className="font-bold text-[#17202A] mt-0.5">{approval.priority}</p>
          </div>
          <div>
            <span className="text-[#667085]">Statutory Source:</span>
            <p className="font-bold text-[#17202A] mt-0.5">{approval.source}</p>
          </div>
          <div>
            <span className="text-[#667085]">Legal Enactment:</span>
            <p className="font-bold text-[#17202A] mt-0.5">{approval.legalReference}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-1.5">Why This Approval Applies</h3>
          <p className="text-[#344054] leading-relaxed p-3.5 rounded bg-[#F5F7FA] border border-[#D9E1E8]">
            {approval.whyApplies}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-2">Required Enclosures</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#344054]">
            {approval.requiredDocuments.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-[#D9E1E8] flex items-center justify-between">
          <Link
            href="/entrepreneur/documents"
            className="px-4 py-2 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>Upload Documents for this Approval</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
