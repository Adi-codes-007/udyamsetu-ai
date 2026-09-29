import { BusinessProfile, ApprovalInstance, CopilotMessage } from '@/types';

interface RagResponse {
  answer: string;
  reasoning: string;
  recommendedNextStep: string;
  source: string;
  lastVerified: string;
}

export function queryRegulatoryCopilot(
  query: string,
  profile: BusinessProfile,
  approvals: ApprovalInstance[]
): RagResponse {
  const q = query.toLowerCase();

  // Query: Why is MPCB CTE required?
  if (q.includes('mpcb') || q.includes('consent to establish') || q.includes('cte') || q.includes('pollution')) {
    return {
      answer: `Based on your profile, your agro-processing facility involves industrial processing and potential liquid effluent generation (ETP capacity 45 KLD), categorizing it under the ${profile.pollutionCategory} pollution category. Under Section 25 of the Water Act (1974) and Section 21 of the Air Act (1981), Consent to Establish (CTE) is legally mandatory before initiating civil construction or equipment installation.`,
      reasoning: `The Maharashtra Pollution Control Board (MPCB) requires CTE to verify that your planned Effluent Treatment Plant (ETP) and air emission scrubbers conform to environmental standards prior to site expenditure.`,
      recommendedNextStep: `Ensure your Detailed Project Report (DPR) and ETP Hydraulic Design are synchronized. Your application APP-2026-00182 is currently at day 18 of its 30-day statutory SLA.`,
      source: 'MPCB Consent Management Guidelines & Water/Air Prevention Acts',
      lastVerified: '2026-08-15 (Maharashtra Gazette Notification)',
    };
  }

  // Query: What documents are missing / action required?
  if (q.includes('missing') || q.includes('action required') || q.includes('resolve') || q.includes('attention')) {
    const actionReqs = approvals.filter(a => a.status === 'Action Required');
    const msg = actionReqs.map(a => `• ${a.approvalName}: ${a.actionRequiredMessage || 'Additional document/action needed'}`).join('\n');
    return {
      answer: `You currently have 2 high-priority action items requiring your immediate intervention:\n${msg}`,
      reasoning: `The Factory Inspectorate (DISH) cannot scrutinize building safety without a certified Structural Stability Certificate, and the Maharashtra Fire Service requires a physical inspection slot to be reserved on their portal.`,
      recommendedNextStep: `1. Upload the endorsed Structural Stability Certificate in the Document Center.\n2. Open the Inspection Management tab to confirm the Fire NOC inspection date.`,
      source: 'Directorate of Industrial Safety and Health (DISH) Rules 1963 & Fire Services Act 2006',
      lastVerified: '2026-09-01 (DISH Portal circular)',
    };
  }

  // Query: What should I complete next / next steps?
  if (q.includes('next') || q.includes('what should i do') || q.includes('upcoming') || q.includes('priority')) {
    return {
      answer: `Your critical path priority is resolving the Factory Building Plan approval (DISH) and scheduling the Fire NOC inspection. Once provisional Fire NOC and Factory Plan clearance are secured, your MSEDCL 350 kVA power connection can be formally released.`,
      reasoning: `In Maharashtra industrial single-window orchestration, MSEDCL and Factory Inspectors verify provisional fire NOC before energizing industrial power transformers.`,
      recommendedNextStep: `Navigate to the Approval Dependency Graph to inspect the critical path between Land Possession → Fire NOC → Factory Approval → Power Energization.`,
      source: 'MERC Supply Code Regulations 2021 & MAITRI Single Window SOP',
      lastVerified: '2026-07-20 (MAITRI Unified Industrial SOP)',
    };
  }

  // Query: Which approvals are blocking my project?
  if (q.includes('block') || q.includes('dependency') || q.includes('depend')) {
    return {
      answer: `Currently, MSEDCL Industrial Power and Factory Commissioning are dependent on completing the Fire NOC and Factory Building Plan scrutiny. Both are currently at 'Action Required' status.`,
      reasoning: `High-tension (HT) electrical lines cannot be energized without structural stability sign-off and fire hydrant layout verification, making these two approvals the operational bottleneck.`,
      recommendedNextStep: `Clear the 'Missing Structural Stability Certificate' on the Factory Approval card to unblock subsequent pipeline dependencies.`,
      source: 'Maharashtra Factories Rules, Rule 3(2) & CEA Safety Regulations',
      lastVerified: '2026-09-10 (Industrial Safety Directorate)',
    };
  }

  // Query: Government schemes / subsidies / incentives?
  if (q.includes('scheme') || q.includes('support') || q.includes('subsidy') || q.includes('incentive') || q.includes('money') || q.includes('grant')) {
    return {
      answer: `Based on your capital investment of ₹${profile.investmentAmountCr} Cr and location in ${profile.city} (Category D+ industrial zone), you have a 92% match for the Maharashtra Package Scheme of Incentives (PSI 2025) and an 88% match for the Central PM Kisan SAMPADA Scheme (Food Processing).`,
      reasoning: `Agro-processing in Chhatrapati Sambhajinagar is treated as a priority thrust sector under Maharashtra's industrial policy, entitling you to up to 60% Gross SGST reimbursement and electricity duty exemption for 7 years.`,
      recommendedNextStep: `Visit the Government Support tab to view the detailed criteria breakdown and link your Udyam Certificate with the MAITRI incentive portal.`,
      source: 'Maharashtra Industrial Policy 2025 (GR No. PSI-2024/CR-104/IND-8)',
      lastVerified: '2026-08-30 (Department of Industries, GoM)',
    };
  }

  // Fallback general regulatory intelligence
  return {
    answer: `Regarding your query on "${query}", UdyamSetu AI has verified your business profile (${profile.businessName}, ${profile.industry}, ₹${profile.investmentAmountCr} Cr investment in ${profile.district}). Your roadmap tracks 12 statutory compliances across MPCB, Fire, DISH, MSEDCL, and MIDC.`,
    reasoning: `Industrial compliance in Maharashtra is governed through inter-departmental clearances where environmental categorization, connected power load, and building area determine regulatory milestones.`,
    recommendedNextStep: `You can review the Approval Roadmap filters or ask specific questions like 'What documents are missing?' or 'Why is MPCB CTE included?'.`,
    source: 'Unified MAITRI Portal & Maharashtra Industry Single Window Act',
    lastVerified: '2026-09-15 (State Single Window Knowledge Repository)',
  };
}
