'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  BusinessProfile,
  ApprovalInstance,
  DocumentItem,
  ApplicationItem,
  InspectionItem,
  GovernmentScheme,
  NotificationItem,
  ApprovalRule,
} from '@/types';
import { evaluateApprovals } from '@/services/approvalEngine';
import { matchSchemes } from '@/services/schemeEngine';
import { INITIAL_DOCUMENTS } from '@/services/documentAI';

// Initial Demo Users
export const DEMO_USERS: Record<UserRole, User> = {
  entrepreneur: {
    id: 'user-rahul',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@shreefoods.in',
    mobile: '+91 98230 44921',
    role: 'entrepreneur',
    designation: 'Managing Partner',
    avatarInitials: 'RS',
  },
  officer: {
    id: 'user-officer-suresh',
    name: 'Suresh Patil',
    email: 'suresh.patil@maharashtra.gov.in',
    mobile: '+91 94221 88301',
    role: 'officer',
    department: 'Directorate of Industries / MPCB Cell',
    designation: 'Joint Director of Industries (Chhatrapati Sambhajinagar)',
    avatarInitials: 'SP',
  },
  admin: {
    id: 'user-admin-anjali',
    name: 'Dr. Anjali Mehta',
    email: 'anjali.mehta@nic.in',
    mobile: '+91 98110 55219',
    role: 'admin',
    department: 'State Single Window System (MAITRI)',
    designation: 'Principal Nodal Administrator & Regulatory Architect',
    avatarInitials: 'AM',
  },
};

// Initial Demo Business Profile
export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  id: 'biz-shree-foods',
  userId: 'user-rahul',
  businessName: 'Shree Foods & Agro Processing',
  businessType: 'Partnership',
  industry: 'Food Processing & Agro Logistics',
  sector: 'Food Processing',
  state: 'Maharashtra',
  district: 'Chhatrapati Sambhajinagar',
  city: 'Chhatrapati Sambhajinagar',
  industrialArea: 'MIDC Waluj Industrial Area',
  landType: 'MIDC Industrial Land',
  investmentAmountCr: 4.2,
  employeesCount: 85,
  projectStage: 'Under Construction',
  expectedStartDate: '2027-01-15',
  isManufacturing: true,
  waterUsage: true,
  electricityRequirementKw: 350,
  wasteGeneration: true,
  airEmissions: true,
  hazardousMaterials: false,
  exportOriented: true,
  constructionRequired: true,
  pollutionCategory: 'Orange',
  lastUpdated: '2026-09-28',
};

// Initial Demo Applications
export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-item-1',
    applicationId: 'APP-2026-00182',
    approvalCode: 'MPCB-CTE',
    approvalName: 'MPCB Consent to Establish (Industrial CTE)',
    department: 'Maharashtra Pollution Control Board',
    submittedDate: '12 Sep 2026',
    status: 'In Review',
    currentStage: 'Sub-Regional Officer Technical Review',
    slaDays: 30,
    elapsedDays: 18,
    assignedOfficer: 'P. V. Kulkarni (Sub-Regional Officer, MPCB)',
    lastUpdated: '24 Sep 2026',
    events: [
      { id: 'ev-1', date: '12 Sep 2026, 11:30 AM', title: 'Application Submitted', description: 'Application fee paid and DPR uploaded by applicant.', actor: 'Rahul Sharma', type: 'Submission' },
      { id: 'ev-2', date: '14 Sep 2026, 03:15 PM', title: 'Documents Verified', description: 'Initial completeness check passed by Desk Officer.', actor: 'Desk Officer, MPCB', type: 'Verification' },
      { id: 'ev-3', date: '17 Sep 2026, 10:00 AM', title: 'Technical Scrutiny Commenced', description: 'ETP hydraulic parameters and effluent mass balance under review.', actor: 'P. V. Kulkarni', type: 'Review' },
      { id: 'ev-4', date: '22 Sep 2026, 04:45 PM', title: 'Clarification Raised', description: 'Query regarding biological sludge drying bed surface area calculation.', actor: 'P. V. Kulkarni', type: 'Query' },
      { id: 'ev-5', date: '24 Sep 2026, 02:10 PM', title: 'Applicant Response Submitted', description: 'Revised ETP annexure clarifying filter press specification uploaded.', actor: 'Rahul Sharma', type: 'Submission' },
    ],
  },
  {
    id: 'app-item-2',
    applicationId: 'APP-2026-00219',
    approvalCode: 'FIRE-NOC',
    approvalName: 'Fire Safety NOC (Provisional Factory Construction)',
    department: 'Directorate of Maharashtra Fire Services',
    submittedDate: '18 Sep 2026',
    status: 'Inspection Pending',
    currentStage: 'Site Physical Safety Inspection',
    slaDays: 15,
    elapsedDays: 8,
    assignedOfficer: 'Chief Fire Officer, MIDC Zone 2',
    lastUpdated: '22 Sep 2026',
    events: [
      { id: 'ev-21', date: '18 Sep 2026, 02:40 PM', title: 'Application Submitted', description: 'Hydrant drawings and hazard sheet filed online.', actor: 'Rahul Sharma', type: 'Submission' },
      { id: 'ev-22', date: '20 Sep 2026, 11:15 AM', title: 'Drawings Scrutinized', description: 'Setback passages and emergency access routes cleared.', actor: 'Station Officer', type: 'Verification' },
      { id: 'ev-23', date: '22 Sep 2026, 05:00 PM', title: 'Inspection Call Letter Issued', description: 'Applicant requested to schedule site verification inspection.', actor: 'Fire Directorate', type: 'Inspection' },
    ],
  },
  {
    id: 'app-item-3',
    applicationId: 'APP-2026-00244',
    approvalCode: 'FACTORY-PLAN',
    approvalName: 'Factory Building Plan Approval & Site Scrutiny',
    department: 'Directorate of Industrial Safety and Health (DISH)',
    submittedDate: '20 Sep 2026',
    status: 'Documents Required',
    currentStage: 'Document Deficiency Scrutiny',
    slaDays: 20,
    elapsedDays: 6,
    assignedOfficer: 'S. N. Deshmukh (Joint Director DISH)',
    lastUpdated: '23 Sep 2026',
    queryNotes: 'Structural stability certificate must bear the verified license seal of a DISH-registered structural engineer.',
    events: [
      { id: 'ev-31', date: '20 Sep 2026, 09:30 AM', title: 'Application Submitted', description: 'Factory architectural plans submitted for DISH vetting.', actor: 'Rahul Sharma', type: 'Submission' },
      { id: 'ev-32', date: '23 Sep 2026, 04:20 PM', title: 'Deficiency Notice Issued', description: 'Missing certified Structural Stability Certificate.', actor: 'S. N. Deshmukh', type: 'Query' },
    ],
  },
  {
    id: 'app-item-4',
    applicationId: 'APP-2026-00155',
    approvalCode: 'MSEDCL-POWER',
    approvalName: 'MSEDCL Industrial Electricity Sanction & Load Release',
    department: 'MSEDCL Infrastructure Division',
    submittedDate: '15 Sep 2026',
    status: 'In Review',
    currentStage: 'Feasibility Survey & Feeder Allocation',
    slaDays: 21,
    elapsedDays: 12,
    assignedOfficer: 'Executive Engineer (Urban Circle MSEDCL)',
    lastUpdated: '25 Sep 2026',
    events: [
      { id: 'ev-41', date: '15 Sep 2026, 12:00 PM', title: 'Application Submitted', description: 'Request for 350 kVA on 11 kV HT industrial express feeder.', actor: 'Rahul Sharma', type: 'Submission' },
      { id: 'ev-42', date: '21 Sep 2026, 03:30 PM', title: 'Site Feasibility Inspected', description: 'Transformer distance and tapping point confirmed.', actor: 'Assistant Engineer', type: 'Review' },
    ],
  },
];

// Initial Demo Inspections
export const INITIAL_INSPECTIONS: InspectionItem[] = [
  {
    id: 'insp-1',
    applicationId: 'APP-2026-00219',
    approvalName: 'Fire Safety NOC (Provisional)',
    businessName: 'Shree Foods & Agro Processing',
    department: 'Directorate of Maharashtra Fire Services',
    scheduledDate: '2026-10-04',
    timeSlot: '11:00 AM - 01:00 PM',
    officerName: 'Anil Khare',
    officerDesignation: 'Divisional Fire Officer, MIDC Area',
    status: 'Scheduled',
    venue: 'Plot No. E-42, MIDC Waluj, Chhatrapati Sambhajinagar',
    notes: 'Verify 6m perimeter driveway for fire engine and underground water tank excavation.',
  },
  {
    id: 'insp-2',
    applicationId: 'APP-2026-00182',
    approvalName: 'MPCB Consent to Establish (CTE)',
    businessName: 'Shree Foods & Agro Processing',
    department: 'Maharashtra Pollution Control Board',
    scheduledDate: '2026-10-07',
    timeSlot: '02:30 PM - 04:30 PM',
    officerName: 'P. V. Kulkarni',
    officerDesignation: 'Sub-Regional Officer (SRO), MPCB',
    status: 'Pending Scheduling',
    venue: 'Plot No. E-42, MIDC Waluj, Chhatrapati Sambhajinagar',
    notes: 'Pre-construction ground survey for ETP layout and green belt demarcation.',
  },
  {
    id: 'insp-3',
    applicationId: 'APP-2026-00108',
    approvalName: 'MIDC Water Connection Sanction',
    businessName: 'Shree Foods & Agro Processing',
    department: 'MIDC Water Works Division',
    scheduledDate: '2026-09-18',
    timeSlot: '10:00 AM - 11:30 AM',
    officerName: 'Vikas More',
    officerDesignation: 'Deputy Engineer (Water Works)',
    status: 'Completed',
    venue: 'Plot No. E-42, MIDC Waluj',
    notes: 'Pipeline connection tapping point verified and flow test completed successfully.',
  },
];

// Initial Approval Rules for Admin
export const INITIAL_APPROVAL_RULES: ApprovalRule[] = [
  {
    id: 'rule-mpcb-001',
    ruleCode: 'MPCB-001',
    name: 'Industrial Pollution Consent Rule',
    category: 'Environmental',
    conditionsSummary: 'Manufacturing = true AND Pollution Potential IN [Orange, Red, Green]',
    authority: 'Maharashtra Pollution Control Board',
    source: 'Water (Prevention and Control of Pollution) Act 1974 & Air Act 1981',
    legalReference: 'Section 25 / Section 21',
    status: 'Active',
  },
  {
    id: 'rule-fire-002',
    ruleCode: 'FIRE-002',
    name: 'Industrial Fire Safety Clearances Rule',
    category: 'Industrial Safety',
    conditionsSummary: 'Building Floor Area > 500 sq.m OR Hazardous Storage = true',
    authority: 'Directorate of Maharashtra Fire Services',
    source: 'Maharashtra Fire Prevention & Life Safety Measures Act 2006',
    legalReference: 'Section 3 & NBC 2016 Part 4',
    status: 'Active',
  },
  {
    id: 'rule-dish-003',
    ruleCode: 'DISH-003',
    name: 'Factory Building & Plant Plan Vetting Rule',
    category: 'Industrial Safety',
    conditionsSummary: 'Workers Projected >= 10 (with power) OR >= 20 (without power)',
    authority: 'Directorate of Industrial Safety & Health (DISH)',
    source: 'The Factories Act 1948',
    legalReference: 'Maharashtra Factories Rules 1963, Rule 3',
    status: 'Active',
  },
  {
    id: 'rule-msedcl-004',
    ruleCode: 'MSEDCL-004',
    name: 'HT/LT Industrial Power Allocation Rule',
    category: 'Power & Utilities',
    conditionsSummary: 'Contract Demand > 20 kW',
    authority: 'MSEDCL',
    source: 'MERC (Electricity Supply Code and Standards of Performance) Regulations',
    legalReference: 'Regulation 2021, Electricity Act 2003 Sec 43',
    status: 'Active',
  },
  {
    id: 'rule-cgwa-005',
    ruleCode: 'CGWA-005',
    name: 'Subsurface Ground Water Extraction Rule',
    category: 'Environmental',
    conditionsSummary: 'Water Usage = true AND Abstraction Source = Borewell / Sub-surface',
    authority: 'Central Ground Water Authority',
    source: 'MoJS Ground Water Extraction Regulations',
    legalReference: 'Gazette Notification S.O. 3289(E)',
    status: 'Active',
  },
];

// Initial Notifications
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Fire Safety Inspection Scheduled',
    message: 'Your provisional site safety inspection has been assigned to Divisional Fire Officer Anil Khare for 04 Oct 2026.',
    date: '2 hours ago',
    type: 'inspection',
    read: false,
    actionUrl: '/entrepreneur/applications',
  },
  {
    id: 'notif-2',
    title: 'Factory Approval Document Required',
    message: 'DISH Maharashtra has issued a deficiency notice: Certified Structural Stability Certificate required.',
    date: '1 day ago',
    type: 'document',
    read: false,
    actionUrl: '/entrepreneur/documents',
  },
  {
    id: 'notif-3',
    title: 'MPCB Application Approaching SLA Milestone',
    message: 'MPCB CTE application APP-2026-00182 has reached 18 of 30 statutory days. Scrutiny status is on track.',
    date: '2 days ago',
    type: 'sla',
    read: false,
    actionUrl: '/entrepreneur/applications',
  },
  {
    id: 'notif-4',
    title: '3 Relevant Government Schemes Identified',
    message: 'UdyamSetu AI identified eligible incentives under Maharashtra PSI 2025 (92% match) and PM Kisan SAMPADA (88% match).',
    date: '3 days ago',
    type: 'scheme',
    read: true,
    actionUrl: '/entrepreneur/schemes',
  },
];

interface AppContextType {
  currentUser: User;
  setCurrentRole: (role: UserRole) => void;
  businessProfile: BusinessProfile;
  updateBusinessProfile: (newProfile: Partial<BusinessProfile>) => void;
  approvals: ApprovalInstance[];
  updateApprovalStatus: (approvalCode: string, newStatus: ApprovalInstance['status'], actionMessage?: string) => void;
  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  updateDocumentStatus: (docId: string, status: DocumentItem['verificationStatus']) => void;
  applications: ApplicationItem[];
  updateApplicationStatus: (appId: string, status: ApplicationItem['status'], note?: string) => void;
  inspections: InspectionItem[];
  scheduleInspection: (inspection: InspectionItem) => void;
  updateInspectionStatus: (id: string, status: InspectionItem['status'], date?: string) => void;
  schemes: GovernmentScheme[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  approvalRules: ApprovalRule[];
  addApprovalRule: (rule: ApprovalRule) => void;
  toggleApprovalRuleStatus: (ruleId: string) => void;
  readinessPercentage: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.entrepreneur);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(INITIAL_BUSINESS_PROFILE);
  const [approvals, setApprovals] = useState<ApprovalInstance[]>(() => evaluateApprovals(INITIAL_BUSINESS_PROFILE));
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [inspections, setInspections] = useState<InspectionItem[]>(INITIAL_INSPECTIONS);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(() => matchSchemes(INITIAL_BUSINESS_PROFILE));
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [approvalRules, setApprovalRules] = useState<ApprovalRule[]>(INITIAL_APPROVAL_RULES);

  // Recalculate approvals and schemes when business profile changes
  const updateBusinessProfile = (updates: Partial<BusinessProfile>) => {
    setBusinessProfile(prev => {
      const updated = { ...prev, ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
      const newApprovals = evaluateApprovals(updated);
      setApprovals(newApprovals);
      const newSchemes = matchSchemes(updated);
      setSchemes(newSchemes);
      return updated;
    });
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentUser(DEMO_USERS[role]);
  };

  const updateApprovalStatus = (approvalCode: string, newStatus: ApprovalInstance['status'], actionMessage?: string) => {
    setApprovals(prev =>
      prev.map(app => (app.approvalCode === approvalCode ? { ...app, status: newStatus, actionRequiredMessage: actionMessage } : app))
    );
  };

  const addDocument = (doc: DocumentItem) => {
    setDocuments(prev => [doc, ...prev]);
  };

  const updateDocumentStatus = (docId: string, status: DocumentItem['verificationStatus']) => {
    setDocuments(prev =>
      prev.map(doc => (doc.id === docId ? { ...doc, verificationStatus: status } : doc))
    );
  };

  const updateApplicationStatus = (appId: string, status: ApplicationItem['status'], note?: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId || app.applicationId === appId) {
          const newEvents = [
            ...app.events,
            {
              id: `ev-${Date.now()}`,
              date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              title: `Status updated to ${status}`,
              description: note || `Officer action performed by ${currentUser.name} (${currentUser.designation || 'Reviewing Officer'})`,
              actor: currentUser.name,
              type: status === 'Approved' ? 'Decision' : status === 'Query Raised' ? 'Query' : 'Review',
            } as const,
          ];
          return { ...app, status, lastUpdated: 'Just now', queryNotes: note || app.queryNotes, events: newEvents };
        }
        return app;
      })
    );
  };

  const scheduleInspection = (inspection: InspectionItem) => {
    setInspections(prev => [inspection, ...prev]);
  };

  const updateInspectionStatus = (id: string, status: InspectionItem['status'], date?: string) => {
    setInspections(prev =>
      prev.map(insp => (insp.id === id ? { ...insp, status, scheduledDate: date || insp.scheduledDate } : insp))
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addApprovalRule = (rule: ApprovalRule) => {
    setApprovalRules(prev => [rule, ...prev]);
  };

  const toggleApprovalRuleStatus = (ruleId: string) => {
    setApprovalRules(prev =>
      prev.map(r => (r.id === ruleId ? { ...r, status: r.status === 'Active' ? 'Under Review' : 'Active' } : r))
    );
  };

  // Readiness calculation: Completed / Total Applicable
  const completedCount = approvals.filter(a => a.status === 'Completed').length;
  const totalCount = approvals.length;
  const readinessPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentRole,
        businessProfile,
        updateBusinessProfile,
        approvals,
        updateApprovalStatus,
        documents,
        addDocument,
        updateDocumentStatus,
        applications,
        updateApplicationStatus,
        inspections,
        scheduleInspection,
        updateInspectionStatus,
        schemes,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        approvalRules,
        addApprovalRule,
        toggleApprovalRuleStatus,
        readinessPercentage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
