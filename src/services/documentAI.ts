import { DocumentItem, DocumentExtraction } from '@/types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-lease',
    title: 'MIDC Registered Lease Deed & Possession Receipt',
    type: 'Property',
    fileName: 'MIDC_Lease_Agreement_Plot_E42.pdf',
    fileSize: '4.2 MB',
    uploadDate: '15 Jul 2026',
    verificationStatus: 'Needs Attention',
    usedByApprovals: ['MPCB-CTE', 'FIRE-NOC', 'FACTORY-PLAN', 'MSEDCL-POWER'],
    extractedData: {
      documentType: 'Industrial Lease Agreement',
      confidence: 96,
      remarks: 'Lessee name and plot coordinates align with profile. Sub-lease clause lacks the explicit endorsement stamp from MIDC Regional Officer.',
      extractedFields: [
        { fieldName: 'Lessee Entity Name', value: 'Shree Foods & Agro Processing (Rahul Sharma, Partner)', matchStatus: 'Match', verified: true },
        { fieldName: 'Plot Number & Node', value: 'Plot No. E-42, MIDC Waluj, Chhatrapati Sambhajinagar', matchStatus: 'Match', verified: true },
        { fieldName: 'Execution Date', value: '15/07/2026', matchStatus: 'Match', verified: true },
        { fieldName: 'Lease Tenure Expiry', value: '15/07/2031', matchStatus: 'Match', verified: true },
        { fieldName: 'MIDC Endorsement Stamp / NOC', value: 'Missing formal stamp on Annexure 3', matchStatus: 'Missing', verified: false },
      ],
    },
  },
  {
    id: 'doc-pan',
    title: 'Business Permanent Account Number (PAN Card)',
    type: 'Identity',
    fileName: 'Firm_PAN_AABCS1429K.pdf',
    fileSize: '1.1 MB',
    uploadDate: '10 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['MSME-UDYAM', 'TAX-GST', 'MIDC-LAND', 'MPCB-CTE'],
    extractedData: {
      documentType: 'Statutory PAN Card',
      confidence: 99,
      remarks: 'Direct match with CBDT verification database records.',
      extractedFields: [
        { fieldName: 'Entity Name', value: 'Shree Foods & Agro Processing', matchStatus: 'Match', verified: true },
        { fieldName: 'PAN Number', value: 'AABCS1429K', matchStatus: 'Match', verified: true },
        { fieldName: 'Constitution Type', value: 'Partnership Firm', matchStatus: 'Match', verified: true },
        { fieldName: 'Date of Incorporation', value: '02/06/2026', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-dpr',
    title: 'Detailed Project Feasibility Report (DPR)',
    type: 'Project',
    fileName: 'DPR_Agro_Processing_Unit_v3.pdf',
    fileSize: '8.6 MB',
    uploadDate: '12 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['MPCB-CTE', 'MAH-PSI-2025', 'GOI-PMKSY-CEFPPC'],
    extractedData: {
      documentType: 'Detailed Techno-Economic Report',
      confidence: 95,
      remarks: 'ETP capacity, product flow, capital expenditure, and power demand vetted by certified consultant.',
      extractedFields: [
        { fieldName: 'Total Capital Outlay', value: '₹4.20 Crore', matchStatus: 'Match', verified: true },
        { fieldName: 'Planned Direct Workforce', value: '85 Employees', matchStatus: 'Match', verified: true },
        { fieldName: 'Effluent Discharge Rating', value: '45 KLD (Biological ETP with Tertiary RO)', matchStatus: 'Match', verified: true },
        { fieldName: 'Connected Load Estimate', value: '350 kW', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-structural',
    title: 'Structural Stability Certificate (Factory Building)',
    type: 'Technical',
    fileName: 'Structural_Stability_Certification.pdf',
    fileSize: '3.4 MB',
    uploadDate: '20 Sep 2026',
    verificationStatus: 'Needs Attention',
    usedByApprovals: ['FACTORY-PLAN', 'FIRE-NOC'],
    extractedData: {
      documentType: 'Civil Structural Certification',
      confidence: 91,
      remarks: 'Draft calculations provided, but requires DISH licensing stamp of Chartered Structural Engineer.',
      extractedFields: [
        { fieldName: 'Engineer Registration ID', value: 'Pending Empanelled Seal', matchStatus: 'Missing', verified: false },
        { fieldName: 'Live Load Rating', value: '15 kN/m² Heavy Processing Floor', matchStatus: 'Match', verified: true },
        { fieldName: 'Seismic Zone Compliance', value: 'Zone III (IS 1893:2016)', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-siteplan',
    title: 'Architectural Site Plan & Factory Layout Plan',
    type: 'Technical',
    fileName: 'Architectural_Plot_E42_RevB.pdf',
    fileSize: '12.8 MB',
    uploadDate: '14 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['MPCB-CTE', 'FACTORY-PLAN', 'FIRE-NOC'],
    extractedData: {
      documentType: 'Architectural Engineering Drawing',
      confidence: 97,
      remarks: 'Plot setbacks (6m perimeter), emergency egress stairs, and ETP layout conform to MIDC Development Control Rules.',
      extractedFields: [
        { fieldName: 'Total Plot Area', value: '4,500 sq. metres', matchStatus: 'Match', verified: true },
        { fieldName: 'Built-up Factory Floor', value: '2,150 sq. metres', matchStatus: 'Match', verified: true },
        { fieldName: 'Fire Tender Passage Width', value: '6.0 metres all-around', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-etp',
    title: 'Effluent Treatment Plant (ETP) Process & Flow Scheme',
    type: 'Environmental',
    fileName: 'ETP_Design_Hydraulic_Calculations.pdf',
    fileSize: '5.4 MB',
    uploadDate: '18 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['MPCB-CTE', 'CGWA-NOC'],
    extractedData: {
      documentType: 'Environmental Engineering Scheme',
      confidence: 94,
      remarks: 'Aerobic biological digestion with UV sterilization parameters meet MPCB discharge standards.',
      extractedFields: [
        { fieldName: 'Hydraulic Capacity', value: '50 KLD Design Capacity', matchStatus: 'Match', verified: true },
        { fieldName: 'Treated Effluent BOD', value: '< 30 mg/l (Conforms to norms)', matchStatus: 'Match', verified: true },
        { fieldName: 'ZLD Sludge Handling', value: 'Filter Press with Solar Drying Beds', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-water-test',
    title: 'NABL Accredited Raw Water Test Analysis Report',
    type: 'Environmental',
    fileName: 'NABL_Water_Analysis_Report.pdf',
    fileSize: '2.1 MB',
    uploadDate: '22 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['FSSAI-MFG', 'CGWA-NOC'],
    extractedData: {
      documentType: 'Laboratory Chemical & Micro Report',
      confidence: 99,
      remarks: 'Potability conforms to IS 10500 standards for food processing.',
      extractedFields: [
        { fieldName: 'Total Dissolved Solids (TDS)', value: '380 mg/L', matchStatus: 'Match', verified: true },
        { fieldName: 'E. Coli / Coliforms', value: 'Absent / 100ml', matchStatus: 'Match', verified: true },
        { fieldName: 'Accreditation Code', value: 'TC-8492 Valid up to 2027', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-partnership',
    title: 'Registered Partnership Deed & ROC Form A',
    type: 'Identity',
    fileName: 'Registered_Partnership_Deed_ShreeFoods.pdf',
    fileSize: '6.7 MB',
    uploadDate: '05 Jul 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['TAX-GST', 'MSME-UDYAM', 'MIDC-LAND'],
    extractedData: {
      documentType: 'Commercial Entity Deed',
      confidence: 98,
      remarks: 'Executed on non-judicial stamp paper with Registrar of Firms registration receipt.',
      extractedFields: [
        { fieldName: 'Managing Partner', value: 'Rahul Sharma (60% Equity)', matchStatus: 'Match', verified: true },
        { fieldName: 'Executive Partner', value: 'Sunita Sharma (40% Equity)', matchStatus: 'Match', verified: true },
        { fieldName: 'ROF Registration No.', value: 'MH-CS-2026-00918', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-power-sld',
    title: 'Single Line Diagram (SLD) & HT Substation Plan',
    type: 'Technical',
    fileName: 'MSEDCL_SLD_Transformer_11kV.pdf',
    fileSize: '4.8 MB',
    uploadDate: '15 Sep 2026',
    verificationStatus: 'Needs Attention',
    usedByApprovals: ['MSEDCL-POWER'],
    extractedData: {
      documentType: 'Electrical Power Scheme',
      confidence: 89,
      remarks: 'Electrical Supervisor license stamp missing on reverse of feeder routing drawing.',
      extractedFields: [
        { fieldName: 'Contract Demand', value: '350 kVA on 11 kV Express Feeder', matchStatus: 'Match', verified: true },
        { fieldName: 'Transformer Rating', value: '500 kVA 11kV/433V Stepdown', matchStatus: 'Match', verified: true },
        { fieldName: 'Licensed Supervisor Seal', value: 'Missing Signature/Seal', matchStatus: 'Missing', verified: false },
      ],
    },
  },
  {
    id: 'doc-ca-networth',
    title: 'CA Certified Net Worth & Means of Finance Certificate',
    type: 'Financial',
    fileName: 'CA_Networth_Certificate_UDIN.pdf',
    fileSize: '1.8 MB',
    uploadDate: '10 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['MAH-PSI-2025', 'GOI-PMKSY-CEFPPC', 'MIDC-LAND'],
    extractedData: {
      documentType: 'Chartered Accountant Certification',
      confidence: 100,
      remarks: 'UDIN verified directly on ICAI verification portal.',
      extractedFields: [
        { fieldName: 'Total Promoters Contribution', value: '₹1.50 Crore (Equity & Unsecured)', matchStatus: 'Match', verified: true },
        { fieldName: 'Bank Term Loan Sanction', value: '₹2.70 Crore (Bank of Maharashtra)', matchStatus: 'Match', verified: true },
        { fieldName: 'ICAI UDIN', value: '26048194BKQMN9182', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-fire-hazard',
    title: 'Fire Hazard Risk Classification & Evacuation Plan',
    type: 'Technical',
    fileName: 'Fire_Hazard_Analysis_Evacuation.pdf',
    fileSize: '3.1 MB',
    uploadDate: '18 Sep 2026',
    verificationStatus: 'Needs Attention',
    usedByApprovals: ['FIRE-NOC'],
    extractedData: {
      documentType: 'Life Safety & Hazard Vetting',
      confidence: 90,
      remarks: 'Water storage capacity for fire sump listed as 50,000L. Fire norms recommend 100,000L for agro processing.',
      extractedFields: [
        { fieldName: 'Occupancy Classification', value: 'Group G (Industrial - Moderate Hazard)', matchStatus: 'Match', verified: true },
        { fieldName: 'Underground Static Sump', value: '50,000 Litres (Revision Recommended: 100k)', matchStatus: 'Mismatch', verified: false },
        { fieldName: 'Number of Fire Exits', value: '4 Independent Fire Staircases', matchStatus: 'Match', verified: true },
      ],
    },
  },
  {
    id: 'doc-udyam-cert',
    title: 'Government of India Udyam Registration Certificate',
    type: 'Identity',
    fileName: 'Udyam_Certificate_MH20_0048192.pdf',
    fileSize: '1.2 MB',
    uploadDate: '10 Aug 2026',
    verificationStatus: 'Verified',
    usedByApprovals: ['MSME-UDYAM', 'TAX-GST', 'MAH-PSI-2025'],
    extractedData: {
      documentType: 'Official MSME Credential',
      confidence: 100,
      remarks: 'Active and verified via national enterprise register.',
      extractedFields: [
        { fieldName: 'Udyam Registration Number', value: 'UDYAM-MH-20-0048192', matchStatus: 'Match', verified: true },
        { fieldName: 'Enterprise Category', value: 'Small Enterprise (Manufacturing)', matchStatus: 'Match', verified: true },
        { fieldName: 'Major Activity NIC Code', value: '1079 - Manufacture of other food products', matchStatus: 'Match', verified: true },
      ],
    },
  },
];

export interface SimulatedOcrResult {
  fileName: string;
  fileSize: string;
  extractedFields: { fieldName: string; value: string; confidence: number }[];
  documentType: string;
  overallConfidence: number;
  recommendations: string[];
}

export function simulateOcrExtraction(fileName: string): SimulatedOcrResult {
  return {
    fileName,
    fileSize: '3.8 MB',
    documentType: 'Statutory Verification Document',
    overallConfidence: 98,
    extractedFields: [
      { fieldName: 'Entity Name', value: 'Shree Foods & Agro Processing', confidence: 99 },
      { fieldName: 'Authorized Signatory', value: 'Rahul Sharma', confidence: 98 },
      { fieldName: 'Registered Address', value: 'Plot No. E-42, MIDC Waluj, Chhatrapati Sambhajinagar, Maharashtra - 431136', confidence: 97 },
      { fieldName: 'Document Issuing Authority', value: 'Competent Statutory Officer / Government Directorate', confidence: 98 },
      { fieldName: 'Execution / Registration Date', value: '15 July 2026', confidence: 99 },
      { fieldName: 'Validity / Expiry Date', value: '15 July 2031 (5-Year Validity)', confidence: 98 },
    ],
    recommendations: [
      'Document resolution (300 DPI) and machine readability are excellent.',
      'Entity name and site address correspond exactly with business profile.',
      'Statutory pre-check indicates document is ready for official department submission.',
    ],
  };
}
