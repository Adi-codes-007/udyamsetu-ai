'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useAppStore } from '@/lib/store';
import { 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Building2, 
  AlertCircle 
} from 'lucide-react';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole } = useAppStore();

  const [email, setEmail] = useState('rahul.sharma@shreefoods.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCurrentRole('entrepreneur');
      router.push('/entrepreneur/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#F5F7FA]">
      {/* Top Header */}
      <div className="bg-[#17324D] text-white text-[11px] py-1.5 px-6 border-b border-[#1f4e79] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sky-300">National Single Window System</span>
          <span className="text-slate-400">|</span>
          <span>Official Industrial Clearances & Regulatory Compliance Portal</span>
        </div>
        <Link href="/" className="text-slate-300 hover:text-white transition-colors">
          Return to Public Site →
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white border border-[#D9E1E8] rounded shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Brand & Value Proposition */}
          <div className="md:col-span-5 bg-[#17324D] p-6 sm:p-8 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <Logo size="md" />

              <div className="space-y-2 pt-4">
                <span className="text-[10px] font-mono text-sky-300 uppercase tracking-widest">
                  Single-Window Orchestration
                </span>
                <h2 className="text-xl font-bold tracking-tight text-white leading-snug">
                  One Business Profile.<br />
                  One Approval Roadmap.<br />
                  One Window.
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed pt-2">
                  Unified enterprise clearance portal powered by deterministic regulatory rules and AI-assisted document pre-validation.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#2a4d70] text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>State Government Verified Standards</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inter-departmental SLA Monitoring</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Integrated Incentive Calculations</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2a4d70] text-[11px] text-slate-400">
              <p className="font-medium text-slate-300">Single-Window Clearance Portal</p>
              <p className="text-[10px] text-slate-400">Government of Maharashtra &middot; Industries Department</p>
            </div>
          </div>

          {/* Right Column: Sign In Form & Instant Demo Persona Buttons */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Quick Tab Switcher */}
              <div className="flex items-center gap-1 p-1 bg-[#F5F7FA] border border-[#D9E1E8] rounded-md mb-4">
                <Link
                  href="/login"
                  className="flex-1 py-1.5 text-xs font-semibold rounded bg-[#1F4E79] text-white shadow-xs text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=signup"
                  className="flex-1 py-1.5 text-xs font-semibold rounded text-[#667085] hover:text-[#17202A] text-center"
                >
                  Register New Enterprise
                </Link>
                <Link
                  href="/auth?tab=sso"
                  className="flex-1 py-1.5 text-xs font-semibold rounded text-[#667085] hover:text-[#17202A] text-center"
                >
                  MeriPehchan / SSO
                </Link>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8]">
                <div>
                  <h3 className="text-base font-bold text-[#17202A]">Portal Authentication</h3>
                  <p className="text-xs text-[#667085]">Sign in to access your compliance workspace</p>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Secure Access
                </span>
              </div>

              {/* Standard Credentials Form */}
              <form onSubmit={handleSignIn} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#344054] mb-1">
                    Registered Email Address / Corporate ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="e.g. rahul.sharma@shreefoods.in"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-[#344054]">
                      Password
                    </label>
                    <a href="#forgot" className="text-[11px] text-[#1F4E79] hover:underline font-medium">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#344054]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-[#D9E1E8] text-[#1F4E79] focus:ring-0"
                    />
                    <span>Remember this workstation</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-2 px-4 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Portal'}
                  {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-[#D9E1E8] flex items-center justify-between text-xs">
              <span className="text-[#667085]">First time applicant?</span>
              <Link href="/register" className="font-semibold text-[#1F4E79] hover:underline">
                Register New Enterprise Account →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
