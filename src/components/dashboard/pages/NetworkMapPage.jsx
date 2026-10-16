import React from 'react';
import { 
  Network, 
  Sparkles, 
  Users, 
  Tag, 
  TrendingUp, 
  ArrowRight,
  Share2,
  CheckCircle2
} from 'lucide-react';

export default function NetworkMapPage({ contacts, onSelectContact }) {
  // Aggregate tags for visual distribution
  const tagCounts = {};
  contacts.forEach(c => {
    (c.tags || []).forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Network className="w-3.5 h-3.5 text-emerald-700" />
          Relationship Graph
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Network Intelligence & Distribution
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Visual analysis of your professional network, domain clusters, and introduction opportunities.
        </p>
      </div>

      {/* AI Super-Connect Recommendations */}
      <div className="bg-gradient-to-r from-purple-900 via-[#80235c] to-purple-800 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#dcf786] animate-pulse" />
          <h3 className="text-lg font-bold">AI Introduction Suggestions</h3>
        </div>
        <p className="text-xs sm:text-sm text-purple-200 max-w-xl">
          Based on conversations recorded in your network memory, here are high-value warm introductions you can make:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#dcf786]">
              Partnership Synergy
            </span>
            <p className="text-xs text-white leading-relaxed">
              Introduce <strong>Rohan Malhotra</strong> (BharatCart SDK) to <strong>Karan Singhal</strong> (CloudScale Systems) — both discussed backend API scale during conferences.
            </p>
            <button 
              onClick={() => alert('Warm intro email draft generated!')}
              className="text-xs font-bold text-[#dcf786] hover:underline flex items-center gap-1 pt-1"
            >
              <span>Draft Warm Intro Message</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#dcf786]">
              Design & Product Synergy
            </span>
            <p className="text-xs text-white leading-relaxed">
              Connect <strong>Alex Morgan</strong> (FlowLoop UI) regarding their vintage camera design system with your frontend team.
            </p>
            <button 
              onClick={() => alert('Intro note ready in clipboard!')}
              className="text-xs font-bold text-[#dcf786] hover:underline flex items-center gap-1 pt-1"
            >
              <span>View Connection Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Domain Clusters / Tag Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Domain Clusters */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-gray-900 text-lg">Network Domain Clusters</h3>
          <p className="text-xs text-gray-500">Distribution of skills and industries across your contacts:</p>

          <div className="space-y-3 pt-2">
            {sortedTags.map(([tag, count], idx) => {
              const percentage = Math.round((count / contacts.length) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-800">#{tag}</span>
                    <span className="text-gray-500">{count} people ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${Math.min(percentage, 100)}%` }} 
                      className="bg-[#80235c] h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Contact Circles */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-gray-900 text-lg">Top Relationship Hubs</h3>
          <p className="text-xs text-gray-500">People with the highest context density and commitments:</p>

          <div className="space-y-3 pt-2">
            {contacts.map((c) => (
              <div 
                key={c.id} 
                onClick={() => onSelectContact(c)}
                className="p-3.5 rounded-2xl border border-pink-100 hover:border-purple-300 hover:bg-pink-50/20 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#80235c] font-bold flex items-center justify-center text-xs">
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{c.name}</h4>
                    <p className="text-xs text-gray-500">{c.role} • {c.company}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                    {c.event}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
