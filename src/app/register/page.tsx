'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useAppStore } from '@/lib/store';
import { ShieldCheck, ArrowRight, UserCheck, Lock, Mail, Phone, User } from 'lucide-react';
import { UserRole } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const { setCurrentRole } = useAppStore();

  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@shreefoods.in',
    mobile: '+91 98230 44921',
    password: 'password123',
    confirmPassword: 'password123',
    role: 'entrepreneur' as UserRole,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCurrentRole(formData.role);
      router.push('/entrepreneur/business-profile');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#F5F7FA]">
      <div className="bg-[#17324D] text-white text-[11px] py-1.5 px-6 border-b border-[#1f4e79] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sky-300">Smart India Hackathon 2026</span>
          <span className="text-slate-400">|</span>
          <span>Enterprise Registration System</span>
        </div>
        <Link href="/" className="text-slate-300 hover:text-white transition-colors">
          Return to Public Site →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white border border-[#D9E1E8] rounded shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#D9E1E8]">
            <Logo size="sm" showTagline={false} />
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#edf4fa] text-[#1F4E79] border border-[#c8dced]">
              New Entity Onboarding
            </span>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold text-[#17202A]">Create Enterprise Account</h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Register your business profile to generate your unified industrial clearance roadmap.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Full Name of Authorized Signatory
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Corporate Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Official Mobile (Aadhaar Linked)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Entity Role
                </label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                >
                  <option value="entrepreneur">Entrepreneur / Industrialist</option>
                  <option value="officer">Government Officer (Desk Review)</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#344054] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? 'Creating Enterprise Dossier...' : 'Complete Registration & Start Profile'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#D9E1E8] text-center text-xs text-[#667085]">
            Already have an active registration?{' '}
            <Link href="/login" className="font-semibold text-[#1F4E79] hover:underline">
              Sign In to Existing Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
