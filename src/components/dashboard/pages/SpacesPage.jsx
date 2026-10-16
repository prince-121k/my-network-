import React, { useState } from 'react';
import { 
  FolderGit2, 
  Users, 
  Plus, 
  Share2, 
  Download, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import ContactCard from '../ContactCard';

export default function SpacesPage({ 
  spaces, 
  contacts, 
  onSelectContact, 
  onToggleStatus, 
  onOpenNewSpaceModal, 
  onExportCSV 
}) {
  const [activeSpaceTab, setActiveSpaceTab] = useState(spaces[1]?.id || 'all');
  const [copiedLink, setCopiedLink] = useState(false);

  const currentSpace = spaces.find(s => s.id === activeSpaceTab) || spaces[0];
  const spaceContacts = contacts.filter(c => activeSpaceTab === 'all' || c.spaceId === activeSpaceTab);

  const handleCopyInvite = (spaceName) => {
    navigator.clipboard.writeText(`https://mynetworkk.ai/join-space?space=${encodeURIComponent(spaceName)}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            Shared Event Folders
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Event & Team Spaces
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Organize conferences and meetings into shared collaborative folders
          </p>
        </div>

        <button
          onClick={onOpenNewSpaceModal}
          className="px-5 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Space</span>
        </button>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {spaces.filter(s => s.id !== 'all').map((space) => {
          const count = contacts.filter(c => c.spaceId === space.id).length;
          const isSelected = activeSpaceTab === space.id;

          return (
            <div
              key={space.id}
              onClick={() => setActiveSpaceTab(space.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-white border-[#80235c] shadow-md ring-2 ring-[#80235c]/10'
                  : 'bg-white border-gray-200/80 hover:border-pink-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                    {space.badge || 'Event'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    <span>{space.members || 1} Members</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-gray-900 text-lg leading-snug">
                  {space.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {count} contacts scanned in this space
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyInvite(space.name);
                  }}
                  className="text-xs font-semibold text-gray-600 hover:text-[#80235c] flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied! ✓' : 'Invite Team'}</span>
                </button>

                <span className={`text-xs font-bold ${isSelected ? 'text-[#80235c]' : 'text-gray-400'}`}>
                  {isSelected ? 'Active Space •' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Space Leads Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xl font-bold text-gray-900">{currentSpace.name}</h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing contacts captured in this shared space ({spaceContacts.length})
            </p>
          </div>

          <button
            onClick={onExportCSV}
            className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Space Contacts</span>
          </button>
        </div>

        {spaceContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaceContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onSelect={onSelectContact}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            No contacts recorded in this space yet. Use the Voice Note or Card Scanner to add leads!
          </div>
        )}
      </div>

    </div>
  );
}
