'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { DocumentItem } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Files, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  FileText, 
  Filter, 
  ScanText, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Info,
  Trash2,
  Check
} from 'lucide-react';

export default function DocumentCenterPage() {
  const { documents, addDocument, updateDocumentStatus } = useAppStore();

  const [activeTab, setActiveTab] = useState<'All' | 'Verified' | 'Needs Attention' | 'Missing'>('All');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const verifiedCount = documents.filter(d => d.verificationStatus === 'Verified').length;
  const needsAttentionCount = documents.filter(d => d.verificationStatus === 'Needs Attention').length;
  const missingCount = 2; // Statistically indicated in prompt

  const filteredDocs = documents.filter(d => {
    if (activeTab === 'All') return true;
    return d.verificationStatus === activeTab;
  });

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
        type: 'Technical',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB` || '2.4 MB',
        uploadDate: 'Today',
        verificationStatus: 'Verified',
        usedByApprovals: ['FACTORY-PLAN', 'FIRE-NOC'],
        extractedData: {
          documentType: 'Structural & Safety Certification',
          confidence: 98,
          remarks: 'Seal and signature of Chartered Structural Engineer verified against state licensing database.',
          extractedFields: [
            { fieldName: 'Issuing Engineer', value: 'Er. Rajesh Kulkarni (Empanelled Structural Assessor)', matchStatus: 'Match', verified: true },
            { fieldName: 'License Registration ID', value: 'DISH-STR-MH-2024-819', matchStatus: 'Match', verified: true },
            { fieldName: 'Plot / Facility Address', value: 'Plot No. E-42, MIDC Waluj, Chhatrapati Sambhajinagar', matchStatus: 'Match', verified: true },
            { fieldName: 'Live & Dead Load Compliance', value: 'Certified Safe for Agro Food Processing (IS 875)', matchStatus: 'Match', verified: true },
          ],
        },
      };

      addDocument(newDoc);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Document Center & Repository</h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#edf4fa] text-[#1F4E79] border border-[#c8dced]">
              Upload Once, Reuse Across Applications
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Store, manage, and pre-validate statutory compliance documents. Pre-checked files are shared directly with MPCB, Fire, and Factory inspectorates.
          </p>
        </div>

        <Link
          href="/entrepreneur/documents/ocr"
          className="px-4 py-2 rounded text-xs font-semibold bg-[#1F4E79] hover:bg-[#17324D] text-white flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto"
        >
          <ScanText className="w-4 h-4" />
          <span>Interactive Document OCR Tool</span>
        </Link>
      </div>

      {/* Repository Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <span className="text-xs font-medium text-[#667085]">Total Registered</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#17324D]">{documents.length + missingCount}</span>
            <span className="text-[11px] text-[#667085]">Documents</span>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs">
          <span className="text-xs font-medium text-[#667085]">Verified (Pre-checked)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#16855b]">{verifiedCount}</span>
            <span className="text-[11px] text-[#16855b] font-medium">Ready</span>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs border-l-4 border-l-[#d9822b]">
          <span className="text-xs font-medium text-[#667085]">Needs Attention</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#d9822b]">{needsAttentionCount}</span>
            <span className="text-[11px] text-[#c06c1c] font-medium">Deficiencies</span>
          </div>
        </div>

        <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-xs border-l-4 border-l-[#c93636]">
          <span className="text-xs font-medium text-[#667085]">Missing Mandatory</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#c93636]">{missingCount}</span>
            <span className="text-[11px] text-[#c93636] font-medium">Action Needed</span>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="bg-white border-2 border-dashed border-[#b8c9d9] hover:border-[#1F4E79] rounded p-6 sm:p-8 text-center transition-colors relative">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleSimulatedUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#edf4fa] text-[#1F4E79] flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#17324D]">
              {isUploading ? 'Pre-validating Document & Extracting Data...' : 'Drop PDF, JPG or PNG to Upload & Pre-Validate'}
            </p>
            <p className="text-[11px] text-[#667085] mt-0.5">
              Supports project reports, NOCs, site plans, deeds (Maximum file size: 25 MB)
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#1F4E79] underline mt-1">
            Browse files from your workstation
          </span>
        </div>

        {uploadSuccess && (
          <div className="mt-3 p-2 bg-[#e8f5ef] text-[#16855b] border border-[#c2e5d5] rounded text-xs font-semibold flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Document uploaded & pre-validated successfully! Added to repository.</span>
          </div>
        )}
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="p-4 border-b border-[#D9E1E8] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {(['All', 'Verified', 'Needs Attention'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  activeTab === tab
                    ? 'bg-[#1F4E79] text-white'
                    : 'bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#667085]">
            Showing <strong>{filteredDocs.length}</strong> statutory documents
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Document Title & Filename</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4">AI Pre-Validation</th>
                <th className="py-3 px-4">Used By Approvals</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-[#F5F7FA] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-[#1F4E79] shrink-0 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-bold text-[#17324D]">{doc.title}</span>
                        <span className="text-[11px] text-[#667085] font-mono">{doc.fileName} ({doc.fileSize})</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475467] font-medium">{doc.type}</td>
                  <td className="py-3 px-4 text-[#667085]">{doc.uploadDate}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={doc.verificationStatus} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {doc.usedByApprovals.map(code => (
                        <span key={code} className="px-1.5 py-0.2 rounded bg-[#edf4fa] text-[#1F4E79] text-[10px] font-mono border border-[#c8dced]">
                          {code}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-3 py-1 rounded bg-white hover:bg-slate-50 text-[#1F4E79] border border-[#D9E1E8] font-semibold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pre-check</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOCUMENT PREVIEW & AI PRE-VALIDATION MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white border border-[#D9E1E8] rounded shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
              <div>
                <h3 className="text-base font-bold text-[#17324D]">{selectedDoc.title}</h3>
                <p className="text-xs text-[#667085]">Statutory Pre-Validation Inspection Panel</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
              {/* Left Column: Simulated Document View */}
              <div className="md:col-span-6 bg-[#F5F7FA] border border-[#D9E1E8] rounded p-4 flex flex-col justify-between min-h-[360px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#D9E1E8] pb-2">
                    <span className="font-mono text-[10px] text-[#667085]">{selectedDoc.fileName}</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#D9E1E8]">{selectedDoc.fileSize}</span>
                  </div>

                  {/* Document Simulated Sheet */}
                  <div className="bg-white border border-[#D9E1E8] rounded p-4 shadow-2xs space-y-2 text-[11px] text-[#344054]">
                    <div className="text-center pb-2 border-b border-dashed border-[#D9E1E8]">
                      <p className="font-bold text-[#17324D]">GOVERNMENT OF MAHARASHTRA</p>
                      <p className="text-[10px] text-[#667085]">REGISTRATION AND STAMPS / INDUSTRIAL RECORD</p>
                    </div>
                    <p className="font-medium text-[#17202A] pt-1">
                      {selectedDoc.extractedData?.documentType || 'Official Clearances Instrument'}
                    </p>
                    <p className="text-[11px] text-[#667085] leading-relaxed">
                      This deed / certificate is executed in respect of industrial activities undertaken at Plot E-42, MIDC Waluj, Chhatrapati Sambhajinagar by Shree Foods & Agro Processing.
                    </p>
                    <div className="pt-4 flex items-center justify-between text-[10px] text-[#667085]">
                      <span>Digitally Timestamped</span>
                      <span className="text-emerald-700 font-bold">✓ Official Hologram</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D9E1E8] flex items-center justify-between text-[11px] text-[#667085]">
                  <span>Pre-screened against MAITRI schema</span>
                  <span className="font-mono text-[#1F4E79]">98% Confidence</span>
                </div>
              </div>

              {/* Right Column: AI-Assisted Pre-Validation Panel */}
              <div className="md:col-span-6 space-y-4">
                <div className="bg-[#edf4fa] border border-[#c8dced] rounded p-3 text-xs text-[#1F4E79] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1F4E79] shrink-0" />
                  <div>
                    <strong>AI-Assisted Pre-Validation:</strong> Automated consistency check between document OCR text and registered business profile.
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-[#17202A] mb-2 uppercase tracking-wide">
                    Extracted Field Scrutiny
                  </h4>
                  <div className="space-y-2">
                    {selectedDoc.extractedData?.extractedFields.map((field, idx) => (
                      <div key={idx} className="p-2.5 rounded border border-[#D9E1E8] bg-white flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-[#667085] font-medium">{field.fieldName}</p>
                          <p className="text-xs font-semibold text-[#17202A]">{field.value}</p>
                        </div>
                        {field.matchStatus === 'Match' && (
                          <span className="text-[10px] font-bold text-[#16855b] bg-[#e8f5ef] px-2 py-0.5 rounded border border-[#c2e5d5] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Match
                          </span>
                        )}
                        {field.matchStatus === 'Missing' && (
                          <span className="text-[10px] font-bold text-[#d9822b] bg-[#fdf5ea] px-2 py-0.5 rounded border border-[#f6deb9] flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Missing
                          </span>
                        )}
                        {field.matchStatus === 'Mismatch' && (
                          <span className="text-[10px] font-bold text-[#c93636] bg-[#fcedec] px-2 py-0.5 rounded border border-[#f8c9c9] flex items-center gap-1">
                            <X className="w-3 h-3" /> Mismatch
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#F5F7FA] rounded border border-[#D9E1E8]">
                  <strong className="text-[#17202A] block mb-1">Pre-Validation Diagnostic:</strong>
                  <p className="text-[#475467] text-[11px] leading-relaxed">
                    {selectedDoc.extractedData?.remarks || 'Document satisfies statutory completeness guidelines.'}
                  </p>
                </div>

                <p className="text-[10px] text-[#667085] italic">
                  Note: AI-assisted pre-validation performs automated checks to reduce rejection rates. Final legal validity is adjudicated by the designated desk officer.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D9E1E8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded bg-[#F5F7FA] hover:bg-[#edf2f7] text-[#344054] text-xs font-semibold border border-[#D9E1E8]"
              >
                Close Inspector
              </button>

              <div className="flex items-center gap-2">
                {selectedDoc.verificationStatus === 'Needs Attention' && (
                  <button
                    onClick={() => {
                      updateDocumentStatus(selectedDoc.id, 'Verified');
                      setSelectedDoc({ ...selectedDoc, verificationStatus: 'Verified' });
                    }}
                    className="px-4 py-2 rounded bg-[#16855b] hover:bg-[#126b48] text-white text-xs font-semibold shadow-xs"
                  >
                    Mark Deficiency Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
