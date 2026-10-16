import React, { useState } from 'react';
import { X, FolderPlus, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SpacesModal({ isOpen, onClose, onAddSpace }) {
  const [spaceName, setSpaceName] = useState('');
  const [badge, setBadge] = useState('Conference');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!spaceName.trim()) return;
    onAddSpace(spaceName, badge);
    setSpaceName('');
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#80235c] text-xs font-bold uppercase tracking-wider mb-2">
            <FolderPlus className="w-3.5 h-3.5" />
            New Shared Space
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            Create an Event Space
          </h3>
          <p className="text-sm text-gray-600">
            Keep all contacts from an event or conference grouped in one shared place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Space Name</label>
            <input
              type="text"
              required
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              placeholder="e.g. IIT Delhi E-Summit 2024"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Type / Category</label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c] bg-white"
            >
              <option value="Conference">Conference / Summit</option>
              <option value="Meetup">Founders Meetup</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Private Dinner">Private Dinner / VIP</option>
              <option value="College Fest">College Fest</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!spaceName.trim()}
              className="px-6 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              Create Space
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
