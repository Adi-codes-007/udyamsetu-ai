'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { GovernmentScheme } from '@/types';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Info, 
  IndianRupee, 
  FileText, 
  ArrowRight, 
  X, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Percent
} from 'lucide-react';

function GovernmentSchemesContent() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('id');

  const { schemes, businessProfile } = useAppStore();
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(() => {
    if (highlightId) {
      return schemes.find(s => s.id === highlightId) || schemes[0] || null;
    }
    return schemes[0] || null;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Government Support & Incentives Finder</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              ALGORITHMIC MATCHING
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Potentially relevant schemes and capital incentives matched against your operational profile ({businessProfile.industry}, ₹{businessProfile.investmentAmountCr} Cr in {businessProfile.city}).
          </p>
        </div>

        <div className="text-xs text-[#667085]">
          <span>Prototype matching score: Weighted evaluation model</span>
        </div>
      </div>

      {/* Prototype Legal Disclaimer Alert */}
      <div className="bg-[#edf4fa] border border-[#c8dced] rounded p-3 text-xs text-[#1F4E79] flex items-start gap-2.5">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#1F4E79]" />
        <div className="leading-snug">
          <strong>Illustrative Prototype Data:</strong> Match scores and estimated benefits represent automated feasibility scoring under Maharashtra Industrial Policy guidelines and Central MoFPI schemes. Formal eligibility requires statutory project appraisal by the respective nodal sanctioning committee.
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scheme Cards List */}
        <div className="lg:col-span-7 space-y-4">
          {schemes.map(scheme => {
            const isSelected = selectedScheme?.id === scheme.id;
            return (
              <div
                key={scheme.id}
                className={`bg-white border rounded shadow-xs p-5 transition-all cursor-pointer ${
                  isSelected ? 'border-[#1F4E79] ring-2 ring-[#1F4E79]/20' : 'border-[#D9E1E8] hover:border-[#b8c9d9]'
                }`}
                onClick={() => setSelectedScheme(scheme)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {scheme.matchScore}% Match
                    </span>
                    <h3 className="text-sm font-bold text-[#17324D] mt-2">{scheme.schemeName}</h3>
                    <p className="text-xs text-[#667085] mt-0.5">{scheme.authority}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#667085] bg-[#F5F7FA] px-2 py-0.5 rounded border border-[#D9E1E8]">
                    {scheme.schemeCode}
                  </span>
                </div>

                <div className="mt-3 p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8] text-xs">
                  <span className="font-semibold text-[#17202A] block mb-1">Potential Benefits:</span>
                  <p className="text-[#344054] leading-relaxed">{scheme.potentialBenefits}</p>
                </div>

                <div className="mt-3 space-y-1 text-xs">
                  <span className="font-semibold text-[#17202A] text-[11px]">Potentially relevant because:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {scheme.matchFactors.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[#344054]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16855b] shrink-0" />
                        <span className="text-[11px] truncate">{f.factor}: +{f.scoreAwarded} pts</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D9E1E8] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#667085]">Ref: {scheme.officialReference}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedScheme(scheme); }}
                    className="font-semibold text-[#1F4E79] hover:underline flex items-center gap-1"
                  >
                    <span>View Eligibility Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Eligibility & Criteria Breakdown Panel */}
        <div className="lg:col-span-5 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          {selectedScheme ? (
            <div className="space-y-4">
              <div className="border-b border-[#D9E1E8] pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#1F4E79] font-bold bg-[#edf4fa] px-2 py-0.5 rounded border border-[#c8dced]">
                    {selectedScheme.schemeCode}
                  </span>
                  <span className="text-sm font-bold text-[#16855b]">
                    {selectedScheme.matchScore}% Feasibility
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#17324D] mt-2">{selectedScheme.schemeName}</h3>
                <p className="text-xs text-[#667085]">{selectedScheme.authority}</p>
              </div>

              {/* Match Factors Scoring Matrix */}
              <div>
                <h4 className="text-xs font-bold text-[#17202A] uppercase tracking-wider mb-2">
                  Algorithmic Scoring Matrix (100 Pt Model)
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedScheme.matchFactors.map((factor, idx) => (
                    <div key={idx} className="p-2.5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
                      <div className="flex items-center justify-between font-semibold text-[#17202A]">
                        <span>{factor.factor}</span>
                        <span className="text-[#16855b] font-mono">{factor.scoreAwarded} / {factor.maxScore} pts</span>
                      </div>
                      <p className="text-[11px] text-[#667085] mt-0.5 leading-snug">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Incentives List */}
              <div className="text-xs space-y-1.5">
                <span className="font-bold text-[#17202A] uppercase tracking-wider text-[10px] block">
                  Detailed Incentive Components
                </span>
                <ul className="list-disc pl-5 text-[#475467] space-y-1 text-[11px]">
                  {selectedScheme.detailedIncentives.map((inc, i) => (
                    <li key={i}>{inc}</li>
                  ))}
                </ul>
              </div>

              {/* Required Documents for Application */}
              <div className="text-xs space-y-1.5">
                <span className="font-bold text-[#17202A] uppercase tracking-wider text-[10px] block">
                  Mandatory Submission Enclosures
                </span>
                <ul className="list-disc pl-5 text-[#475467] space-y-1 text-[11px]">
                  {selectedScheme.requiredDocuments.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#667085]">
              Select a scheme on the left to inspect its criteria breakdown.
            </div>
          )}

          <div className="pt-4 border-t border-[#D9E1E8] mt-4 space-y-2">
            <a
              href="https://maitri.mahaonline.gov.in"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Apply via MAITRI Single Window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-[10px] text-center text-[#667085]">
              Official Reference: {selectedScheme?.officialReference || 'State Single Window Guidelines'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function GovernmentSchemesPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-[#667085]">Loading Government Schemes...</div>}>
      <GovernmentSchemesContent />
    </React.Suspense>
  );
}
