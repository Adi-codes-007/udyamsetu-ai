'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  GitFork, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowDown, 
  ArrowRight, 
  Layers, 
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface GraphNode {
  id: string;
  code: string;
  title: string;
  authority: string;
  stage: number;
  status: 'Completed' | 'In Progress' | 'Action Required' | 'Upcoming';
  dependencies: string[];
  description: string;
}

export default function DependencyGraphPage() {
  const { businessProfile, approvals } = useAppStore();

  const nodes: GraphNode[] = [
    {
      id: 'node-1',
      code: 'MSME-UDYAM',
      title: 'Business Registration (Udyam & GST)',
      authority: 'Ministry of MSME & GSTN',
      stage: 1,
      status: 'Completed',
      dependencies: [],
      description: 'Foundational commercial identity for credit benefits and single-window onboarding.',
    },
    {
      id: 'node-2',
      code: 'MIDC-LAND',
      title: 'MIDC Land Possession & Lease Deed',
      authority: 'MIDC Land Division',
      stage: 2,
      status: 'Completed',
      dependencies: ['MSME-UDYAM'],
      description: 'Physical plot allotment in MIDC Waluj; prerequisite for all site clearances.',
    },
    {
      id: 'node-3',
      code: 'FIRE-NOC',
      title: 'Fire Safety NOC (Provisional)',
      authority: 'Maharashtra Fire Services',
      stage: 3,
      status: 'Action Required',
      dependencies: ['MIDC-LAND'],
      description: 'Site access scrutiny & water hydrant capacity approval for factory shed construction.',
    },
    {
      id: 'node-4',
      code: 'MPCB-CTE',
      title: 'MPCB Consent to Establish (CTE)',
      authority: 'Maharashtra Pollution Control Board',
      stage: 3,
      status: 'In Progress',
      dependencies: ['MIDC-LAND', 'MSME-UDYAM'],
      description: 'Orange Category environmental clearance and biological ETP layout approval.',
    },
    {
      id: 'node-5',
      code: 'FACTORY-PLAN',
      title: 'Factory Building Plan Approval',
      authority: 'DISH Maharashtra',
      stage: 4,
      status: 'Action Required',
      dependencies: ['FIRE-NOC', 'MIDC-LAND'],
      description: 'Occupational safety and architectural scrutiny. Requires Structural Stability Certificate.',
    },
    {
      id: 'node-6',
      code: 'MSEDCL-POWER',
      title: 'MSEDCL Industrial Electricity Sanction',
      authority: 'MSEDCL Infrastructure Wing',
      stage: 5,
      status: 'In Progress',
      dependencies: ['FACTORY-PLAN', 'MIDC-LAND'],
      description: '350 kW load allocation on 11 kV HT feeder and transformer installation.',
    },
    {
      id: 'node-7',
      code: 'MIDC-WATER',
      title: 'MIDC Industrial Water Quota Sanction',
      authority: 'MIDC Water Works',
      stage: 5,
      status: 'In Progress',
      dependencies: ['MPCB-CTE', 'MIDC-LAND'],
      description: 'Potable & process water tap-off pipeline connection for agro processing.',
    },
    {
      id: 'node-8',
      code: 'MPCB-CTO',
      title: 'MPCB Consent to Operate (CTO)',
      authority: 'Maharashtra Pollution Control Board',
      stage: 6,
      status: 'Upcoming',
      dependencies: ['MPCB-CTE', 'MSEDCL-POWER', 'FACTORY-PLAN'],
      description: 'Post-construction trial run approval before commercial marketing.',
    },
  ];

  const [selectedNode, setSelectedNode] = useState<GraphNode>(nodes[2]); // Default Fire NOC

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Approval Dependency Graph & Critical Path</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
              Deterministic Graph
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Visual map of statutory sequencing. Shows which clearances unblock subsequent utility connections and operating licences.
          </p>
        </div>

        <Link
          href="/entrepreneur/approval-roadmap"
          className="px-3.5 py-2 rounded text-xs font-semibold bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#1F4E79] border border-[#D9E1E8] transition-colors self-start sm:self-auto"
        >
          ← Back to Roadmap View
        </Link>
      </div>

      {/* Legend & Instructions */}
      <div className="bg-white border border-[#D9E1E8] rounded p-3 text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-[#344054]">
          <span className="font-semibold text-[#17202A]">Node Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-sky-100 border border-sky-300"></span>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></span>
            <span>Action Required (Bottleneck)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300"></span>
            <span>Upcoming / Dependent</span>
          </div>
        </div>
        <span className="text-[11px] text-[#667085]">Click any node to inspect unblocking logic</span>
      </div>

      {/* Graph Visual & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Flow Canvas (Left Column) */}
        <div className="lg:col-span-8 bg-white border border-[#D9E1E8] rounded p-6 shadow-xs flex flex-col items-center">
          
          {/* Stage 1 */}
          <div className="w-full max-w-md">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5 text-center">Stage 1: Enterprise Identity</div>
            <button
              onClick={() => setSelectedNode(nodes[0])}
              className={`w-full p-3 rounded border text-left transition-all ${
                selectedNode.id === nodes[0].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
              } bg-emerald-50 border-emerald-200`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-950">{nodes[0].title}</span>
                <StatusBadge status={nodes[0].status} />
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">{nodes[0].authority}</p>
            </button>
          </div>

          <div className="my-2 text-slate-400 font-bold text-xs flex flex-col items-center">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Stage 2 */}
          <div className="w-full max-w-md">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5 text-center">Stage 2: Land Allotment</div>
            <button
              onClick={() => setSelectedNode(nodes[1])}
              className={`w-full p-3 rounded border text-left transition-all ${
                selectedNode.id === nodes[1].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
              } bg-emerald-50 border-emerald-200`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-950">{nodes[1].title}</span>
                <StatusBadge status={nodes[1].status} />
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">{nodes[1].authority}</p>
            </button>
          </div>

          <div className="my-2 text-slate-400 font-bold text-xs flex flex-col items-center">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Stage 3: Split into Fire NOC & MPCB CTE */}
          <div className="w-full max-w-lg">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5 text-center">Stage 3: Pre-Construction Statutory Clearance (Parallel)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Fire NOC */}
              <button
                onClick={() => setSelectedNode(nodes[2])}
                className={`p-3 rounded border text-left transition-all ${
                  selectedNode.id === nodes[2].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
                } bg-amber-50 border-amber-300`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-950">Fire Safety NOC</span>
                  <StatusBadge status={nodes[2].status} />
                </div>
                <p className="text-[11px] text-amber-800 mt-1">Inspection Required</p>
              </button>

              {/* MPCB CTE */}
              <button
                onClick={() => setSelectedNode(nodes[3])}
                className={`p-3 rounded border text-left transition-all ${
                  selectedNode.id === nodes[3].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
                } bg-sky-50 border-sky-200`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-sky-950">MPCB CTE (Pollution)</span>
                  <StatusBadge status={nodes[3].status} />
                </div>
                <p className="text-[11px] text-sky-800 mt-1">Day 18 of 30 SLA</p>
              </button>
            </div>
          </div>

          <div className="my-2 text-slate-400 font-bold text-xs flex flex-col items-center">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Stage 4: Factory Building Plan Scrutiny */}
          <div className="w-full max-w-md">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5 text-center">Stage 4: Structural & Plant Architecture</div>
            <button
              onClick={() => setSelectedNode(nodes[4])}
              className={`w-full p-3 rounded border text-left transition-all ${
                selectedNode.id === nodes[4].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
              } bg-amber-50 border-amber-300`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-950">{nodes[4].title}</span>
                <StatusBadge status={nodes[4].status} />
              </div>
              <p className="text-[11px] text-amber-800 mt-1">DISH • Missing Structural Certificate</p>
            </button>
          </div>

          <div className="my-2 text-slate-400 font-bold text-xs flex flex-col items-center">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Stage 5: Utilities (Power & Water) */}
          <div className="w-full max-w-lg">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5 text-center">Stage 5: Industrial Utilities Sanction</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedNode(nodes[5])}
                className={`p-3 rounded border text-left transition-all ${
                  selectedNode.id === nodes[5].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
                } bg-sky-50 border-sky-200`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-sky-950">MSEDCL Power (350 kW)</span>
                  <StatusBadge status={nodes[5].status} />
                </div>
                <p className="text-[11px] text-sky-800 mt-1">Feeder Under Survey</p>
              </button>

              <button
                onClick={() => setSelectedNode(nodes[6])}
                className={`p-3 rounded border text-left transition-all ${
                  selectedNode.id === nodes[6].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
                } bg-sky-50 border-sky-200`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-sky-950">MIDC Water Quota</span>
                  <StatusBadge status={nodes[6].status} />
                </div>
                <p className="text-[11px] text-sky-800 mt-1">Flow Meter Sanction</p>
              </button>
            </div>
          </div>

          <div className="my-2 text-slate-400 font-bold text-xs flex flex-col items-center">
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Stage 6: Commercial Production & CTO */}
          <div className="w-full max-w-md">
            <div className="text-[10px] font-bold text-[#667085] uppercase tracking-wider mb-1.5 text-center">Stage 6: Commercial Commissioning</div>
            <button
              onClick={() => setSelectedNode(nodes[7])}
              className={`w-full p-3 rounded border text-left transition-all ${
                selectedNode.id === nodes[7].id ? 'ring-2 ring-[#1F4E79] shadow-sm' : ''
              } bg-slate-50 border-slate-300 text-slate-600`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs">{nodes[7].title}</span>
                <StatusBadge status={nodes[7].status} />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Dependent on Factory & Power Readiness</p>
            </button>
          </div>

        </div>

        {/* Selected Node Details Panel (Right Column) */}
        <div className="lg:col-span-4 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">Node Intelligence</span>
              <h2 className="text-sm font-bold text-[#17324D] mt-0.5">{selectedNode.title}</h2>
              <p className="text-xs text-[#667085]">{selectedNode.authority}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[#667085]">Current Clearance State:</span>
                <div className="mt-1"><StatusBadge status={selectedNode.status} /></div>
              </div>

              <div>
                <span className="text-[#667085]">Sequential Stage:</span>
                <p className="font-semibold text-[#17202A]">Stage {selectedNode.stage} of 6</p>
              </div>

              <div>
                <span className="text-[#667085]">Prerequisite Upstream Nodes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedNode.dependencies.length === 0 ? (
                    <span className="text-[11px] text-[#16855b] font-medium">None (Root Initiation Node)</span>
                  ) : (
                    selectedNode.dependencies.map(d => (
                      <span key={d} className="px-2 py-0.5 rounded bg-[#F5F7FA] border border-[#D9E1E8] text-[10px] font-mono text-[#17324D]">
                        {d}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8] text-xs">
                <span className="font-semibold text-[#17202A]">Functional Scope:</span>
                <p className="text-[#475467] mt-1 leading-relaxed">{selectedNode.description}</p>
              </div>

              {selectedNode.status === 'Action Required' && (
                <div className="p-3 rounded bg-[#fdfaf5] border border-[#f6deb9] text-xs text-[#c06c1c]">
                  <strong>Current Bottleneck:</strong> Resolving this node will unblock the entire downstream pipeline for factory commissioning and power energization.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9E1E8] mt-4 space-y-2">
            <Link
              href={
                selectedNode.code === 'FIRE-NOC'
                  ? '/entrepreneur/applications'
                  : selectedNode.code === 'FACTORY-PLAN'
                  ? '/entrepreneur/documents'
                  : '/entrepreneur/approval-roadmap'
              }
              className="w-full py-2 px-3 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold text-center block transition-colors shadow-xs"
            >
              Take Action on this Node →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
