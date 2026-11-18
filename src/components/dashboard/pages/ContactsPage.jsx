import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  LayoutGrid, 
  List, 
  Camera, 
  Phone, 
  Mail, 
  MessageCircle, 
  Plus, 
  Trash2, 
  Users,
  MapPin,
  Calendar as CalendarIcon,
  Briefcase,
  FileText
} from 'lucide-react';
import ContactCard from '../ContactCard';

export default function ContactsPage({ 
  contacts = [], 
  spaces = [], 
  searchQuery = '', 
  setSearchQuery, 
  filteredContacts = [], 
  onSelectContact, 
  onToggleStatus, 
  onOpenCardModal, 
  onOpenAddConnection,
  onClearAllContacts,
  onLoadDemoContacts,
  onExportCSV 
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const displayedContacts = filteredContacts;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-6xl mx-auto">
      
      {/* Header Bar matching user screenshot media_1794976841246_56b02c66.png */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Contacts
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {contacts.length === 0 ? '0 contacts' : `${contacts.length} saved contacts with memory & context`}
          </p>
        </div>

        {/* Circular Purple + Button with Dropdown (matches media_1794976841246_56b02c66.png) */}
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-10 h-10 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            title="Add New Contact"
          >
            <Plus className={`w-5 h-5 transition-transform duration-200 ${showAddMenu ? 'rotate-45' : ''}`} />
          </button>

          {/* Popover Menu: Scan Card or Add Manually */}
          {showAddMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-200/90 py-2 z-40 animate-fadeIn">
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  onOpenAddConnection();
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-800 hover:bg-pink-50 hover:text-[#80235c] flex items-center gap-2.5 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#80235c] flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block leading-tight font-extrabold">Add Manually</span>
                  <span className="block text-[10px] text-gray-400 font-normal">Fill profile, location & notes</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowAddMenu(false);
                  onOpenCardModal();
                }}
                className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-800 hover:bg-pink-50 hover:text-[#80235c] flex items-center gap-2.5 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-[#80235c] flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block leading-tight font-extrabold">Scan Visiting Card</span>
                  <span className="block text-[10px] text-gray-400 font-normal">Auto-extract card details</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search & Actions Bar (If contacts exist) */}
      {contacts.length > 0 && (
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Search by name, company, location, or conversation notes..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#80235c] text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {onExportCSV && (
                <button
                  onClick={onExportCSV}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
                  title="Export contacts as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              )}

              {onClearAllContacts && (
                <button
                  onClick={() => {
                    if (window.confirm('Kya aap saare saved contacts clear karke bilkul fresh start karna chahte hain?')) {
                      onClearAllContacts();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1"
                  title="Clear all contacts to start fresh"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Data</span>
                </button>
              )}

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
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Contacts List or Empty State */}
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
                    <th className="px-6 py-4">Met At & Conversation Context</th>
                    <th className="px-6 py-4">Date</th>
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
                          <div className="w-9 h-9 rounded-xl bg-[#80235c] text-white font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden">
                            {c.photoUrl ? (
                              <img src={c.photoUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              c.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm leading-tight">{c.name}</p>
                            <p className="text-gray-500 text-[11px]">{c.role} • {c.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800 text-xs">{c.event || c.location || 'Direct'}</p>
                        <p className="text-gray-500 text-[11px] truncate max-w-xs italic">"{c.rawNotes}"</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-600">
                          {c.displayDate || 'Recent'}
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
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-pink-200 max-w-md mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-[#fdedee] text-[#80235c] flex items-center justify-center mx-auto shadow-xs">
            <Users className="w-8 h-8 text-[#80235c]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900">
              No contacts yet
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Click the <strong>+</strong> button in the top right to add a contact manually or scan a visiting card!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={onOpenAddConnection}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Manually</span>
            </button>

            <button
              onClick={onOpenCardModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-pink-50 text-[#80235c] border border-pink-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Card</span>
            </button>
          </div>

          {onLoadDemoContacts && (
            <div className="pt-2">
              <button
                onClick={onLoadDemoContacts}
                className="text-[11px] font-bold text-gray-400 hover:text-gray-700 underline"
              >
                Load sample demo data to preview
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
