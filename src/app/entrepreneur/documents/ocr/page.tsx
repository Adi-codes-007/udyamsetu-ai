'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { simulateOcrExtraction, SimulatedOcrResult } from '@/services/documentAI';
import { 
  ScanText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Cog, 
  ArrowLeft, 
  Check, 
  Edit3, 
  FileText, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function DocumentOcrPage() {
  const router = useRouter();
  const { addDocument } = useAppStore();

  const [ocrStage, setOcrStage] = useState<'idle' | 'uploading' | 'processing' | 'reading' | 'extracting' | 'consistency' | 'complete'>('idle');
  const [extractedData, setExtractedData] = useState<SimulatedOcrResult | null>(null);
  const [editableFields, setEditableFields] = useState<Record<string, string>>({
    'Entity Name': 'Shree Foods & Agro Processing',
    'Authorized Signatory': 'Rahul Sharma',
    'Registered Address': 'Plot No. E-42, MIDC Waluj, Chhatrapati Sambhajinagar, Maharashtra - 431136',
    'Agreement Date': '15 July 2026',
    'Expiry Date': '15 July 2031',
    'Issuing Authority': 'MIDC Regional Office, Chhatrapati Sambhajinagar',
  });

  const [confirmed, setConfirmed] = useState(false);

  const startOcrPipeline = (fileName: string) => {
    setOcrStage('uploading');

    setTimeout(() => {
      setOcrStage('processing');
    }, 600);

    setTimeout(() => {
      setOcrStage('reading');
    }, 1200);

    setTimeout(() => {
      setOcrStage('extracting');
    }, 1800);

    setTimeout(() => {
      setOcrStage('consistency');
    }, 2400);

    setTimeout(() => {
      const result = simulateOcrExtraction(fileName);
      setExtractedData(result);
      setOcrStage('complete');
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      startOcrPipeline(file.name);
    }
  };

  const handleConfirmInformation = () => {
    setConfirmed(true);
    setTimeout(() => {
      router.push('/entrepreneur/documents');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Document OCR & Entity Extraction Console</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              Machine Learning Pipeline
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Simulated OCR pipeline: uploads, reads rasterized text, extracts key entity attributes, and checks consistency with enterprise profile.
          </p>
        </div>

        <Link
          href="/entrepreneur/documents"
          className="px-3.5 py-2 rounded text-xs font-semibold bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] border border-[#D9E1E8] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Document Center</span>
        </Link>
      </div>

      {/* Main OCR Canvas */}
      <div className="bg-white border border-[#D9E1E8] rounded p-6 shadow-xs space-y-6">
        
        {/* Upload Drop Zone if idle */}
        {ocrStage === 'idle' && (
          <div className="border-2 border-dashed border-[#b8c9d9] hover:border-[#1F4E79] rounded p-10 text-center transition-colors relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
                <ScanText className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#17324D]">Upload Document for Machine Reading</p>
                <p className="text-xs text-[#667085] mt-1">
                  Select a lease deed, stability certificate, or project report to extract structured metadata.
                </p>
              </div>
              <button
                type="button"
                className="mt-2 px-4 py-2 rounded bg-[#1F4E79] text-white text-xs font-semibold"
              >
                Choose Local File
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9E1E8] flex items-center justify-center gap-3">
              <span className="text-xs text-[#667085]">Quick sample demo:</span>
              <button
                type="button"
                onClick={() => startOcrPipeline('MIDC_Registered_Lease_Plot_E42.pdf')}
                className="px-3 py-1 rounded bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#1F4E79] border border-[#c8dced] text-xs font-semibold"
              >
                Run Demo OCR on Lease Agreement →
              </button>
            </div>
          </div>
        )}

        {/* Processing Stages Indicator */}
        {ocrStage !== 'idle' && ocrStage !== 'complete' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1F4E79] text-white flex items-center justify-center mx-auto animate-spin">
              <Cog className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#17324D] capitalize">
                {ocrStage === 'uploading' && '1/5: Uploading document stream to secure OCR engine...'}
                {ocrStage === 'processing' && '2/5: Pre-processing image raster and deskewing angles...'}
                {ocrStage === 'reading' && '3/5: Reading document layers and segmenting tokens...'}
                {ocrStage === 'extracting' && '4/5: Extracting key entity fields and stamps...'}
                {ocrStage === 'consistency' && '5/5: Checking consistency against enterprise profile...'}
              </h2>
              <p className="text-xs text-[#667085] mt-1">Executing machine-vision extraction pipeline</p>
            </div>

            {/* Stepper Progress */}
            <div className="max-w-md mx-auto grid grid-cols-5 gap-1.5 text-[10px] text-center">
              {[
                { key: 'uploading', label: 'Upload' },
                { key: 'processing', label: 'Pre-process' },
                { key: 'reading', label: 'Read Text' },
                { key: 'extracting', label: 'Extract' },
                { key: 'consistency', label: 'Verify' },
              ].map((s, idx) => {
                const stages = ['uploading', 'processing', 'reading', 'extracting', 'consistency'];
                const currentIdx = stages.indexOf(ocrStage);
                const isPassed = currentIdx >= idx;
                return (
                  <div
                    key={s.key}
                    className={`p-1.5 rounded border ${
                      isPassed ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    {s.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Extracted Information Review & Edit Canvas */}
        {ocrStage === 'complete' && extractedData && (
          <div className="space-y-6">
            <div className="p-4 bg-[#e8f5ef] border border-[#c2e5d5] rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#16855b]" />
                <div>
                  <h3 className="text-xs font-bold text-[#16855b]">Document Machine-Read Successfully</h3>
                  <p className="text-[11px] text-[#2d6a4f]">Overall Extraction Confidence: <strong>98%</strong></p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#c2e5d5] text-[#16855b] font-bold">
                HIGH FIDELITY
              </span>
            </div>

            {/* Editable Extracted Fields */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#17324D] flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-[#1F4E79]" />
                  <span>Extracted Information (Editable)</span>
                </h3>
                <span className="text-xs text-[#667085]">Review extracted values before committing to dossier</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {Object.entries(editableFields).map(([key, val]) => (
                  <div key={key} className="p-3 rounded border border-[#D9E1E8] bg-[#F5F7FA]">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-[#344054] text-[11px]">{key}</label>
                      <span className="text-[10px] text-emerald-700 font-mono">98% match</span>
                    </div>
                    <input
                      type="text"
                      value={val}
                      onChange={e => setEditableFields({ ...editableFields, [key]: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#D9E1E8] rounded text-xs text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Recommendations */}
            <div className="p-4 bg-[#F5F7FA] border border-[#D9E1E8] rounded space-y-1.5 text-xs">
              <h4 className="font-bold text-[#17324D] text-xs">AI Extraction Observations:</h4>
              <ul className="list-disc pl-5 text-[#475467] space-y-1 text-[11px]">
                {extractedData.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-[#D9E1E8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setOcrStage('idle')}
                className="px-4 py-2 rounded bg-white hover:bg-slate-50 text-[#344054] text-xs font-semibold border border-[#D9E1E8]"
              >
                Scan Another Document
              </button>

              <button
                type="button"
                onClick={handleConfirmInformation}
                disabled={confirmed}
                className="px-6 py-2.5 rounded bg-[#16855b] hover:bg-[#126b48] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
              >
                {confirmed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Information Confirmed & Saved!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Information & Update Dossier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
