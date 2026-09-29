import { BusinessProfile, GovernmentScheme, SchemeMatchFactor } from '@/types';

export function matchSchemes(profile: BusinessProfile): GovernmentScheme[] {
  const schemes: GovernmentScheme[] = [];

  // Scheme 1: Maharashtra Industrial Policy (PSI)
  {
    const factors: SchemeMatchFactor[] = [
      {
        factor: 'Sector Alignment',
        matched: profile.isManufacturing,
        scoreAwarded: profile.isManufacturing ? 30 : 10,
        maxScore: 30,
        description: profile.isManufacturing ? 'Manufacturing activity is explicitly prioritized under PSI thrust sectors.' : 'Partial alignment for processing support.',
      },
      {
        factor: 'State & Backward District Category',
        matched: profile.state.toLowerCase().includes('maharashtra'),
        scoreAwarded: profile.state.toLowerCase().includes('maharashtra') ? 20 : 0,
        maxScore: 20,
        description: 'Chhatrapati Sambhajinagar is classified under Category D+ industrial tier eligible for enhanced incentives.',
      },
      {
        factor: 'Investment Threshold',
        matched: profile.investmentAmountCr >= 1 && profile.investmentAmountCr <= 50,
        scoreAwarded: 20,
        maxScore: 20,
        description: `Project capital investment of ₹${profile.investmentAmountCr} Cr satisfies the MSME expansion bracket.`,
      },
      {
        factor: 'Employment Generation',
        matched: profile.employeesCount >= 50,
        scoreAwarded: profile.employeesCount >= 50 ? 15 : 10,
        maxScore: 15,
        description: `Committed direct employment of ${profile.employeesCount} personnel satisfies high local employment criteria.`,
      },
      {
        factor: 'Corporate Entity Structure',
        matched: ['Private Limited', 'LLP', 'Partnership'].includes(profile.businessType),
        scoreAwarded: 15,
        maxScore: 15,
        description: `Constitution as a ${profile.businessType} meets formalized banking compliance criteria.`,
      },
    ];

    const matchScore = factors.reduce((sum, f) => sum + f.scoreAwarded, 0);

    schemes.push({
      id: 'sch-psi-2025',
      schemeCode: 'MAH-PSI-2025',
      schemeName: 'Maharashtra Package Scheme of Incentives (PSI 2025)',
      authority: 'Industries Department, Government of Maharashtra',
      matchScore: matchScore,
      matchFactors: factors,
      eligibilityHighlights: [
        'Manufacturing unit established in notified industrial development tier (Category D+)',
        'Fixed capital investment between ₹1 Cr and ₹50 Cr',
        'Direct formal employment for minimum 70% local domicile workers',
        'Valid Udyam Registration and MPCB CTE in place',
      ],
      potentialBenefits: 'Up to 60% Gross SGST reimbursement for 7 years, 5% interest subvention on term loan, and 100% stamp duty exemption.',
      detailedIncentives: [
        'Electricity Duty exemption for a block of 7 consecutive financial years',
        'Capital subsidy of up to 40% on eco-friendly zero-liquid-discharge (ZLD) effluent facilities',
        'Special incentive of ₹1.5/unit concession on industrial power tariff',
        'Patent and technical standardization reimbursement up to ₹10 Lakhs',
      ],
      requiredDocuments: [
        'Udyam Registration Certificate',
        'Chartered Accountant Certified Gross Fixed Capital Investment Schedule',
        'Bank Term Loan Sanction Letter & Disbursement Schedule',
        'MPCB Consent to Establish (CTE)',
        'Local Employment Domicile Declaration Form',
      ],
      applicationPortalUrl: 'https://maitri.mahaonline.gov.in',
      officialReference: 'Government Resolution No. PSI-2024/CR-104/IND-8',
      isPrototypeData: true,
    });
  }

  // Scheme 2: PM Kisan SAMPADA Yojana
  if (profile.industry.toLowerCase().includes('food') || profile.sector.toLowerCase().includes('agro')) {
    const factors: SchemeMatchFactor[] = [
      {
        factor: 'Sector Alignment',
        matched: true,
        scoreAwarded: 30,
        maxScore: 30,
        description: 'Directly covers Agro-processing clusters and modern food manufacturing value chains.',
      },
      {
        factor: 'Location & Sourcing Radius',
        matched: true,
        scoreAwarded: 20,
        maxScore: 20,
        description: 'Proximity to Marathwada agrarian procurement zones fulfills raw material farm gate criteria.',
      },
      {
        factor: 'Investment Threshold',
        matched: profile.investmentAmountCr >= 3,
        scoreAwarded: 18,
        maxScore: 20,
        description: 'Plant and machinery component is sufficient for creation of processing and preservation capacities.',
      },
      {
        factor: 'Employment Generation',
        matched: profile.employeesCount >= 40,
        scoreAwarded: 15,
        maxScore: 15,
        description: 'Supports high rural employment and supply chain linkages with local FPOs.',
      },
      {
        factor: 'Business Constitution',
        matched: true,
        scoreAwarded: 12,
        maxScore: 15,
        description: 'Eligible for joint appraisal through scheduled commercial banks.',
      },
    ];

    const matchScore = factors.reduce((sum, f) => sum + f.scoreAwarded, 0);

    schemes.push({
      id: 'sch-pmksy',
      schemeCode: 'GOI-PMKSY-CEFPPC',
      schemeName: 'Pradhan Mantri Kisan SAMPADA Yojana (PMKSY - Food Processing)',
      authority: 'Ministry of Food Processing Industries (MoFPI), Government of India',
      matchScore: matchScore,
      matchFactors: factors,
      eligibilityHighlights: [
        'New or expansion project in perishable and agro-horticultural food processing',
        'At least 50% term loan component from commercial lending bank',
        'Raw material backward linkage plan with local farmer producer organizations',
      ],
      potentialBenefits: 'Credit-linked back-ended grant-in-aid of 35% of eligible plant and machinery cost (up to ₹5 Crore).',
      detailedIncentives: [
        'Direct capital grant disbursed in 3 milestone-linked tranches into bank escrow',
        'Eligible machinery covers cleaning, sorting, grading, processing, freezing, and modern aseptic packaging',
        'Testing lab and quality control equipment eligible for 50% grant assistance',
      ],
      requiredDocuments: [
        'Detailed Techno-Economic Feasibility Report (TEFR)',
        'In-principle Term Loan Sanction Letter by Commercial Bank',
        'FSSAI Registration / Provisional Application',
        'Proof of industrial land possession for at least 15 years lease period',
      ],
      applicationPortalUrl: 'https://www.mofpi.gov.in',
      officialReference: 'MoFPI Guidelines Ref No. FP-11/2021-SAMPADA',
      isPrototypeData: true,
    });
  }

  // Scheme 3: MSME Technology Upgradation & Credit Guarantee (CGTMSE)
  {
    const factors: SchemeMatchFactor[] = [
      {
        factor: 'Sector Alignment',
        matched: true,
        scoreAwarded: 25,
        maxScore: 30,
        description: 'Broad MSME manufacturing and sustainable technology modernization bracket.',
      },
      {
        factor: 'Location Feasibility',
        matched: true,
        scoreAwarded: 20,
        maxScore: 20,
        description: 'Pan-India applicability across all operational industrial zones.',
      },
      {
        factor: 'Investment Threshold',
        matched: profile.investmentAmountCr <= 10,
        scoreAwarded: 20,
        maxScore: 20,
        description: 'Total borrowing requirement sits comfortably under collateral-free guarantee ceilings.',
      },
      {
        factor: 'Employment Support',
        matched: true,
        scoreAwarded: 12,
        maxScore: 15,
        description: 'Direct worker safety and technical skill upgradation provisions.',
      },
      {
        factor: 'Corporate Status',
        matched: true,
        scoreAwarded: 13,
        maxScore: 15,
        description: 'Recognized banking borrower standing under standard MSME covenants.',
      },
    ];

    const matchScore = factors.reduce((sum, f) => sum + f.scoreAwarded, 0);

    schemes.push({
      id: 'sch-cgtmse',
      schemeCode: 'MSME-CGTMSE-CLCS',
      schemeName: 'MSME Credit Guarantee & Zero Defect Zero Effect (ZED) Certification Support',
      authority: 'Ministry of MSME & SIDBI',
      matchScore: matchScore,
      matchFactors: factors,
      eligibilityHighlights: [
        'Micro or Small enterprise having valid Udyam registration',
        'Adopting energy-efficient equipment, zero defect production, or renewable solar rooftop',
        'Seeking collateral-free credit facility up to ₹5 Crore from participating member banks',
      ],
      potentialBenefits: 'Up to 85% credit guarantee coverage on term loans plus 80% reimbursement on ZED certification expenses.',
      detailedIncentives: [
        'Annual guarantee fee subsidy of 10% for units located in aspirational or tier-2 industrial nodes',
        'Financial assistance of up to ₹5 Lakhs for international quality standardization (ISO/HACCP)',
        'Interest rate concession of 0.50% by public sector partner banks on ZED Gold certified units',
      ],
      requiredDocuments: [
        'Udyam Registration Certificate with ZED Pledge Reference',
        'Project DPR with list of energy-efficient machinery models',
        'Audited / Estimated 3-year Financial Balance Sheet',
      ],
      applicationPortalUrl: 'https://www.cgtmse.in',
      officialReference: 'SIDBI Master Circular 2024-25/CGTMSE-1',
      isPrototypeData: true,
    });
  }

  // Scheme 4: Maharashtra State Industrial Power Subsidy
  if (profile.electricityRequirementKw >= 100) {
    schemes.push({
      id: 'sch-power-subsidy',
      schemeCode: 'MAH-ENERGY-SUB',
      schemeName: 'Maharashtra Vidarbha & Marathwada Industrial Power Tariff Subsidy',
      authority: 'Energy Department, Government of Maharashtra',
      matchScore: 84,
      matchFactors: [
        { factor: 'Region Eligibility', matched: true, scoreAwarded: 20, maxScore: 20, description: 'Chhatrapati Sambhajinagar is in Marathwada region.' },
        { factor: 'Connected Load', matched: true, scoreAwarded: 20, maxScore: 20, description: 'Connected load exceeds 100 kW industrial threshold.' },
        { factor: 'Manufacturing Activity', matched: true, scoreAwarded: 25, maxScore: 30, description: 'Exclusively available to operational processing units.' },
        { factor: 'Payment Track Record', matched: true, scoreAwarded: 19, maxScore: 30, description: 'Regular billing payment compliance criteria.' },
      ],
      eligibilityHighlights: [
        'High Tension (HT) or Low Tension (LT) industrial consumer in Marathwada region',
        'Unit operational with regular electricity billing and zero dues history',
        'Valid commercial production registration certificate',
      ],
      potentialBenefits: 'Rebate of ₹1.20 per unit on monthly MSEDCL energy charges for a period of up to 5 years.',
      detailedIncentives: [
        'Direct credit adjustment against monthly MSEDCL electricity bills',
        'Additional 50 paise per unit concession for units utilizing solar rooftop generation during day shifts',
      ],
      requiredDocuments: [
        'MSEDCL Consumer ID & Connection Sanction Letter',
        'Factory License / Commercial Production Commencement Certificate',
        'Past 3 Months Electricity Billing Proof',
      ],
      applicationPortalUrl: 'https://energy.maharashtra.gov.in',
      officialReference: 'Energy Dept GR No. PWR-2023/CR-55/NRG-2',
      isPrototypeData: true,
    });
  }

  return schemes.sort((a, b) => b.matchScore - a.matchScore);
}
