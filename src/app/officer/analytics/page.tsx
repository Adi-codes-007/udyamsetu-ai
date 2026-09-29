'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Building2,
  Calendar
} from 'lucide-react';

export default function OfficerAnalyticsPage() {
  const departmentStats = [
    { name: 'MPCB Pollution Control', total: 68, avgDays: 19.4, slaDays: 30, adherence: '94%' },
    { name: 'Fire Safety Directorate', total: 42, avgDays: 11.2, slaDays: 15, adherence: '91%' },
    { name: 'DISH Industrial Safety', total: 34, avgDays: 14.8, slaDays: 20, adherence: '88%' },
    { name: 'MSEDCL Power Works', total: 26, avgDays: 16.5, slaDays: 21, adherence: '85%' },
    { name: 'MIDC Land & Infrastructure', total: 14, avgDays: 10.1, slaDays: 14, adherence: '97%' },
  ];

  const categoryBottlenecks = [
    { category: 'Missing Structural Stability Certificate', count: 18, share: '38%' },
    { category: 'ETP Design Hydraulic Inconsistencies', count: 12, share: '25%' },
    { category: 'Unendorsed Lease Subletting Clauses', count: 9, share: '19%' },
    { category: 'HT Substation Distance Clearances', count: 5, share: '11%' },
    { category: 'Hazardous Chemical Storage Declarations', count: 3, share: '7%' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Departmental Compliance & SLA Analytics</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              MAITRI DATA STREAM
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Statistical monitoring of statutory disposal timelines, Right to Public Services compliance, and document rejection root causes.
          </p>
        </div>

        <span className="text-xs text-[#667085]">Data Window: Q3 2026 Fiscal Cycle</span>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <span className="text-xs font-medium text-[#667085]">Overall SLA Adherence</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#16855b]">91.4%</span>
            <span className="text-[11px] text-emerald-700 font-semibold">+2.8% QoQ</span>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <span className="text-xs font-medium text-[#667085]">Average Disposal Time</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#17324D]">14.4</span>
            <span className="text-[11px] text-[#667085]">Days (Statutory cap: 24d)</span>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <span className="text-xs font-medium text-[#667085]">Pre-Validation Screen Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1F4E79]">96.2%</span>
            <span className="text-[11px] text-[#1F4E79]">Passed AI Pre-check</span>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <span className="text-xs font-medium text-[#667085]">RTS Escalations</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#c93636]">3</span>
            <span className="text-[11px] text-[#667085]">Active Grievances</span>
          </div>
        </div>
      </div>

      {/* Department SLA Performance Table */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#D9E1E8]">
          <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Clearance Performance by Regulatory Directorate
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Department Directorate</th>
                <th className="py-3 px-4">Active Caseload</th>
                <th className="py-3 px-4">Avg Processing Time</th>
                <th className="py-3 px-4">Statutory SLA Cap</th>
                <th className="py-3 px-4 text-right">RTS Compliance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {departmentStats.map((dept, i) => (
                <tr key={i} className="hover:bg-[#F5F7FA]">
                  <td className="py-3 px-4 font-bold text-[#17324D]">{dept.name}</td>
                  <td className="py-3 px-4 text-[#475467] font-semibold">{dept.total} Submissions</td>
                  <td className="py-3 px-4 font-mono">{dept.avgDays} Days</td>
                  <td className="py-3 px-4 text-[#667085]">{dept.slaDays} Days</td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold text-[#16855b] bg-[#e8f5ef] px-2 py-0.5 rounded border border-[#c2e5d5]">
                      {dept.adherence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Root Causes of Rejection / Deficiency */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
        <div className="border-b border-[#D9E1E8] pb-3">
          <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Common Deficiency Notices & Document Rejection Root Causes
          </h2>
          <p className="text-[11px] text-[#667085]">
            Target areas where UdyamSetu AI pre-validation proactively alerts applicants before desk scrutiny.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {categoryBottlenecks.map((item, i) => (
            <div key={i} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#17202A]">{item.category}</span>
                <span className="text-[#667085]">{item.count} Notices ({item.share})</span>
              </div>
              <div className="w-full bg-[#e8eef3] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#2F6B8A] h-full rounded-full"
                  style={{ width: item.share }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
