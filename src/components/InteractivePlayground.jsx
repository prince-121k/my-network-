import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Search, 
  Calendar, 
  MessageCircle, 
  Camera, 
  CheckCircle, 
  Play, 
  Pause,
  Clock,
  Tag,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState('voice'); // 'voice' | 'search' | 'card'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [processedContact, setProcessedContact] = useState(null);
  const [searchMemoryQuery, setSearchMemoryQuery] = useState('');
  const [scanningCard, setScanningCard] = useState(false);
  const [cardScannedSuccess, setCardScannedSuccess] = useState(false);

  const presets = [
    {
      title: "Hinglish: Rohan (Partnership Lead)",
      speech: "Bhai abhi Delhi summit me Rohan Malhotra se mila, BharatCart ka Head of Partnerships hai. Usne bola hamare SDK integration me interested hai, aur Monday ko pitch deck WhatsApp pe bhejne ko bola.",
      extracted: {
        name: "Rohan Malhotra",
        role: "Head of Partnerships",
        company: "BharatCart",
        event: "Delhi Startup Summit",
        tags: ["Fintech", "SDK Integration", "High Priority"],
        actionItem: "Send pitch deck on WhatsApp by Monday morning",
        followUpDate: "Next Monday, 10:00 AM",
        whatsappMessage: "Hi Rohan, great meeting you at Delhi Startup Summit! Sharing our pitch deck and sample SDK documentation as discussed."
      }
    },
    {
      title: "English: Priya (Angel Investor)",
      speech: "Just met Priya Sharma from Nexus Ventures during the coffee break. She loved our vision for AI networking CRM. Wants to see our MRR numbers and requested a 20-min Zoom next Wednesday at 3 PM.",
      extracted: {
        name: "Priya Sharma",
        role: "Angel Investor / Partner",
        company: "Nexus Ventures",
        event: "Coffee Break / Main Stage",
        tags: ["Investor", "Seed Round", "Zoom Meeting"],
        actionItem: "Share MRR metrics & schedule 20-min Zoom call",
        followUpDate: "Next Wednesday, 3:00 PM",
        whatsappMessage: "Hi Priya, it was wonderful speaking with you at the conference. Here are the MRR highlights and my calendar link for our Wednesday call."
      }
    },
    {
      title: "Creative: Alex (FlowLoop Designer)",
      speech: "Met Alex Morgan from FlowLoop at DesignUp. Super chill person, into vintage analog cameras and retro typography. Offered to review our mobile UI onboarding next month.",
      extracted: {
        name: "Alex Morgan",
        role: "Lead Product Designer",
        company: "FlowLoop",
        event: "DesignUp 2024",
        tags: ["UI/UX", "Vintage Cameras", "Onboarding Review"],
        actionItem: "Ping regarding mobile app onboarding review next month",
        followUpDate: "First week of next month",
        whatsappMessage: "Hey Alex! Loved our chat at DesignUp about analog cameras and design systems. Looking forward to showing you our onboarding flow!"
      }
    }
  ];

  // Set default initial contact
  useEffect(() => {
    setProcessedContact(presets[0].extracted);
  }, []);

  // Timer simulation during voice recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSimulateRecording = (presetIdx) => {
    setSelectedPreset(presetIdx);
    setIsRecording(true);
    setProcessedContact(null);

    setTimeout(() => {
      setIsRecording(false);
      setProcessedContact(presets[presetIdx].extracted);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }, 2500);
  };

  const handleSimulateCardScan = () => {
    setScanningCard(true);
    setCardScannedSuccess(false);

    setTimeout(() => {
      setScanningCard(false);
      setCardScannedSuccess(true);
      setProcessedContact({
        name: "Karan Singhal",
        role: "VP of Engineering",
        company: "CloudScale Systems",
        event: "AWS Community Day",
        tags: ["Cloud Infra", "Kubernetes", "Hiring"],
        actionItem: "Connect over LinkedIn & email enterprise proposal",
        followUpDate: "Tomorrow, 11:30 AM",
        whatsappMessage: "Hi Karan, pleasure connecting at AWS Community Day! Reaching out regarding CloudScale's infra roadmap."
      });
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      } catch (e) {}
    }, 2000);
  };

  // Mock list for search by memory
  const allSavedMemories = [
    {
      name: "Rohan Malhotra",
      role: "Head of Partnerships, BharatCart",
      event: "Delhi Startup Summit",
      memory: "Wants to integrate BharatCart SDK. Send deck on Monday.",
      tags: ["Fintech", "SDK", "Partnerships", "Delhi"]
    },
    {
      name: "Priya Sharma",
      role: "Angel Investor, Nexus Ventures",
      event: "TechSparks 2024",
      memory: "Discussed seed round. Loves AI relationship intelligence.",
      tags: ["Investor", "Seed Round", "VC", "Nexus"]
    },
    {
      name: "Alex Morgan",
      role: "Lead Product Designer, FlowLoop",
      event: "DesignUp 2024",
      memory: "Loves vintage cameras and clean typography. UI feedback.",
      tags: ["UI/UX", "Designer", "Vintage Cameras", "FlowLoop"]
    },
    {
      name: "Karan Singhal",
      role: "VP of Engineering, CloudScale",
      event: "AWS Community Day",
      memory: "Managing 50+ Kubernetes clusters, hiring senior backend engineers.",
      tags: ["Cloud", "DevOps", "Kubernetes", "AWS"]
    }
  ];

  const filteredMemories = allSavedMemories.filter(m => {
    if (!searchMemoryQuery) return true;
    const q = searchMemoryQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.event.toLowerCase().includes(q) ||
      m.memory.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <section id="demo" className="py-20 lg:py-28 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dcf786] text-gray-900 text-xs font-extrabold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-4 h-4 text-[#80235c]" />
            <span>Interactive Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Experience mynetworkk.ai in action.
          </h2>

          <p className="text-base sm:text-lg text-gray-600">
            Try recording a voice memo in Hinglish, scanning a business card, or searching your contacts by fuzzy memory.
          </p>

          {/* Tab selector */}
          <div className="flex justify-center pt-3">
            <div className="bg-pink-50 p-1.5 rounded-2xl flex items-center gap-1 border border-pink-200">
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'voice' 
                    ? 'bg-[#80235c] text-white shadow-sm' 
                    : 'text-gray-700 hover:text-[#80235c]'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Voice Note AI</span>
              </button>

              <button
                onClick={() => setActiveTab('card')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'card' 
                    ? 'bg-[#80235c] text-white shadow-sm' 
                    : 'text-gray-700 hover:text-[#80235c]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Scan Business Card</span>
              </button>

              <button
                onClick={() => setActiveTab('search')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'search' 
                    ? 'bg-[#80235c] text-white shadow-sm' 
                    : 'text-gray-700 hover:text-[#80235c]'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Search by Memory</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Voice Note Simulator */}
        {activeTab === 'voice' && (
          <div className="bg-[#fdedee] rounded-3xl p-6 sm:p-10 border border-pink-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Voice Recording Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    1. Record or Choose a Sample Memo
                  </h3>
                  <p className="text-sm text-gray-600">
                    Click any preset below to simulate recording a natural voice note after an event:
                  </p>
                </div>

                {/* Preset Options */}
                <div className="space-y-3">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSimulateRecording(idx)}
                      disabled={isRecording}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedPreset === idx && !isRecording
                          ? 'bg-white border-[#80235c] shadow-md ring-2 ring-[#80235c]/10'
                          : 'bg-white/70 hover:bg-white border-pink-100 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#80235c]">{p.title}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Sample Audio</span>
                      </div>
                      <p className="text-xs text-gray-700 italic line-clamp-2">
                        "{p.speech}"
                      </p>
                    </button>
                  ))}
                </div>

                {/* Recording Status Button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSimulateRecording((selectedPreset + 1) % presets.length)}
                    disabled={isRecording}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-md transition-all ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-[#80235c] hover:bg-[#6a1b4b] text-white hover:scale-[1.01]'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-5 h-5 animate-spin" />
                        <span>Listening & Transcribing ({recordingSeconds}s)...</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5" />
                        <span>Tap to Record New Voice Note</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Right Column: AI Extraction Output */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-pink-100 shadow-xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
                      <h4 className="font-bold text-gray-900 text-base">mynetworkk.ai AI Extraction Engine</h4>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#dcf786] text-gray-900">
                      ⚡ 100% Automated
                    </span>
                  </div>

                  {isRecording ? (
                    <div className="py-16 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-purple-100 text-[#80235c] flex items-center justify-center mx-auto animate-bounce">
                        <Mic className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">Processing Hindi / English Speech...</p>
                      <p className="text-xs text-gray-500">Extracting name, company, intent, and follow-up commitments</p>
                    </div>
                  ) : processedContact ? (
                    <div className="space-y-4 animate-fadeIn">
                      
                      {/* Contact Header */}
                      <div className="flex items-center justify-between bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#80235c] text-white font-bold flex items-center justify-center text-base">
                            {processedContact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="font-extrabold text-gray-900 text-lg leading-tight">
                              {processedContact.name}
                            </h5>
                            <p className="text-xs font-medium text-gray-500">
                              {processedContact.role} • <strong className="text-gray-800">{processedContact.company}</strong>
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold text-purple-700 bg-white border border-purple-200 px-3 py-1 rounded-full">
                          📍 {processedContact.event}
                        </span>
                      </div>

                      {/* Extracted Tags */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Semantic Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {processedContact.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="px-3 py-1 bg-purple-100 text-purple-900 text-xs font-semibold rounded-full flex items-center gap-1"
                            >
                              <Tag className="w-3 h-3 text-purple-600" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Item & Follow Up */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" />
                            Promise / Action Item
                          </span>
                          <p className="text-xs font-bold text-gray-800">
                            {processedContact.actionItem}
                          </p>
                        </div>

                        <div className="bg-purple-50/70 border border-purple-200/80 p-3 rounded-xl">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1 mb-1">
                            <Calendar className="w-3 h-3" />
                            Follow-up Due
                          </span>
                          <p className="text-xs font-bold text-[#80235c]">
                            {processedContact.followUpDate}
                          </p>
                        </div>
                      </div>

                      {/* One-Click WhatsApp Action */}
                      <div className="pt-2">
                        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                            <span className="flex items-center gap-1.5">
                              <MessageCircle className="w-4 h-4 text-emerald-600" />
                              Ready-to-Send WhatsApp Follow-up:
                            </span>
                            <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                              One Click
                            </span>
                          </div>
                          <p className="text-xs text-emerald-950 font-mono bg-white p-2.5 rounded-lg border border-emerald-200/60 leading-relaxed">
                            "{processedContact.whatsappMessage}"
                          </p>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(processedContact.whatsappMessage)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors shadow-xs"
                          >
                            <span>Open WhatsApp with this message</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  ) : null}

                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Business Card Scanner Simulator */}
        {activeTab === 'card' && (
          <div className="bg-[#fdedee] rounded-3xl p-6 sm:p-10 border border-pink-200/80 shadow-md">
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Scan Any Paper Card or Event Badge</h3>
                <p className="text-sm text-gray-600">Simulate camera OCR scanning to extract name, phone, email, and company instantaneously.</p>
              </div>

              {/* Card visual frame */}
              <div className="relative mx-auto w-full max-w-md bg-gradient-to-tr from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-2xl border-4 border-gray-700 overflow-hidden">
                {scanningCard && (
                  <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-xs flex flex-col items-center justify-center z-20">
                    <div className="w-12 h-12 border-4 border-[#dcf786] border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-sm font-bold text-white">Extracting text & tags...</p>
                  </div>
                )}

                <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-4">
                  <div>
                    <h4 className="text-xl font-bold">Karan Singhal</h4>
                    <p className="text-xs text-purple-300 font-mono">VP of Engineering</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    AWS Summit Badge
                  </span>
                </div>

                <div className="space-y-1 text-left text-xs text-gray-300 font-mono">
                  <p>🏢 CloudScale Systems Pvt Ltd</p>
                  <p>📧 karan.singhal@cloudscale.io</p>
                  <p>📞 +91 99887 76655</p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSimulateCardScan}
                  disabled={scanningCard}
                  className="px-8 py-3.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
                >
                  <Camera className="w-4 h-4" />
                  <span>{scanningCard ? 'Scanning with Camera...' : 'Test Card Scan Simulation'}</span>
                </button>
              </div>

              {cardScannedSuccess && (
                <div className="p-4 bg-white rounded-2xl border border-emerald-200 text-left shadow-lg animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Card Scanned Successfully! Added to your network memory.</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    <strong>Auto-Action:</strong> Next step reminder scheduled for tomorrow 11:30 AM to send proposal email.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Search by Memory */}
        {activeTab === 'search' && (
          <div className="bg-[#fdedee] rounded-3xl p-6 sm:p-10 border border-pink-200/80 shadow-md space-y-6">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Search by Memory, Not Just Names</h3>
              <p className="text-sm text-gray-600">
                Can't remember someone's name? Type what you remember: e.g. <em>"vintage cameras"</em>, <em>"fintech"</em>, <em>"investor"</em>, or <em>"Delhi"</em>.
              </p>

              {/* Search Bar */}
              <div className="relative pt-2">
                <Search className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchMemoryQuery}
                  onChange={(e) => setSearchMemoryQuery(e.target.value)}
                  placeholder="Type anything you remember (e.g. 'vintage cameras', 'investor', 'pitch deck')..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-pink-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#80235c] shadow-sm"
                />
              </div>

              {/* Quick suggestion chips */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                <span className="text-xs text-gray-500 font-medium">Try clicking:</span>
                {['vintage cameras', 'investor', 'fintech', 'Kubernetes'].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchMemoryQuery(chip)}
                    className="text-xs bg-white hover:bg-pink-100 text-[#80235c] font-semibold px-2.5 py-1 rounded-full border border-pink-200 transition-colors"
                  >
                    #{chip}
                  </button>
                ))}
                {searchMemoryQuery && (
                  <button
                    onClick={() => setSearchMemoryQuery('')}
                    className="text-xs text-gray-500 hover:text-gray-800 underline ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filtered Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto pt-4">
              {filteredMemories.length > 0 ? (
                filteredMemories.map((m, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">{m.name}</h4>
                        <p className="text-xs text-gray-500">{m.role}</p>
                      </div>
                      <span className="text-[10px] font-semibold bg-pink-100 text-purple-900 px-2.5 py-0.5 rounded-full">
                        {m.event}
                      </span>
                    </div>

                    <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100 text-xs text-gray-700">
                      <span className="font-bold text-gray-900 block mb-0.5">🧠 Memory Context:</span>
                      "{m.memory}"
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500 text-sm">
                  No contacts found matching "{searchMemoryQuery}". Try searching for another keyword.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
