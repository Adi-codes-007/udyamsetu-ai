'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { BusinessProfile } from '@/types';
import { evaluateApprovals } from '@/services/approvalEngine';
import { matchSchemes } from '@/services/schemeEngine';
import { 
  Sliders, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  IndianRupee, 
  Users, 
  Building2, 
  Layers, 
  Award,
  RefreshCw
} from 'lucide-react';

export default function ScenarioSimulatorPage() {
  const { businessProfile } = useAppStore();

  const [simProfile, setSimProfile] = useState<BusinessProfile>({ ...businessProfile });

  // Evaluate baseline vs scenario in real time
  const baselineApprovals = evaluateApprovals(businessProfile);
  const simApprovals = evaluateApprovals(simProfile);

  const baselineSchemes = matchSchemes(businessProfile);
  const simSchemes = matchSchemes(simProfile);

  // Calculate diffs
  const approvalDiff = simApprovals.length - baselineApprovals.length;
  const topSimScheme = simSchemes[0];
  const topBaselineScheme = baselineSchemes[0];

  const handleReset = () => {
    setSimProfile({ ...businessProfile });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">What-If Compliance Scenario Simulator</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              Predictive Sandbox
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Simulate operational adjustments (scale, investment, power, effluent) to project how your statutory roadmap, NOCs, and subsidies will change.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 rounded text-xs font-semibold bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] border border-[#D9E1E8] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Simulator Inputs & Dynamic Impact Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Scenario Controls */}
        <div className="lg:col-span-5 bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-[#D9E1E8] pb-3">
            <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#1F4E79]" />
              <span>Simulated Parameters</span>
            </h2>
            <p className="text-[11px] text-[#667085]">Adjust parameters to observe instant regulatory recalculation.</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Capital Investment Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#344054]">
                  Capital Investment (₹ Crore)
                </label>
                <span className="font-bold text-sm text-[#1F4E79]">₹{simProfile.investmentAmountCr} Cr</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="50"
                step="0.5"
                value={simProfile.investmentAmountCr}
                onChange={e => setSimProfile({ ...simProfile, investmentAmountCr: parseFloat(e.target.value) })}
                className="w-full accent-[#1F4E79]"
              />
              <div className="flex justify-between text-[10px] text-[#667085] mt-0.5">
                <span>₹0.5 Cr (Micro)</span>
                <span>₹10 Cr (Small)</span>
                <span>₹50 Cr (Medium/Large)</span>
              </div>
            </div>

            {/* Direct Employees Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#344054]">Direct Workforce</label>
                <span className="font-bold text-sm text-[#1F4E79]">{simProfile.employeesCount} Workers</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={simProfile.employeesCount}
                onChange={e => setSimProfile({ ...simProfile, employeesCount: parseInt(e.target.value) })}
                className="w-full accent-[#1F4E79]"
              />
              <div className="flex justify-between text-[10px] text-[#667085] mt-0.5">
                <span>10 (Basic)</span>
                <span>100 (Labour intensive)</span>
                <span>300 (Mega)</span>
              </div>
            </div>

            {/* Pollution Category */}
            <div>
              <label className="block font-semibold text-[#344054] mb-1">CPCB Pollution Category</label>
              <select
                value={simProfile.pollutionCategory}
                onChange={e => setSimProfile({ ...simProfile, pollutionCategory: e.target.value as any })}
                className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A] text-xs"
              >
                <option value="White">White (Exempt from MPCB Consent)</option>
                <option value="Green">Green (Low Impact)</option>
                <option value="Orange">Orange (Moderate - Current Baseline)</option>
                <option value="Red">Red (High Impact / Severe Scrutiny)</option>
              </select>
            </div>

            {/* Connected Electricity Load */}
            <div>
              <label className="block font-semibold text-[#344054] mb-1">Contract Power Load (kW)</label>
              <input
                type="number"
                step="25"
                min="10"
                max="2000"
                value={simProfile.electricityRequirementKw}
                onChange={e => setSimProfile({ ...simProfile, electricityRequirementKw: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-white border border-[#D9E1E8] rounded text-[#17202A] text-xs"
              />
            </div>

            {/* Operational Toggles */}
            <div className="pt-2 border-t border-[#D9E1E8] space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17202A]">
                <input
                  type="checkbox"
                  checked={simProfile.isManufacturing}
                  onChange={e => setSimProfile({ ...simProfile, isManufacturing: e.target.checked })}
                  className="rounded text-[#1F4E79]"
                />
                <span>Engaged in Manufacturing Activity?</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17202A]">
                <input
                  type="checkbox"
                  checked={simProfile.waterUsage}
                  onChange={e => setSimProfile({ ...simProfile, waterUsage: e.target.checked })}
                  className="rounded text-[#1F4E79]"
                />
                <span>Substantial Industrial Water / Effluent Generation?</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#17202A]">
                <input
                  type="checkbox"
                  checked={simProfile.exportOriented}
                  onChange={e => setSimProfile({ ...simProfile, exportOriented: e.target.checked })}
                  className="rounded text-[#1F4E79]"
                />
                <span>Designated as 100% Export Oriented Unit (EOU)?</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Roadmap & Incentive Recalculations */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Comparison KPI Summary */}
          <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs">
            <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider mb-3">
              Illustrative Scenario Analysis Summary
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8]">
                <span className="text-[#667085]">Applicable Clearances:</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-[#17324D]">{simApprovals.length}</span>
                  <span className="text-[10px] text-[#667085]">
                    ({approvalDiff >= 0 ? `+${approvalDiff}` : approvalDiff} vs baseline)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8]">
                <span className="text-[#667085]">Top Scheme Match:</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl font-bold text-[#16855b]">{topSimScheme?.matchScore || 0}%</span>
                  <span className="text-[10px] text-[#667085]">Feasibility</span>
                </div>
              </div>

              <div className="p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8] col-span-2 sm:col-span-1">
                <span className="text-[#667085]">Environmental Burden:</span>
                <div className="mt-1 font-bold text-xs text-[#17324D]">
                  {simProfile.pollutionCategory === 'White' ? 'Exempt' : `${simProfile.pollutionCategory} Consent`}
                </div>
              </div>
            </div>
          </div>

          {/* Key Regulatory Differences Identified */}
          <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
              Projected Regulatory Changes
            </h3>

            <div className="space-y-2.5 text-xs">
              {simProfile.pollutionCategory === 'White' && (
                <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pollution Exemption:</strong> Switching to White category eliminates MPCB Consent to Establish (CTE) & Consent to Operate (CTO), saving ~45 statutory scrutiny days.
                  </div>
                </div>
              )}

              {simProfile.investmentAmountCr >= 10 && (
                <div className="p-3 rounded bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>High Investment Tier:</strong> Exceeding ₹10 Crore qualifies your unit for Tier-1 Mega Project fiscal incentives under Maharashtra Industrial Policy 2025 (higher SGST rebate cap).
                  </div>
                </div>
              )}

              {!simProfile.isManufacturing && (
                <div className="p-3 rounded bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Commercial Exemption:</strong> Non-manufacturing classification waives DISH Factory Building approvals and steam boiler certifications.
                  </div>
                </div>
              )}

              {simProfile.electricityRequirementKw >= 500 && (
                <div className="p-3 rounded bg-purple-50 border border-purple-200 text-purple-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>HT Express Feeder Requirement:</strong> Connected load exceeding 500 kW necessitates independent 33kV substation bay allocation by MSEDCL.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Simulated List of Approvals */}
          <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#D9E1E8] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
                Recalculated Approvals Roadmap ({simApprovals.length})
              </h3>
              <span className="text-[10px] text-[#667085]">Dynamic Simulation</span>
            </div>

            <div className="divide-y divide-[#D9E1E8] max-h-64 overflow-y-auto text-xs">
              {simApprovals.map(app => (
                <div key={app.id} className="p-3 flex items-center justify-between hover:bg-[#F5F7FA]">
                  <div>
                    <span className="font-bold text-[#17202A]">{app.approvalName}</span>
                    <p className="text-[11px] text-[#667085]">{app.authority}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F7FA] border border-[#D9E1E8] text-[#475467]">
                    {app.estimatedTimelineDays} Days SLA
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
