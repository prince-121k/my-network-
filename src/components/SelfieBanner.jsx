import React from 'react';
import { Camera, MapPin, Calendar, Users, Sparkles } from 'lucide-react';

export default function SelfieBanner({ onOpenDemo }) {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with soft pastel sky blue background (matching media_1792169151282_168d2625.png) */}
        <div className="bg-[#c2edfc] rounded-[36px] lg:rounded-[44px] p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Image: Two friends/colleagues taking selfie at event */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="relative group">
                <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 transform group-hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="/assets/media_1792169151282_168d2625.png" 
                    alt="Two colleagues taking a selfie at a networking summit" 
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating Context Pill */}
                <div className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-sky-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">TechSparks 2024 • Main Hall</p>
                    <p className="text-[10px] text-gray-500">Auto-tagged with date & GPS location</p>
                  </div>
                </div>

                {/* Face badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-sky-300" />
                  <span>Visual Memory</span>
                </div>
              </div>
            </div>

            {/* Right Headline (matching screenshot) */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-900/10 text-xs font-bold uppercase tracking-wider text-sky-950">
                <Sparkles className="w-3.5 h-3.5" />
                Visual Anchor
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.2]">
                Snap a selfie to remember the moment and save the context of where and when you met.
              </h2>

              <p className="text-gray-700 text-base sm:text-lg max-w-lg leading-relaxed font-medium">
                Our brains remember faces 10x better than abstract contact cards. Pair your audio notes with a quick photo to create an instant visual trigger.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-800 border border-sky-200/60 shadow-xs">
                  <Calendar className="w-4 h-4 text-sky-700" />
                  <span>Event Timeline View</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-800 border border-sky-200/60 shadow-xs">
                  <Users className="w-4 h-4 text-sky-700" />
                  <span>Mutual Connection Tagging</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
