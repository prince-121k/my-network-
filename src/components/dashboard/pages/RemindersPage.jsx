import React, { useState } from 'react';
import { 
  CalendarClock, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function RemindersPage({ contacts, onSelectContact, onToggleStatus }) {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'completed'

  const pendingList = contacts.filter(c => c.status !== 'followed_up');
  const completedList = contacts.filter(c => c.status === 'followed_up');

  const currentList = activeTab === 'pending' ? pendingList : completedList;
  const completionRate = contacts.length > 0 ? Math.round((completedList.length / contacts.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarClock className="w-3.5 h-3.5" />
            Commitment Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Follow-up Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Never forget a promise. Follow up on time with auto-drafted WhatsApp messages.
          </p>
        </div>

        {/* Progress Pill */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex items-center gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Follow-up Rate</p>
            <p className="text-xl font-extrabold text-[#80235c]">{completionRate}%</p>
          </div>
          <div className="w-16 bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div 
              style={{ width: `${completionRate}%` }} 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'bg-[#80235c] text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Pending Actions ({pendingList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Completed ({completedList.length})</span>
        </button>
      </div>

      {/* Follow-up Cards List */}
      <div className="space-y-4">
        {currentList.length > 0 ? (
          currentList.map((contact) => (
            <div
              key={contact.id}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-pink-100 hover:border-pink-300 shadow-2xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#80235c] font-extrabold text-base flex items-center justify-center shrink-0">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 
                      onClick={() => onSelectContact(contact)}
                      className="font-extrabold text-gray-900 text-base hover:text-[#80235c] cursor-pointer"
                    >
                      {contact.name}
                    </h4>
                    <span className="text-xs text-gray-500">• {contact.role} at {contact.company}</span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      📍 {contact.event || 'Networking'}
                    </span>
                  </div>

                  {/* Commitment quote */}
                  <div className="bg-pink-50/60 p-2.5 rounded-xl border border-pink-100/60 text-xs text-gray-700 italic max-w-xl">
                    <strong className="text-gray-900 not-italic">Promise:</strong> "{contact.actionItem}"
                  </div>

                  <p className="text-xs text-[#80235c] font-bold flex items-center gap-1.5 pt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Target Date: {contact.followUpDate}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(contact.whatsappMessage || `Hi ${contact.name.split(' ')[0]}, following up as discussed!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send WhatsApp</span>
                </a>

                <button
                  onClick={() => onToggleStatus(contact.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    contact.status === 'followed_up'
                      ? 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {contact.status === 'followed_up' ? 'Re-open' : 'Mark Done ✓'}
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-gray-900">All caught up!</h4>
            <p className="text-xs text-gray-500">
              {activeTab === 'pending'
                ? 'No pending follow-ups right now. Great job keeping your relationships nurtured!'
                : 'No completed follow-ups yet.'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
