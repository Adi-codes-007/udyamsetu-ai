'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { BusinessProfile } from '@/types';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Cog, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Droplets,
  AlertTriangle,
  Factory
} from 'lucide-react';

export default function BusinessProfilePage() {
  const router = useRouter();
  const { businessProfile, updateBusinessProfile } = useAppStore();

  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStepsCompleted, setAnalysisStepsCompleted] = useState<number[]>([]);

  const [formData, setFormData] = useState<BusinessProfile>(businessProfile);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerateRoadmap = () => {
    updateBusinessProfile(formData);
    setAnalyzing(true);

    const steps = [1, 2, 3, 4, 5, 6];
    steps.forEach((s, idx) => {
      setTimeout(() => {
        setAnalysisStepsCompleted(prev => [...prev, s]);
      }, (idx + 1) * 450);
    });

    setTimeout(() => {
      router.push('/entrepreneur/approval-roadmap');
    }, 3200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Page Title */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Business Profile Onboarding & Parameterization</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#edf4fa] text-[#1F4E79] border border-[#c8dced]">
              Step {step} of 5
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-0.5">
            Provide key operational parameters. The rule engine automatically deduces all statutory approvals, timelines, and incentives.
          </p>
        </div>
      </div>

      {/* Wizard Stepper Bar */}
      <div className="bg-white border border-[#D9E1E8] rounded p-3 shadow-xs">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { num: 1, title: 'Entity Info' },
            { num: 2, title: 'Location' },
            { num: 3, title: 'Project Scale' },
            { num: 4, title: 'Operations' },
            { num: 5, title: 'Review & Verify' },
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`py-2 px-1 rounded flex flex-col items-center gap-1 transition-colors ${
                step === s.num
                  ? 'bg-[#1F4E79] text-white font-bold'
                  : step > s.num
                  ? 'text-[#16855b] font-medium hover:bg-[#F5F7FA]'
                  : 'text-[#667085] hover:bg-[#F5F7FA]'
              }`}
            >
              <div className="flex items-center gap-1">
                {step > s.num ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16855b]" />
                ) : (
                  <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono border border-current">
                    {s.num}
                  </span>
                )}
                <span className="hidden sm:inline text-[11px]">{s.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white border border-[#D9E1E8] rounded p-6 shadow-xs min-h-[380px] flex flex-col justify-between">
        
        {/* STEP 1: Basic Business Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <h2 className="text-sm font-bold text-[#17324D]">Step 1: Basic Business Information</h2>
              <p className="text-xs text-[#667085]">Statutory enterprise name, legal constitution, and industry classification.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Business / Company Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded focus:outline-none focus:border-[#1F4E79] text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Legal Constitution / Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={e => setFormData({ ...formData, businessType: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded focus:outline-none focus:border-[#1F4E79] text-[#17202A]"
                >
                  <option value="Private Limited">Private Limited Company</option>
                  <option value="Partnership">Registered Partnership Firm</option>
                  <option value="LLP">Limited Liability Partnership (LLP)</option>
                  <option value="Proprietorship">Sole Proprietorship</option>
                  <option value="Public Limited">Public Limited Company</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Industry Group</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Food Processing & Agro Logistics"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded focus:outline-none focus:border-[#1F4E79] text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Specific Sector Category</label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={e => setFormData({ ...formData, sector: e.target.value })}
                  placeholder="e.g. Agro Processing & Preservation"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded focus:outline-none focus:border-[#1F4E79] text-[#17202A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <h2 className="text-sm font-bold text-[#17324D]">Step 2: Geographic & Land Location</h2>
              <p className="text-xs text-[#667085]">Determines local authority jurisdictions (MIDC, Municipal Corporation, or Gram Panchayat).</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">City / Town</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Industrial Estate / Area</label>
                <input
                  type="text"
                  value={formData.industrialArea}
                  onChange={e => setFormData({ ...formData, industrialArea: e.target.value })}
                  placeholder="e.g. MIDC Waluj Industrial Area"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#344054] mb-1">Land Classification Type</label>
                <select
                  value={formData.landType}
                  onChange={e => setFormData({ ...formData, landType: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                >
                  <option value="MIDC Industrial Land">MIDC Industrial Notified Land</option>
                  <option value="Private Industrial">Private Industrial Park / Converted Zone</option>
                  <option value="Non-Agricultural Land">Non-Agricultural (NA) Land (Revenue Cleared)</option>
                  <option value="Agricultural Conversion Pending">Agricultural Conversion (NA Order Pending)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Project Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <h2 className="text-sm font-bold text-[#17324D]">Step 3: Project Scale & Financial Outlay</h2>
              <p className="text-xs text-[#667085]">Used for MSME tiering, incentive scheme brackets, and factory safety thresholds.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Gross Fixed Capital Investment (₹ Crore)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.investmentAmountCr}
                  onChange={e => setFormData({ ...formData, investmentAmountCr: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Projected Direct Employees
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.employeesCount}
                  onChange={e => setFormData({ ...formData, employeesCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Project Stage</label>
                <select
                  value={formData.projectStage}
                  onChange={e => setFormData({ ...formData, projectStage: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                >
                  <option value="Planning / Pre-establishment">Planning / Pre-establishment</option>
                  <option value="Land Acquired">Land Acquired (Design Phase)</option>
                  <option value="Under Construction">Under Civil Construction</option>
                  <option value="Pre-commissioning">Pre-commissioning & Trial Runs</option>
                  <option value="Operational Expansion">Operational Unit Expansion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Target Commercial Operations Date</label>
                <input
                  type="date"
                  value={formData.expectedStartDate}
                  onChange={e => setFormData({ ...formData, expectedStartDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Operational Characteristics */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <h2 className="text-sm font-bold text-[#17324D]">Step 4: Operational & Environmental Parameters</h2>
              <p className="text-xs text-[#667085]">Directly triggers environmental categorizations, pollution consents, and utility connections.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#17202A]">
                  <input
                    type="checkbox"
                    checked={formData.isManufacturing}
                    onChange={e => setFormData({ ...formData, isManufacturing: e.target.checked })}
                    className="rounded text-[#1F4E79]"
                  />
                  <span>Manufacturing Activity Conducted?</span>
                </label>
                <p className="text-[11px] text-[#667085]">Triggers Factory Act 1948 and boiler inspection rules.</p>
              </div>

              <div className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#17202A]">
                  <input
                    type="checkbox"
                    checked={formData.waterUsage}
                    onChange={e => setFormData({ ...formData, waterUsage: e.target.checked })}
                    className="rounded text-[#1F4E79]"
                  />
                  <span>Industrial Water Usage / Effluent Generation?</span>
                </label>
                <p className="text-[11px] text-[#667085]">Requires ETP verification and CGWA groundwater clearance.</p>
              </div>

              <div className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#17202A]">
                  <input
                    type="checkbox"
                    checked={formData.constructionRequired}
                    onChange={e => setFormData({ ...formData, constructionRequired: e.target.checked })}
                    className="rounded text-[#1F4E79]"
                  />
                  <span>New Civil Construction / Shed Erection?</span>
                </label>
                <p className="text-[11px] text-[#667085]">Triggers Fire provisional NOC & Factory building scrutiny.</p>
              </div>

              <div className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#17202A]">
                  <input
                    type="checkbox"
                    checked={formData.exportOriented}
                    onChange={e => setFormData({ ...formData, exportOriented: e.target.checked })}
                    className="rounded text-[#1F4E79]"
                  />
                  <span>Export Oriented Unit (EOU / SEZ)?</span>
                </label>
                <p className="text-[11px] text-[#667085]">Enables enhanced export subsidies under state industrial policy.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Contract Electricity Load (kW / kVA)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.electricityRequirementKw}
                  onChange={e => setFormData({ ...formData, electricityRequirementKw: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">Pollution Category (CPCB Classification)</label>
                <select
                  value={formData.pollutionCategory}
                  onChange={e => setFormData({ ...formData, pollutionCategory: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A]"
                >
                  <option value="White">White (Exempted from MPCB Consent)</option>
                  <option value="Green">Green (Low Pollution Potential)</option>
                  <option value="Orange">Orange (Moderate Pollution - CTE/CTO Required)</option>
                  <option value="Red">Red (High Pollution - Full Scrutiny)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Confirmation */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="border-b border-[#D9E1E8] pb-3">
              <h2 className="text-sm font-bold text-[#17324D]">Step 5: Review Enterprise Summary</h2>
              <p className="text-xs text-[#667085]">Verify parameters before executing regulatory rule evaluation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-1.5">
                <span className="font-bold text-[#17324D] uppercase text-[10px] tracking-wider">Business & Location</span>
                <p><span className="text-[#667085]">Name:</span> <strong className="text-[#17202A]">{formData.businessName}</strong></p>
                <p><span className="text-[#667085]">Type:</span> {formData.businessType}</p>
                <p><span className="text-[#667085]">Sector:</span> {formData.industry} ({formData.sector})</p>
                <p><span className="text-[#667085]">Location:</span> {formData.industrialArea}, {formData.city}, {formData.state}</p>
                <p><span className="text-[#667085]">Land Type:</span> {formData.landType}</p>
              </div>

              <div className="p-3.5 rounded border border-[#D9E1E8] bg-[#F5F7FA] space-y-1.5">
                <span className="font-bold text-[#17324D] uppercase text-[10px] tracking-wider">Scale & Operations</span>
                <p><span className="text-[#667085]">Capital Outlay:</span> <strong>₹{formData.investmentAmountCr} Crore</strong></p>
                <p><span className="text-[#667085]">Employees:</span> {formData.employeesCount} Personnel</p>
                <p><span className="text-[#667085]">Power Demand:</span> {formData.electricityRequirementKw} kW</p>
                <p><span className="text-[#667085]">Pollution Category:</span> <strong className="text-amber-700">{formData.pollutionCategory}</strong></p>
                <p><span className="text-[#667085]">Manufacturing / Water:</span> {formData.isManufacturing ? 'Yes' : 'No'} / {formData.waterUsage ? 'Yes' : 'No'}</p>
              </div>
            </div>

            <div className="p-3 rounded bg-[#edf4fa] border border-[#c8dced] text-xs text-[#1F4E79] flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                Clicking below will evaluate this profile against 24+ central and state statutory rules in real time.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="pt-6 border-t border-[#D9E1E8] flex items-center justify-between mt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded text-xs font-semibold text-[#344054] bg-[#F5F7FA] hover:bg-[#edf2f7] border border-[#D9E1E8] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded text-xs font-semibold text-white bg-[#1F4E79] hover:bg-[#17324D] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerateRoadmap}
              disabled={analyzing}
              className="px-6 py-2.5 rounded text-xs font-bold text-white bg-[#16855b] hover:bg-[#126b48] flex items-center gap-2 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>{analyzing ? 'Evaluating Rules...' : 'Generate Approval Roadmap'}</span>
            </button>
          )}
        </div>

      </div>

      {/* ANALYSIS ANIMATION OVERLAY MODAL */}
      {analyzing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#D9E1E8] rounded shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#D9E1E8] pb-3">
              <div className="w-8 h-8 rounded bg-[#1F4E79] text-white flex items-center justify-center animate-spin">
                <Cog className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17324D]">Regulatory Rule Analysis Engine</h3>
                <p className="text-[11px] text-[#667085]">Evaluating profile across state statutory matrix</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { id: 1, label: 'Industry classification & NIC mapping verified' },
                { id: 2, label: 'Location & MIDC zoning guidelines vetted' },
                { id: 3, label: 'Investment thresholds & MSME tiers matched' },
                { id: 4, label: 'Environmental categorization (Orange) evaluated' },
                { id: 5, label: 'Inter-departmental clearance prerequisites mapped' },
                { id: 6, label: 'Approval dependencies & timelines sequenced' },
              ].map(item => {
                const isDone = analysisStepsCompleted.includes(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-2.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16855b] shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 animate-pulse" />
                    )}
                    <span className={isDone ? 'font-semibold text-[#17202A]' : 'text-[#667085]'}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center text-[11px] text-[#667085] border-t border-[#D9E1E8]">
              Finalizing personalized roadmap...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
