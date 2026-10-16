import React, { useState } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenContact, onOpenDemo, onOpenDashboard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-[#80235c] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              {/* Starburst icon like the CRM diagram */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-[#80235c] transition-colors">
                mynetworkk<span className="text-[#80235c]">.ai</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-700 -mt-1">
                Relationship Memory
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-gray-700">
            <a href="#features" className="hover:text-[#80235c] transition-colors">Features</a>
            <a href="#voice-notes" className="hover:text-[#80235c] transition-colors">Voice Notes</a>
            <a href="#spaces" className="hover:text-[#80235c] transition-colors">Spaces</a>
            <button 
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 bg-[#dcf786] text-gray-900 px-3 py-1.5 rounded-full font-bold text-xs hover:bg-[#c9ea6b] transition-all shadow-2xs hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#80235c]" />
              <span>Open Web App</span>
            </button>
            <a href="#faq" className="hover:text-[#80235c] transition-colors">FAQ</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); onOpenContact('Pricing Inquiry'); }} className="hover:text-[#80235c] transition-colors">Pricing</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onOpenDashboard}
              className="text-[15px] font-semibold text-gray-700 hover:text-[#80235c] px-3 py-2 transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={onOpenDashboard}
              className="bg-[#80235c] hover:bg-[#6a1b4b] text-white text-[15px] font-medium px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Launch App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-pink-50"
          >
            Features
          </a>
          <a
            href="#voice-notes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-pink-50"
          >
            Voice Notes
          </a>
          <a
            href="#spaces"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-pink-50"
          >
            Spaces
          </a>
          <a
            href="#demo"
            onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#80235c] bg-purple-50"
          >
            Live Interactive Demo ✨
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 hover:bg-pink-50"
          >
            FAQ
          </a>
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact('Sign In'); }}
              className="w-full text-center py-2.5 font-medium text-gray-700 rounded-xl hover:bg-gray-100"
            >
              Log in
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact('Get Started Free'); }}
              className="w-full text-center py-3 font-medium text-white bg-[#80235c] rounded-full shadow-sm"
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
