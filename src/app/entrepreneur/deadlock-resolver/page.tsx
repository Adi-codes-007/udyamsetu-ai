'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Sparkles, 
  FileCheck2, 
  Scale, 
  Layers, 
  Clock, 
  Building2, 
  Flame, 
  Activity, 
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface AuditConflict {
  id: string;
  deptA: string;
  deptB: string;
  fieldA: string;
  valA: string;
  fieldB: string;
  valB: string;
  severity: 'Critical' | 'Major' | 'Warning';
  statutoryClause: string;
  estimatedDelayDays: number;
  aiHarmonizationFix: string;
  resolved: boolean;
}

export default function DeadlockResolverPage() {
  const { businessProfile } = useAppStore();

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(true);
  const [selectedConflict, setSelectedConflict] = useState<string>('conflict-1');

  const [conflicts, setConflicts] = useState<AuditConflict[]>([
    {
      id: 'conflict-1',
      deptA: 'MSEDCL (State Power Board)',
      deptB: 'MPCB (Pollution Control Board)',
      fieldA: 'Sanctioned Connected Load',
      valA: '350 kW',
      fieldB: 'Effluent Treatment + Cold Storage Load',
      valB: '415 kW (Peak)',
      severity: 'Critical',
      statutoryClause: 'MSEDCL Supply Code Regulation 4.2 & Water (Prevention of Pollution) Act Sec 25',
      estimatedDelayDays: 45,
      aiHarmonizationFix: 'Auto-adjust sanctioned demand to 420 kW with Dual-Feeder Solar HT arrangement, synchronizing DPR Table 4.3 with Form 1A.',
      resolved: false,
    },
    {
      id: 'conflict-2',
      deptA: 'MIDC Town Planning',
      deptB: 'Directorate of Maharashtra Fire Services',
      fieldA: 'Plot Side Setback Margins',
      valA: '6.00 Metres',
      fieldB: 'Hydraulic Platform / Turntable Driveway',
      valB: '7.50 Metres (Required for Plot > 2,000 m²)',
      severity: 'Critical',
      statutoryClause: 'National Building Code 2016 Part IV (Fire & Life Safety) Clause 4.5.2',
      estimatedDelayDays: 60,
      aiHarmonizationFix: 'Re-align building footprint by +1.5m on North perimeter without reducing production floor space, preserving MIDC FSI ratio of 1.0.',
      resolved: false,
    },
    {
      id: 'conflict-3',
      deptA: 'Central Ground Water Authority (CGWA)',
      deptB: 'MPCB Water Cess & Consent',
      fieldA: 'Proposed Borewell Extraction',
      valA: '18 KLD (Kilolitres/Day)',
      fieldB: 'ETP Treated Recycled Water Credit',
      valB: 'Zero Liquid Discharge (ZLD) Assumption',
      severity: 'Major',
      statutoryClause: 'CGWA Guidelines 2020 Sec 3.1 & MPCB Orange Category Water Budgeting',
      estimatedDelayDays: 30,
      aiHarmonizationFix: 'Deduct 10 KLD tertiary RO permeate recovery from raw water abstraction quota, cutting CGWA abstraction charges by 55%.',
      resolved: false,
    },
  ]);

  const [allHarmonized, setAllHarmonized] = useState(false);
  const [showDeemedEscrowModal, setShowDeemedEscrowModal] = useState(false);

  // Trigger Live Audit Simulation
  const handleReRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditComplete(true);
    }, 1200);
  };

  // Harmonize Individual Conflict
  const handleHarmonizeSingle = (id: string) => {
    setConflicts(prev =>
      prev.map(c => (c.id === id ? { ...c, resolved: true } : c))
    );
  };

  // 1-Click Multi-Dossier Harmonization
  const handleHarmonizeAll = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setConflicts(prev => prev.map(c => ({ ...c, resolved: true })));
      setAllHarmonized(true);
      setIsAuditing(false);
    }, 1000);
  };

  const resolvedCount = conflicts.filter(c => c.resolved).length;
  const totalDelayPrevented = conflicts
    .filter(c => c.resolved)
    .reduce((acc, curr) => acc + curr.estimatedDelayDays, 0);

  const activeConflictObj = conflicts.find(c => c.id === selectedConflict) || conflicts[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D] flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Inter-Departmental Deadlock & Cross-Audit Engine</span>
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              UdyamSetu Patent-Pending Innovation
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 max-w-3xl">
            Detects statutory contradictions and data inconsistencies across all 7 regulatory departments <em>before</em> submission, eliminating circular queries that stall industrial setups by 6–18 months.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReRunAudit}
            disabled={isAuditing}
            className="px-3 py-2 text-xs font-semibold bg-[#edf4fa] hover:bg-[#dce9f5] text-[#1F4E79] border border-[#b8cde0] rounded flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Auditing Dossiers...' : 'Re-Run Cross-Audit'}</span>
          </button>

          <button
            onClick={() => setShowDeemedEscrowModal(true)}
            className="px-3.5 py-2 text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white rounded shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>RTS Deemed Escrow Guard</span>
          </button>
        </div>
      </div>

      {/* High-Level Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Cross-Dossier Status</span>
            <Activity className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-xl font-bold text-[#17202A] mt-2">
            {resolvedCount === conflicts.length ? '100% Zero-Defect' : `${conflicts.length - resolvedCount} Active Conflicts`}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px]">
            {resolvedCount === conflicts.length ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All 7 depts synchronized
              </span>
            ) : (
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Potential clearance stall
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Total Delay Prevented</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-emerald-700 mt-2">
            {totalDelayPrevented > 0 ? `-${totalDelayPrevented} Days Saved` : '0 Days'}
          </p>
          <p className="text-[11px] text-[#667085] mt-1">
            Eliminates sequential resubmission cycles
          </p>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Critical Path Compression</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xl font-bold text-[#17202A] mt-2">
            185d → 42d
          </p>
          <p className="text-[11px] text-purple-700 font-semibold mt-1">
            77% faster via Parallel Escrow Filing
          </p>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Statutory SLA Compliance</span>
            <Scale className="w-4 h-4 text-[#1F4E79]" />
          </div>
          <p className="text-xl font-bold text-[#17202A] mt-2">
            RTS Act 2015
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            Deemed Approval Protected
          </p>
        </div>
      </div>

      {/* Main Analysis Section: Split View of Inconsistencies & AI Resolution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Conflict Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Detected Inter-Agency Inconsistencies ({conflicts.length})</span>
            </h2>
            
            {!allHarmonized && (
              <button
                type="button"
                onClick={handleHarmonizeAll}
                className="text-[11px] font-bold text-[#1F4E79] hover:text-[#17324D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Auto-Harmonize All</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {conflicts.map(c => {
              const isSelected = c.id === selectedConflict;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConflict(c.id)}
                  className={`p-3.5 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#1F4E79] bg-white ring-2 ring-[#1F4E79]/15 shadow-xs'
                      : 'border-[#D9E1E8] bg-white hover:border-[#b8cde0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      {c.severity} Contradiction
                    </span>
                    {c.resolved ? (
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Harmonized
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-rose-600">
                        Stall: ~{c.estimatedDelayDays} Days
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-[#17202A] leading-snug">
                    {c.deptA} ⚡ {c.deptB}
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] bg-[#F5F7FA] p-2 rounded border border-[#E5E9F0]">
                    <div>
                      <span className="text-[#667085] block truncate">{c.fieldA}:</span>
                      <span className="font-semibold text-[#17202A] font-mono">{c.valA}</span>
                    </div>
                    <div>
                      <span className="text-[#667085] block truncate">{c.fieldB}:</span>
                      <span className="font-semibold text-rose-700 font-mono">{c.valB}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Explainer Box */}
          <div className="p-3.5 rounded bg-[#edf4fa] border border-[#c8dced] text-xs text-[#17324D]">
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <Layers className="w-4 h-4 text-[#1F4E79]" />
              Why this happens in Single-Window Portals:
            </p>
            <p className="text-[11px] text-[#475467] leading-relaxed">
              Standard state portals merely host PDF forms without reconciling inter-agency mathematical balances. When MPCB reviews power capacity or Fire reviews setbacks, discrepancies trigger formal queries, freezing the statutory SLA counter.
            </p>
          </div>
        </div>

        {/* Right Column: Deep Inspection & Automated Harmonization Workspace */}
        <div className="lg:col-span-7 bg-white border border-[#D9E1E8] rounded p-6 shadow-xs space-y-5">
          <div className="flex items-start justify-between pb-4 border-b border-[#D9E1E8]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#667085]">
                Cross-Department Scrutiny Dossier
              </span>
              <h3 className="text-base font-bold text-[#17202A] mt-0.5">
                {activeConflictObj.deptA} vs {activeConflictObj.deptB}
              </h3>
            </div>
            
            {activeConflictObj.resolved ? (
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Synchronized & Zero-Defect
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Active Rejection Risk
              </span>
            )}
          </div>

          {/* Statutory Ground of Contradiction */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wide">
              Statutory Basis & Legal Conflict
            </h4>
            <div className="p-3 rounded bg-[#FAF5FF] border border-purple-200 text-xs text-purple-950 font-mono leading-relaxed">
              {activeConflictObj.statutoryClause}
            </div>
          </div>

          {/* Side-by-Side Parameter Discrepancy Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                Authority A: {activeConflictObj.deptA}
              </span>
              <p className="text-xs font-semibold text-[#17202A] mt-1">{activeConflictObj.fieldA}</p>
              <p className="text-base font-bold text-[#1F4E79] font-mono mt-1">{activeConflictObj.valA}</p>
              <p className="text-[11px] text-[#667085] mt-1">Source: Portal Form 1 Application Schedule</p>
            </div>

            <div className="p-3.5 rounded border border-rose-200 bg-rose-50/50">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                Authority B: {activeConflictObj.deptB}
              </span>
              <p className="text-xs font-semibold text-[#17202A] mt-1">{activeConflictObj.fieldB}</p>
              <p className="text-base font-bold text-rose-700 font-mono mt-1">{activeConflictObj.valB}</p>
              <p className="text-[11px] text-rose-700/80 mt-1">Source: Detailed Project Report (DPR) Annexure C</p>
            </div>
          </div>

          {/* AI Harmonization Recommendation */}
          <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                UdyamSetu Auto-Harmonization Solution
              </h4>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed font-sans">
              {activeConflictObj.aiHarmonizationFix}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-emerald-800 font-medium">
                Saves an estimated <strong className="underline">{activeConflictObj.estimatedDelayDays} days</strong> of bureaucratic queries.
              </span>
              
              {!activeConflictObj.resolved ? (
                <button
                  type="button"
                  onClick={() => handleHarmonizeSingle(activeConflictObj.id)}
                  className="px-3.5 py-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Apply Harmonization to Dossier</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Dossier Updated & Signed
                </span>
              )}
            </div>
          </div>

          {/* Critical Path Visualizer Comparison */}
          <div className="pt-3 border-t border-[#D9E1E8] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#17324D]">Statutory Clearance Timeline Comparison</span>
              <span className="text-emerald-700 font-bold">-143 Days Timeline Reduction</span>
            </div>

            {/* Traditional Sequential Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#667085]">
                <span>Traditional Sequential Portals (With Query Cycles)</span>
                <span className="font-mono font-semibold">185 Days</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-rose-500 h-full w-[100%]" title="Sequential queries" />
              </div>
            </div>

            {/* UdyamSetu Parallel Optimized Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] text-[#1F4E79] font-semibold">
                <span>UdyamSetu Pre-Audited Parallel Submission</span>
                <span className="font-mono font-bold text-emerald-700">42 Days (SLA Capped)</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full w-[23%]" title="Harmonized Parallel Pipeline" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* RTS Deemed Approval Escrow Modal */}
      {showDeemedEscrowModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D9E1E8] rounded-lg max-w-2xl w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#17324D] text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#17202A]">
                    Maharashtra Right to Public Services Act (RTS 2015)
                  </h3>
                  <p className="text-xs text-[#667085]">Statutory Deemed Approval Escrow Certificate Protocol</p>
                </div>
              </div>
              <button
                onClick={() => setShowDeemedEscrowModal(false)}
                className="text-[#667085] hover:text-[#17202A] text-sm font-bold px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded bg-[#FAF5FF] border border-purple-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-purple-900">
                <span>ESCROW TOKEN: MH-RTS-2026-99214-DEEMED</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">STATUTORY VALIDITY ACTIVE</span>
              </div>
              <p className="text-purple-950 leading-relaxed">
                Under Section 4(2) of the Maharashtra Right to Public Services Act 2015, each notified public authority (MPCB, DISH, MIDC, Fire) is mandated to issue statutory clearances within notified SLA limits (30 days for CTE). If no rejection or query is served within this statutory window, UdyamSetu cryptographic escrow unlocks the <strong>Deemed Approval Certificate</strong>, recognized in law as full consent to proceed.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#17202A]">Escrow SLA Ledger:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded border border-[#D9E1E8] bg-[#F5F7FA] flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#17202A]">MPCB Consent to Establish</p>
                    <p className="text-[#667085]">Statutory Limit: 30 Days</p>
                  </div>
                  <span className="text-emerald-700 font-mono font-bold">12 Days Left</span>
                </div>
                <div className="p-2.5 rounded border border-[#D9E1E8] bg-[#F5F7FA] flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#17202A]">Fire Provisional NOC</p>
                    <p className="text-[#667085]">Statutory Limit: 21 Days</p>
                  </div>
                  <span className="text-emerald-700 font-mono font-bold">5 Days Left</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D9E1E8] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeemedEscrowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#344054] hover:bg-slate-100 rounded cursor-pointer"
              >
                Close Ledger
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Digital Deemed Approval Escrow Certificate downloaded with cryptographic SHA-256 state seal.');
                  setShowDeemedEscrowModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white rounded shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Download Sample Deemed Certificate (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
