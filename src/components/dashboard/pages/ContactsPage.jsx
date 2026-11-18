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
  Plus, 
  Trash2, 
  Users 
} from 'lucide-react';
import ContactCard from '../ContactCard';

export default function ContactsPage({ 
  contacts = [], 
  spaces = [], 
  selectedSpaceId = 'all', 
  setSelectedSpaceId, 
  searchQuery = '', 
  setSearchQuery, 
  filteredContacts = [], 
  onSelectContact, 
  onToggleStatus, 
  onOpenVoiceModal, 
  onOpenCardModal, 
  onOpenAddConnection,
  onClearAllContacts,
  onLoadDemoContacts,
  onExportCSV 
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const displayedContacts = filteredContacts;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            My Connections
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {contacts.length === 0 ? 'No connections yet' : `${contacts.length} connections recorded with searchable context`}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenAddConnection || onOpenVoiceModal}
            className="px-5 py-2.5 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-black flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-102 transition-all active:scale-95"
            title="Add a connection with full details, voice memo & context"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Connection</span>
          </button>

          {contacts.length > 0 && onExportCSV && (
            <button
              onClick={onExportCSV}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
              title="Download CSV of contacts"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}

          {contacts.length > 0 && onClearAllContacts && (
            <button
              onClick={() => {
                if (window.confirm('Kya aap saare saved contacts clear karke bilkul fresh start karna chahte hain?')) {
                  onClearAllContacts();
                }
              }}
              className="px-3 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Clear all saved data to start completely fresh"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Data</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar (Only shown if contacts exist or search is active) */}
      {contacts.length > 0 && (
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Search by name, company, event, or notes..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#80235c] text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
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
      )}

      {/* Grid or Table Display */}
      {displayedContacts.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <th className="px-6 py-4">Follow-up Due</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {displayedContacts.map((c) => (
                    <tr 
                      key={c.id} 
                      onClick={() => onSelectContact && onSelectContact(c)}
                      className="hover:bg-pink-50/30 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#80235c] font-bold flex items-center justify-center text-xs shrink-0">
                            {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
        /* Clean Inviting Empty State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-pink-200 max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-[#fdedee] text-[#80235c] flex items-center justify-center mx-auto shadow-xs">
            <Users className="w-8 h-8 text-[#80235c]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900">
              No connections saved yet!
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Met someone at a conference, hackathon, or meeting? Save their name, details, and conversation context in seconds!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAddConnection}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-black shadow-md hover:shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Your First Connection</span>
            </button>

            {onLoadDemoContacts && (
              <button
                onClick={onLoadDemoContacts}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold transition-all"
              >
                Load Sample Data (Preview)
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
