import React, { useState } from 'react';
import { Play, Pause, Phone, Mail, MessageSquare, Plus, Sparkles, Volume2 } from 'lucide-react';

export default function VoiceNoteBanner({ onOpenDemo }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="voice-notes" className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with soft pastel lime-green background (matching media_1792169151229_7f9a5f9c.png) */}
        <div className="bg-[#dcf786] rounded-[36px] lg:rounded-[44px] p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 text-xs font-bold uppercase tracking-wider text-gray-900">
                <Sparkles className="w-3.5 h-3.5" />
                Audio-First Memory
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.2]">
                Record a quick voice note with your meeting summary, so the important details never get lost.
              </h2>

              <p className="text-gray-800 text-base sm:text-lg max-w-lg leading-relaxed font-medium">
                Just step out of the conversation, talk for 15 seconds in Hindi, English, or Hinglish, and let mynetworkk.ai do the heavy lifting.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenDemo}
                  className="px-7 py-3.5 rounded-full bg-gray-900 hover:bg-black text-white font-semibold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
                >
                  <Volume2 className="w-4 h-4 text-[#dcf786]" />
                  <span>Test Voice Memo in Demo</span>
                </button>
              </div>
            </div>

            {/* Right Phone Visual (matching screenshot with Rohan Malhotra) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[340px] bg-white rounded-[36px] p-5 shadow-2xl border-4 border-black/5 relative">
                
                {/* Profile Header */}
                <div className="text-center pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-200 via-rose-300 to-purple-400 text-gray-800 font-extrabold text-xl flex items-center justify-center mx-auto mb-2 shadow-inner">
                    RM
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Rohan Malhotra</h3>
                  <p className="text-xs text-gray-500">Head of Partnerships, BharatCart</p>

                  {/* Action icons row */}
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <a href="tel:+919876543210" className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100">
                      <Phone className="w-4 h-4" />
                    </a>
                    <a href="mailto:rohan@bharatcart.in" className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100">
                      <Mail className="w-4 h-4" />
                    </a>
                    <button className="px-3 py-1 bg-[#80235c] text-white rounded-full text-xs font-semibold hover:bg-[#6a1b4b] flex items-center gap-1 shadow-xs">
                      <Plus className="w-3 h-3" />
                      <span>Add Note</span>
                    </button>
                  </div>
                </div>

                {/* Photos Row (Selfie with friend + Add button) */}
                <div className="py-3 border-b border-gray-100">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Memory Moments</p>
                  <div className="flex items-center gap-2">
                    {/* Selfie thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 relative group cursor-pointer">
                      <img 
                        src="/assets/media_1792169151282_168d2625.png" 
                        alt="Selfie moment" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                      />
                    </div>
                    {/* Add more button */}
                    <button className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 flex flex-col items-center justify-center text-gray-400 hover:text-purple-600 transition-colors">
                      <Plus className="w-5 h-5" />
                      <span className="text-[9px] font-medium mt-0.5">Add</span>
                    </button>
                  </div>
                </div>

                {/* Contact metadata */}
                <div className="py-2.5 text-xs text-gray-600 space-y-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">rohan@bharatcart.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>+91 98765 43210</span>
                  </div>
                </div>

                {/* Audio Waveform Player (matching screenshot purple waveform & 0:14) */}
                <div className="pt-3">
                  <div className="bg-purple-50/70 p-3 rounded-2xl flex items-center justify-between gap-3 border border-purple-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-8 h-8 rounded-full bg-[#80235c] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </button>
                      <span className="text-xs font-mono font-bold text-purple-900">
                        {isPlaying ? '0:07' : '0:14'}
                      </span>
                    </div>

                    {/* Waveform bars */}
                    <div className="flex items-center gap-1 flex-1 justify-end h-6">
                      {[30, 80, 50, 100, 70, 40, 90, 60, 100, 75, 45, 85, 30].map((height, i) => (
                        <div
                          key={i}
                          style={{ height: `${height}%` }}
                          className={`w-1 rounded-full transition-colors ${
                            isPlaying ? 'bg-[#80235c] animate-wave-' + ((i % 5) + 1) : 'bg-purple-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
