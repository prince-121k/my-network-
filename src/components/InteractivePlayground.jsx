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
  ArrowRight,
  Bot,
  Volume2,
  VolumeX,
  Copy,
  Check,
  CheckCircle2,
  MapPin,
  User,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_CONTACTS } from '../hooks/useNetworkStore';
import { generateTimelineResponse } from '../utils/memoryTimelineHelper';

export default function InteractivePlayground({ onOpenDashboard }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'voice' | 'card' | 'search'
  const [chatQuery, setChatQuery] = useState('Microsoft');
  const [chatResult, setChatResult] = useState(() => generateTimelineResponse('Microsoft', INITIAL_CONTACTS));
  const [chatAudioPlayingId, setChatAudioPlayingId] = useState(null);
  const [chatCopiedId, setChatCopiedId] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [processedContact, setProcessedContact] = useState(null);
  const [searchMemoryQuery, setSearchMemoryQuery] = useState('');
  const [scanningCard, setScanningCard] = useState(false);
  const [cardScannedSuccess, setCardScannedSuccess] = useState(false);

  const handleChatSearch = (q) => {
    const target = q !== undefined ? q : chatQuery;
    setChatQuery(target);
    const res = generateTimelineResponse(target, INITIAL_CONTACTS);
    setChatResult(res);
  };

  const toggleChatAudio = (id) => {
    if (chatAudioPlayingId === id) {
      setChatAudioPlayingId(null);
    } else {
      setChatAudioPlayingId(id);
      setTimeout(() => {
        setChatAudioPlayingId(prev => prev === id ? null : prev);
      }, 7000);
    }
  };

  const handleCopyChatSummary = (item) => {
    const text = `Meeting with ${item.name} (${item.company})\nDate: ${item.date} at ${item.time}\nLocation: ${item.location}\nDiscussion:\n${(item.topicsDiscussed || []).map(t => `- ${t}`).join('\n')}\nAction Item: ${item.actionItem}`;
    navigator.clipboard.writeText(text);
    setChatCopiedId(item.id);
    setTimeout(() => setChatCopiedId(null), 2000);
  };

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
            Try asking our AI Chatbot about Microsoft or IIT Delhi visits, recording a Hinglish voice memo, scanning a card, or searching by memory.
          </p>

          {/* Tab selector */}
          <div className="flex justify-center pt-3 overflow-x-auto no-scrollbar">
            <div className="bg-pink-50 p-1.5 rounded-2xl flex items-center gap-1 border border-pink-200">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'chat' 
                    ? 'bg-[#80235c] text-white shadow-sm' 
                    : 'text-gray-700 hover:text-[#80235c]'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>AI Memory Bot</span>
                <span className="px-1.5 py-0.2 rounded-md bg-[#dcf786] text-gray-900 text-[10px] font-black">
                  New
                </span>
              </button>

              <button
                onClick={() => setActiveTab('voice')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
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
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'card' 
                    ? 'bg-[#80235c] text-white shadow-sm' 
                    : 'text-gray-700 hover:text-[#80235c]'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Scan Card</span>
              </button>

              <button
                onClick={() => setActiveTab('search')}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'search' 
                    ? 'bg-[#80235c] text-white shadow-sm' 
                    : 'text-gray-700 hover:text-[#80235c]'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Search Memory</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 0: AI Memory Chatbot & Timeline Simulator */}
        {activeTab === 'chat' && (
          <div className="bg-[#fdedee] rounded-3xl p-6 sm:p-10 border border-pink-200/80 shadow-md space-y-6 animate-fadeIn">
            
            {/* Header & Query Input */}
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#80235c] shadow-2xs border border-pink-200">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Conversational Memory Assistant</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Ask about any Company, College, or Meeting
              </h3>

              <p className="text-sm text-gray-600 font-medium">
                Poocho: <em>"Microsoft me kab gaye the?"</em>, <em>"IIT Delhi me kya baat hui thi?"</em> ya <em>"Rohan"</em> — see exact dates, times, discussions & next steps.
              </p>

              {/* Chat Input Bar */}
              <div className="relative pt-2 max-w-2xl mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Bot className="absolute left-4 top-3.5 w-5 h-5 text-[#80235c]" />
                  <input
                    type="text"
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleChatSearch();
                    }}
                    placeholder="Try 'Microsoft', 'IIT Delhi', 'Rohan' or 'Pending follow-ups'..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-pink-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#80235c] shadow-xs"
                  />
                </div>
                <button
                  onClick={() => handleChatSearch()}
                  className="px-5 py-3 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 shrink-0"
                >
                  Search Memory
                </button>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Try quick queries:</span>
                {[
                  { label: '🏢 Microsoft (2 visits)', q: 'Microsoft' },
                  { label: '🏛️ IIT Delhi timeline', q: 'IIT Delhi' },
                  { label: '🤝 Rohan (BharatCart)', q: 'Rohan' },
                  { label: '💼 Priya Sharma (Nexus)', q: 'Priya' },
                  { label: '⚡ Pending Follow-ups', q: 'Pending' }
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChatSearch(chip.q)}
                    className="text-xs bg-white hover:bg-pink-100 text-[#80235c] font-bold px-3 py-1.5 rounded-full border border-pink-200 transition-all hover:scale-105 shadow-2xs"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chatbot Response Bubble */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-pink-200/90 p-5 sm:p-7 shadow-sm space-y-5">
              
              {/* Bot Header & Speech text */}
              <div className="flex items-start gap-3.5 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#80235c] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-900 text-sm sm:text-base">mynetworkk AI Assistant</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {chatResult.totalMatches} Visits Found
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-700">
                    {chatResult.botReply}
                  </p>
                </div>
              </div>

              {/* Chronological Timeline Cards */}
              {chatResult.timeline && chatResult.timeline.length > 0 ? (
                <div className="space-y-4 pt-1 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-pink-300 before:via-purple-200 before:to-pink-100 text-left">
                  {chatResult.timeline.map((item, index) => {
                    const isAudioPlaying = chatAudioPlayingId === item.id;
                    const isDone = item.status === 'followed_up';

                    return (
                      <div key={item.id || index} className="relative pl-12 group">
                        {/* Numbered Pin */}
                        <div className="absolute left-2.5 top-3 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-[#80235c] text-[#80235c] font-black text-xs flex items-center justify-center shadow-xs group-hover:bg-[#80235c] group-hover:text-white transition-colors">
                          {index + 1}
                        </div>

                        {/* Card */}
                        <div className="bg-pink-50/30 rounded-2xl border border-pink-200/90 p-4 sm:p-5 shadow-2xs space-y-3 hover:border-pink-300 transition-all">
                          
                          {/* Date, Time & Status */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-2.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdedee] text-[#80235c] text-xs font-black">
                                <Calendar className="w-3.5 h-3.5 text-[#80235c]" />
                                {item.date}
                              </span>

                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold font-mono">
                                <Clock className="w-3.5 h-3.5" />
                                {item.time}
                              </span>

                              <span className="text-[11px] font-bold text-gray-500 uppercase">
                                Visit #{index + 1}
                              </span>
                            </div>

                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${
                              isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isDone ? 'Completed' : 'Follow-up Due'}</span>
                            </span>
                          </div>

                          {/* Location & Person Met */}
                          <div>
                            <div className="flex items-start gap-1.5 text-xs font-bold text-purple-900 mb-1">
                              <MapPin className="w-4 h-4 text-[#80235c] shrink-0 mt-0.5" />
                              <span>{item.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-extrabold text-gray-900">
                              <User className="w-4 h-4 text-gray-500" />
                              <span>{item.name}</span>
                              <span className="text-xs font-semibold text-gray-500">
                                ({item.role} @ <strong className="text-gray-800">{item.company}</strong>)
                              </span>
                            </div>
                          </div>

                          {/* Discussion Points */}
                          <div className="bg-white rounded-xl p-3 border border-pink-100 space-y-1.5">
                            <span className="text-[11px] font-extrabold text-[#80235c] uppercase tracking-wider block">
                              💬 Kya Baat Hui Thi (Key Discussion Points):
                            </span>
                            <ul className="space-y-1 text-xs text-gray-700 font-medium">
                              {(item.topicsDiscussed || []).map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-1.5">
                                  <span className="text-[#80235c] font-bold">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Items */}
                          <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-200/70 flex items-start gap-2">
                            <span className="text-sm">🎯</span>
                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-amber-800 block">
                                Action Item / Commitment:
                              </span>
                              <span className="text-xs font-bold text-amber-950">
                                {item.actionItem}
                              </span>
                            </div>
                          </div>

                          {/* Simulated Voice Memo Playback Bar */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100">
                            <button
                              onClick={() => toggleChatAudio(item.id)}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isAudioPlaying 
                                  ? 'bg-[#80235c] text-white shadow-xs' 
                                  : 'bg-pink-50 hover:bg-pink-100 text-[#80235c]'
                              }`}
                            >
                              {isAudioPlaying ? (
                                <>
                                  <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                                  <span>Playing Audio ({item.audioDuration || '0:35'})</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>Listen Voice Note ({item.audioDuration || '0:35'})</span>
                                </>
                              )}
                            </button>

                            <div className="flex items-center gap-1 px-2">
                              {[12, 22, 14, 26, 8, 18, 12, 24, 16, 10].map((h, wIdx) => (
                                <span 
                                  key={wIdx} 
                                  className={`w-1 rounded-full transition-all ${
                                    isAudioPlaying ? 'bg-[#80235c] animate-bounce' : 'bg-gray-300'
                                  }`}
                                  style={{ 
                                    height: isAudioPlaying ? `${h}px` : '8px',
                                    animationDelay: `${wIdx * 60}ms` 
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Footer Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-pink-100">
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(item.whatsappMessage || `Hi ${item.name.split(' ')[0]}, following up regarding our meeting!`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs hover:scale-102 transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Follow-up</span>
                            </a>

                            <button
                              onClick={() => handleCopyChatSummary(item)}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold transition-colors"
                            >
                              {chatCopiedId === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-700">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Summary</span>
                                </>
                              )}
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-xs">
                  No records found for "{chatQuery}". Try searching for 'Microsoft', 'IIT Delhi', or 'Rohan'.
                </div>
              )}

              {/* CTA to Full Dashboard */}
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-pink-50/60 p-4 rounded-2xl text-left">
                <div>
                  <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm">
                    Want to add new voice memos and manage your real network?
                  </h4>
                  <p className="text-xs text-gray-500">
                    Open the full web app with Spaces, Digital Cards, and live WhatsApp sync.
                  </p>
                </div>
                {onOpenDashboard && (
                  <button
                    onClick={onOpenDashboard}
                    className="px-5 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>Launch Full App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>
        )}

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
