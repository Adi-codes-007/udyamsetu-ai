'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  Building, 
  BarChart3, 
  Workflow, 
  Layers, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Clock,
  Landmark,
  FileSpreadsheet,
  AlertTriangle,
  Award,
  Sliders
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#17202A]">
      {/* Top Government Strip */}
      <div className="bg-[#17324D] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#1f4e79] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sky-300">National Single Window System</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-200 hidden sm:inline">Government of India &amp; State Industrial Approvals Framework</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sky-300 hover:text-white font-medium transition-colors">
            Portal Access →
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-[#D9E1E8] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo showTagline={true} />

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#344054]">
            <a href="#how-it-works" className="hover:text-[#1F4E79] transition-colors">How It Works</a>
            <a href="#why-udyamsetu" className="hover:text-[#1F4E79] transition-colors">Platform Capabilities</a>
            <a href="#for-entrepreneurs" className="hover:text-[#1F4E79] transition-colors">For Industry</a>
            <a href="#for-departments" className="hover:text-[#1F4E79] transition-colors">For Departments</a>
            <a href="#trust" className="hover:text-[#1F4E79] transition-colors">Regulatory Rigor</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#1F4E79] hover:text-[#17324D] px-3 py-1.5 rounded transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/entrepreneur/business-profile"
              className="text-xs font-semibold text-white bg-[#1F4E79] hover:bg-[#17324D] px-4 py-2 rounded shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Build Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-[#D9E1E8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#edf4fa] border border-[#c8dced] text-[#1F4E79] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#1F4E79]" />
                Next-Gen National Industrial Orchestration Prototype
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17324D] tracking-tight leading-[1.15]">
                Your business journey, mapped to the <span className="text-[#1F4E79]">right approvals</span>.
              </h1>

              <p className="text-base sm:text-lg text-[#475467] leading-relaxed max-w-2xl font-normal">
                Build your business profile once. UdyamSetu AI understands your location, activity, and operational scale to automatically generate a personalized roadmap of statutory approvals, licences, NOCs, document requirements, and eligible government schemes.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/entrepreneur/business-profile"
                  className="px-5 py-2.5 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold text-sm shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Build My Approval Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/entrepreneur/dashboard"
                  className="px-5 py-2.5 rounded bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#17324D] border border-[#D9E1E8] font-semibold text-sm transition-all"
                >
                  Explore Live Demo Portal
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#D9E1E8] text-xs">
                <div>
                  <p className="font-bold text-[#17324D] text-sm">Deterministic</p>
                  <p className="text-[#667085] text-[11px]">Rule-governed engine</p>
                </div>
                <div>
                  <p className="font-bold text-[#17324D] text-sm">Pre-Validated</p>
                  <p className="text-[#667085] text-[11px]">AI document checks</p>
                </div>
                <div>
                  <p className="font-bold text-[#17324D] text-sm">Inter-Dept</p>
                  <p className="text-[#667085] text-[11px]">SLA transparency</p>
                </div>
                <div>
                  <p className="font-bold text-[#17324D] text-sm">Incentives</p>
                  <p className="text-[#667085] text-[11px]">Algorithm matched</p>
                </div>
              </div>
            </div>

            {/* Right Column: Abstract Approval Workflow Architecture (Clean Product Visualization) */}
            <div className="lg:col-span-5">
              <div className="bg-[#F5F7FA] border border-[#D9E1E8] rounded p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16855b]"></span>
                    <span className="text-xs font-bold text-[#17324D]">Orchestration Architecture</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#667085] bg-white px-2 py-0.5 rounded border border-[#D9E1E8]">
                    AUDITABLE RAG & RULES
                  </span>
                </div>

                <div className="py-4 space-y-2.5 text-xs">
                  {/* Step 1 */}
                  <div className="bg-white p-3 rounded border border-[#D9E1E8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#17324D] text-white flex items-center justify-center font-bold text-[10px]">
                        01
                      </div>
                      <div>
                        <p className="font-semibold text-[#17202A]">Unified Business Profile</p>
                        <p className="text-[11px] text-[#667085]">Sector, scale, water, power, pollution category</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Standardized
                    </span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#667085]">
                    <span className="text-xs font-bold">↓</span>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white p-3 rounded border border-[#D9E1E8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#1F4E79] text-white flex items-center justify-center font-bold text-[10px]">
                        02
                      </div>
                      <div>
                        <p className="font-semibold text-[#17202A]">Regulatory Analysis Engine</p>
                        <p className="text-[11px] text-[#667085]">Statutory logic evaluated across 12+ ministries</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      Automated
                    </span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#667085]">
                    <span className="text-xs font-bold">↓</span>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white p-3 rounded border border-[#1F4E79] bg-[#f8fbfe] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#1F4E79] text-white flex items-center justify-center font-bold text-[10px]">
                        03
                      </div>
                      <div>
                        <p className="font-semibold text-[#17324D]">Approval Roadmap & Graph</p>
                        <p className="text-[11px] text-[#475467]">12 approvals sequenced by critical dependencies</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#1F4E79] bg-white px-2 py-0.5 rounded border border-[#c8dced]">
                      Interactive
                    </span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#667085]">
                    <span className="text-xs font-bold">↓</span>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white p-3 rounded border border-[#D9E1E8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#2F6B8A] text-white flex items-center justify-center font-bold text-[10px]">
                        04
                      </div>
                      <div>
                        <p className="font-semibold text-[#17202A]">Documents & AI Pre-Validation</p>
                        <p className="text-[11px] text-[#667085]">Upload once, reuse across MPCB, Fire, DISH</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      OCR / Extraction
                    </span>
                  </div>

                  <div className="flex justify-center -my-1 text-[#667085]">
                    <span className="text-xs font-bold">↓</span>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-white p-3 rounded border border-[#D9E1E8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-[#16855b] text-white flex items-center justify-center font-bold text-[10px]">
                        05
                      </div>
                      <div>
                        <p className="font-semibold text-[#17202A]">Single Window Applications & Schemes</p>
                        <p className="text-[11px] text-[#667085]">SLA monitoring & Maharashtra PSI 2025 matches</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Real-time
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-[#667085] flex items-center justify-between border-t border-[#D9E1E8]">
                  <span>Demo Model: Shree Foods (Food Processing, MIDC Waluj)</span>
                  <span className="font-mono text-[#1F4E79]">72% Readiness</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-[#F5F7FA] border-b border-[#D9E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-wider text-[#1F4E79] uppercase">End-to-End Orchestration</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] mt-1">How UdyamSetu AI Operates</h2>
            <p className="text-sm text-[#475467] mt-2">
              Transforming the fragmented maze of multi-portal compliance into a structured, deterministic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded border border-[#D9E1E8] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded">01</span>
                <h3 className="font-bold text-sm text-[#17202A] mt-3">Tell us about your business</h3>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  Enter industry, land type, power requirements, water draw, and employee count in a 5-step wizard.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E1E8] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded">02</span>
                <h3 className="font-bold text-sm text-[#17202A] mt-3">Get your personalized roadmap</h3>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  The rule engine deduces applicable licences (MPCB, Fire, DISH, MSEDCL) and explains why each applies.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E1E8] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded">03</span>
                <h3 className="font-bold text-sm text-[#17202A] mt-3">Prepare & verify documents</h3>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  Upload once. AI-assisted pre-validation flags missing stamps, expired tenures, or name mismatches before submission.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E1E8] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded">04</span>
                <h3 className="font-bold text-sm text-[#17202A] mt-3">Track applications & SLAs</h3>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  Unified view of live application milestones, inspection visits, and departmental SLA clocks.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded border border-[#D9E1E8] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-2 py-0.5 rounded">05</span>
                <h3 className="font-bold text-sm text-[#17202A] mt-3">Discover government support</h3>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  Automated matching against Maharashtra PSI 2025 and Central food processing incentives with criteria breakdown.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY UDYAMSETU */}
      <section id="why-udyamsetu" className="py-16 bg-white border-b border-[#D9E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-wider text-[#1F4E79] uppercase">Platform Advantages</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17324D] mt-1">Why UdyamSetu AI</h2>
            <p className="text-sm text-[#475467] mt-2">
              Built specifically for industrial reality: high-stakes compliance where regulatory delays cost lakhs per day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <div className="w-9 h-9 rounded bg-[#17324D] text-white flex items-center justify-center mb-3">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17202A]">Dependency-Aware Sequencing</h3>
              <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                Prevents premature filings. Clearly visualizes that MSEDCL industrial power and Factory Plan clearances require Fire NOC and Land Possession deeds first.
              </p>
            </div>

            <div className="p-5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <div className="w-9 h-9 rounded bg-[#1F4E79] text-white flex items-center justify-center mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17202A]">AI-Assisted Document Pre-Validation</h3>
              <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                Detects missing engineer stamps, mismatched plot numbers, and expired tenures before government scrutiny, eliminating rejection loops.
              </p>
            </div>

            <div className="p-5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <div className="w-9 h-9 rounded bg-[#2F6B8A] text-white flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17202A]">SLA Risk Intelligence</h3>
              <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                Proactively computes elapsed days against statutory Right to Public Services guarantees, flagging applications at risk of crossing timeline caps.
              </p>
            </div>

            <div className="p-5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <div className="w-9 h-9 rounded bg-[#16855b] text-white flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17202A]">Government Scheme Matching</h3>
              <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                Evaluates fixed capital investment, sector category, and local workforce quota against active state and central industrial subsidy frameworks.
              </p>
            </div>

            <div className="p-5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <div className="w-9 h-9 rounded bg-[#17324D] text-white flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17202A]">Grounded Regulatory Copilot</h3>
              <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                Enterprise AI assistant that answers questions with exact legal citations, gazette notifications, and clear actionable next steps.
              </p>
            </div>

            <div className="p-5 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
              <div className="w-9 h-9 rounded bg-[#1F4E79] text-white flex items-center justify-center mb-3">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17202A]">Scenario What-If Simulator</h3>
              <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                Test how increasing plant investment or altering effluent treatment shifts environmental categorization, NOC hurdles, or subsidy eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR ENTREPRENEURS & DEPARTMENTS SPLIT */}
      <section id="for-entrepreneurs" className="py-16 bg-[#F5F7FA] border-b border-[#D9E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Entrepreneurs */}
            <div className="bg-white p-6 sm:p-8 rounded border border-[#D9E1E8] shadow-sm">
              <span className="text-xs font-bold text-[#1F4E79] uppercase tracking-wider">For Industry & MSMEs</span>
              <h3 className="text-xl font-bold text-[#17324D] mt-1">Accelerate Factory Commissioning</h3>
              <ul className="mt-4 space-y-3 text-xs text-[#344054]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Zero Portal Confusion:</strong> No more hunting across 8 disparate departmental websites.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Explainable Guidance:</strong> Understand exactly why an approval is listed and the relevant legal citation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Single Document Repository:</strong> Upload verified deeds, DPRs, and test certificates once for all state bodies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Inspection Scheduler:</strong> Coordinate factory safety and fire visits with designated officers.</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-[#D9E1E8]">
                <Link
                  href="/entrepreneur/dashboard"
                  className="text-xs font-semibold text-[#1F4E79] hover:text-[#17324D] flex items-center gap-1.5"
                >
                  <span>Launch Entrepreneur Portal Demo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* For Departments */}
            <div id="for-departments" className="bg-white p-6 sm:p-8 rounded border border-[#D9E1E8] shadow-sm">
              <span className="text-xs font-bold text-[#16855b] uppercase tracking-wider">For Government Officers</span>
              <h3 className="text-xl font-bold text-[#17324D] mt-1">Streamline Scrutiny & SLA Compliance</h3>
              <ul className="mt-4 space-y-3 text-xs text-[#344054]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Pre-screened Dossiers:</strong> Scrutinize applications where completeness and field checks are already pre-validated.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Workload Heatmaps:</strong> Monitor pending queues across MPCB, Fire, DISH, and Power Wings in one operational dashboard.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Direct Query Loop:</strong> Raise specific document deficiencies with applicants and track resolution timestamps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0 mt-0.5" />
                  <span><strong>Inspection Calendar:</strong> Manage inspection slots, geo-tagged notes, and compliance clearance certificates.</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-[#D9E1E8]">
                <Link
                  href="/officer/dashboard"
                  className="text-xs font-semibold text-[#16855b] hover:text-emerald-900 flex items-center gap-1.5"
                >
                  <span>Launch Officer Desk Demo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & TRANSPARENCY */}
      <section id="trust" className="py-16 bg-white border-b border-[#D9E1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#17324D] text-white rounded p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-300">Auditable System Architecture</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Transparent, Deterministic, and Source-Backed
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  UdyamSetu AI does not rely on opaque LLM hallucinations for legal compliance. Recommendations are powered by structured regulatory logic mapped to verified state gazettes, Acts, and department circulars. AI acts strictly as an explainability and pre-validation assistant, always citing authoritative reference documents.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Water & Air Acts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Factories Act 1948</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Fire Services Act 2006</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>MERC Electricity Code</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#102336] p-5 rounded border border-[#2b4c6e] text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2b4c6e]">
                  <span className="font-semibold text-slate-200">Statutory Notice</span>
                  <span className="text-[10px] text-emerald-300 font-bold">RTS COMPLIANT</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  This platform coordinates inter-departmental clearances in full alignment with the Right to Public Services Act (RTS 2015). All timelines and deemed approvals are legally mapped to authentic state regulations.
                </p>
                <div className="pt-1">
                  <Link
                    href="/admin/rules"
                    className="text-sky-300 hover:underline font-medium text-xs flex items-center gap-1"
                  >
                    <span>Inspect Regulatory Rules Engine</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-[#F5F7FA] border-b border-[#D9E1E8]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17324D]">
            Experience the Future of Industrial Approvals
          </h2>
          <p className="text-sm text-[#475467] max-w-xl mx-auto">
            Explore the single-window approval roadmap, inspect statutory dependency graphs, and verify real-time officer scrutiny.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <span>Access Enterprise Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/entrepreneur/business-profile"
              className="px-6 py-2.5 rounded bg-white hover:bg-slate-50 text-[#17324D] border border-[#D9E1E8] font-semibold text-sm transition-all"
            >
              Create New Business Profile
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-10 border-t border-[#D9E1E8] text-xs text-[#667085]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <Logo size="sm" showTagline={false} />
              <p className="text-[11px] leading-relaxed">
                Industrial Approval & Government Support Platform.
                Intelligent single-window assistance for entrepreneurs.
              </p>
              <p className="text-[10px] font-mono text-[#1F4E79]">
                Ease of Doing Business &middot; Government of Maharashtra
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs text-[#17202A] mb-3">Entrepreneur Journey</h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/entrepreneur/dashboard" className="hover:text-[#1F4E79]">Enterprise Dashboard</Link></li>
                <li><Link href="/entrepreneur/business-profile" className="hover:text-[#1F4E79]">Onboarding Profile Wizard</Link></li>
                <li><Link href="/entrepreneur/approval-roadmap" className="hover:text-[#1F4E79]">Approval Roadmap</Link></li>
                <li><Link href="/entrepreneur/dependency-graph" className="hover:text-[#1F4E79]">Dependency Graph</Link></li>
                <li><Link href="/entrepreneur/documents" className="hover:text-[#1F4E79]">Document Center & AI Pre-check</Link></li>
                <li><Link href="/entrepreneur/schemes" className="hover:text-[#1F4E79]">Government Schemes Matcher</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-[#17202A] mb-3">Officer & Administration</h4>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/officer/dashboard" className="hover:text-[#1F4E79]">Officer Scrutiny Queue</Link></li>
                <li><Link href="/officer/applications" className="hover:text-[#1F4E79]">Application Review Panel</Link></li>
                <li><Link href="/officer/inspections" className="hover:text-[#1F4E79]">Inspection Management</Link></li>
                <li><Link href="/admin/rules" className="hover:text-[#1F4E79]">Approval Rules Engine</Link></li>
                <li><Link href="/admin/sources" className="hover:text-[#1F4E79]">Regulatory Sources Registry</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs text-[#17202A] mb-3">Compliance & Authorities</h4>
              <p className="text-[11px] leading-relaxed text-[#667085] mb-2">
                Conforms with MAITRI Single Window standards, MPCB Consent Management, Maharashtra Fire Prevention Act, and DISH Factory Rules.
              </p>
              <div className="p-2 rounded bg-[#F5F7FA] border border-[#D9E1E8] text-[10px]">
                <span className="font-semibold text-[#17202A]">RTS & Single Window Standard</span>
                <p className="text-[#667085]">Statutory facilitation framework for State & Central approvals.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D9E1E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© 2026 UdyamSetu AI. National Industrial Approval & Single Window Orchestration Platform.</p>
            <div className="flex items-center gap-4">
              <span>Prototype Release v2.4</span>
              <span>•</span>
              <span>Auditable Rules</span>
              <span>•</span>
              <span>Grounded AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
