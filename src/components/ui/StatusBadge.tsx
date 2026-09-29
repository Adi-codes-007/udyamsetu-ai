import React from 'react';
import { ApprovalStatus, ApplicationStatus } from '@/types';

interface StatusBadgeProps {
  status: ApprovalStatus | ApplicationStatus | 'Active' | 'Under Review' | 'Verified' | 'Needs Attention' | 'Missing' | 'Scheduled' | 'Completed' | string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  let colorClasses = 'bg-[#f2f5f8] text-[#475467] border-[#d0dbe5]';
  let dotColor = 'bg-[#98a2b3]';

  switch (status) {
    case 'Completed':
    case 'Approved':
    case 'Verified':
    case 'Active':
      colorClasses = 'bg-[#e8f5ef] text-[#16855b] border-[#c2e5d5]';
      dotColor = 'bg-[#16855b]';
      break;

    case 'In Progress':
    case 'In Review':
    case 'Scheduled':
      colorClasses = 'bg-[#edf4fa] text-[#1f4e79] border-[#c8dced]';
      dotColor = 'bg-[#1f4e79]';
      break;

    case 'Action Required':
    case 'Inspection Pending':
    case 'Documents Required':
    case 'Query Raised':
    case 'Needs Attention':
    case 'Under Review':
      colorClasses = 'bg-[#fdf5ea] text-[#c06c1c] border-[#f6deb9]';
      dotColor = 'bg-[#d9822b]';
      break;

    case 'Blocked':
    case 'Rejected':
    case 'Missing':
      colorClasses = 'bg-[#fcedec] text-[#c93636] border-[#f8c9c9]';
      dotColor = 'bg-[#c93636]';
      break;

    case 'Upcoming':
    default:
      colorClasses = 'bg-[#f4f7f9] text-[#475467] border-[#d9e1e8]';
      dotColor = 'bg-[#98a2b3]';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded border ${sizeClasses} ${colorClasses} select-none`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}
