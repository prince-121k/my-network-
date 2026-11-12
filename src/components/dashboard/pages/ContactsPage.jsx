import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  LayoutGrid, 
  List, 
  Mic, 
  Camera, 
  Tag, 
  Filter, 
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  Plus
} from 'lucide-react';
import ContactCard from '../ContactCard';

export default function ContactsPage({ 
  contacts, 
  spaces, 
  selectedSpaceId, 
  setSelectedSpaceId, 
  searchQuery, 
  setSearchQuery, 
  filteredContacts, 
  onSelectContact, 
  onToggleStatus, 
  onOpenVoiceModal, 
  onOpenCardModal, 
  onOpenAddConnection,
  onExportCSV 
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeTagFilter, setActiveTagFilter] = useState('all');

  // Collect all unique tags
  const allTags = Array.from(new Set(contacts.flatMap(c => c.tags || [])));

  // Filter contacts by tag
  const displayedContacts = filteredContacts.filter(c => {
    if (activeTagFilter === 'all') return true;
    return (c.tags || []).includes(activeTagFilter);
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Contacts Directory
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {displayedContacts.length} connections recorded with searchable context
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenAddConnection || onOpenVoiceModal}
            className="px-4 py-2 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-95"
            title="Add connection with full info, text context & voice"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Connection</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
            title="Download CSV of contacts"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenCardModal}
            className="px-4 py-2 rounded-2xl bg-white border border-pink-200 text-[#80235c] text-xs font-bold hover:bg-pink-50 flex items-center gap-1.5 shadow-2xs"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Card</span>
          </button>

          <button
            onClick={onOpenVoiceModal}
            className="px-4 py-2 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Memo</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200/80 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by memory, topic, company, event, or name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#80235c] text-xs sm:text-sm font-medium focus:outline-none"
            />
          </div>

          {/* Space Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedSpaceId}
              onChange={(e) => setSelectedSpaceId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#80235c]"
            >
              {spaces.map(sp => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                title="List / Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Tags:
          </span>
          <button
            onClick={() => setActiveTagFilter('all')}
            className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
              activeTagFilter === 'all'
                ? 'bg-[#80235c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({filteredContacts.length})
          </button>
          {allTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTagFilter(tag)}
              className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
                activeTagFilter === tag
                  ? 'bg-[#80235c] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Table Display */}
      {displayedContacts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onSelect={onSelectContact}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-400 uppercase font-bold text-[10px] tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Event & Context</th>
                    <th className="px-6 py-4">Tags</th>
                    <th className="px-6 py-4">Follow-up Due</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayedContacts.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => onSelectContact(c)}
                      className="hover:bg-pink-50/30 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#80235c] font-bold flex items-center justify-center text-xs shrink-0">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm leading-tight">{c.name}</p>
                            <p className="text-gray-500 text-[11px]">{c.role} • {c.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">{c.event || 'Direct'}</p>
                        <p className="text-gray-500 text-[11px] truncate max-w-xs italic">"{c.rawNotes}"</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(c.tags || []).slice(0, 2).map((t, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-[#80235c]">
                          {c.followUpDate}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(c.whatsappMessage || '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-3">
          <p className="text-sm font-bold text-gray-800">No contacts found</p>
          <p className="text-xs text-gray-500">Try changing your search terms or filters.</p>
        </div>
      )}

    </div>
  );
}
