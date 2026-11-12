import React from 'react';
import { 
  Mic, 
  Camera, 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  FolderGit2,
  TrendingUp,
  Bot,
  Plus
} from 'lucide-react';
import ContactCard from '../ContactCard';

export default function OverviewPage({ 
  contacts, 
  spaces, 
  onSelectContact, 
  onToggleStatus, 
  onOpenVoiceModal, 
  onOpenCardModal, 
  onOpenAddConnection,
  onNavigateTo 
}) {
  const pendingFollowups = contacts.filter(c => c.status !== 'followed_up');
  const completedFollowups = contacts.filter(c => c.status === 'followed_up');

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Welcome Banner with Quick Voice Capture */}
      <div className="bg-gradient-to-r from-[#fdedee] via-pink-50 to-[#dcf786]/30 rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-2xs relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-xs font-bold uppercase tracking-wider text-[#80235c] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            AI Relationship Intelligence
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, Prince! 👋
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
            You have <strong className="text-[#80235c]">{pendingFollowups.length} follow-ups</strong> waiting for attention. Met someone new today? Record high-gain voice memo or fill contact details.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={onOpenAddConnection || onOpenVoiceModal}
              className="px-6 py-3 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Connection</span>
            </button>

            <button
              onClick={onOpenVoiceModal}
              className="px-5 py-3 rounded-full bg-white hover:bg-pink-50 text-[#80235c] border border-pink-200 font-bold text-xs sm:text-sm shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Mic className="w-4 h-4 animate-pulse text-[#80235c]" />
              <span>Voice Memo (High-Sensitivity)</span>
            </button>

            <button
              onClick={onOpenCardModal}
              className="px-4 py-3 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-purple-700" />
              <span>Scan Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured: AI Memory & Meeting Timeline Assistant */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#80235c] text-white flex items-center justify-center shadow-xs shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-gray-900">
                  AI Memory Chatbot & Meeting Timeline
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#dcf786] text-gray-900 text-[10px] font-black tracking-wide uppercase">
                  New Feature
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Poocho: <em>"Microsoft kab gaye the?"</em>, <em>"IIT Delhi me kya baat hui thi?"</em> ya <em>"Rohan"</em> — AI date-wise & time-wise poori timeline nikal dega!
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTo('chat')}
            className="px-5 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 self-start sm:self-auto hover:scale-105 active:scale-95"
          >
            <span>Open AI Chatbot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Try asking:</span>
          <button
            onClick={() => onNavigateTo('chat')}
            className="px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-[#80235c] text-xs font-bold transition-colors border border-pink-200/70"
          >
            🏢 Microsoft (2 visits)
          </button>
          <button
            onClick={() => onNavigateTo('chat')}
            className="px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-[#80235c] text-xs font-bold transition-colors border border-pink-200/70"
          >
            🏛️ IIT Delhi timeline
          </button>
          <button
            onClick={() => onNavigateTo('chat')}
            className="px-3.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-[#80235c] text-xs font-bold transition-colors border border-pink-200/70"
          >
            🤝 Rohan (BharatCart)
          </button>
          <button
            onClick={() => onNavigateTo('chat')}
            className="px-3.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition-colors border border-purple-200/70"
          >
            ⚡ Pending Follow-ups
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigateTo('contacts')}
          className="bg-white p-5 rounded-3xl border border-pink-100 hover:border-purple-300 shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Network</span>
            <Users className="w-4 h-4 text-[#80235c]" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{contacts.length}</h3>
          <p className="text-[11px] text-gray-500 mt-1">Searchable connections</p>
        </div>

        <div 
          onClick={() => onNavigateTo('reminders')}
          className="bg-white p-5 rounded-3xl border border-pink-100 hover:border-purple-300 shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Follow-ups Due</span>
            <Clock className="w-4 h-4 text-rose-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-[#80235c] mt-2">{pendingFollowups.length}</h3>
          <p className="text-[11px] text-rose-600 font-semibold mt-1">Requires message</p>
        </div>

        <div 
          onClick={() => onNavigateTo('reminders')}
          className="bg-white p-5 rounded-3xl border border-pink-100 hover:border-purple-300 shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Followed Up</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-700 mt-2">{completedFollowups.length}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Relationships nurtured</p>
        </div>

        <div 
          onClick={() => onNavigateTo('spaces')}
          className="bg-white p-5 rounded-3xl border border-pink-100 hover:border-purple-300 shadow-2xs cursor-pointer transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Active Spaces</span>
            <FolderGit2 className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{spaces.length - 1}</h3>
          <p className="text-[11px] text-gray-500 mt-1">Conferences & meetups</p>
        </div>
      </div>

      {/* Urgent Follow-ups Due Section */}
      {pendingFollowups.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-lg font-bold text-gray-900">Urgent Follow-ups Pipeline</h3>
            </div>
            <button
              onClick={() => onNavigateTo('reminders')}
              className="text-xs font-bold text-[#80235c] hover:underline flex items-center gap-1"
            >
              <span>View All ({pendingFollowups.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingFollowups.slice(0, 3).map((contact) => (
              <div 
                key={contact.id} 
                className="p-4 rounded-2xl border border-pink-100 hover:border-pink-300 bg-pink-50/20 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{contact.name}</h4>
                    <span className="text-[10px] font-bold text-[#80235c] bg-pink-100 px-2 py-0.5 rounded-full">
                      {contact.followUpDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{contact.role} • {contact.company}</p>
                  <p className="text-xs text-gray-700 bg-white p-2 rounded-xl border border-pink-100/60 mt-2 italic">
                    "{contact.actionItem}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-pink-100/60">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(contact.whatsappMessage || '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp 1-Click</span>
                  </a>

                  <button
                    onClick={() => onToggleStatus(contact.id)}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Mark Done ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Connections Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Recent Connections</h3>
            <p className="text-xs text-gray-500">Auto-transcribed contacts with audio memories</p>
          </div>
          <button
            onClick={() => onNavigateTo('contacts')}
            className="text-xs font-bold text-[#80235c] hover:underline flex items-center gap-1"
          >
            <span>Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.slice(0, 6).map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onSelect={onSelectContact}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
