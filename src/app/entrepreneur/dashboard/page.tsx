'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SlaIndicator } from '@/components/ui/SlaIndicator';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Award, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';

export default function EntrepreneurDashboard() {
  const router = useRouter();
  const { 
    currentUser, 
    businessProfile, 
    approvals, 
    applications, 
    schemes, 
    readinessPercentage 
  } = useAppStore();

  const totalApplicable = approvals.length;
  const completedCount = approvals.filter(a => a.status === 'Completed').length;
  const inProgressCount = approvals.filter(a => a.status === 'In Progress').length;
  const actionRequiredCount = approvals.filter(a => a.status === 'Action Required').length;

  const actionRequiredItems = approvals.filter(a => a.status === 'Action Required');

  return (
    <div className="space-y-6 pb-12">
      {/* Dashboard Top Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#17324D] tracking-tight">
              Good morning, {currentUser.name.split(' ')[0]}.
            </h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Dossier
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Here's the current status of your business approval journey and compliance orchestration.
          </p>

          {/* Business Meta Chips */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-[#344054]">
            <div className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-[#1F4E79]" />
              <span>{businessProfile.businessName}</span>
            </div>
            <span className="text-[#D9E1E8]">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#667085]">Sector:</span>
              <span className="font-semibold text-[#17202A]">{businessProfile.industry}</span>
            </div>
            <span className="text-[#D9E1E8]">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#1F4E79]" />
              <span>{businessProfile.city}, {businessProfile.state}</span>
            </div>
            <span className="text-[#D9E1E8]">•</span>
            <div className="flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#1F4E79]" />
              <span>₹{businessProfile.investmentAmountCr} Crore</span>
            </div>
            <span className="text-[#D9E1E8]">•</span>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#1F4E79]" />
              <span>{businessProfile.employeesCount} Personnel</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/entrepreneur/business-profile"
            className="px-3.5 py-2 rounded text-xs font-semibold bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#17324D] border border-[#D9E1E8] transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            href="/entrepreneur/approval-roadmap"
            className="px-4 py-2 rounded text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>View Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applicable */}
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Applicable Approvals</span>
            <Layers className="w-4 h-4 text-[#1F4E79]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#17324D]">{totalApplicable}</span>
            <span className="text-[11px] text-[#667085]">Statutory Clearances</span>
          </div>
          <div className="mt-2 text-[11px] text-[#1F4E79] font-medium flex items-center gap-1">
            <span>Drawn from 5 Authorities</span>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-[#16855b]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#16855b]">{completedCount}</span>
            <span className="text-[11px] text-[#667085]">Clearances Secured</span>
          </div>
          <div className="mt-2 text-[11px] text-[#16855b] font-medium">
            Udyam, Land, GST, FSSAI cleared
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">In Progress</span>
            <Clock className="w-4 h-4 text-[#1F4E79]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#1F4E79]">{inProgressCount}</span>
            <span className="text-[11px] text-[#667085]">Active Scrutiny</span>
          </div>
          <div className="mt-2 text-[11px] text-[#1F4E79] font-medium">
            MPCB CTE & MSEDCL Power
          </div>
        </div>

        {/* Action Required */}
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs border-l-4 border-l-[#d9822b]">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span className="font-medium">Action Required</span>
            <AlertCircle className="w-4 h-4 text-[#d9822b]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#d9822b]">{actionRequiredCount}</span>
            <span className="text-[11px] text-[#667085]">Interventions Needed</span>
          </div>
          <div className="mt-2 text-[11px] text-[#c06c1c] font-medium">
            Missing certificate & inspection
          </div>
        </div>
      </div>

      {/* APPROVAL READINESS & ACTION REQUIRED (Two Column Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Approval Readiness Meter */}
        <div className="lg:col-span-4 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">
                Approval Readiness Score
              </h2>
              <span className="text-[10px] font-mono text-[#16855b] bg-[#e8f5ef] px-2 py-0.5 rounded font-bold">
                HIGH READINESS
              </span>
            </div>

            <div className="py-6 flex flex-col items-center justify-center text-center">
              {/* Circular Gauge / Percentage Indicator */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#e8eef3]"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#1F4E79] transition-all duration-1000 ease-out"
                    strokeDasharray={`${readinessPercentage}, 100`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-[#17324D]">{readinessPercentage}%</span>
                  <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wide">
                    Compliant
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#475467] mt-3 leading-relaxed px-4">
                <strong>{completedCount} of {totalApplicable}</strong> statutory milestones verified. Resolving the 2 pending action items will push readiness to <strong>88%</strong>.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D9E1E8] flex items-center justify-between text-xs">
            <span className="text-[#667085]">Critical Path Status:</span>
            <span className="font-semibold text-[#1F4E79]">Civil Work Permitted</span>
          </div>
        </div>

        {/* Right: ACTION REQUIRED CARDS */}
        <div className="lg:col-span-8 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#d9822b]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">
                  Action Required ({actionRequiredItems.length})
                </h2>
              </div>
              <span className="text-[11px] text-[#667085]">Urgent prerequisites</span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Item 1: Factory Approval */}
              <div className="p-4 rounded border border-[#f6deb9] bg-[#fdfaf5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#17202A]">Factory Building Plan Scrutiny & Approval</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-semibold">DISH</span>
                  </div>
                  <p className="text-xs text-[#c06c1c] font-medium">
                    Missing: Structural Stability Certificate
                  </p>
                  <p className="text-[11px] text-[#667085]">
                    Signed endorsement from a DISH-empanelled Chartered Structural Engineer is required to complete drawing vetting.
                  </p>
                </div>
                <Link
                  href="/entrepreneur/documents"
                  className="px-4 py-2 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold shrink-0 transition-colors text-center"
                >
                  Resolve Document
                </Link>
              </div>

              {/* Item 2: Fire NOC */}
              <div className="p-4 rounded border border-[#f6deb9] bg-[#fdfaf5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#17202A]">Fire Safety NOC (Provisional Factory Construction)</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-semibold">Fire Directorate</span>
                  </div>
                  <p className="text-xs text-[#c06c1c] font-medium">
                    Inspection scheduling required
                  </p>
                  <p className="text-[11px] text-[#667085]">
                    Station Officer has verified access driveway plans. Select an inspection slot for physical site scrutiny.
                  </p>
                </div>
                <Link
                  href="/entrepreneur/applications"
                  className="px-4 py-2 rounded bg-white hover:bg-slate-50 text-[#17324D] border border-[#D9E1E8] text-xs font-semibold shrink-0 transition-colors text-center"
                >
                  View Inspection
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-[#D9E1E8] flex items-center justify-between text-xs text-[#667085]">
            <span>Need assistance preparing these certificates?</span>
            <Link href="/entrepreneur/copilot" className="font-semibold text-[#1F4E79] hover:underline flex items-center gap-1">
              <span>Ask Regulatory Copilot</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

      {/* CURRENT APPLICATIONS TABLE */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#D9E1E8] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#17324D]">Current Applications Under Department Scrutiny</h2>
            <p className="text-xs text-[#667085] mt-0.5">Live tracking across MPCB, Fire Services, DISH, and MSEDCL single windows</p>
          </div>
          <Link
            href="/entrepreneur/applications"
            className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center gap-1"
          >
            <span>Full Application Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Application & Approval</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">SLA Clock</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-[#F5F7FA] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#17324D]">{app.approvalName}</span>
                      <span className="text-[11px] font-mono text-[#667085]">{app.applicationId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475467]">{app.department}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="py-3 px-4 text-[#475467]">{app.submittedDate}</td>
                  <td className="py-3 px-4">
                    <SlaIndicator elapsedDays={app.elapsedDays} slaDays={app.slaDays} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/entrepreneur/applications?id=${app.applicationId}`}
                      className="px-2.5 py-1 rounded bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#1F4E79] border border-[#D9E1E8] text-xs font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GOVERNMENT SUPPORT & REGULATORY COPILOT (Split Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Matched Government Schemes */}
        <div className="lg:col-span-8 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#1F4E79]" />
              <h2 className="text-sm font-bold text-[#17324D]">Government Support Matched (Top 3)</h2>
            </div>
            <Link
              href="/entrepreneur/schemes"
              className="text-xs font-semibold text-[#1F4E79] hover:underline flex items-center gap-1"
            >
              <span>Explore All Schemes</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {schemes.slice(0, 3).map(scheme => (
              <div key={scheme.id} className="p-3.5 rounded border border-[#D9E1E8] bg-[#F5F7FA] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 pb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {scheme.matchScore}% Match
                    </span>
                    <span className="text-[9px] text-[#667085] truncate">{scheme.authority.split(',')[0]}</span>
                  </div>
                  <h3 className="font-bold text-xs text-[#17202A] mt-1.5 leading-snug line-clamp-2">
                    {scheme.schemeName}
                  </h3>
                  <p className="text-[11px] text-[#667085] mt-1 line-clamp-2">
                    {scheme.potentialBenefits}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#D9E1E8]">
                  <Link
                    href={`/entrepreneur/schemes?id=${scheme.id}`}
                    className="text-[11px] font-semibold text-[#1F4E79] hover:underline flex items-center justify-between"
                  >
                    <span>View Eligibility</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REGULATORY COPILOT WIDGET */}
        <div className="lg:col-span-4 bg-[#17324D] text-white rounded p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#2a4d70]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-100">
                  Regulatory Copilot
                </h2>
              </div>
              <span className="text-[10px] text-sky-300 font-mono bg-[#102336] px-1.5 py-0.5 rounded border border-[#2b4c6e]">
                AI ASSISTANT
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Have a question about your statutory approvals, missing documents, or SLA milestones?
            </p>

            <div className="mt-4 space-y-2">
              <Link
                href="/entrepreneur/copilot?q=Why+is+MPCB+Consent+to+Establish+included%3F"
                className="block text-left p-2.5 rounded bg-[#1F4E79] hover:bg-[#286399] transition-colors border border-[#2b4c6e] text-xs text-slate-200"
              >
                "Why is MPCB Consent to Establish included?"
              </Link>
              <Link
                href="/entrepreneur/copilot?q=What+documents+are+missing%3F"
                className="block text-left p-2.5 rounded bg-[#1F4E79] hover:bg-[#286399] transition-colors border border-[#2b4c6e] text-xs text-slate-200"
              >
                "What documents are missing for Factory approval?"
              </Link>
              <Link
                href="/entrepreneur/copilot?q=Which+approvals+are+blocking+my+project%3F"
                className="block text-left p-2.5 rounded bg-[#1F4E79] hover:bg-[#286399] transition-colors border border-[#2b4c6e] text-xs text-slate-200"
              >
                "Which approvals are blocking my power connection?"
              </Link>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#2a4d70]">
            <Link
              href="/entrepreneur/copilot"
              className="w-full py-2 px-3 rounded bg-white hover:bg-slate-100 text-[#17324D] text-xs font-bold text-center block transition-colors"
            >
              Open Regulatory Copilot Console →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
