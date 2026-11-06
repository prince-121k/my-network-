import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  RotateCcw, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  MessageCircle, 
  Volume2, 
  VolumeX, 
  Check, 
  Copy, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { generateTimelineResponse } from '../../../utils/memoryTimelineHelper';

export default function MemoryChatPage({ 
  contacts = [], 
  onToggleStatus, 
  onOpenVoiceModal, 
  onOpenCardModal 
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Namaste! 👋 Main aapka **mynetworkk AI Assistant** hoon.\n\nAap mujhse kisi bhi company, college ya person ke baare me pooch sakte hain — jaise:\n• **"Microsoft kab gaye the?"**\n• **"IIT Delhi me kya baat hui thi?"**\n• **"Rohan Malhotra se kya deal hui?"**\n\nMain aapko exact **Date & Time**, **Location**, **Kya baat hui thi**, aur **Action Items** date-wise timeline me summarize kar dunga!`,
      timeline: null,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeAudioPlayingId, setActiveAudioPlayingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const chatBottomRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeAudioPlayingId]);

  // Handle Query Submission
  const handleSend = (queryText) => {
    const text = (queryText || inputQuery).trim();
    if (!text) return;

    // 1. Add User Message
    const userMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // 2. Generate AI Bot Response with Timeline
    setTimeout(() => {
      const response = generateTimelineResponse(text, contacts);
      const botMsg = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: response.botReply,
        timeline: response.timeline,
        query: text,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  // Quick Suggestion Chips
  const suggestionChips = [
    { label: '🏢 Microsoft (2 visits)', query: 'Microsoft' },
    { label: '🏛️ IIT Delhi timeline', query: 'IIT Delhi' },
    { label: '🤝 Rohan Malhotra', query: 'Rohan' },
    { label: '💼 Priya Sharma (Nexus)', query: 'Priya' },
    { label: '🎨 Alex Morgan (Design)', query: 'Alex' },
    { label: '⚡ Pending Follow-ups', query: 'Pending follow-ups' },
    { label: '📅 All Meetings History', query: 'Show all meetings' }
  ];

  // Speech-to-text microphone support
  const handleToggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputQuery(transcript);
          handleSend(transcript);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
        // Fallback simulation
        setInputQuery('Microsoft kab gaye the');
      }
    } else {
      // Speech recognition not supported in this browser, provide quick fallback query
      setInputQuery('Microsoft kab gaye the');
    }
  };

  // Audio simulation playback toggle
  const togglePlayAudio = (id) => {
    if (activeAudioPlayingId === id) {
      setActiveAudioPlayingId(null);
    } else {
      setActiveAudioPlayingId(id);
      // Auto-stop after 8 seconds simulation
      setTimeout(() => {
        setActiveAudioPlayingId(prev => prev === id ? null : prev);
      }, 8000);
    }
  };

  // Copy timeline item summary
  const handleCopy = (entry) => {
    const text = `Meeting with ${entry.name} (${entry.company})\nDate: ${entry.date} at ${entry.time}\nLocation: ${entry.location}\nDiscussion:\n${(entry.topicsDiscussed || []).map(t => `- ${t}`).join('\n')}\nAction Item: ${entry.actionItem}`;
    navigator.clipboard.writeText(text);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset chat
  const handleReset = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'bot',
        text: `Chat reset ho gaya! 🔄\n\nAap mujhse **"Microsoft"**, **"IIT Delhi"**, ya **"Rohan"** pooch sakte hain. Main date-wise aur time-wise puri details nikaal kar de dunga.`,
        timeline: null,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto bg-white rounded-3xl border border-pink-200/80 shadow-sm overflow-hidden animate-fadeIn">
      
      {/* 1. Chat Header */}
      <div className="bg-gradient-to-r from-pink-50 via-white to-purple-50/60 border-b border-pink-100 p-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#80235c] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
                AI Memory & Meeting Timeline Assistant
              </h2>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Index ({contacts.length} Logs)
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">
              Ask about any place (e.g. Microsoft, IIT Delhi), person, or topic to see chronological timeline
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Suggestion Quick Chips */}
      <div className="bg-[#faf8f9] px-4 sm:px-6 py-2.5 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#80235c]" />
          Try asking:
        </span>
        {suggestionChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            className="shrink-0 px-3 py-1 rounded-full bg-white border border-pink-200/90 hover:border-[#80235c] text-xs font-bold text-gray-700 hover:text-[#80235c] hover:bg-pink-50 transition-all shadow-2xs hover:scale-102"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 3. Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-white to-[#fcfbfa]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id} 
              className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              {!isUser ? (
                <div className="w-8 h-8 rounded-xl bg-[#80235c] text-white flex items-center justify-center shrink-0 shadow-2xs mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-purple-700 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs mt-1">
                  PK
                </div>
              )}

              {/* Message Bubble Content */}
              <div className={`space-y-3 max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
                
                {/* Text Bubble */}
                <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-xs ${
                  isUser 
                    ? 'bg-[#80235c] text-white rounded-tr-none font-medium' 
                    : 'bg-white border border-pink-100 text-gray-800 rounded-tl-none font-medium'
                }`}>
                  <p className="whitespace-pre-line">
                    {msg.text}
                  </p>
                </div>

                {/* Structured Timeline Cards (If bot returned timeline events) */}
                {msg.timeline && msg.timeline.length > 0 && (
                  <div className="space-y-4 pt-1 w-full">
                    
                    {/* Header Pill */}
                    <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
                      <span>CHRONOLOGICAL TIMELINE ({msg.timeline.length} VISITS FOUND)</span>
                      <span className="text-[#80235c]">Date & Time Ordered ↓</span>
                    </div>

                    {/* Timeline List */}
                    <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-pink-300 before:via-purple-200 before:to-pink-100">
                      {msg.timeline.map((item, index) => {
                        const isAudioPlaying = activeAudioPlayingId === item.id;
                        const isDone = item.status === 'followed_up';

                        return (
                          <div 
                            key={item.id || index}
                            className="relative pl-12 group transition-all"
                          >
                            {/* Numbered Timeline Pin */}
                            <div className="absolute left-2.5 top-3 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-[#80235c] text-[#80235c] font-black text-xs flex items-center justify-center shadow-xs group-hover:bg-[#80235c] group-hover:text-white transition-colors">
                              {index + 1}
                            </div>

                            {/* Timeline Card */}
                            <div className="bg-white rounded-2xl border border-pink-200/90 hover:border-pink-300 p-4 sm:p-5 shadow-xs space-y-3.5 transition-all">
                              
                              {/* Top Bar: Date, Time & Status */}
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  {/* Date Badge */}
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdedee] text-[#80235c] text-xs font-black tracking-wide">
                                    <Calendar className="w-3.5 h-3.5 text-[#80235c]" />
                                    {item.date}
                                  </span>

                                  {/* Time Badge */}
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold font-mono">
                                    <Clock className="w-3.5 h-3.5" />
                                    {item.time}
                                  </span>

                                  {/* Visit Tag */}
                                  <span className="text-[11px] font-bold text-gray-500 uppercase">
                                    Visit #{index + 1}
                                  </span>
                                </div>

                                {/* Status Tag */}
                                <button
                                  onClick={() => onToggleStatus && onToggleStatus(item.contactId || item.id)}
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 transition-all ${
                                    isDone 
                                      ? 'bg-emerald-100 text-emerald-800' 
                                      : 'bg-amber-100 text-amber-800 hover:bg-emerald-100'
                                  }`}
                                  title="Click to toggle status"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{isDone ? 'Completed' : 'Follow-up Due'}</span>
                                </button>
                              </div>

                              {/* Venue & Person Met */}
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

                              {/* What was discussed: "Kya baat hui thi" */}
                              <div className="bg-pink-50/50 rounded-xl p-3 border border-pink-100/80 space-y-1.5">
                                <span className="text-[11px] font-extrabold text-[#80235c] uppercase tracking-wider block">
                                  💬 Kya Baat Hui Thi (Key Discussion Points):
                                </span>
                                <ul className="space-y-1 text-xs text-gray-700 font-medium">
                                  {(item.topicsDiscussed || []).map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-1.5">
                                      <span className="text-[#80235c] font-bold leading-tight">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Action Items / Commitments */}
                              <div className="bg-amber-50/60 rounded-xl p-2.5 border border-amber-200/60 flex items-start gap-2">
                                <span className="text-sm">🎯</span>
                                <div>
                                  <span className="text-[10px] font-extrabold uppercase text-amber-800 block">
                                    Action Item & Commitment:
                                  </span>
                                  <span className="text-xs font-bold text-amber-950">
                                    {item.actionItem}
                                  </span>
                                </div>
                              </div>

                              {/* Simulated Voice Memo Playback Bar */}
                              <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                                <button
                                  onClick={() => togglePlayAudio(item.id)}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    isAudioPlaying 
                                      ? 'bg-[#80235c] text-white shadow-xs' 
                                      : 'bg-white hover:bg-pink-50 text-gray-700 border border-gray-200'
                                  }`}
                                >
                                  {isAudioPlaying ? (
                                    <>
                                      <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                                      <span>Playing Memo ({item.audioDuration || '0:35'})</span>
                                    </>
                                  ) : (
                                    <>
                                      <Volume2 className="w-3.5 h-3.5 text-[#80235c]" />
                                      <span>Play Voice Memo ({item.audioDuration || '0:35'})</span>
                                    </>
                                  )}
                                </button>

                                {/* Animated Audio Waveform */}
                                <div className="flex items-center gap-1 px-2">
                                  {[12, 24, 16, 28, 8, 20, 14, 26, 18, 10].map((h, wIdx) => (
                                    <span 
                                      key={wIdx} 
                                      className={`w-1 rounded-full transition-all duration-300 ${
                                        isAudioPlaying 
                                          ? 'bg-[#80235c] animate-bounce' 
                                          : 'bg-gray-300'
                                      }`}
                                      style={{ 
                                        height: isAudioPlaying ? `${h}px` : '10px',
                                        animationDelay: `${wIdx * 60}ms` 
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Action Footer Buttons (WhatsApp, Copy, Contact) */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100">
                                <a
                                  href={`https://wa.me/?text=${encodeURIComponent(item.whatsappMessage || `Hi ${item.name.split(' ')[0]}, following up regarding our meeting!`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs hover:scale-102 transition-all"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp Follow-up</span>
                                </a>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleCopy(item)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                                    title="Copy meeting summary"
                                  >
                                    {copiedId === item.id ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-600" />
                                        <span className="text-emerald-700">Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Copy Details</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>

                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}

                {/* If no match found, show Quick Capture CTA */}
                {msg.timeline && msg.timeline.length === 0 && (
                  <div className="p-4 bg-pink-50/70 rounded-2xl border border-pink-200 space-y-2">
                    <p className="text-xs font-bold text-gray-700">
                      Want to log a meeting or visit to <strong>"{msg.query}"</strong> right now?
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={onOpenVoiceModal}
                        className="px-3 py-1.5 rounded-xl bg-[#80235c] text-white text-xs font-bold hover:bg-[#6a1b4b] transition-all flex items-center gap-1.5"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Record 15s Voice Note</span>
                      </button>
                      <button
                        onClick={onOpenCardModal}
                        className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-50 transition-all"
                      >
                        Scan Card
                      </button>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-gray-400 font-medium px-2 block">
                  {msg.timestamp}
                </span>

              </div>
            </div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* 4. Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-pink-100">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Mic Input Button */}
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-3 rounded-2xl transition-all ${
              isListening 
                ? 'bg-rose-500 text-white animate-pulse shadow-md' 
                : 'bg-pink-50 text-[#80235c] hover:bg-pink-100'
            }`}
            title={isListening ? "Listening... click to stop" : "Click to speak your query"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Poocho: 'Microsoft', 'IIT Delhi', 'Rohan' ya 'Pending follow-ups'..."
            className="flex-1 py-3 px-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium focus:outline-none transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-3 rounded-2xl bg-[#80235c] text-white disabled:opacity-40 hover:bg-[#6a1b4b] shadow-xs hover:shadow-md transition-all active:scale-95"
            title="Ask AI Memory Assistant"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-gray-400 text-center mt-2">
          Natural Language Engine • Searches all meetings, voice memos, and follow-up commitments
        </p>
      </div>

    </div>
  );
}
