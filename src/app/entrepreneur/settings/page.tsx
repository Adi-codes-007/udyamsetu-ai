'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Settings, ShieldCheck, Bell, Key, Check, Building2, User } from 'lucide-react';

export default function SettingsPage() {
  const { currentUser, businessProfile } = useAppStore();
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    inspectionReminders: true,
    slaAlertDays: 3,
    dscTokenLinked: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#17324D]">Enterprise Settings & Compliance Preferences</h1>
          <p className="text-xs text-[#667085] mt-1">
            Manage single-window notification alerts, DSC digital signature linkage, and authorized signatories.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Signatory Profile */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D9E1E8] pb-3">
            <User className="w-4 h-4 text-[#1F4E79]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Authorized Signatory Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[#667085] mb-1">Name</label>
              <input
                type="text"
                disabled
                value={currentUser.name}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] font-semibold"
              />
            </div>
            <div>
              <label className="block text-[#667085] mb-1">Corporate Email</label>
              <input
                type="text"
                disabled
                value={currentUser.email}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] font-semibold"
              />
            </div>
            <div>
              <label className="block text-[#667085] mb-1">Aadhaar Linked Mobile</label>
              <input
                type="text"
                disabled
                value={currentUser.mobile}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] font-semibold"
              />
            </div>
            <div>
              <label className="block text-[#667085] mb-1">Designation</label>
              <input
                type="text"
                disabled
                value={currentUser.designation || 'Managing Partner'}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#D9E1E8] rounded text-[#17202A] font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Notifications & SLA Alerts */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D9E1E8] pb-3">
            <Bell className="w-4 h-4 text-[#1F4E79]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Notification & Alert Thresholds</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8] cursor-pointer">
              <div>
                <span className="font-semibold text-[#17202A] block">Email Notifications on Department Actions</span>
                <span className="text-[#667085] text-[11px]">Receive updates when officers issue queries or approvals.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={e => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="rounded text-[#1F4E79]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8] cursor-pointer">
              <div>
                <span className="font-semibold text-[#17202A] block">SMS Critical Alerts</span>
                <span className="text-[#667085] text-[11px]">Instant SMS for inspection schedules and urgent deficiency calls.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={e => setSettings({ ...settings, smsAlerts: e.target.checked })}
                className="rounded text-[#1F4E79]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded bg-[#F5F7FA] border border-[#D9E1E8] cursor-pointer">
              <div>
                <span className="font-semibold text-[#17202A] block">Proactive SLA Risk Warnings</span>
                <span className="text-[#667085] text-[11px]">Notify applicant 3 days before a statutory RTS deadline lapses.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.inspectionReminders}
                onChange={e => setSettings({ ...settings, inspectionReminders: e.target.checked })}
                className="rounded text-[#1F4E79]"
              />
            </label>
          </div>
        </div>

        {/* Digital Signature Token */}
        <div className="bg-white border border-[#D9E1E8] rounded p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#D9E1E8] pb-3">
            <Key className="w-4 h-4 text-[#1F4E79]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#17324D]">Class-3 DSC Token Integration</h2>
          </div>

          <div className="p-3 bg-[#e8f5ef] border border-[#c2e5d5] rounded text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16855b]" />
              <div>
                <p className="font-bold text-[#16855b]">Digital Signature Certificate Active</p>
                <p className="text-[11px] text-[#2d6a4f]">Class 3 USB Token Linked: Rahul Sharma (eMudhra CA, Valid till Nov 2027)</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#16855b] font-bold bg-white px-2 py-0.5 rounded border border-[#c2e5d5]">
              VERIFIED
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs font-semibold text-[#16855b] flex items-center gap-1">
              <Check className="w-4 h-4" /> Preferences saved successfully.
            </span>
          )}
          {!saved && <div />}

          <button
            type="submit"
            className="px-5 py-2.5 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Save Compliance Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
