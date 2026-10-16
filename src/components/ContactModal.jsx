import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose, initialReason = 'Get Started' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Founder',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch (err) {}
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', role: 'Founder', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#dcf786] text-gray-900 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-8 h-8 text-[#80235c]" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900">You're on the list! 🎉</h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
              Thanks <strong>{formData.name || 'there'}</strong>! Your mynetworkk.ai invite and early beta access link has been reserved for <strong>{formData.email}</strong>.
            </p>
            <div className="pt-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#80235c] text-white font-semibold text-sm hover:bg-[#6a1b4b] shadow-xs"
              >
                Back to mynetworkk.ai
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#80235c] bg-pink-100 px-3 py-1 rounded-full">
                {initialReason}
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-2">
                Join mynetworkk.ai Early Access
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                100 contacts free forever • Voice memos • Spaces collaboration
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Prince Pandey"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Work Email or WhatsApp Phone</label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com or +91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">I am a...</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c] bg-white"
                >
                  <option value="Founder">Founder / Entrepreneur</option>
                  <option value="Student">Student / Aspiring Founder</option>
                  <option value="Investor">Investor / VC / Angel</option>
                  <option value="Sales/BD">Sales / Business Development</option>
                  <option value="Designer/Developer">Designer / Developer</option>
                  <option value="Event Organizer">Event / Conference Organizer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">What event or meetup are you attending next?</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Next month's Bangalore AI summit or college hackathon..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Claim Free Early Access</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
