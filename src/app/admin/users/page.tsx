'use client';

import React from 'react';
import { useAppStore, DEMO_USERS } from '@/lib/store';
import { Users, ShieldCheck, Mail, Phone, Building2 } from 'lucide-react';

export default function AdminUsersPage() {
  const usersList = Object.values(DEMO_USERS);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#17324D]">User Access & Role Directory</h1>
          <p className="text-xs text-[#667085] mt-1">
            Manage authenticated enterprise principals, reviewing desk officers, and system administrators.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#D9E1E8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#D9E1E8]">
          <h2 className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Registered System Users ({usersList.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FA] border-b border-[#D9E1E8] text-[#344054] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Email & Mobile</th>
                <th className="py-3 px-4">Department / Designation</th>
                <th className="py-3 px-4 text-right">Access Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9E1E8] text-[#17202A]">
              {usersList.map(u => (
                <tr key={u.id} className="hover:bg-[#F5F7FA]">
                  <td className="py-3 px-4 font-bold text-[#17324D]">{u.name}</td>
                  <td className="py-3 px-4">
                    <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-[#edf4fa] text-[#1F4E79] border border-[#c8dced]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col text-[11px]">
                      <span>{u.email}</span>
                      <span className="text-[#667085]">{u.mobile}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#475467]">
                    {u.designation || u.department || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[#16855b] font-semibold bg-[#e8f5ef] px-2 py-0.5 rounded border border-[#c2e5d5] text-[10px]">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
