import { BusinessProfile, ApprovalInstance } from '@/types';

export function evaluateApprovals(profile: BusinessProfile): ApprovalInstance[] {
  const approvals: ApprovalInstance[] = [];

  // 1. MSME Registration (Udyam)
  approvals.push({
    id: 'app-udyam',
    approvalCode: 'MSME-UDYAM',
    approvalName: 'Udyam Registration Certificate',
    authority: 'Ministry of Micro, Small and Medium Enterprises',
    department: 'MSME Directorate',
    status: 'Completed',
    priority: 'High',
    estimatedTimelineDays: 1,
    dependencies: [],
    requiredDocuments: ['Aadhaar of Authorized Signatory', 'PAN Card', 'GSTIN'],
    whyApplies: 'All commercial entities seeking industrial incentives, subsidized power tariffs, and regulatory facilitation in India require Udyam registration.',
    source: 'MSME Development Act, 2006',
    legalReference: 'Gazette Notification S.O. 2119(E)',
    completedDate: '10 Aug 2026',
    applicationReference: 'UDYAM-MH-20-0048192',
  });

  // 2. GST & PAN Tax Registration
  approvals.push({
    id: 'app-gst',
    approvalCode: 'TAX-GST',
    approvalName: 'GST Registration & Commercial Tax Registration',
    authority: 'Goods and Services Tax Network (GSTN)',
    department: 'State GST Department, Maharashtra',
    status: 'Completed',
    priority: 'High',
    estimatedTimelineDays: 3,
    dependencies: ['MSME-UDYAM'],
    requiredDocuments: ['Business PAN', 'Certificate of Incorporation / Partnership Deed', 'Bank Account Statement', 'Registered Office Proof'],
    whyApplies: 'Mandatory for interstate business transactions, turnover above statutory threshold, and claiming input tax credit.',
    source: 'Central Goods and Services Tax Act, 2017',
    legalReference: 'Section 22 & 24 of CGST Act',
    completedDate: '14 Aug 2026',
    applicationReference: 'GSTIN27AABCS1429K1Z4',
  });

  // 3. MIDC Land Allotment & Lease Possession
  approvals.push({
    id: 'app-land',
    approvalCode: 'MIDC-LAND',
    approvalName: 'MIDC Industrial Land Allotment & Possession Certificate',
    authority: 'Maharashtra Industrial Development Corporation (MIDC)',
    department: 'Land & Infrastructure Wing',
    status: 'Completed',
    priority: 'High',
    estimatedTimelineDays: 21,
    dependencies: ['MSME-UDYAM'],
    requiredDocuments: ['Project Summary Report', 'Audited Financials', 'Registered Partnership Deed', 'Security Deposit Receipt'],
    whyApplies: `Your unit is registered in ${profile.industrialArea || 'MIDC Industrial Area'}, requiring an authorized land allotment and registered lease deed before construction commencement.`,
    source: 'MIDC Land Disposal Regulations, 1975',
    legalReference: 'MIDC Circular No. A-14/2021',
    completedDate: '28 Aug 2026',
    applicationReference: 'MIDC-CH-WL-2026-891',
  });

  // 4. FSSAI Food License (Sector specific if Food Processing)
  if (profile.industry.toLowerCase().includes('food') || profile.sector.toLowerCase().includes('agro')) {
    approvals.push({
      id: 'app-fssai',
      approvalCode: 'FSSAI-MFG',
      approvalName: 'FSSAI Manufacturing License (State / Central)',
      authority: 'Food Safety and Standards Authority of India',
      department: 'FDA Maharashtra',
      status: 'Completed',
      priority: 'High',
      estimatedTimelineDays: 15,
      dependencies: ['TAX-GST', 'MIDC-LAND'],
      requiredDocuments: ['Food Safety Management System (FSMS) Plan', 'List of Machinery and Equipment', 'Water Testing Report', 'NOC from Local Authority'],
      whyApplies: 'Your business profile indicates agro-processing and food product manufacturing, which falls under statutory Food Safety standards prior to market dispatch.',
      source: 'Food Safety and Standards (Licensing and Registration of Food Businesses) Regulations, 2011',
      legalReference: 'FSS Act 2006, Section 31',
      completedDate: '02 Sep 2026',
      applicationReference: 'FSSAI-MH-2026-90214',
    });
  }

  // 5. Local Municipal / Gram Panchayat Trade NOC
  approvals.push({
    id: 'app-local-noc',
    approvalCode: 'LOCAL-NOC',
    approvalName: 'Municipal / Industrial Township Trade Permission & Health NOC',
    authority: `${profile.city || 'Chhatrapati Sambhajinagar'} Municipal Corporation`,
    department: 'Town Planning & Health Wing',
    status: 'Completed',
    priority: 'Medium',
    estimatedTimelineDays: 14,
    dependencies: ['MIDC-LAND'],
    requiredDocuments: ['MIDC Allotment Letter', 'Site Layout Drawing', 'Property Tax Clearance', 'Director KYC'],
    whyApplies: 'Required by local urban authority to verify zoning compliance, public sanitation clearances, and municipal record entry.',
    source: 'Maharashtra Municipal Corporations Act, 1949',
    legalReference: 'Section 376 - Trade Licensing',
    completedDate: '05 Sep 2026',
    applicationReference: 'CSMC-IND-2026-1104',
  });

  // 6. Central Ground Water Authority (CGWA) NOC
  if (profile.waterUsage) {
    approvals.push({
      id: 'app-cgwa',
      approvalCode: 'CGWA-NOC',
      approvalName: 'CGWA Ground Water Abstraction Clearance',
      authority: 'Central Ground Water Authority (CGWA)',
      department: 'Ministry of Jal Shakti',
      status: 'Completed',
      priority: 'Medium',
      estimatedTimelineDays: 45,
      dependencies: ['MIDC-LAND'],
      requiredDocuments: ['Hydro-geological Survey Report', 'Rainwater Harvesting Feasibility Plan', 'Water Quality Test', 'Flow Meter Calibration Spec'],
      whyApplies: 'You have indicated industrial water consumption with potential sub-surface abstraction requirements in a notified water stress catchment.',
      source: 'Guidelines to Regulate and Control Ground Water Extraction in India',
      legalReference: 'MoJS Notification S.O. 3289(E)',
      completedDate: '08 Sep 2026',
      applicationReference: 'CGWA-MH-IND-2026-3391',
    });
  }

  // 7. Boilers Registration & Inspection Certificate
  if (profile.isManufacturing) {
    approvals.push({
      id: 'app-boiler',
      approvalCode: 'BOILER-CERT',
      approvalName: 'Industrial Boiler Registration & Erection Certificate',
      authority: 'Directorate of Steam Boilers, Maharashtra',
      department: 'Labour and Employment Department',
      status: 'Completed',
      priority: 'Medium',
      estimatedTimelineDays: 18,
      dependencies: ['MIDC-LAND'],
      requiredDocuments: ['Boiler Manufacturer Design Calculation', 'Material Test Certificate', 'Steam Piping Isometric Layout', 'Welder Qualification Record'],
      whyApplies: 'Thermal steam generators and industrial processing boilers above 25 litres capacity mandate statutory technical inspection before pressure trial.',
      source: 'The Boilers Act, 1923',
      legalReference: 'Indian Boiler Regulations (IBR) 1950',
      completedDate: '10 Sep 2026',
      applicationReference: 'DSB-MH-2026-0044',
    });
  }

  // 8. MPCB Consent to Establish (CTE)
  if (profile.pollutionCategory !== 'White') {
    approvals.push({
      id: 'app-mpcb-cte',
      approvalCode: 'MPCB-CTE',
      approvalName: 'MPCB Consent to Establish (CTE - Industrial)',
      authority: 'Maharashtra Pollution Control Board (MPCB)',
      department: 'Environment Department, GoM',
      status: 'In Progress',
      priority: 'High',
      estimatedTimelineDays: 30,
      dependencies: ['MIDC-LAND', 'TAX-GST'],
      requiredDocuments: ['Detailed Project Report (DPR)', 'Land Ownership / Lease Agreement', 'Site Plan & Layout Drawing', 'Effluent Treatment Plant (ETP) Scheme'],
      whyApplies: `Your unit has been categorized under the ${profile.pollutionCategory} pollution category due to industrial processing and effluent generation. MPCB CTE is legally mandatory before initiating civil construction or equipment installation.`,
      source: 'MPCB Consent Management & Water / Air Prevention Acts',
      legalReference: 'Water Act 1974 Sec 25 & Air Act 1981 Sec 21',
      applicationReference: 'APP-2026-00182',
      submissionDate: '12 Sep 2026',
      slaDays: 30,
      elapsedDays: 18,
    });
  }

  // 9. Fire Safety NOC (Provisional)
  approvals.push({
    id: 'app-fire-noc',
    approvalCode: 'FIRE-NOC',
    approvalName: 'Fire Safety NOC (Provisional for Factory Construction)',
    authority: 'Directorate of Maharashtra Fire Services',
    department: 'Fire Department',
    status: 'Action Required',
    priority: 'High',
    estimatedTimelineDays: 15,
    dependencies: ['MIDC-LAND'],
    requiredDocuments: ['Architectural Building Layout', 'Fire Hydrant & Sprinkler Design Scheme', 'Hazard Classification Sheet', 'MIDC Site Plan'],
    whyApplies: 'Industrial structures with covered building areas exceeding statutory fire safety norms require provisional fire clearance prior to superstructure framing.',
    source: 'Maharashtra Fire Prevention and Life Safety Measures Act, 2006',
    legalReference: 'Section 3 & National Building Code 2016 Part 4',
    actionRequiredMessage: 'Inspection scheduling required. Please select an available date for the site safety scrutiny visit.',
    applicationReference: 'FIRE-MH-2026-0819',
    submissionDate: '18 Sep 2026',
    slaDays: 15,
    elapsedDays: 8,
  });

  // 10. Factory Building Plan Scrutiny & Approval
  if (profile.constructionRequired || profile.isManufacturing) {
    approvals.push({
      id: 'app-factory-plan',
      approvalCode: 'FACTORY-PLAN',
      approvalName: 'Factory Building Plan Approval & Site Scrutiny',
      authority: 'Directorate of Industrial Safety and Health (DISH)',
      department: 'Labour Department, Maharashtra',
      status: 'Action Required',
      priority: 'High',
      estimatedTimelineDays: 20,
      dependencies: ['MIDC-LAND', 'FIRE-NOC'],
      requiredDocuments: ['DISH Flow Diagram', 'Ventilation & Lighting Calculation', 'Structural Stability Certificate', 'Machinery Layout Plan'],
      whyApplies: `Operating an industrial facility with ${profile.employeesCount} projected workers requires formal plant architecture vetting to ensure occupational safety and emergency egress standards.`,
      source: 'The Factories Act, 1948',
      legalReference: 'Maharashtra Factories Rules 1963, Rule 3',
      actionRequiredMessage: 'Missing: Structural Stability Certificate signed by a DISH-empanelled Chartered Structural Engineer.',
      applicationReference: 'DISH-MH-2026-4421',
      submissionDate: '20 Sep 2026',
      slaDays: 20,
      elapsedDays: 6,
    });
  }

  // 11. MSEDCL Industrial Power Connection (HT/LT)
  if (profile.electricityRequirementKw > 0) {
    approvals.push({
      id: 'app-msedcl-power',
      approvalCode: 'MSEDCL-POWER',
      approvalName: 'MSEDCL Industrial Electricity Sanction & Load Release',
      authority: 'Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)',
      department: 'Power & Infrastructure Wing',
      status: 'In Progress',
      priority: 'High',
      estimatedTimelineDays: 21,
      dependencies: ['MIDC-LAND', 'FACTORY-PLAN'],
      requiredDocuments: ['Single Line Diagram (SLD)', 'Electrical Contractor Readiness Certificate', 'Test Report (Form A)', 'MIDC Possession Letter'],
      whyApplies: `A connected industrial power demand of ${profile.electricityRequirementKw} kW necessitates dedicated feeder transformer sanction and sub-station metering approval.`,
      source: 'Maharashtra Electricity Regulatory Commission (MERC) Supply Code',
      legalReference: 'Regulation 2021, Electricity Act 2003 Sec 43',
      applicationReference: 'MSEDCL-HT-2026-778',
      submissionDate: '15 Sep 2026',
      slaDays: 21,
      elapsedDays: 12,
    });
  }

  // 12. MIDC Industrial Water Connection Sanction
  if (profile.waterUsage) {
    approvals.push({
      id: 'app-midc-water',
      approvalCode: 'MIDC-WATER',
      approvalName: 'MIDC Industrial Water Supply Connection Sanction',
      authority: 'Maharashtra Industrial Development Corporation (MIDC)',
      department: 'Water Supply Division',
      status: 'In Progress',
      priority: 'Medium',
      estimatedTimelineDays: 15,
      dependencies: ['MIDC-LAND', 'MPCB-CTE'],
      requiredDocuments: ['Plumbing Schematic Diagram', 'Water Requirement Justification Note', 'Water Meter Calibration Test'],
      whyApplies: 'Industrial process units in MIDC estates must secure tap-off quota permissions to draw treated pipeline supply.',
      source: 'MIDC Water Supply Regulations, 1973',
      legalReference: 'Rule 4 - Industrial Water Allotment',
      applicationReference: 'MIDC-WTR-2026-903',
      submissionDate: '21 Sep 2026',
      slaDays: 15,
      elapsedDays: 8,
    });
  }

  return approvals;
}
