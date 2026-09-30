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
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Fingerprint, 
  FileText, 
  Landmark,
  KeyRound,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '@/types';

type AuthTab = 'signin' | 'signup' | 'sso';

export default function AuthPage() {
  const router = useRouter();
  const { setCurrentRole, updateBusinessProfile, businessProfile } = useAppStore();

  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  
  // Sign In States
  const [loginEmail, setLoginEmail] = useState('rahul.sharma@shreefoods.in');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [loginPhone, setLoginPhone] = useState('+91 98230 44921');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up States
  const [signupData, setSignupData] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@shreefoods.in',
    mobile: '+91 98230 44921',
    businessName: 'Shree Foods & Agro Processing',
    gstin: '27AADCS1234F1Z5',
    udyamNumber: 'UDYAM-MH-04-0019284',
    businessType: 'Partnership',
    sector: 'Food Processing',
    role: 'entrepreneur' as UserRole,
    password: 'password123',
    confirmPassword: 'password123',
  });

  const [gstinFetching, setGstinFetching] = useState(false);
  const [gstinVerified, setGstinVerified] = useState(false);

  // Status & Loaders
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sign In Handler
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Authenticating credentials with State Single Window Directory...');
    setTimeout(() => {
      setCurrentRole('entrepreneur');
      router.push('/entrepreneur/dashboard');
    }, 600);
  };

  // Send OTP
  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpCode('7492');
    setStatusMessage('One-Time Password (OTP) dispatched to registered mobile: 7492');
  };

  // GSTIN Auto-fetch simulator
  const handleFetchGstin = () => {
    setGstinFetching(true);
    setTimeout(() => {
      setSignupData(prev => ({
        ...prev,
        businessName: 'Shree Foods & Agro Processing LLP',
        businessType: 'Partnership',
        sector: 'Food Processing & Cold Chain',
      }));
      setGstinFetching(false);
      setGstinVerified(true);
      setStatusMessage('Entity verified via GSTN API: Active Regular Taxpayer in Chhatrapati Sambhajinagar, MH');
    }, 800);
  };

  // Sign Up Handler
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Creating enterprise compliance workspace and provisioning single-window token...');
    
    setTimeout(() => {
      updateBusinessProfile({
        ...businessProfile,
        businessName: signupData.businessName,
        businessType: signupData.businessType as any,
        sector: signupData.sector,
      });
      setCurrentRole(signupData.role);
      router.push('/entrepreneur/business-profile');
    }, 700);
  };

  // DigiLocker / MeriPehchan SSO Simulation
  const handleSsoAuth = (provider: string) => {
    setLoading(true);
    setStatusMessage(`Handshaking with ${provider} National Single Sign-On gateway...`);
    setTimeout(() => {
      setCurrentRole('entrepreneur');
      router.push('/entrepreneur/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F5F7FA]">
      {/* Top Header */}
      <div className="bg-[#17324D] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#1f4e79] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sky-300">National Single Window System</span>
          <span className="text-slate-400">|</span>
          <span className="truncate">Integrated Industrial Clearances & Regulatory Compliance Portal</span>
        </div>
        <Link href="/" className="text-slate-300 hover:text-white transition-colors shrink-0">
          ← Back to Public Portal
        </Link>
      </div>

      {/* Main Authentication Container */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white border border-[#D9E1E8] rounded-lg shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Mission, Features, and SIH Context */}
          <div className="md:col-span-5 bg-[#17324D] p-6 sm:p-8 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <Logo size="md" />

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-sky-300 uppercase tracking-widest bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
                  Unified Gateway
                </span>
                <h2 className="text-xl font-bold tracking-tight text-white leading-snug">
                  One Business Identity.<br />
                  Zero Circular Bottlenecks.<br />
                  Single Statutory Window.
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Secure access point for entrepreneurs, industrial review desks, and regulatory administrators under the Ease of Doing Business framework.
                </p>
              </div>

              {/* Trust & Regulatory Badges */}
              <div className="space-y-3 pt-4 border-t border-[#2a4d70] text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>DPIIT & State Single Window (MAITRI) Compliant</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Right to Public Services Act (RTS 2015) SLA Tracking</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>DigiLocker & MeriPehchan NSSO Ready</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero-Defect Inter-Departmental Cross-Audit</span>
                </div>
              </div>
            </div>

            {/* Portal Operational Notice */}
            <div className="mt-8 pt-5 border-t border-[#2a4d70] space-y-3">
              <div className="p-3 rounded bg-white/5 border border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-sky-300 font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized Single-Window Gateway</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Single statutory portal coordinating with MIDC, MPCB, Fire Services, DISH, MSEDCL, and Central Registries under the National Ease of Doing Business framework.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <p className="font-bold text-white text-xs">7 Departments</p>
                  <p className="text-slate-400">Integrated Services</p>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <p className="font-bold text-emerald-400 text-xs">RTS 2015</p>
                  <p className="text-slate-400">SLA Enforced</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabbed Form (Sign In, Sign Up, MeriPehchan SSO) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Tab Navigation */}
              <div className="flex items-center gap-1 p-1 bg-[#F5F7FA] border border-[#D9E1E8] rounded-md mb-6">
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setStatusMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'signin'
                      ? 'bg-[#1F4E79] text-white shadow-xs'
                      : 'text-[#667085] hover:text-[#17202A]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('signup'); setStatusMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'signup'
                      ? 'bg-[#1F4E79] text-white shadow-xs'
                      : 'text-[#667085] hover:text-[#17202A]'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Register Enterprise</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('sso'); setStatusMessage(null); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'sso'
                      ? 'bg-[#1F4E79] text-white shadow-xs'
                      : 'text-[#667085] hover:text-[#17202A]'
                  }`}
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  <span>MeriPehchan / SSO</span>
                </button>
              </div>

              {/* Status or Alert Notification if any */}
              {statusMessage && (
                <div className="mb-4 p-2.5 rounded bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* TAB 1: SIGN IN */}
              {activeTab === 'signin' && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#D9E1E8] mb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#17202A]">Portal Sign In</h3>
                      <p className="text-xs text-[#667085]">Enter registered enterprise credentials to access active clearances</p>
                    </div>
                    <div className="flex bg-[#F5F7FA] border border-[#D9E1E8] p-0.5 rounded text-[10px]">
                      <button
                        type="button"
                        onClick={() => setAuthMethod('password')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${authMethod === 'password' ? 'bg-[#1F4E79] text-white font-semibold' : 'text-[#667085]'}`}
                      >
                        Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMethod('otp')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${authMethod === 'otp' ? 'bg-[#1F4E79] text-white font-semibold' : 'text-[#667085]'}`}
                      >
                        Mobile OTP
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-4">
                    {authMethod === 'password' ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-[#344054] mb-1">
                            Registered Corporate Email or Pan-India Corporate ID
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              value={loginEmail}
                              onChange={e => setLoginEmail(e.target.value)}
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
                            <button
                              type="button"
                              onClick={() => setStatusMessage('Password reset link dispatched to registered corporate email.')}
                              className="text-[11px] text-[#1F4E79] hover:underline font-medium cursor-pointer"
                            >
                              Forgot Password?
                            </button>
                          </div>
                          <div className="relative">
                            <Lock className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="password"
                              value={loginPassword}
                              onChange={e => setLoginPassword(e.target.value)}
                              required
                              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-[#344054] mb-1">
                            Aadhaar-Linked Official Mobile Number
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Phone className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="tel"
                                value={loginPhone}
                                onChange={e => setLoginPhone(e.target.value)}
                                required
                                placeholder="+91 98230 44921"
                                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="px-3 py-2 text-xs font-semibold bg-[#edf4fa] hover:bg-[#dce9f5] text-[#1F4E79] border border-[#b8cde0] rounded cursor-pointer whitespace-nowrap"
                            >
                              {otpSent ? 'Resend OTP' : 'Send OTP'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#344054] mb-1">
                            Enter 4-Digit OTP
                          </label>
                          <input
                            type="text"
                            maxLength={4}
                            value={otpCode}
                            onChange={e => setOtpCode(e.target.value)}
                            placeholder="Enter 7492"
                            className="w-full px-3 py-2 text-xs tracking-widest text-center font-mono font-bold bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between text-xs">
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
                      className="w-full py-2.5 px-4 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying Identity...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Compliance Workspace</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 2: REGISTER / SIGN UP */}
              {activeTab === 'signup' && (
                <div>
                  <div className="pb-3 border-b border-[#D9E1E8] mb-4">
                    <h3 className="text-base font-bold text-[#17202A]">New Enterprise Registration</h3>
                    <p className="text-xs text-[#667085]">
                      Onboard your business to instantly generate your statutory approval roadmap & incentive matches
                    </p>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-3">
                    {/* GSTIN / Udyam Auto-Fetch Banner */}
                    <div className="p-3 rounded bg-[#edf4fa] border border-[#c8dced] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#17324D]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Fast-Track Auto-Fill via GSTIN / Udyam</span>
                        </div>
                        <p className="text-[11px] text-[#667085]">
                          Fetch legal entity name, jurisdiction, and sector directly from GSTN & MSME registry.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleFetchGstin}
                        disabled={gstinFetching}
                        className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-[#1F4E79] border border-[#b8cde0] rounded shadow-2xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                      >
                        {gstinFetching ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Querying GSTN...</span>
                          </>
                        ) : gstinVerified ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>GSTN Verified</span>
                          </>
                        ) : (
                          <span>Auto-Fetch Data</span>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          Enterprise Legal Name
                        </label>
                        <input
                          type="text"
                          required
                          value={signupData.businessName}
                          onChange={e => setSignupData({ ...signupData, businessName: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          GSTIN / Tax ID
                        </label>
                        <input
                          type="text"
                          required
                          value={signupData.gstin}
                          onChange={e => setSignupData({ ...signupData, gstin: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          Authorized Signatory Name
                        </label>
                        <input
                          type="text"
                          required
                          value={signupData.fullName}
                          onChange={e => setSignupData({ ...signupData, fullName: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          Official Corporate Email
                        </label>
                        <input
                          type="email"
                          required
                          value={signupData.email}
                          onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={signupData.mobile}
                          onChange={e => setSignupData({ ...signupData, mobile: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          Industry Sector
                        </label>
                        <select
                          value={signupData.sector}
                          onChange={e => setSignupData({ ...signupData, sector: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        >
                          <option value="Food Processing">Food Processing</option>
                          <option value="Pharmaceuticals & Biotech">Pharmaceuticals & Biotech</option>
                          <option value="Automobile & Auto Components">Automobile & Auto Components</option>
                          <option value="Textiles & Apparel">Textiles & Apparel</option>
                          <option value="Chemicals & Fertilizers">Chemicals & Fertilizers</option>
                          <option value="Renewable Energy & Solar">Renewable Energy & Solar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#344054] mb-1">
                          User Role
                        </label>
                        <select
                          value={signupData.role}
                          onChange={e => setSignupData({ ...signupData, role: e.target.value as UserRole })}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#D9E1E8] rounded text-[#17202A] focus:outline-none focus:border-[#1F4E79]"
                        >
                          <option value="entrepreneur">Entrepreneur</option>
                          <option value="officer">Government Officer</option>
                          <option value="admin">System Administrator</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-2.5 px-4 rounded bg-[#1F4E79] hover:bg-[#17324D] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Provisioning Enterprise Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Enterprise Workspace & Start Roadmap</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: MERIPEHCHAN / DIGILOCKER SSO */}
              {activeTab === 'sso' && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-[#D9E1E8]">
                    <h3 className="text-base font-bold text-[#17202A]">National Single Sign-On (NSSO)</h3>
                    <p className="text-xs text-[#667085]">
                      Authenticate using certified Government of India identity infrastructure
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* MeriPehchan */}
                    <div 
                      onClick={() => handleSsoAuth('MeriPehchan (Jan Parichay)')}
                      className="p-3.5 rounded border border-[#D9E1E8] hover:border-[#1F4E79] hover:bg-[#edf4fa] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#17324D] text-white flex items-center justify-center font-bold text-sm">
                          MP
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#17202A] group-hover:text-[#1F4E79]">MeriPehchan (Jan Parichay)</h4>
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">Official NSSO</span>
                          </div>
                          <p className="text-[11px] text-[#667085]">Unified citizen and enterprise login under Digital India</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#1F4E79] group-hover:translate-x-0.5 transition-all" />
                    </div>

                    {/* DigiLocker */}
                    <div 
                      onClick={() => handleSsoAuth('DigiLocker Corporate')}
                      className="p-3.5 rounded border border-[#D9E1E8] hover:border-[#1F4E79] hover:bg-[#edf4fa] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#0a58ca] text-white flex items-center justify-center font-bold text-sm">
                          DL
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#17202A] group-hover:text-[#1F4E79]">DigiLocker Corporate Onboarding</h4>
                            <span className="text-[9px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded font-semibold border border-sky-200">Auto-Pull NOCs</span>
                          </div>
                          <p className="text-[11px] text-[#667085]">Instant verification of PAN, Certificate of Incorporation & GST</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#1F4E79] group-hover:translate-x-0.5 transition-all" />
                    </div>

                    {/* Aadhaar e-Sign / e-KYC */}
                    <div 
                      onClick={() => handleSsoAuth('UIDAI e-KYC')}
                      className="p-3.5 rounded border border-[#D9E1E8] hover:border-[#1F4E79] hover:bg-[#edf4fa] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#d9381e] text-white flex items-center justify-center font-bold text-sm">
                          UID
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-[#17202A] group-hover:text-[#1F4E79]">UIDAI Aadhaar OTP e-KYC</h4>
                            <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold border border-slate-200">Statutory Signatory</span>
                          </div>
                          <p className="text-[11px] text-[#667085]">Instant biometric / OTP token authentication for authorized signatory</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#667085] group-hover:text-[#1F4E79] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Details */}
            <div className="mt-6 pt-4 border-t border-[#D9E1E8] flex items-center justify-between text-xs text-[#667085]">
              <span>Need administrative assistance? <a href="mailto:support@udyamsetu.gov.in" className="text-[#1F4E79] font-medium hover:underline">Helpdesk</a></span>
              <span className="text-[10px] text-slate-400">Security Encryption: AES-256 TLS 1.3</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Mini Footer */}
      <div className="bg-white border-t border-[#D9E1E8] py-2 px-6 text-center text-[11px] text-[#667085]">
        © 2026 UdyamSetu AI — Single-Window Industrial Clearance & Statutory Deemed Approval Platform.
      </div>
    </div>
  );
}
