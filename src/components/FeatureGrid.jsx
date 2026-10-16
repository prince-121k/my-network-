import React, { useState } from 'react';
import { 
  Camera, 
  Mic, 
  Bell, 
  Search, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  X, 
  Mail, 
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Database,
  Calendar,
  Contact2
} from 'lucide-react';

export default function FeatureGrid({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('all');
  const [acceptedInvite, setAcceptedInvite] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Designer from FlowLoop');

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#fdedee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#80235c] bg-white px-4 py-1.5 rounded-full border border-pink-200 shadow-xs">
            Core Superpowers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Designed for real human networking.
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            No more lost business cards, forgotten conversations, or awkward cold follow-ups. Everything captured in seconds.
          </p>
        </div>

        {/* 6 Cards Grid (matching screenshot media_1792169151307_df8dcc10.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Scan & Tag Instantly */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-pink-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Visual simulation of business card scanning */}
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-5 relative overflow-hidden mb-6 aspect-video flex items-center justify-center">
              {/* Camera scanner frame overlay */}
              <div className="absolute inset-4 border-2 border-dashed border-[#dcf786]/60 rounded-xl pointer-events-none" />
              
              {/* Business card inside frame */}
              <div className="bg-white rounded-lg p-3 w-48 shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                    AM
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900 leading-none">Alex Morgan</p>
                    <p className="text-[8px] text-gray-500">Marketing Manager</p>
                  </div>
                </div>
                <div className="space-y-1 border-t border-gray-100 pt-1.5 text-[8px] text-gray-600 font-mono">
                  <p>alex@flowloop.com</p>
                  <p>+1 555 019 2831</p>
                </div>
              </div>

              {/* Scanning laser line */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#dcf786] shadow-[0_0_8px_#dcf786] animate-pulse" />

              <span className="absolute bottom-2 right-3 text-[10px] text-gray-300 font-mono bg-black/40 px-2 py-0.5 rounded">
                ⚡ OCR Extracted
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Scan & tag instantly
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Point your camera at any paper card or badge and mynetworkk.ai extracts the details automatically.
              </p>
            </div>
          </div>

          {/* Card 2: Contextual Voice Notes */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-pink-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Visual simulation of voice note & transcription */}
            <div className="bg-purple-50/60 rounded-2xl p-4 sm:p-5 mb-6 aspect-video flex flex-col justify-center space-y-3 border border-purple-100">
              
              <div className="bg-white p-3 rounded-xl shadow-xs border border-purple-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">A quick note about "Alex"</span>
                </div>
                <span className="text-xs font-mono text-gray-400">00:12</span>
              </div>

              {/* Waveform & live transcription preview */}
              <div className="bg-white p-3 rounded-xl shadow-xs border border-purple-100 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#80235c]">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>AI Transcription</span>
                </div>
                <p className="text-[11px] text-gray-700 italic leading-snug line-clamp-2">
                  "Alex is a product designer at FlowLoop. Loves building simple, useful products... Transcribing..."
                </p>
              </div>

            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Contextual voice notes
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Record a quick voice memo right after meeting someone, and it's transcribed directly to their profile.
              </p>
            </div>
          </div>

          {/* Card 3: Smart follow-ups */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-pink-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Visual simulation of CRM reminder */}
            <div className="bg-blue-50/60 rounded-2xl p-4 sm:p-5 mb-6 aspect-video flex flex-col justify-center space-y-2.5 border border-blue-100">
              
              {/* Contact mini row */}
              <div className="bg-white p-2.5 rounded-xl border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    OR
                  </div>
                  <span className="text-xs font-bold text-gray-900">Omar Rosser</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
                    <MessageSquare className="w-3 h-3" />
                  </span>
                  <span className="w-5 h-5 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">
                    <Mail className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Reminder pill card */}
              <div className="bg-white p-2.5 rounded-xl border border-pink-200 bg-pink-50/30 flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#80235c] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Follow up with Omar Rosser</p>
                  <p className="text-[10px] text-gray-500">24 June 2024, 10:00 AM</p>
                </div>
              </div>

            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Smart follow-ups
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Keep the conversation going with automated message drafts and contextual reminders.
              </p>
            </div>
          </div>

          {/* Card 4: CRM Sync & Integrations (starburst illustration) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-pink-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Visual: Starburst Sync Diagram */}
            <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-5 mb-6 aspect-video flex items-center justify-center relative border border-emerald-100">
              
              {/* Center AllBuddy Hub */}
              <div className="w-12 h-12 rounded-2xl bg-[#80235c] text-white flex items-center justify-center shadow-lg z-10">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
                </svg>
              </div>

              {/* Connecting Nodes */}
              {/* Top CRM */}
              <div className="absolute top-2.5 flex flex-col items-center">
                <div className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-700 shadow-xs flex items-center gap-1">
                  <Database className="w-3 h-3 text-teal-600" />
                  <span>CRM Hub</span>
                </div>
                <div className="w-0.5 h-3 bg-gray-300" />
              </div>

              {/* Bottom Left Contacts */}
              <div className="absolute bottom-2.5 left-6 flex flex-col items-center">
                <div className="w-0.5 h-3 bg-gray-300" />
                <div className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-700 shadow-xs flex items-center gap-1">
                  <Contact2 className="w-3 h-3 text-purple-600" />
                  <span>Contacts</span>
                </div>
              </div>

              {/* Bottom Right Calendar */}
              <div className="absolute bottom-2.5 right-6 flex flex-col items-center">
                <div className="w-0.5 h-3 bg-gray-300" />
                <div className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-700 shadow-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span>Calendar</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                CRM & Calendar sync
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Instantly push qualified leads to HubSpot, Salesforce, Google Contacts, Notion, or your calendar.
              </p>
            </div>
          </div>

          {/* Card 5: Privacy First Connection */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-pink-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Visual: Alex Morgan Wants to connect */}
            <div className="bg-pink-50/50 rounded-2xl p-4 sm:p-5 mb-6 aspect-video flex flex-col items-center justify-center space-y-2 border border-pink-100">
              
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                AM
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-900">Alex Morgan</p>
                <p className="text-[10px] text-gray-500">Wants to connect</p>
              </div>

              <div className="flex items-center gap-1 text-[9px] text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Contact details are private until accepted</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button 
                  onClick={() => setAcceptedInvite(false)}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                  Decline
                </button>
                <button 
                  onClick={() => setAcceptedInvite(!acceptedInvite)}
                  className={`px-4 py-1 rounded-full text-[11px] font-semibold text-white transition-all ${
                    acceptedInvite ? 'bg-emerald-600' : 'bg-[#80235c] hover:bg-[#6a1b4b]'
                  }`}
                >
                  {acceptedInvite ? '✓ Connected' : 'Accept'}
                </button>
              </div>

            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Privacy-first control
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Zero spam. You decide who sees your personal phone number and email with explicit handshake permissions.
              </p>
            </div>
          </div>

          {/* Card 6: Search by Memory (Semantic Graph) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-pink-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Visual: Search by Memory Phone Interface */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 mb-6 aspect-video flex flex-col justify-center space-y-2.5 border border-slate-200">
              
              {/* Mock search bar */}
              <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-xs flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="text-[11px] font-medium text-gray-800 truncate">
                  "Designer from FlowLoop"
                </span>
              </div>

              {/* Floating Memory Tags */}
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] font-medium bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  🎓 Met at DesignUp 2024
                </span>
                <span className="text-[9px] font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  💼 Works at FlowLoop
                </span>
                <span className="text-[9px] font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  📷 Loves vintage cameras
                </span>
              </div>

            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Search by memory
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Forgot their name? Search by company, what they pitched, where you sat, or their personal hobbies.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
