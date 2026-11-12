import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  Tag, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  FileText,
  Radio,
  Sliders,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddConnectionModal({ 
  isOpen, 
  onClose, 
  onSaveContact, 
  spaces = [],
  activeSpaceId = 'all' 
}) {
  if (!isOpen) return null;

  // Active step / tab
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'context' | 'followup'

  // Connection Profile Form
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    event: '',
    location: '',
    phone: '',
    email: '',
    linkedin: '',
    instagram: '',
    spaceId: activeSpaceId || 'all',
    tags: ['Direct Meeting'],
    tagInput: ''
  });

  // Context: Text & Voice
  const [contextMode, setContextMode] = useState('both'); // 'text' | 'voice' | 'both'
  const [textNotes, setTextNotes] = useState('');
  const [actionItem, setActionItem] = useState('');
  const [followUpDate, setFollowUpDate] = useState('Monday, 10:00 AM');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // High Sensitivity Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sensitivityBoost, setSensitivityBoost] = useState(true); // 2.5x gain for whispering
  const [audioVisualBars, setAudioVisualBars] = useState([10, 14, 8, 12, 16, 10, 14, 8]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioElementRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  // Auto-generate WhatsApp draft when name/company changes
  useEffect(() => {
    if (formData.name) {
      const firstName = formData.name.split(' ')[0];
      const eventPart = formData.event ? ` at ${formData.event}` : '';
      const topicPart = actionItem ? ` Sharing the ${actionItem.toLowerCase()} as discussed.` : ' Looking forward to following up!';
      setWhatsappMessage(`Hi ${firstName}, great connecting with you${eventPart}!${topicPart}`);
    }
  }, [formData.name, formData.event, actionItem]);

  // Timer while recording
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
        // Randomize waveform bars during voice recording
        setAudioVisualBars([
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 32) + 12,
          Math.floor(Math.random() * 28) + 8,
          Math.floor(Math.random() * 35) + 14,
          Math.floor(Math.random() * 26) + 10,
          Math.floor(Math.random() * 30) + 12,
          Math.floor(Math.random() * 22) + 8,
          Math.floor(Math.random() * 34) + 10
        ]);
      }, 150);
    } else {
      clearInterval(timerIntervalRef.current);
      setAudioVisualBars([10, 14, 8, 12, 16, 10, 14, 8]);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isRecording]);

  // Start High-Sensitivity Audio Recording
  const startRecording = async () => {
    setAudioUrl(null);
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      // 1. Microphone stream with autoGainControl to boost soft/quiet speech
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: true, // Amplifies soft whispers
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 48000
        }
      });
      streamRef.current = stream;

      // 2. Web Audio Gain Booster for high sensitivity
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = sensitivityBoost ? 2.2 : 1.0; // Boost whisper
          const dest = audioCtx.createMediaStreamDestination();
          source.connect(gainNode);
          gainNode.connect(dest);
        }
      } catch (err) {
        console.warn('AudioContext boost fallback:', err);
      }

      // 3. MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // 4. Web Speech API transcription
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = 'en-IN'; // Indian English / Hinglish
          rec.onresult = (e) => {
            let fullText = '';
            for (let i = 0; i < e.results.length; i++) {
              fullText += e.results[i][0].transcript + ' ';
            }
            if (fullText.trim()) {
              setTextNotes(prev => {
                const combined = prev ? `${prev}\n${fullText.trim()}` : fullText.trim();
                return combined;
              });
            }
          };
          rec.start();
          recognitionRef.current = rec;
        } catch (e) {}
      }

    } catch (err) {
      console.error('Mic access error:', err);
      alert('Could not access microphone. Please allow microphone permissions in your browser.');
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      try { mediaRecorderRef.current.stop(); } catch (e) {}
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
    }
    setIsRecording(false);
  };

  // Play audio playback
  const togglePlayAudio = () => {
    if (!audioElementRef.current) return;
    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  // Add Tag
  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const handleRemoveTag = (t) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== t)
    }));
  };

  // Submit & Save Connection
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter connection name.');
      setActiveTab('details');
      return;
    }

    const durationStr = `0:${recordingSeconds < 10 ? '0' + recordingSeconds : recordingSeconds}`;

    const newContact = {
      id: 'conn_' + Date.now(),
      name: formData.name.trim(),
      role: formData.role.trim() || 'Professional',
      company: formData.company.trim() || 'Direct Network',
      event: formData.event.trim() || 'Direct Meeting',
      location: formData.location.trim() || formData.event.trim() || 'In-person Meeting',
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      linkedin: formData.linkedin.trim(),
      instagram: formData.instagram.trim(),
      spaceId: formData.spaceId || 'all',
      tags: formData.tags.length > 0 ? formData.tags : ['Networking'],
      rawNotes: textNotes.trim() || 'Met during networking event.',
      topicsDiscussed: textNotes.trim() ? [textNotes.trim()] : ['Initial connection established.'],
      actionItem: actionItem.trim() || 'Send follow-up details on WhatsApp.',
      followUpDate: followUpDate || 'Monday, 10:00 AM',
      whatsappMessage: whatsappMessage.trim() || `Hi ${formData.name.split(' ')[0]}, great connecting with you!`,
      status: 'pending',
      audioUrl: audioUrl,
      audioDuration: recordingSeconds > 0 ? durationStr : '0:30',
      displayDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      displayTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      visitDate: new Date().toISOString().split('T')[0]
    };

    onSaveContact(newContact);
    try { confetti({ particleCount: 60, spread: 70 }); } catch (e) {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#80235c] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Add New Relationship Memory</span>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            Log a Connection & Context
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Capture contact details, venue, conversation notes as voice or text, and auto-draft follow-up.
          </p>
        </div>

        {/* 3 Step Tabs */}
        <div className="flex border-b border-gray-200 pb-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-[#80235c] text-[#80235c]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>1. Profile & Venue</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('context')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'context'
                ? 'border-[#80235c] text-[#80235c]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>2. Context (Voice & Text)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('followup')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'followup'
                ? 'border-[#80235c] text-[#80235c]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>3. Smart Follow-Up</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* TAB 1: Profile & Venue */}
          {activeTab === 'details' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sameer Verma"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Sr. Cloud Solutions Architect"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Company / Organization *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Microsoft / IIT Delhi / BharatCart"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Event & Venue / Place
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value, event: e.target.value })}
                      placeholder="e.g. Microsoft Reactor Bengaluru, Lavelle Road"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact info (optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Phone Number (WhatsApp)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-emerald-600" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98112 34567"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-blue-600" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sameer@microsoft.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-3 w-4 h-4 text-blue-700" />
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/username"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Instagram Handle
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3.5 top-3 w-4 h-4 text-pink-600" />
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="@username"
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('context')}
                  className="px-5 py-2.5 rounded-2xl bg-[#80235c] text-white font-bold text-xs hover:bg-[#6a1b4b] transition-all shadow-xs"
                >
                  Next: Add Context & Voice Note →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Context (Text & High-Sensitivity Voice Note) */}
          {activeTab === 'context' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Sensitivity Booster toggle banner */}
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#80235c]" />
                  <div>
                    <span className="text-xs font-bold text-purple-900 block">High-Sensitivity Audio Mode Active</span>
                    <span className="text-[10px] text-purple-700">Auto-Gain Control boosts quiet speech so whispers are transcribed accurately.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSensitivityBoost(!sensitivityBoost)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    sensitivityBoost ? 'bg-[#80235c] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {sensitivityBoost ? 'Gain: 2.5x ON' : 'Gain: 1.0x'}
                </button>
              </div>

              {/* Voice Recording Control Box */}
              <div className="p-4 bg-pink-50/50 border border-pink-200 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">Voice Note Memo:</span>
                    {isRecording ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold animate-pulse flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                        Listening ({recordingSeconds}s)...
                      </span>
                    ) : audioUrl ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Audio Saved (Playable)
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-500 font-medium">Record 15-30s meeting memo</span>
                    )}
                  </div>

                  {/* Soundwave bars */}
                  <div className="flex items-center gap-1">
                    {audioVisualBars.map((h, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isRecording ? 'bg-[#80235c]' : 'bg-gray-300'
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="px-5 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-xs hover:scale-102 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4 animate-pulse" />
                      <span>{audioUrl ? 'Record Again' : 'Start Voice Recording'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <MicOff className="w-4 h-4" />
                      <span>Stop & Save Voice Note</span>
                    </button>
                  )}

                  {audioUrl && !isRecording && (
                    <button
                      type="button"
                      onClick={togglePlayAudio}
                      className="px-4 py-2 rounded-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-xs font-bold shadow-2xs transition-all flex items-center gap-2"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5 text-[#80235c]" /> : <Play className="w-3.5 h-3.5 text-[#80235c]" />}
                      <span>{isPlayingAudio ? 'Pause' : 'Play Recorded Audio'}</span>
                    </button>
                  )}

                  {audioUrl && (
                    <audio
                      ref={audioElementRef}
                      src={audioUrl}
                      onEnded={() => setIsPlayingAudio(false)}
                      className="hidden"
                    />
                  )}
                </div>
              </div>

              {/* Text Notes Area (Stores both speech text and manual notes) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Conversation Notes / What was discussed:
                  </label>
                  <span className="text-[10px] text-gray-500">Auto-transcribed from voice or type directly</span>
                </div>
                <textarea
                  rows={4}
                  value={textNotes}
                  onChange={(e) => setTextNotes(e.target.value)}
                  placeholder="e.g. Met Sameer at Microsoft Reactor Bengaluru. Discussed Azure OpenAI GPT-4o latency benchmarks and $25,000 Founders Hub credits. Asked to send architecture diagram."
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-medium text-gray-900 focus:outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 font-bold text-xs"
                >
                  ← Back to Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('followup')}
                  className="px-5 py-2.5 rounded-2xl bg-[#80235c] text-white font-bold text-xs hover:bg-[#6a1b4b] transition-all shadow-xs"
                >
                  Next: Smart Follow-Up →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Smart Follow-Up & Tags */}
          {activeTab === 'followup' && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Action Item / Commitment
                  </label>
                  <input
                    type="text"
                    value={actionItem}
                    onChange={(e) => setActionItem(e.target.value)}
                    placeholder="e.g. Send architecture proposal & pitch deck"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                    Follow-Up Due Date
                  </label>
                  <input
                    type="text"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    placeholder="e.g. Monday, 10:00 AM"
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#80235c] focus:bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* 1-Click WhatsApp Draft Preview */}
              <div>
                <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Auto-Crafted WhatsApp Message:
                </label>
                <textarea
                  rows={2}
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  placeholder="Hi Rohan, great connecting at Delhi summit! Sharing our pitch deck as discussed."
                  className="w-full px-4 py-2.5 rounded-2xl bg-emerald-50/40 border border-emerald-200 text-xs sm:text-sm font-medium text-emerald-950 focus:outline-none"
                />
              </div>

              {/* Tags & Space selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Tags & Event Space
                </label>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {formData.tags.map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-[#80235c] text-xs font-bold"
                    >
                      #{t}
                      <button type="button" onClick={() => handleRemoveTag(t)}>
                        <X className="w-3 h-3 hover:text-rose-600" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={formData.tagInput}
                      onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                      placeholder="Add tag (e.g. Fintech, AI)..."
                      className="px-3 py-1 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-2.5 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Space Selection */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                  Save to Space:
                </label>
                <select
                  value={formData.spaceId}
                  onChange={(e) => setFormData({ ...formData, spaceId: e.target.value })}
                  className="w-full px-3 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none"
                >
                  <option value="all">Global (All Contacts)</option>
                  {spaces.filter(s => s.id !== 'all').map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.badge})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('context')}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:text-gray-900 font-bold text-xs"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white font-bold text-sm shadow-md hover:scale-102 active:scale-95 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Relationship Memory</span>
                </button>
              </div>

            </div>
          )}

        </form>

      </div>
    </div>
  );
}
