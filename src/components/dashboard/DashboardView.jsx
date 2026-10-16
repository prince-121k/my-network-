import React, { useState } from 'react';
import { 
  Mic, 
  Camera, 
  Search, 
  Plus, 
  Download, 
  ArrowLeft, 
  Users, 
  Sparkles, 
  FolderGit2, 
  Clock, 
  CheckCircle2,
  Filter,
  Bell
} from 'lucide-react';
import { useNetworkStore } from '../../hooks/useNetworkStore';
import AppSidebar from './AppSidebar';
import ContactDetailModal from './ContactDetailModal';
import VoiceRecorderModal from './VoiceRecorderModal';
import CardScannerModal from './CardScannerModal';
import SpacesModal from './SpacesModal';

// Pages
import OverviewPage from './pages/OverviewPage';
import ContactsPage from './pages/ContactsPage';
import SpacesPage from './pages/SpacesPage';
import RemindersPage from './pages/RemindersPage';
import DigitalCardPage from './pages/DigitalCardPage';
import NetworkMapPage from './pages/NetworkMapPage';

export default function DashboardView({ onBackToLanding }) {
  const {
    contacts,
    spaces,
    selectedSpaceId,
    setSelectedSpaceId,
    searchQuery,
    setSearchQuery,
    filteredContacts,
    addContact,
    deleteContact,
    updateContact,
    toggleFollowUpStatus,
    addSpace,
    exportToCSV
  } = useNetworkStore();

  const [activePage, setActivePage] = useState('overview'); // 'overview' | 'contacts' | 'spaces' | 'reminders' | 'digital-card' | 'network-map'
  const [selectedContact, setSelectedContact] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [spacesModalOpen, setSpacesModalOpen] = useState(false);

  const pendingCount = contacts.filter(c => c.status !== 'followed_up').length;

  return (
    <div className="min-h-screen bg-[#faf8f9] flex flex-col lg:flex-row font-sans text-gray-900">
      
      {/* 1. App Sidebar (Desktop Left + Mobile Bottom Bar) */}
      <AppSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onBackToLanding={onBackToLanding}
        onOpenVoiceModal={() => setVoiceModalOpen(true)}
        onOpenCardModal={() => setCardModalOpen(true)}
        pendingFollowUpsCount={pendingCount}
      />

      {/* 2. Main Content View Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Mobile brand indicator */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onBackToLanding}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-gray-900 text-base">
              mynetworkk<span className="text-[#80235c]">.ai</span>
            </span>
          </div>

          {/* Quick Search across network */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'contacts') setActivePage('contacts');
              }}
              placeholder="Search by memory, topic, company, name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-50 focus:bg-white border border-transparent focus:border-[#80235c] text-xs sm:text-sm font-medium focus:outline-none transition-all"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={exportToCSV}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#80235c] transition-colors"
              title="Download full CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setCardModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-pink-200 text-[#80235c] text-xs font-bold hover:bg-pink-50 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Card</span>
            </button>

            <button
              onClick={() => setVoiceModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              <span>Record Memo</span>
            </button>
          </div>

        </header>

        {/* 3. Page Content Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          
          {/* Page 1: Overview Dashboard */}
          {activePage === 'overview' && (
            <OverviewPage
              contacts={contacts}
              spaces={spaces}
              onSelectContact={(c) => setSelectedContact(c)}
              onToggleStatus={toggleFollowUpStatus}
              onOpenVoiceModal={() => setVoiceModalOpen(true)}
              onOpenCardModal={() => setCardModalOpen(true)}
              onNavigateTo={(page) => setActivePage(page)}
            />
          )}

          {/* Page 2: Contacts Directory */}
          {activePage === 'contacts' && (
            <ContactsPage
              contacts={contacts}
              spaces={spaces}
              selectedSpaceId={selectedSpaceId}
              setSelectedSpaceId={setSelectedSpaceId}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredContacts={filteredContacts}
              onSelectContact={(c) => setSelectedContact(c)}
              onToggleStatus={toggleFollowUpStatus}
              onOpenVoiceModal={() => setVoiceModalOpen(true)}
              onOpenCardModal={() => setCardModalOpen(true)}
              onExportCSV={exportToCSV}
            />
          )}

          {/* Page 3: Spaces Hub */}
          {activePage === 'spaces' && (
            <SpacesPage
              spaces={spaces}
              contacts={contacts}
              onSelectContact={(c) => setSelectedContact(c)}
              onToggleStatus={toggleFollowUpStatus}
              onOpenNewSpaceModal={() => setSpacesModalOpen(true)}
              onExportCSV={exportToCSV}
            />
          )}

          {/* Page 4: Reminders / Follow-up Pipeline */}
          {activePage === 'reminders' && (
            <RemindersPage
              contacts={contacts}
              onSelectContact={(c) => setSelectedContact(c)}
              onToggleStatus={toggleFollowUpStatus}
            />
          )}

          {/* Page 5: Digital Business Card */}
          {activePage === 'digital-card' && (
            <DigitalCardPage />
          )}

          {/* Page 6: Network Intelligence Map */}
          {activePage === 'network-map' && (
            <NetworkMapPage
              contacts={contacts}
              onSelectContact={(c) => setSelectedContact(c)}
            />
          )}

        </main>

      </div>

      {/* Shared Action Modals */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        onDelete={deleteContact}
        onToggleStatus={toggleFollowUpStatus}
      />

      <VoiceRecorderModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onSaveContact={addContact}
        activeSpaceId={selectedSpaceId}
      />

      <CardScannerModal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSaveContact={addContact}
        activeSpaceId={selectedSpaceId}
      />

      <SpacesModal
        isOpen={spacesModalOpen}
        onClose={() => setSpacesModalOpen(false)}
        onAddSpace={addSpace}
      />

    </div>
  );
}
