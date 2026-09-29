'use client';

import React from 'react';
import { Activity, Server, Database, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const telemetry = [
    { service: 'Approval Rule Engine', status: 'Healthy', latency: '12ms', uptime: '99.98%' },
    { service: 'Document OCR Pre-Validation Pipeline', status: 'Healthy', latency: '420ms', uptime: '99.95%' },
    { service: 'Government Scheme Matcher (100pt Model)', status: 'Healthy', latency: '8ms', uptime: '100%' },
    { service: 'Regulatory Copilot Grounded RAG Gateway', status: 'Healthy', latency: '350ms', uptime: '99.92%' },
    { service: 'Inter-departmental RTS SLA Monitor', status: 'Healthy', latency: '22ms', uptime: '100%' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#17324D]">System Telemetry & Architecture Observability</h1>
          <p className="text-xs text-[#667085] mt-1">
            Real-time latency metrics, rule evaluation throughput, and database connection pool health.
          </p>
        </div>

        <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All Micro-engines Operational</span>
        </span>
      </div>

      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#D9E1E8]">
          <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Engine Service Endpoints
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Service Endpoint</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4">Average Latency</th>
                <th className="py-3 px-4 text-right">Service Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {telemetry.map((t, i) => (
                <tr key={i} className="hover:bg-[#F5F7FA]">
                  <td className="py-3 px-4 font-bold text-[#17324D]">{t.service}</td>
                  <td className="py-3 px-4">
                    <span className="text-[#16855b] font-semibold bg-[#e8f5ef] px-2 py-0.5 rounded border border-[#c2e5d5] text-[10px] flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" /> {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#475467]">{t.latency}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#1F4E79]">{t.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
