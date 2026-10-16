import React, { useState } from 'react';
import { 
  QrCode, 
  Share2, 
  Download, 
  Sparkles, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Mic, 
  Play, 
  Pause,
  Check,
  Copy
} from 'lucide-react';

export default function DigitalCardPage() {
  const [copied, setCopied] = useState(false);
  const [isPlayingBio, setIsPlayingBio] = useState(false);

  const myCard = {
    name: 'Prince Kumar Pandey',
    title: 'Founder & Product Architect',
    company: 'mynetworkk.ai',
    tagline: 'Building relationship memory & intelligent networking tools.',
    email: 'prince@mynetworkk.ai',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/princepandey',
    twitter: 'twitter.com/prince_ai'
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://mynetworkk.ai/u/prince`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
            <QrCode className="w-3.5 h-3.5 text-[#80235c]" />
            Smart Digital Card
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Digital Business Card
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Share via QR code, NFC tap, or direct link. No paper cards needed.
          </p>
        </div>

        <button
          onClick={handleCopyLink}
          className="px-5 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs hover:shadow-md transition-all self-start sm:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-[#dcf786]" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Card Link Copied! ✓' : 'Share My Card Link'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Digital Card Preview (Phone Frame) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[360px] bg-white rounded-[38px] p-6 shadow-2xl border-4 border-gray-900/10 space-y-5 relative overflow-hidden">
            
            {/* Gradient Top Banner */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-r from-[#80235c] via-purple-700 to-pink-500 -z-0" />

            {/* Profile Avatar */}
            <div className="pt-8 relative z-10 flex items-center justify-between">
              <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#80235c] to-purple-400 text-white font-extrabold text-2xl flex items-center justify-center">
                  PK
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#dcf786] text-gray-900 text-[10px] font-extrabold uppercase shadow-2xs mt-4">
                Verified Profile
              </span>
            </div>

            {/* Name & Title */}
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-gray-900 leading-tight">
                {myCard.name}
              </h3>
              <p className="text-xs font-bold text-[#80235c]">
                {myCard.title} • {myCard.company}
              </p>
              <p className="text-xs text-gray-600 pt-1 leading-relaxed">
                {myCard.tagline}
              </p>
            </div>

            {/* 15-Second Audio Bio Pitch */}
            <div className="bg-pink-50/70 p-3 rounded-2xl border border-pink-200/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingBio(!isPlayingBio)}
                  className="w-8 h-8 rounded-full bg-[#80235c] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs"
                >
                  {isPlayingBio ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <div>
                  <span className="text-[11px] font-bold text-gray-900 block leading-none">Voice Intro Pitch</span>
                  <span className="text-[10px] text-gray-500">15 sec audio summary</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#80235c]">
                {isPlayingBio ? '0:06' : '0:15'}
              </span>
            </div>

            {/* Contact Channels */}
            <div className="space-y-2 text-xs font-medium text-gray-700">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50">
                <Mail className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="truncate">{myCard.email}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50">
                <Phone className="w-4 h-4 text-purple-700 shrink-0" />
                <span>{myCard.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50">
                <Globe className="w-4 h-4 text-purple-700 shrink-0" />
                <span>{myCard.location}</span>
              </div>
            </div>

            {/* Save to Phone Button */}
            <button
              onClick={() => alert('vCard saved to your device contacts!')}
              className="w-full py-3 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Save Contact to Phonebook (vCard)</span>
            </button>

          </div>
        </div>

        {/* QR Code & Share Options */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Scan to Connect</h3>
              <p className="text-xs text-gray-500 mt-1">
                Show this QR code at events or conferences. When scanned, it automatically shares your details and opens your profile.
              </p>
            </div>

            {/* Simulated QR Code Canvas */}
            <div className="flex justify-center sm:justify-start">
              <div className="p-4 bg-white rounded-3xl border-2 border-dashed border-purple-300 shadow-md inline-block">
                {/* SVG QR Code Pattern */}
                <div className="w-44 h-44 bg-gray-900 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white rounded-md p-1">
                      <div className="w-full h-full bg-[#dcf786] rounded-xs" />
                    </div>
                    <div className="w-10 h-10 border-4 border-white rounded-md p-1">
                      <div className="w-full h-full bg-[#dcf786] rounded-xs" />
                    </div>
                  </div>
                  
                  {/* Center Starburst Brandmark */}
                  <div className="w-9 h-9 rounded-xl bg-[#80235c] text-white flex items-center justify-center self-center shadow-md">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
                    </svg>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white rounded-md p-1">
                      <div className="w-full h-full bg-[#dcf786] rounded-xs" />
                    </div>
                    <div className="w-8 h-8 grid grid-cols-2 gap-1 p-1">
                      <div className="bg-white rounded-xs" />
                      <div className="bg-[#dcf786] rounded-xs" />
                      <div className="bg-[#dcf786] rounded-xs" />
                      <div className="bg-white rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Share Link */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">Personal Share Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="https://mynetworkk.ai/u/prince"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-mono text-gray-800 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#80235c] text-xs font-bold transition-colors shrink-0"
                >
                  {copied ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
