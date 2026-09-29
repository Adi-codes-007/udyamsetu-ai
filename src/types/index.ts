export type UserRole = 'entrepreneur' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  department?: string;
  designation?: string;
  avatarInitials?: string;
}

export type PollutionCategory = 'White' | 'Green' | 'Orange' | 'Red';

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: 'Private Limited' | 'LLP' | 'Partnership' | 'Proprietorship' | 'Public Limited';
  industry: string;
  sector: string;
  state: string;
  district: string;
  city: string;
  industrialArea: string;
  landType: 'MIDC Industrial Land' | 'Private Industrial' | 'Non-Agricultural Land' | 'Agricultural Conversion Pending';
  investmentAmountCr: number;
  employeesCount: number;
  projectStage: 'Planning / Pre-establishment' | 'Land Acquired' | 'Under Construction' | 'Pre-commissioning' | 'Operational Expansion';
  expectedStartDate: string;
  isManufacturing: boolean;
  waterUsage: boolean;
  electricityRequirementKw: number;
  wasteGeneration: boolean;
  airEmissions: boolean;
  hazardousMaterials: boolean;
  exportOriented: boolean;
  constructionRequired: boolean;
  pollutionCategory: PollutionCategory;
  lastUpdated: string;
}

export interface ApprovalRule {
  id: string;
  ruleCode: string;
  name: string;
  category: 'Environmental' | 'Industrial Safety' | 'Power & Utilities' | 'Local Governance' | 'Sector Specific';
  conditionsSummary: string;
  authority: string;
  source: string;
  legalReference: string;
  status: 'Active' | 'Under Review';
}

export type ApprovalStatus = 'Completed' | 'In Progress' | 'Action Required' | 'Blocked' | 'Upcoming';
export type ApprovalPriority = 'High' | 'Medium' | 'Low';

export interface ApprovalInstance {
  id: string;
  approvalCode: string;
  approvalName: string;
  authority: string;
  department: string;
  status: ApprovalStatus;
  priority: ApprovalPriority;
  estimatedTimelineDays: number;
  dependencies: string[]; // approvalCodes that must precede
  requiredDocuments: string[];
  whyApplies: string;
  source: string;
  legalReference: string;
  completedDate?: string;
  actionRequiredMessage?: string;
  applicationReference?: string;
  submissionDate?: string;
  slaDays?: number;
  elapsedDays?: number;
}

export interface DocumentFieldExtraction {
  fieldName: string;
  value: string;
  matchStatus: 'Match' | 'Mismatch' | 'Missing';
  verified: boolean;
}

export interface DocumentExtraction {
  documentType: string;
  confidence: number;
  extractedFields: DocumentFieldExtraction[];
  remarks: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Identity' | 'Property' | 'Project' | 'Environmental' | 'Technical' | 'Financial';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  verificationStatus: 'Verified' | 'Needs Attention' | 'Under Scrutiny' | 'Missing';
  usedByApprovals: string[];
  extractedData?: DocumentExtraction;
}

export interface ApplicationEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  actor: string;
  type: 'Submission' | 'Verification' | 'Review' | 'Query' | 'Inspection' | 'Decision';
}

export type ApplicationStatus = 
  | 'In Review'
  | 'Inspection Pending'
  | 'Documents Required'
  | 'Query Raised'
  | 'Approved'
  | 'Rejected';

export interface ApplicationItem {
  id: string;
  applicationId: string;
  approvalCode: string;
  approvalName: string;
  department: string;
  submittedDate: string;
  status: ApplicationStatus;
  currentStage: string;
  slaDays: number;
  elapsedDays: number;
  assignedOfficer?: string;
  lastUpdated: string;
  queryNotes?: string;
  events: ApplicationEvent[];
}

export interface InspectionItem {
  id: string;
  applicationId: string;
  approvalName: string;
  businessName: string;
  department: string;
  scheduledDate: string;
  timeSlot: string;
  officerName: string;
  officerDesignation: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Pending Scheduling';
  venue: string;
  notes?: string;
}

export interface SchemeMatchFactor {
  factor: string;
  matched: boolean;
  scoreAwarded: number;
  maxScore: number;
  description: string;
}

export interface GovernmentScheme {
  id: string;
  schemeCode: string;
  schemeName: string;
  authority: string;
  matchScore: number; // e.g. 92
  matchFactors: SchemeMatchFactor[];
  eligibilityHighlights: string[];
  potentialBenefits: string;
  detailedIncentives: string[];
  requiredDocuments: string[];
  applicationPortalUrl: string;
  officialReference: string;
  isPrototypeData: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'inspection' | 'document' | 'sla' | 'scheme' | 'approval';
  read: boolean;
  actionUrl?: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  structuredResponse?: {
    answer: string;
    reasoning: string;
    recommendedNextStep: string;
    source: string;
    lastVerified: string;
  };
}
