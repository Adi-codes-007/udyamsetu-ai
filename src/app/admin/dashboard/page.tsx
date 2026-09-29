'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Award, 
  Activity, 
  ArrowRight, 
  Database, 
  CheckCircle2, 
  Server,
  Layers,
  Building2,
  FileCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { approvalRules, schemes, applications } = useAppStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">State Regulatory Administration Console</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 font-bold">
              SYSTEM ARCHITECT LEVEL
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Manage deterministic approval rules, regulatory source mappings, statutory schemes, and single-window system health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/rules"
            className="px-4 py-2 rounded text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Manage Rules Engine</span>
          </Link>
        </div>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Active Rules</span>
          <p className="text-2xl font-bold text-[#17324D] mt-1">{approvalRules.length}</p>
          <span className="text-[10px] text-emerald-700 font-medium">100% Deterministic</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Regulatory Sources</span>
          <p className="text-2xl font-bold text-[#1F4E79] mt-1">14</p>
          <span className="text-[10px] text-[#667085]">Gazettes & Acts</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Statutory Schemes</span>
          <p className="text-2xl font-bold text-[#16855b] mt-1">{schemes.length}</p>
          <span className="text-[10px] text-[#16855b]">Active Subsidies</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Registered Units</span>
          <p className="text-2xl font-bold text-[#17324D] mt-1">1,240</p>
          <span className="text-[10px] text-[#667085]">Enterprises</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">System Health</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">99.9%</p>
          <span className="text-[10px] text-emerald-700">All Nodes Healthy</span>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-[#667085]">Rules In Review</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">0</p>
          <span className="text-[10px] text-[#667085]">Zero Conflicts</span>
        </div>
      </div>

      {/* Core Admin Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Rules Engine */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#17202A]">Deterministic Approval Rules Engine</h2>
            <p className="text-xs text-[#667085] leading-relaxed">
              Define Boolean and threshold condition matrices that deduce MPCB, Fire, DISH, and Power requirements.
            </p>
            <div className="text-[11px] text-[#344054] font-mono bg-[#F5F7FA] p-2 rounded border border-[#D9E1E8]">
              e.g. Rule MPCB-001 (Pollution Consent Logic)
            </div>
          </div>
          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <Link
              href="/admin/rules"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center justify-between"
            >
              <span>Inspect & Edit Rules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Regulatory Sources Registry */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#17202A]">Regulatory Sources Registry</h2>
            <p className="text-xs text-[#667085] leading-relaxed">
              Curate authoritative gazettes, acts, and department circulars that ground all AI explanations and copilot citations.
            </p>
            <div className="text-[11px] text-[#344054] font-mono bg-[#F5F7FA] p-2 rounded border border-[#D9E1E8]">
              14 Authoritative Government Sources Mapped
            </div>
          </div>
          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <Link
              href="/admin/sources"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center justify-between"
            >
              <span>View Source References</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Government Incentive Schemes */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#17202A]">Incentive Schemes Database</h2>
            <p className="text-xs text-[#667085] leading-relaxed">
              Configure 100-point matching models, capital subsidy slabs, and sector priorities under Maharashtra PSI 2025.
            </p>
            <div className="text-[11px] text-[#344054] font-mono bg-[#F5F7FA] p-2 rounded border border-[#D9E1E8]">
              Active: PSI 2025, PMKSY, CGTMSE, Power Sub.
            </div>
          </div>
          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <Link
              href="/admin/schemes"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center justify-between"
            >
              <span>Configure Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#17202A]">Role-Based Access & Directory</h2>
            <p className="text-xs text-[#667085] leading-relaxed">
              Manage permissions across Entrepreneurs, Scrutiny Desk Officers, Inspecting Officers, and System Administrators.
            </p>
          </div>
          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center justify-between"
            >
              <span>Manage User Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#17202A]">System Observability & Logs</h2>
            <p className="text-xs text-[#667085] leading-relaxed">
              Audit trail of rule evaluations, document AI extractions, API sync latencies, and RTS compliance logs.
            </p>
          </div>
          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <Link
              href="/admin/analytics"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center justify-between"
            >
              <span>View System Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Database & Vector Store Readiness */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#17202A]">PostgreSQL & pgvector Ready</h2>
            <p className="text-xs text-[#667085] leading-relaxed">
              Schema prepared for pgvector embeddings integration for regulatory circular semantic similarity.
            </p>
          </div>
          <div className="pt-4 border-t border-[#D9E1E8] mt-4">
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Schema Migrated & Validated
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
