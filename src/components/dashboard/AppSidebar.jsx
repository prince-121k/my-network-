import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderGit2, 
  CalendarClock, 
  QrCode, 
  Network, 
  Mic, 
  Camera, 
  ArrowLeft,
  Sparkles,
  Search,
  Plus,
  Bot,
  Crown,
  LogIn,
  UserCheck
} from 'lucide-react';

export default function AppSidebar({ 
  activePage, 
  setActivePage, 
  onBackToLanding, 
  onOpenVoiceModal, 
  onOpenCardModal,
  onOpenAddConnectionModal,
  onOpenAuthModal,
  currentUser,
  pendingFollowUpsCount = 0
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Memory Chat', icon: Bot, badge: 'AI Bot' },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'spaces', label: 'Spaces', icon: FolderGit2 },
    { 
      id: 'reminders', 
      label: 'Follow-ups', 
      icon: CalendarClock, 
      badge: pendingFollowUpsCount > 0 ? pendingFollowUpsCount : null 
    },
    { id: 'digital-card', label: 'My Digital Card', icon: QrCode },
    { id: 'network-map', label: 'Network Map', icon: Network },
    { id: 'founder', label: 'Founder Portal', icon: Crown, badge: 'Admin' },
  ];

  const userName = currentUser?.name || 'Prince Kumar Pandey';
  const userRole = currentUser?.role || 'Founder & CEO';
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'PK';

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200/80 flex-col justify-between shrink-0 sticky top-0 h-screen p-5 z-30">
        
        {/* Top: Brand & Navigation */}
        <div className="space-y-5 overflow-y-auto pr-1 no-scrollbar">
          
          {/* Logo & Back button */}
          <div className="space-y-3 pb-3 border-b border-gray-100">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#80235c] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Landing Page</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#80235c] text-white flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-gray-900 block leading-tight">
                  mynetworkk<span className="text-[#80235c]">.ai</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Relationship AI
                </span>
              </div>
            </div>
          </div>

          {/* Quick Capture Buttons */}
          <div className="space-y-2">
            <button
              onClick={onOpenAddConnectionModal || onOpenVoiceModal}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Connection</span>
            </button>

            <button
              onClick={onOpenVoiceModal}
              className="w-full py-2 px-4 rounded-2xl bg-white hover:bg-pink-50 text-[#80235c] border border-pink-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <Mic className="w-3.5 h-3.5 animate-pulse text-[#80235c]" />
              <span>Record Voice Memo</span>
            </button>

            <button
              onClick={onOpenCardModal}
              className="w-full py-1.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200/70 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Camera className="w-3 h-3 text-purple-700" />
              <span>Scan Visiting Card</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-2">
              Workspace Pages
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const isFounder = item.id === 'founder';
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? isFounder ? 'bg-amber-100 text-amber-900 shadow-2xs' : 'bg-[#fdedee] text-[#80235c] shadow-2xs'
                      : isFounder ? 'text-amber-700 hover:bg-amber-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? (isFounder ? 'text-amber-800' : 'text-[#80235c]') : (isFounder ? 'text-amber-600' : 'text-gray-400')}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isFounder ? 'bg-amber-600 text-white' : 'bg-[#80235c] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Bottom User Profile & Switcher Card */}
        <div className="p-3 bg-pink-50/80 border border-pink-200/70 rounded-2xl space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-[#80235c] text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">{userName}</p>
              <p className="text-[10px] text-gray-500 truncate">{userRole}</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online & active" />
          </div>

          <div className="flex items-center gap-1.5 pt-1 border-t border-pink-200/50">
            <button
              onClick={onOpenAuthModal}
              className="flex-1 py-1 px-2 rounded-lg bg-white hover:bg-pink-100/60 border border-pink-200 text-[#80235c] text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1 shadow-2xs"
            >
              <UserCheck className="w-3 h-3" />
              <span>Switch / Sign In</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200/90 z-40 px-2 py-1 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors relative ${
                isActive ? 'text-[#80235c]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
              {item.badge && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
