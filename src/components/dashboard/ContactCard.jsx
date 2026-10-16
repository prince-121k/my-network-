import React from 'react';
import { MessageCircle, Phone, Calendar, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ContactCard({ contact, onSelect, onToggleStatus }) {
  const isFollowedUp = contact.status === 'followed_up';

  return (
    <div 
      onClick={() => onSelect(contact)}
      className="bg-white rounded-3xl p-5 border border-pink-100 hover:border-purple-300 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-0.5"
    >
      <div className="space-y-3.5">
        
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {contact.photoUrl ? (
              <img 
                src={contact.photoUrl} 
                alt={contact.name} 
                className="w-12 h-12 rounded-2xl object-cover border border-purple-100 shadow-xs" 
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#80235c] to-purple-400 text-white font-bold text-base flex items-center justify-center shadow-xs">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h4 className="font-extrabold text-gray-900 text-base group-hover:text-[#80235c] transition-colors leading-tight">
                {contact.name}
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                {contact.role} • <strong className="text-gray-800">{contact.company}</strong>
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isFollowedUp 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-purple-100 text-purple-900'
          }`}>
            {isFollowedUp ? 'Done ✓' : 'Due'}
          </span>
        </div>

        {/* Meeting Memory / Context */}
        <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100/60 text-xs text-gray-700 italic line-clamp-2">
          "{contact.rawNotes || 'Met during conference.'}"
        </div>

        {/* Action Item & Due Date */}
        <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded-xl">
          <span className="flex items-center gap-1 font-medium truncate max-w-[170px]">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{contact.actionItem}</span>
          </span>
          <span className="text-[11px] font-bold text-[#80235c] shrink-0">
            {contact.followUpDate}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {(contact.tags || []).slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
          {(contact.tags || []).length > 3 && (
            <span className="text-[10px] text-gray-400 self-center">
              +{(contact.tags || []).length - 3} more
            </span>
          )}
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(contact.whatsappMessage || `Hi ${contact.name.split(' ')[0]}, great meeting you!`)}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp Draft</span>
        </a>

        <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-[#80235c] transition-colors">
          <span>Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

    </div>
  );
}
