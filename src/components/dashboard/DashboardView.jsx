import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Plus, 
  Download, 
  ArrowLeft, 
  Bell, 
  Crown, 
  UserCheck,
  Bot
} from 'lucide-react';
import { useNetworkStore } from '../../hooks/useNetworkStore';
import ContactDetailModal from './ContactDetailModal';
import VoiceRecorderModal from './VoiceRecorderModal';
import CardScannerModal from './CardScannerModal';
import SpacesModal from './SpacesModal';
import AuthModal from './AuthModal';
import AddConnectionModal from './AddConnectionModal';

// Pages
import ContactsPage from './pages/ContactsPage';
import CrmCalendarPage from './pages/CrmCalendarPage';
import MemoryChatPage from './pages/MemoryChatPage';
import SpacesPage from './pages/SpacesPage';
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
    clearAllContacts,
    loadDemoContacts,
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

  const [activePage, setActivePage] = useState('contacts'); // 'contacts' | 'crm' | 'spaces' | 'chat' | 'founder'
  const [selectedContact, setSelectedContact] = useState(null);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [spacesModalOpen, setSpacesModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [addConnectionModalOpen, setAddConnectionModalOpen] = useState(false);

  const initials = (currentUser?.name || 'Prince').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'PK';

  return (
    <div className="min-h-screen bg-[#faf8f9] flex flex-col font-sans text-gray-900">
      
      {/* Top Navigation Bar (matches user screenshot media_1794976841246_56b02c66.png & media_1794976841317_484996ac.png) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo (✻ All Buddy) & Back to Landing */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLanding}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div 
            onClick={() => setActivePage('contacts')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-[#80235c] flex items-center justify-center font-black text-xl shadow-2xs">
              ✻
            </div>
            <span className="text-xl font-extrabold text-[#80235c] tracking-tight">
              All Buddy
            </span>
          </div>
        </div>

        {/* Right Nav Links (Scan, Contacts, Spaces, CRM, AI Bot, Bell, Avatar) */}
        <div className="flex items-center gap-1 sm:gap-6">
          
          <nav className="flex items-center gap-1 sm:gap-4 text-xs sm:text-sm font-semibold">
            {/* Scan Link */}
            <button
              onClick={() => setCardModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Scan
            </button>

            {/* Contacts Link */}
            <button
              onClick={() => setActivePage('contacts')}
              className={`px-2.5 py-1.5 rounded-lg transition-all relative ${
                activePage === 'contacts'
                  ? 'text-[#80235c] font-black border-b-2 border-[#80235c]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Contacts
            </button>

            {/* Spaces Link */}
            <button
              onClick={() => setActivePage('spaces')}
              className={`px-2.5 py-1.5 rounded-lg transition-all relative ${
                activePage === 'spaces'
                  ? 'text-[#80235c] font-black border-b-2 border-[#80235c]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Spaces
            </button>

            {/* CRM Link (matches screenshot) */}
            <button
              onClick={() => setActivePage('crm')}
              className={`px-2.5 py-1.5 rounded-lg transition-all relative ${
                activePage === 'crm'
                  ? 'text-[#80235c] font-black border-b-2 border-[#80235c]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              CRM
            </button>

            {/* AI Memory Bot Link */}
            <button
              onClick={() => setActivePage('chat')}
              className={`hidden md:block px-2.5 py-1.5 rounded-lg transition-all relative ${
                activePage === 'chat'
                  ? 'text-[#80235c] font-black border-b-2 border-[#80235c]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              AI Memory
            </button>

            {/* Founder Link */}
            <button
              onClick={() => setActivePage('founder')}
              className={`hidden lg:block px-2.5 py-1.5 rounded-lg transition-all ${
                activePage === 'founder'
                  ? 'text-amber-800 font-black border-b-2 border-amber-600'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Admin
            </button>
          </nav>

          {/* Right Icons: Bell & Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-gray-200">
            <button
              className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {contacts.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>

            {/* User Avatar Circle */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-[#80235c] text-white text-xs font-bold flex items-center justify-center shadow-xs hover:ring-2 hover:ring-[#80235c]/30 transition-all"
              title="Click to switch profile or view account"
            >
              {initials}
            </button>
          </div>

        </div>

      </header>

      {/* Main Page Content */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
        
        {/* Page 1: Contacts Directory (Primary Screen) */}
        {activePage === 'contacts' && (
          <ContactsPage
            contacts={contacts}
            spaces={spaces}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredContacts={filteredContacts}
            onSelectContact={(c) => setSelectedContact(c)}
            onToggleStatus={toggleFollowUpStatus}
            onOpenCardModal={() => setCardModalOpen(true)}
            onOpenAddConnection={() => setAddConnectionModalOpen(true)}
            onClearAllContacts={clearAllContacts}
            onLoadDemoContacts={loadDemoContacts}
            onExportCSV={exportToCSV}
          />
        )}

        {/* Page 2: CRM Monthly Calendar & Tasks (matches screenshot media_1794976841317_484996ac.png) */}
        {activePage === 'crm' && (
          <CrmCalendarPage
            contacts={contacts}
            onSelectContact={(c) => setSelectedContact(c)}
            onToggleStatus={toggleFollowUpStatus}
            onOpenAddConnection={() => setAddConnectionModalOpen(true)}
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

        {/* Page 4: AI Memory Chat & Timeline Assistant */}
        {activePage === 'chat' && (
          <MemoryChatPage
            contacts={contacts}
            onToggleStatus={toggleFollowUpStatus}
            onOpenVoiceModal={() => setVoiceModalOpen(true)}
            onOpenCardModal={() => setCardModalOpen(true)}
            onOpenAddConnection={() => setAddConnectionModalOpen(true)}
          />
        )}

        {/* Page 5: Founder Admin Portal */}
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

      {/* Modals */}
      <AddConnectionModal
        isOpen={addConnectionModalOpen}
        onClose={() => setAddConnectionModalOpen(false)}
        onSaveContact={addContact}
        spaces={spaces}
        activeSpaceId={selectedSpaceId}
      />

      <CardScannerModal
        isOpen={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSaveContact={addContact}
        activeSpaceId={selectedSpaceId}
      />

      <ContactDetailModal
        contact={selectedContact}
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        onDelete={deleteContact}
        onToggleStatus={toggleFollowUpStatus}
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
