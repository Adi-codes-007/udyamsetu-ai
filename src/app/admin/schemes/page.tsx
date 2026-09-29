'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Award, Plus, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AdminSchemesPage() {
  const { schemes } = useAppStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Statutory Incentive Schemes Management</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              POLICY REPOSITORIES
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Configure matching algorithms, sector weights, and capital subsidy formulas for Maharashtra and Central MSME policies.
          </p>
        </div>

        <span className="text-xs text-[#667085]">Active Schemes: <strong>{schemes.length}</strong></span>
      </div>

      <div className="space-y-4">
        {schemes.map(sch => (
          <div key={sch.id} className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded border border-[#c8dced]">
                  {sch.schemeCode}
                </span>
                <h2 className="text-sm font-bold text-[#17324D] mt-1">{sch.schemeName}</h2>
                <p className="text-xs text-[#667085]">{sch.authority}</p>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Active Policy
              </span>
            </div>

            <div className="p-3 bg-[#F5F7FA] rounded border border-[#D9E1E8] text-xs">
              <strong className="text-[#17202A] block mb-1">Incentive Provisions:</strong>
              <p className="text-[#475467] leading-relaxed">{sch.potentialBenefits}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#667085]">
              <span>Official Reference: <code>{sch.officialReference}</code></span>
              <a
                href={sch.applicationPortalUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#1F4E79] hover:underline flex items-center gap-1"
              >
                <span>View State Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
