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
  Sliders,
  Check,
  Save,
  RotateCcw
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

  // Connection Profile Form
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    event: '',
    phone: '',
    email: '',
    linkedin: '',
    spaceId: activeSpaceId || 'all'
  });

  // Context Input Mode: 'text' | 'voice'
  const [contextMode, setContextMode] = useState('text'); // 'text' | 'voice'
  const [textNotes, setTextNotes] = useState('');
  const [actionItem, setActionItem] = useState('');
  const [followUpDate, setFollowUpDate] = useState('Monday, 10:00 AM');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // High Sensitivity Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sensitivityBoost, setSensitivityBoost] = useState(true); // 2.5x gain boost for whispers
  const [audioVisualBars, setAudioVisualBars] = useState([12, 18, 10, 24, 16, 20, 14, 28]);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioElementRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  // Auto-generate WhatsApp draft when name or action item changes
  useEffect(() => {
    if (formData.name) {
      const firstName = formData.name.split(' ')[0];
      const eventPart = formData.event ? ` at ${formData.event}` : '';
      const topicPart = actionItem ? ` Following up regarding ${actionItem.toLowerCase()} as discussed.` : ' Great connecting with you!';
      setWhatsappMessage(`Hi ${firstName},${eventPart}!${topicPart}`);
    }
  }, [formData.name, formData.event, actionItem]);

  // Waveform animation during voice recording
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
        setAudioVisualBars([
          Math.floor(Math.random() * 26) + 10,
          Math.floor(Math.random() * 34) + 12,
          Math.floor(Math.random() * 30) + 8,
          Math.floor(Math.random() * 38) + 14,
          Math.floor(Math.random() * 28) + 10,
          Math.floor(Math.random() * 36) + 12,
          Math.floor(Math.random() * 24) + 8,
          Math.floor(Math.random() * 32) + 10,
        ]);
      }, 500);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  // Start High Sensitivity Voice Note
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      streamRef.current = stream;

      // 2.5x High-Gain Sensitivity Audio processing
      let recordingStream = stream;
      if (sensitivityBoost) {
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            audioContextRef.current = ctx;
            const source = ctx.createMediaStreamSource(stream);
            const gainNode = ctx.createGain();
            gainNode.gain.value = 2.5; // 2.5x boost for quiet whispers
            const destination = ctx.createMediaStreamDestination();
            source.connect(gainNode);
            gainNode.connect(destination);
            recordingStream = destination.stream;
          }
        } catch (err) {
          console.warn('Web Audio gain booster fallback:', err);
        }
      }

      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const mediaRecorder = new MediaRecorder(recordingStream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      // Continuous Live Speech-to-Text
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
          }
          if (transcript.trim()) {
            setTextNotes(prev => {
              const cleaned = transcript.trim();
              return cleaned;
            });
          }
        };

        recognition.onerror = (err) => {
          console.warn('Speech recognition error:', err);
        };

        try { recognition.start(); } catch (e) {}
      }
    } catch (err) {
      alert('Microphone permission required for voice notes. You can also type notes manually below!');
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

  // Submit & Save Connection
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter connection name.');
      return;
    }

    const durationStr = `0:${recordingSeconds < 10 ? '0' + recordingSeconds : recordingSeconds}`;

    const newContact = {
      id: 'conn_' + Date.now(),
      name: formData.name.trim(),
      role: formData.role.trim() || 'Professional',
      company: formData.company.trim() || 'Direct Network',
      event: formData.event.trim() || 'In-person Meeting',
      location: formData.event.trim() || 'Direct Meeting',
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      linkedin: formData.linkedin.trim(),
      spaceId: formData.spaceId || 'all',
      tags: [formData.company || 'Networking', formData.event || 'Direct'].filter(Boolean),
      rawNotes: textNotes.trim() || 'Met in person.',
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
    try { confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 } }); } catch (e) {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-pink-100 relative my-6 space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdedee] text-[#80235c] text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#80235c]" />
            <span>New Relationship</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Add Connection & Context
          </h3>
          <p className="text-xs text-gray-500">
            Save contact details along with conversation context (type manually or record enhanced voice).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* SECTION 1: Person Details */}
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/70 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
              1. Contact Information
            </span>

            <div className="space-y-2.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-bold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Company / College</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Microsoft / IIT Delhi"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Founder / Developer"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Meeting Place / Event</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      placeholder="e.g. Bengaluru Summit / Hackathon"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone / WhatsApp (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Conversation Context (TWO CLEAR OPTIONS: TYPE or VOICE) */}
          <div className="bg-pink-50/40 p-4 rounded-2xl border border-pink-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#80235c] block">
                2. Conversation Context (Kya Baat Hui Thi)
              </span>

              {/* TWO CLEAR TOGGLE BUTTONS */}
              <div className="flex bg-white p-1 rounded-xl border border-pink-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setContextMode('text')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    contextMode === 'text'
                      ? 'bg-[#80235c] text-white shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Type Manually</span>
                </button>

                <button
                  type="button"
                  onClick={() => setContextMode('voice')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    contextMode === 'voice'
                      ? 'bg-[#80235c] text-white shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Note (High-Gain)</span>
                </button>
              </div>
            </div>

            {/* OPTION 1: Type Context Manually */}
            {contextMode === 'text' && (
              <div className="space-y-2.5 animate-fadeIn">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    What did you talk about? (Discussion Points)
                  </label>
                  <textarea
                    rows={3}
                    value={textNotes}
                    onChange={(e) => setTextNotes(e.target.value)}
                    placeholder="e.g. Discussed AI partnership, latency benchmarks on Azure/Google Cloud, agreed to collaborate on prototype..."
                    className="w-full p-3 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* OPTION 2: High Sensitivity Voice Note Mode */}
            {contextMode === 'voice' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="bg-white p-4 rounded-xl border border-pink-200/80 text-center space-y-3">
                  
                  {/* Sensitivity pill indicator */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black">
                    <Sliders className="w-3 h-3 text-emerald-600" />
                    <span>Enhanced 2.5x Gain Boost (Dhire se bolne par bhi crystal clear)</span>
                  </div>

                  {/* Big Record Microphone Button */}
                  <div className="flex flex-col items-center justify-center gap-2 pt-1">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="w-16 h-16 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                        title="Click to start speaking"
                      >
                        <Mic className="w-7 h-7" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg animate-pulse"
                        title="Click to stop speaking"
                      >
                        <MicOff className="w-7 h-7" />
                      </button>
                    )}

                    <span className="text-xs font-extrabold text-gray-800">
                      {isRecording ? `Recording... (${recordingSeconds}s) - Speak Now` : 'Tap Mic & Speak 15-sec Memo'}
                    </span>
                  </div>

                  {/* Animated Waveform Visualizer */}
                  {isRecording && (
                    <div className="flex items-center justify-center gap-1 h-8">
                      {audioVisualBars.map((h, i) => (
                        <span
                          key={i}
                          className="w-1.5 bg-[#80235c] rounded-full transition-all duration-200"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Playback if audio is recorded */}
                  {audioUrl && !isRecording && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                      <audio ref={audioElementRef} src={audioUrl} onEnded={() => setIsPlayingAudio(false)} className="hidden" />
                      <button
                        type="button"
                        onClick={togglePlayAudio}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#80235c] text-white text-xs font-bold"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlayingAudio ? 'Playing Voice Note' : 'Listen Back Voice Memo'}</span>
                      </button>
                      <span className="text-xs font-mono font-bold text-gray-500">Audio Saved ✓</span>
                    </div>
                  )}
                </div>

                {/* Live Speech-to-Text Transcribed Result */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Live Transcribed Text (Edit if needed):
                  </label>
                  <textarea
                    rows={2}
                    value={textNotes}
                    onChange={(e) => setTextNotes(e.target.value)}
                    placeholder="Speaking will automatically transcribe words into text here..."
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Next Step / Action Item */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Next Step / Action Item</label>
                <input
                  type="text"
                  value={actionItem}
                  onChange={(e) => setActionItem(e.target.value)}
                  placeholder="e.g. Send pitch deck on WhatsApp"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Follow-up Due</label>
                <input
                  type="text"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  placeholder="e.g. Monday, 10:00 AM"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 focus:border-[#80235c] text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* WhatsApp Follow-up message preview */}
            <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-800 block flex items-center gap-1">
                <MessageCircle className="w-3 h-3 text-emerald-600" />
                Auto-Drafted WhatsApp Message:
              </span>
              <p className="text-xs text-emerald-950 font-medium italic truncate">
                "{whatsappMessage || 'Hi, great connecting with you!'}"
              </p>
            </div>
          </div>

          {/* SECTION 3: Action Buttons (BIG SAVE BUTTON) */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-black shadow-md hover:shadow-lg hover:scale-102 active:scale-95 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Connection</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
