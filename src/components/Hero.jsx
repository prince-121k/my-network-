import React, { useState } from 'react';
import { Mic, Sparkles, ArrowRight, Play, Pause, MessageCircle, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Hero({ onOpenContact, onOpenDemo }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-pink-50/70 via-white to-white">
      {/* Decorative background glow circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-pink-200/40 via-purple-100/30 to-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-200 shadow-xs text-xs sm:text-sm font-semibold text-gray-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Sparkles className="w-4 h-4 text-[#80235c]" />
              <span>Never forget a connection. Remember every conversation.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
              The AI networking memory for{' '}
              <span className="text-[#80235c] relative inline-block">
                everyone you meet
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#dcf786] -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Record a 20-second voice memo in Hindi/English, scan a business card, or snap a selfie right after a meeting. mynetworkk.ai auto-transcribes context, sets smart reminders, and keeps your network searchable forever.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenContact('Get Started Free')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-semibold text-base shadow-lg shadow-purple-900/10 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-semibold text-base border border-gray-200 shadow-xs hover:border-[#80235c]/30 hover:text-[#80235c] transition-all flex items-center justify-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-[#80235c]">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Try Interactive Voice Demo</span>
              </button>
            </div>

            {/* Key Value Props */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Up to 100 contacts free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Privacy-first</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Mobile Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Phone container */}
            <div className="w-full max-w-[360px] bg-white rounded-[40px] p-4 shadow-2xl border-4 border-gray-900/10 relative">
              {/* Dynamic Island / Speaker notch */}
              <div className="w-28 h-5 bg-gray-900 rounded-full mx-auto mb-4" />

              {/* Contact Card Inside Phone */}
              <div className="space-y-4">
                
                {/* Header profile info */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#80235c] to-purple-400 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                      RM
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Rohan Malhotra</h3>
                      <p className="text-xs text-gray-500">Head of Partnerships, BharatCart</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-100 rounded-full">
                    Just Met
                  </span>
                </div>

                {/* Event & Location Badge */}
                <div className="flex items-center justify-between bg-pink-50/80 px-3 py-2 rounded-xl text-xs">
                  <span className="font-medium text-gray-700">📍 Delhi Startup Summit</span>
                  <span className="text-gray-500">Today, 4:20 PM</span>
                </div>

                {/* Contextual Voice Note Player Card */}
                <div className="bg-[#fdedee] border border-pink-200/60 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-800">
                    <span className="flex items-center gap-1.5 text-[#80235c]">
                      <Mic className="w-3.5 h-3.5" />
                      Voice Memo (Hinglish)
                    </span>
                    <span className="text-gray-500">0:14</span>
                  </div>

                  {/* Audio Waveform UI */}
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-pink-100">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-8 h-8 rounded-full bg-[#80235c] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>

                    {/* Animated waveform bars */}
                    <div className="flex items-center gap-1 flex-1 h-6">
                      {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 85, 40].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: isPlayingAudio ? `${h}%` : '35%' }}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isPlayingAudio ? 'bg-[#80235c]' : 'bg-pink-300'
                          } ${isPlayingAudio ? `animate-wave-${(i % 5) + 1}` : ''}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* AI Extracted Notes */}
                  <div className="text-[12px] text-gray-700 bg-white/70 p-2.5 rounded-xl border border-pink-100/50 leading-relaxed">
                    <span className="font-bold text-gray-900 block mb-0.5">💡 AI Summary:</span>
                    "Wants to integrate BharatCart with our SDK. Send deck & sample API docs by Monday."
                  </div>
                </div>

                {/* Action Items & 1-Click WhatsApp */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 px-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#80235c]" />
                      Follow-up Reminder
                    </span>
                    <span className="text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-medium">
                      Monday, 10:00 AM
                    </span>
                  </div>

                  <a
                    href="https://wa.me/?text=Hi%20Rohan,%20great%20meeting%20you%20at%20Delhi%20Startup%20Summit!%20Sending%20over%20the%20deck%20as%20discussed."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send WhatsApp Follow-up</span>
                  </a>
                </div>

              </div>

              {/* Floating pill badge on the phone */}
              <div className="absolute -bottom-4 -left-6 bg-white border border-gray-200 px-3 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
                <div className="w-6 h-6 rounded-full bg-[#dcf786] text-gray-900 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Memory Saved</p>
                  <p className="text-xs font-bold text-gray-800">Searchable Forever</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
