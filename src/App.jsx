import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import VoiceNoteBanner from './components/VoiceNoteBanner';
import SelfieBanner from './components/SelfieBanner';
import SpacesSection from './components/SpacesSection';
import InteractivePlayground from './components/InteractivePlayground';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import DashboardView from './components/dashboard/DashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState('Get Started Free');

  const handleOpenContact = (reason = 'Get Started Free') => {
    setModalReason(reason);
    setModalOpen(true);
  };

  const handleOpenDashboard = () => {
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user is inside the functional Dashboard App
  if (currentView === 'dashboard') {
    return (
      <DashboardView 
        onBackToLanding={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

  // Otherwise render Marketing & Landing Page
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#fdedee] selection:text-[#80235c]">
      {/* Top Navigation */}
      <Navbar 
        onOpenContact={handleOpenContact} 
        onOpenDemo={scrollToDemo} 
        onOpenDashboard={handleOpenDashboard}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onOpenContact={handleOpenDashboard} 
          onOpenDemo={scrollToDemo} 
        />

        {/* 2. 6-Cards Feature Grid (matches user screenshot media_1792169151307_df8dcc10.png) */}
        <FeatureGrid 
          onOpenDemo={scrollToDemo} 
        />

        {/* 3. Pastel Lime-Green Voice Note Banner (matches user screenshot media_1792169151229_7f9a5f9c.png) */}
        <VoiceNoteBanner 
          onOpenDemo={scrollToDemo} 
        />

        {/* 4. Pastel Sky-Blue Selfie Banner (matches user screenshot media_1792169151282_168d2625.png) */}
        <SelfieBanner 
          onOpenDemo={scrollToDemo} 
        />

        {/* 5. Team & Event Spaces Section */}
        <SpacesSection 
          onOpenContact={handleOpenDashboard} 
        />

        {/* 6. Live Interactive Simulator (Voice Notes, Card Scanner & Memory Search) */}
        <InteractivePlayground 
          onOpenDashboard={handleOpenDashboard} 
        />

        {/* 7. FAQ Section (matches user screenshot media_1792169151232_9b3fab14.png) */}
        <FaqSection 
          onOpenContact={handleOpenContact} 
        />
      </main>

      {/* 8. Footer (matches user screenshot media_1792169151138_8569f5ec.png) */}
      <Footer 
        onOpenContact={handleOpenContact} 
      />

      {/* Early Access / Contact Modal */}
      <ContactModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialReason={modalReason} 
      />
    </div>
  );
}
