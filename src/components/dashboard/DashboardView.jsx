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
  Bell,
  Crown,
  UserCheck
} from 'lucide-react';
import { useNetworkStore } from '../../hooks/useNetworkStore';
import AppSidebar from './AppSidebar';
import ContactDetailModal from './ContactDetailModal';
import VoiceRecorderModal from './VoiceRecorderModal';
import CardScannerModal from './CardScannerModal';
import SpacesModal from './SpacesModal';
import AuthModal from './AuthModal';
import AddConnectionModal from './AddConnectionModal';

// Pages
import OverviewPage from './pages/OverviewPage';
import MemoryChatPage from './pages/MemoryChatPage';
import ContactsPage from './pages/ContactsPage';
import SpacesPage from './pages/SpacesPage';
import RemindersPage from './pages/RemindersPage';
import DigitalCardPage from './pages/DigitalCardPage';
import NetworkMapPage from './pages/NetworkMapPage';
import FounderAdminPage from './pages/FounderAdminPage';

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
    exportToCSV,
    currentUser,
    users,
    loginWithOTP,
    updateProfile,
    logout,
    toggleBlockUser,
    deleteUser,
    switchUser
  } = useNetworkStore();

  const [activePage, setActivePage] = useState('overview'); // 'overview' | 'contacts' | 'spaces' | 'reminders' | 'digital-card' | 'network-map' | 'founder'
  const [selectedContact, setSelectedContact] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [spacesModalOpen, setSpacesModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [addConnectionModalOpen, setAddConnectionModalOpen] = useState(false);

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
        onOpenAddConnectionModal={() => setAddConnectionModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        currentUser={currentUser}
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
            {/* Quick Add Connection Button */}
            <button
              onClick={() => setAddConnectionModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
              title="Add a new contact with full details, voice & context"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Connection</span>
            </button>

            <button
              onClick={() => setVoiceModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-pink-200 text-[#80235c] hover:bg-pink-50 text-xs font-bold shadow-2xs transition-all"
            >
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              <span>Voice Memo</span>
            </button>

            <button
              onClick={exportToCSV}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-[#80235c] transition-colors"
              title="Download full CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>

            {/* Current user pill button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100/70 border border-pink-200 transition-all text-left"
              title="Click to view profile, switch account, or log in"
            >
              <div className="w-6 h-6 rounded-full bg-[#80235c] text-white text-[10px] font-bold flex items-center justify-center">
                {(currentUser?.name || 'Prince').charAt(0)}
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-gray-900 block leading-tight truncate max-w-[100px]">
                  {currentUser?.name?.split(' ')[0] || 'Prince'}
                </span>
                <span className="text-[9px] font-semibold text-purple-700 block uppercase tracking-wider">
                  {currentUser?.role?.includes('Founder') ? 'Founder' : 'Verified'}
                </span>
              </div>
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
              onOpenAddConnection={() => setAddConnectionModalOpen(true)}
              onNavigateTo={(page) => setActivePage(page)}
            />
          )}

          {/* Page 2: AI Memory Chat & Timeline Assistant */}
          {activePage === 'chat' && (
            <MemoryChatPage
              contacts={contacts}
              onToggleStatus={toggleFollowUpStatus}
              onOpenVoiceModal={() => setVoiceModalOpen(true)}
              onOpenCardModal={() => setCardModalOpen(true)}
              onOpenAddConnection={() => setAddConnectionModalOpen(true)}
            />
          )}

          {/* Page 3: Contacts Directory */}
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
              onOpenAddConnection={() => setAddConnectionModalOpen(true)}
              onExportCSV={exportToCSV}
            />
          )}

          {/* Page 4: Spaces Hub */}
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

          {/* Page 5: Reminders / Follow-up Pipeline */}
          {activePage === 'reminders' && (
            <RemindersPage
              contacts={contacts}
              onSelectContact={(c) => setSelectedContact(c)}
              onToggleStatus={toggleFollowUpStatus}
            />
          )}

          {/* Page 6: Digital Business Card */}
          {activePage === 'digital-card' && (
            <DigitalCardPage />
          )}

          {/* Page 7: Network Intelligence Map */}
          {activePage === 'network-map' && (
            <NetworkMapPage
              contacts={contacts}
              onSelectContact={(c) => setSelectedContact(c)}
            />
          )}

          {/* Page 8: Founder & Admin Portal */}
          {activePage === 'founder' && (
            <FounderAdminPage
              currentUser={currentUser}
              users={users}
              contacts={contacts}
              onToggleBlockUser={toggleBlockUser}
              onDeleteUser={deleteUser}
              onSwitchUser={switchUser}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />
          )}

        </main>

      </div>

      {/* Floating AI Assistant Shortcut */}
      {activePage !== 'chat' && (
        <button
          onClick={() => setActivePage('chat')}
          className="fixed bottom-20 lg:bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white"
        >
          <Sparkles className="w-4 h-4 text-[#dcf786] animate-pulse" />
          <span>Ask AI Memory Bot</span>
        </button>
      )}

      {/* Shared Action Modals */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        onDelete={deleteContact}
        onToggleStatus={toggleFollowUpStatus}
      />

      <AddConnectionModal
        isOpen={addConnectionModalOpen}
        onClose={() => setAddConnectionModalOpen(false)}
        onSaveContact={addContact}
        spaces={spaces}
        activeSpaceId={selectedSpaceId}
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

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        users={users}
        onLoginWithOTP={loginWithOTP}
        onUpdateProfile={updateProfile}
        onSwitchUser={switchUser}
        onLogout={logout}
      />

    </div>
  );
}
