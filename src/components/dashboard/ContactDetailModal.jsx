import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  Tag, 
  Clock, 
  Trash2, 
  CheckCircle, 
  Volume2, 
  Share2,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function ContactDetailModal({ contact, isOpen, onClose, onDelete, onToggleStatus }) {
  if (!isOpen || !contact) return null;

  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `Contact: ${contact.name} (${contact.role} @ ${contact.company})\nPhone: ${contact.phone}\nEmail: ${contact.email}\nNotes: ${contact.rawNotes}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFollowedUp = contact.status === 'followed_up';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {contact.photoUrl ? (
              <img src={contact.photoUrl} alt={contact.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-200 shadow-sm" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#80235c] to-purple-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                {contact.name}
              </h3>
              <p className="text-sm font-semibold text-gray-600">
                {contact.role} • <strong className="text-gray-900">{contact.company}</strong>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-purple-700 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{contact.event || 'Direct Meeting'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Memo Playback if available */}
        {contact.audioUrl && (
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-900">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#80235c]" />
                Original Voice Memo
              </span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded text-purple-700 font-mono">
                Playable Audio
              </span>
            </div>
            <audio src={contact.audioUrl} controls className="w-full h-9 rounded-lg" />
          </div>
        )}

        {/* Key Contact Channels (WhatsApp, Phone, Email) */}
        <div className="grid grid-cols-3 gap-2.5">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(contact.whatsappMessage || `Hi ${contact.name.split(' ')[0]}, great connecting with you!`)}`}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-center flex flex-col items-center justify-center transition-colors group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform mb-1" />
            <span className="text-xs font-bold text-emerald-900">WhatsApp</span>
            <span className="text-[10px] text-emerald-700">1-Click Draft</span>
          </a>

          <a
            href={`tel:${contact.phone}`}
            className="p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl text-center flex flex-col items-center justify-center transition-colors group"
          >
            <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform mb-1" />
            <span className="text-xs font-bold text-blue-900">Call</span>
            <span className="text-[10px] text-blue-700">{contact.phone || 'No phone'}</span>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-2xl text-center flex flex-col items-center justify-center transition-colors group"
          >
            <Mail className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform mb-1" />
            <span className="text-xs font-bold text-purple-900">Email</span>
            <span className="text-[10px] text-purple-700 truncate max-w-[90px]">{contact.email || 'Email'}</span>
          </a>
        </div>

        {/* Meeting Memory / Raw Transcript */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
            Memory Notes / Discussion
          </span>
          <div className="bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100 text-xs text-gray-700 leading-relaxed italic">
            "{contact.rawNotes || 'No notes recorded.'}"
          </div>
        </div>

        {/* Action Items & Follow Up Date */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#80235c]" />
              Follow-up Due:
            </span>
            <span className="font-semibold text-[#80235c] bg-white px-2.5 py-1 rounded-lg border border-purple-100">
              {contact.followUpDate || 'Pending'}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            <strong>Commitment:</strong> {contact.actionItem || 'None'}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {(contact.tags || []).map((t, idx) => (
            <span key={idx} className="text-xs bg-purple-100 text-purple-900 font-semibold px-2.5 py-1 rounded-full">
              #{t}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleStatus(contact.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isFollowedUp 
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isFollowedUp ? 'Followed Up ✓' : 'Mark Done'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Copy to clipboard"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
          </div>

          <button
            onClick={() => {
              if (confirm(`Delete ${contact.name}?`)) {
                onDelete(contact.id);
                onClose();
              }
            }}
            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
            title="Delete contact"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
