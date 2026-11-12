import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  KeyRound, 
  User, 
  Building2, 
  GraduationCap, 
  Linkedin, 
  Instagram, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  users = [], 
  onLogin, 
  onUpdateProfile, 
  onSwitchUser 
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(currentUser ? 'profile_setup' : 'login'); // 'login' | 'otp' | 'profile_setup' | 'switch_user'
  const [identifier, setIdentifier] = useState(currentUser?.email || currentUser?.phone || '');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    role: currentUser?.role || '',
    college: currentUser?.college || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    linkedin: currentUser?.linkedin || '',
    instagram: currentUser?.instagram || ''
  });

  // Resend Timer
  useEffect(() => {
    let interval;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your email or mobile phone number.');
      return;
    }
    // Check if user is blocked
    const targetUser = users.find(u => u.email === identifier.trim() || u.phone === identifier.trim());
    if (targetUser && targetUser.status === 'blocked') {
      setErrorMsg('🛑 Access Denied: This account is currently blocked by the platform Founder.');
      return;
    }

    setErrorMsg('');
    setStep('otp');
    setResendTimer(30);
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    if (!otp.trim()) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }
    setErrorMsg('');

    // If user already exists and has name, log them in directly
    const existing = users.find(u => u.email === identifier.trim() || u.phone === identifier.trim());
    if (existing && existing.name && existing.name !== 'New Member') {
      const res = onLogin(identifier.trim(), existing);
      if (res?.success) {
        try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
        onClose();
        return;
      }
    }

    // Otherwise go to profile setup
    setProfileData(prev => ({
      ...prev,
      email: identifier.includes('@') ? identifier.trim() : prev.email,
      phone: !identifier.includes('@') ? identifier.trim() : prev.phone
    }));
    setStep('profile_setup');
  };

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    if (!profileData.name.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return;
    }

    if (currentUser) {
      onUpdateProfile(profileData);
    } else {
      onLogin(identifier.trim(), profileData);
    }

    try { confetti({ particleCount: 60, spread: 70 }); } catch (e) {}
    onClose();
  };

  const handleQuickSwitch = (u) => {
    if (u.status === 'blocked') {
      setErrorMsg(`Cannot switch to ${u.name}: Account is blocked by Founder.`);
      return;
    }
    onSwitchUser(u);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: Login / Phone / Email */}
        {step === 'login' && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#80235c] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Individual Account Access</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900">
                Sign in to mynetworkk.ai
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your email or mobile number to receive a secure OTP verification code.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="prince@example.com or +91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-sm font-semibold text-gray-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-md hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Send Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Or Quick Switch Demo Accounts:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {users.slice(0, 4).map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleQuickSwitch(u)}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-[#80235c] text-left flex items-center gap-2 bg-gray-50 hover:bg-pink-50 transition-all text-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-[#80235c] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-gray-900 truncate leading-tight flex items-center gap-1">
                        {u.name.split(' ')[0]}
                        {u.isFounder && <Crown className="w-3 h-3 text-amber-500 inline" />}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{u.status === 'blocked' ? '🛑 Blocked' : u.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Enter OTP */}
        {step === 'otp' && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Verify Code</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900">
                Enter Verification Code
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                We sent a 6-digit OTP code to <strong className="text-gray-800">{identifier}</strong>.
              </p>
            </div>

            {/* Simulated Live OTP hint for demo testers */}
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Live Demo Code:</span>
                <span className="font-mono text-base font-extrabold text-[#80235c] tracking-widest">482910</span>
              </div>
              <button
                type="button"
                onClick={() => setOtp('482910')}
                className="px-3 py-1 rounded-xl bg-white border border-purple-200 text-[#80235c] font-bold text-xs hover:bg-purple-100 transition-colors"
              >
                Auto-fill
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • • • •"
                  className="w-full text-center tracking-widest text-2xl py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white font-mono font-bold text-gray-900 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-md hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Verify & Continue</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="hover:text-gray-900 font-semibold"
              >
                ← Change Number/Email
              </button>

              <button
                type="button"
                disabled={resendTimer > 0}
                onClick={() => setResendTimer(30)}
                className={`font-semibold ${resendTimer > 0 ? 'text-gray-400' : 'text-[#80235c] hover:underline'}`}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Profile Setup / Edit */}
        {step === 'profile_setup' && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold mb-2">
                <User className="w-3.5 h-3.5" />
                <span>Profile Setup</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900">
                {currentUser ? 'Edit Your Profile' : 'Set Up Your Profile'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                This identity will be attached to your digital business card and team spaces.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Prince Kumar Pandey"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Role / Headline
                  </label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                    placeholder="Founder & AI Engineer"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    College / Organization
                  </label>
                  <input
                    type="text"
                    value={profileData.college}
                    onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
                    placeholder="Dronacharya / DPG"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Elevator Bio / Pitch
                </label>
                <textarea
                  rows={2}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Building mynetworkk.ai — AI Relationship Intelligence & Networking Memory..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium text-gray-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-3 w-4 h-4 text-blue-600" />
                    <input
                      type="text"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/prince"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Instagram Handle
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3.5 top-3 w-4 h-4 text-pink-600" />
                    <input
                      type="text"
                      value={profileData.instagram}
                      onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                      placeholder="@prince.pandey"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-md hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Save Profile & Enter Workspace</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
