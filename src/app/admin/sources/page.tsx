'use client';

import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Building, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

export default function RegulatorySourcesPage() {
  const sources = [
    {
      code: 'SRC-MPCB',
      name: 'Maharashtra Pollution Control Board (MPCB)',
      ministry: 'Environment and Climate Change Department, Government of Maharashtra',
      statutoryActs: ['Water (Prevention & Control of Pollution) Act, 1974 (Sec 25)', 'Air (Prevention & Control of Pollution) Act, 1981 (Sec 21)', 'Hazardous and Other Wastes Rules, 2016'],
      officialPortal: 'https://mpcb.gov.in',
      standardSla: '30 to 60 Days (Based on Red/Orange/Green category)',
      lastSync: '15 Aug 2026',
    },
    {
      code: 'SRC-FIRE',
      name: 'Directorate of Maharashtra Fire Services',
      ministry: 'Urban Development & Home Department, Government of Maharashtra',
      statutoryActs: ['Maharashtra Fire Prevention and Life Safety Measures Act, 2006', 'National Building Code of India (NBC) 2016 Part 4'],
      officialPortal: 'https://mahafireservice.gov.in',
      standardSla: '15 Days for Provisional NOC',
      lastSync: '01 Sep 2026',
    },
    {
      code: 'SRC-DISH',
      name: 'Directorate of Industrial Safety and Health (DISH)',
      ministry: 'Labour and Employment Department, Government of Maharashtra',
      statutoryActs: ['The Factories Act, 1948 (Sections 6, 7 & 41)', 'Maharashtra Factories Rules, 1963 (Rule 3)'],
      officialPortal: 'https://dish.maharashtra.gov.in',
      standardSla: '20 Days for Plan Scrutiny',
      lastSync: '10 Sep 2026',
    },
    {
      code: 'SRC-MSEDCL',
      name: 'Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)',
      ministry: 'Energy Department, Government of Maharashtra',
      statutoryActs: ['Electricity Act, 2003 (Section 43)', 'MERC (Electricity Supply Code and Standards of Performance) Regulations, 2021'],
      officialPortal: 'https://www.mahadiscom.in',
      standardSla: '21 to 30 Days for HT Industrial Feeders',
      lastSync: '12 Sep 2026',
    },
    {
      code: 'SRC-MIDC',
      name: 'Maharashtra Industrial Development Corporation (MIDC)',
      ministry: 'Industries Department, Government of Maharashtra',
      statutoryActs: ['Maharashtra Industrial Development Act, 1961', 'MIDC Land Disposal Regulations, 1975 & Building Bye-Laws'],
      officialPortal: 'https://www.midcindia.org',
      standardSla: '14 to 21 Days for Possession & Water Sanction',
      lastSync: '20 Sep 2026',
    },
    {
      code: 'SRC-CGWA',
      name: 'Central Ground Water Authority (CGWA)',
      ministry: 'Ministry of Jal Shakti, Department of Water Resources, Government of India',
      statutoryActs: ['Environment (Protection) Act, 1986 (Section 3)', 'Guidelines to Regulate and Control Ground Water Extraction in India (2020)'],
      officialPortal: 'https://cgwa-noc.gov.in',
      standardSla: '45 to 60 Days for Notified Blocks',
      lastSync: '05 Aug 2026',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#17324D]">Authoritative Regulatory Sources Registry</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#edf4fa] text-[#1F4E79] border border-[#c8dced] font-bold">
              KNOWLEDGE REPOSITORY
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            Official gazettes, parent enactments, and departmental portals powering UdyamSetu's grounded citations.
          </p>
        </div>

        <span className="text-xs text-[#16855b] font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          <span>All 6 Parent Sources Verified</span>
        </span>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map(src => (
          <div key={src.code} className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#1F4E79] bg-[#edf4fa] px-1.5 py-0.5 rounded border border-[#c8dced]">
                    {src.code}
                  </span>
                  <h3 className="text-sm font-bold text-[#17324D] mt-1.5">{src.name}</h3>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Active Sync
                </span>
              </div>

              <p className="text-[11px] text-[#667085] font-medium">{src.ministry}</p>

              <div className="p-3 bg-[#F5F7FA] rounded border border-[#D9E1E8] text-xs space-y-1">
                <span className="font-semibold text-[#17202A] text-[11px] block">Governing Legislation:</span>
                <ul className="list-disc pl-4 text-[#475467] text-[11px] space-y-0.5">
                  {src.statutoryActs.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>

              <div className="text-[11px] text-[#475467] flex items-center justify-between">
                <span>Statutory SLA Norm: <strong>{src.standardSla}</strong></span>
                <span className="text-[#667085]">Synced: {src.lastSync}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D9E1E8] flex items-center justify-between text-xs">
              <a
                href={src.officialPortal}
                target="_blank"
                rel="noreferrer"
                className="text-[#1F4E79] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Visit Directorate Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[10px] text-[#667085]">Government Domain Validated</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
