import React, { useState } from 'react';
import { FolderGit2, Users, Search, Share2, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function SpacesSection({ onOpenContact }) {
  const [activeSpace, setActiveSpace] = useState('techsparks');

  const spacesData = {
    techsparks: {
      name: 'TechSparks Summit 2024',
      badge: 'Conference Space',
      members: 4,
      totalContacts: 68,
      leads: [
        { name: 'Rohan Malhotra', role: 'Head of Partnerships', company: 'BharatCart', tags: ['Fintech', 'Partnership'] },
        { name: 'Alex Morgan', role: 'Design Lead', company: 'FlowLoop', tags: ['UI/UX', 'Product'] },
        { name: 'Priya Sharma', role: 'Angel Investor', company: 'Nexus Ventures', tags: ['AI Seed', 'Lead Follow-up'] },
      ]
    },
    clientDinner: {
      name: 'Bangalore Founders Dinner',
      badge: 'Private Meetup',
      members: 2,
      totalContacts: 14,
      leads: [
        { name: 'Sameer Verma', role: 'Co-founder & CTO', company: 'HyperScale', tags: ['DevOps', 'Infra'] },
        { name: 'Neha Kapoor', role: 'VP Growth', company: 'Zepto', tags: ['QuickCommerce', 'Logistics'] }
      ]
    }
  };

  const current = spacesData[activeSpace];

  return (
    <section id="spaces" className="py-20 lg:py-28 bg-[#fdf2f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-pink-200 text-xs font-bold uppercase tracking-wider text-[#80235c] shadow-xs">
              <FolderGit2 className="w-4 h-4" />
              Shared Spaces for Teams
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Keep your whole team's event contacts in one place.
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              When 3 colleagues attend a 500-person conference, leads end up trapped in 3 separate phonebooks. With <strong>Spaces</strong>, create a single shared folder: everyone scans, voice-notes, and searches collectively.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700"><strong>Zero duplicate outreach:</strong> See if your colleague already spoke to an investor or lead.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700"><strong>Team Voice Notes:</strong> Listen to summaries recorded by teammates on the conference floor.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-gray-700"><strong>One-Click CSV or CRM Export:</strong> Send the entire event's contacts to HubSpot or Excel.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenContact('Create Team Space')}
                className="px-8 py-3.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
              >
                Create a Free Team Space
              </button>
            </div>
          </div>

          {/* Right Visual: Interactive Space Folder Simulation */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100 space-y-6">
              
              {/* Space Tabs Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveSpace('techsparks')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeSpace === 'techsparks' 
                        ? 'bg-[#80235c] text-white shadow-xs' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    TechSparks 2024 (68)
                  </button>
                  <button
                    onClick={() => setActiveSpace('clientDinner')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeSpace === 'clientDinner' 
                        ? 'bg-[#80235c] text-white shadow-xs' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Founders Dinner (14)
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Users className="w-4 h-4 text-[#80235c]" />
                  <span>{current.members} Team Members Active</span>
                </div>
              </div>

              {/* Space Info Banner */}
              <div className="bg-pink-50/70 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-pink-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-white px-2.5 py-0.5 rounded-md border border-purple-200">
                      {current.badge}
                    </span>
                    <h3 className="font-bold text-gray-900 text-base">{current.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Shared contact repository • Auto-synced in real-time</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert(`Space link copied to clipboard!`)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>Invite Team</span>
                  </button>
                </div>
              </div>

              {/* Contact List Inside Space */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Recent Contacts Added to Space</p>
                {current.leads.map((lead, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50/20 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{lead.name}</h4>
                        <p className="text-xs text-gray-500">{lead.role} • {lead.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {lead.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
