import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Building2, 
  Calendar as CalendarIcon, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Globe, 
  MapPin, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown, 
  Camera, 
  Crosshair, 
  Check, 
  Sparkles,
  Save
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

  // Accordion open/close states (all open by default for smooth scrolling)
  const [openSections, setOpenSections] = useState({
    profile: true,
    company: true,
    context: true
  });

  const toggleSection = (sec) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Form Fields
  const [salutation, setSalutation] = useState('None');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState([]);
  const [showAdditionalEmailInput, setShowAdditionalEmailInput] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');

  // Social Links
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  // Company Details
  const [company, setCompany] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  // Context & Location Details
  const [metAt, setMetAt] = useState('Shaheed Major Rajeev Laul Marg, Janakpuri, Delhi, 110058, India');
  const [metOn, setMetOn] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  });
  const [updatesText, setUpdatesText] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Selfie / Photo Capture State
  const [selfieUrl, setSelfieUrl] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Enhanced Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioElementRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  // Dynamic Avatar Initial
  const avatarInitial = fullName.trim() ? fullName.trim().charAt(0).toUpperCase() : 'C';

  // Geolocation Auto-Detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Free OpenStreetMap reverse geocode
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          if (data && data.display_name) {
            setMetAt(data.display_name);
          } else {
            setMetAt(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)} (Current Location)`);
          }
        } catch (e) {
          setMetAt(`Near Delhi NCR (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        alert('Could not retrieve location. Please check browser permissions.');
      },
      { timeout: 8000 }
    );
  };

  // Camera Selfie Capture
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access denied or unavailable. You can click to upload a photo!');
      setIsCameraActive(false);
    }
  };

  const takeSelfie = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 320;
    canvas.height = videoRef.current.videoHeight || 240;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setSelfieUrl(dataUrl);

    // Stop camera tracks
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelfieUrl(url);
    }
  };

  // Voice Note Recording with 2.5x High-Gain Sensitivity & Live Speech-to-Text
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });
      streamRef.current = stream;

      // 2.5x gain boost for whisper / soft speech
      let recordStream = stream;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;
          const source = ctx.createMediaStreamSource(stream);
          const gainNode = ctx.createGain();
          gainNode.gain.value = 2.5;
          const dest = ctx.createMediaStreamDestination();
          source.connect(gainNode);
          gainNode.connect(dest);
          recordStream = dest.stream;
        }
      } catch (e) {}

      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(recordStream, { mimeType });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioUrl(URL.createObjectURL(blob));
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);

      // Speech to text appends directly to updatesText
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recognitionRef.current = recog;
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'en-IN';

        recog.onresult = (evt) => {
          let transcript = '';
          for (let i = 0; i < evt.results.length; i++) {
            transcript += evt.results[i][0].transcript + ' ';
          }
          if (transcript.trim()) {
            setUpdatesText(prev => {
              const base = prev.trim() ? prev.trim() + ' ' : '';
              return (transcript.trim()).slice(0, 500);
            });
          }
        };

        try { recog.start(); } catch (e) {}
      }
    } catch (err) {
      alert('Microphone access is required for voice notes. You can type directly in the box!');
    }
  };

  const stopVoiceRecording = () => {
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
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsRecording(false);
  };

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

  // Submit & Save Contact
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('Please enter Full Name.');
      return;
    }

    const fullContactName = salutation !== 'None' ? `${salutation} ${fullName.trim()}` : fullName.trim();
    const finalPhone = phone.trim() ? `${countryCode} ${phone.trim()}` : '';

    const newContact = {
      id: 'conn_' + Date.now(),
      name: fullContactName,
      salutation,
      role: designation.trim() || 'Professional',
      company: company.trim() || 'Independent',
      website: companyWebsite.trim(),
      companyAddress: companyAddress.trim(),
      event: metAt.trim() || 'Direct Meeting',
      location: metAt.trim() || 'In-person Meeting',
      phone: finalPhone,
      email: email.trim(),
      additionalEmails,
      linkedin: linkedin.trim(),
      twitter: twitter.trim(),
      instagram: instagram.trim(),
      facebook: facebook.trim(),
      photoUrl: selfieUrl,
      spaceId: activeSpaceId || 'all',
      tags: [company || 'Networking', designation || 'Connection'].filter(Boolean),
      rawNotes: updatesText.trim() || 'Conversation notes captured in person.',
      topicsDiscussed: updatesText.trim() ? [updatesText.trim()] : ['Initial connection established.'],
      actionItem: 'Follow up on WhatsApp or email',
      followUpDate: 'In 3 days',
      whatsappMessage: `Hi ${fullName.split(' ')[0]}, great meeting you at ${metAt ? metAt.split(',')[0] : 'the event'}!`,
      status: 'pending',
      audioUrl: audioUrl,
      audioDuration: recordingSeconds > 0 ? `0:${recordingSeconds < 10 ? '0' + recordingSeconds : recordingSeconds}` : '0:30',
      displayDate: metOn ? new Date(metOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today',
      displayTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      visitDate: metOn || new Date().toISOString().split('T')[0]
    };

    onSaveContact(newContact);
    try { confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 relative my-4 sm:my-8 max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar (matches purple berry background in user screenshot media_1794976841384_26c20372.png) */}
        <div className="bg-[#80235c] text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            New Contact
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          
          {/* =========================================
              SECTION 1: Profile Details (Collapsible)
             ========================================= */}
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('profile')}
              className="w-full bg-[#faf5f8] px-4 py-3 flex items-center justify-between text-left hover:bg-pink-50/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#80235c] text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  Profile Details
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-pink-100/70 text-[#80235c] flex items-center justify-center">
                {openSections.profile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openSections.profile && (
              <div className="p-4 sm:p-5 space-y-4 bg-white">
                
                {/* Profile Photo & Captured Selfies */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-6">
                    {/* Circle Avatar Initial */}
                    <div className="w-16 h-16 rounded-full bg-[#80235c] text-white font-bold text-2xl flex items-center justify-center shadow-xs overflow-hidden">
                      {selfieUrl ? (
                        <img src={selfieUrl} alt="Contact" className="w-full h-full object-cover" />
                      ) : (
                        avatarInitial
                      )}
                    </div>
                  </div>
                </div>

                {/* Captured Selfies Box with Dashed Border */}
                <div className="p-3 rounded-2xl border border-gray-200/90 space-y-2 bg-gray-50/40">
                  <span className="text-xs font-bold text-gray-700 block">
                    Captured Selfies
                  </span>

                  {isCameraActive ? (
                    <div className="space-y-2">
                      <video ref={videoRef} autoPlay playsInline className="w-48 h-36 bg-black rounded-xl object-cover mx-auto" />
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={takeSelfie}
                          className="px-3 py-1.5 rounded-lg bg-[#80235c] text-white text-xs font-bold"
                        >
                          Capture Snapshot
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (videoRef.current?.srcObject) {
                              videoRef.current.srcObject.getTracks().forEach(t => t.stop());
                            }
                            setIsCameraActive(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={startCamera}
                        className="w-16 h-16 rounded-2xl border-2 border-dashed border-pink-300 hover:border-[#80235c] bg-pink-50/40 flex flex-col items-center justify-center text-[#80235c] hover:bg-pink-50 transition-colors shadow-2xs"
                        title="Click to take a live selfie"
                      >
                        <span className="text-xl font-bold leading-none">+</span>
                      </button>

                      <div className="text-xs text-gray-500">
                        <p className="font-semibold text-gray-700">Take a live selfie or upload</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[#80235c] font-bold hover:underline"
                        >
                          Browse from files
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Salutation + Full Name */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Salutation
                    </label>
                    <select
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-[#80235c]"
                    >
                      <option value="None">None</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-gray-400 font-mono">{fullName.length}/80</span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Jonathan Ive"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Email
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">{email.length}/100</span>
                  </div>
                  <input
                    type="email"
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jonathan@apple.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                  />
                  
                  {/* Additional Emails */}
                  <div className="mt-1.5">
                    {!showAdditionalEmailInput ? (
                      <button
                        type="button"
                        onClick={() => setShowAdditionalEmailInput(true)}
                        className="text-[11px] font-bold text-[#80235c] hover:underline"
                      >
                        + Additional Email(s)
                      </button>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="email"
                          placeholder="secondary@company.com"
                          onBlur={(e) => {
                            if (e.target.value.trim()) {
                              setAdditionalEmails([...additionalEmails, e.target.value.trim()]);
                              e.target.value = '';
                            }
                          }}
                          className="w-full px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none"
                        />
                        {additionalEmails.map((em, idx) => (
                          <span key={idx} className="inline-block bg-gray-100 text-gray-700 text-[10px] font-mono px-2 py-0.5 rounded-md mr-1">
                            {em}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone with Country Code Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-700">
                      Phone
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">{phone.length}/20</span>
                  </div>
                  <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#80235c]">
                    <div className="flex items-center gap-1 px-3 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-700 shrink-0">
                      <span>🇮🇳</span>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
                      >
                        <option value="+91">IN (+91)</option>
                        <option value="+1">US (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+971">UAE (+971)</option>
                        <option value="+65">SG (+65)</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      maxLength={20}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2 text-xs font-medium text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social Media Links (matches screenshot media_1794976841334_411df2c6.png) */}
                <div className="space-y-2.5 pt-1">
                  {/* LinkedIn */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-gray-600">LinkedIn</label>
                      <span className="text-[9px] text-gray-400 font-mono">{linkedin.length}/150</span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-2 w-4 h-4 text-blue-600 flex items-center justify-center font-bold text-xs">
                        in
                      </div>
                      <input
                        type="text"
                        maxLength={150}
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="linkedin.com/in/username"
                        className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                      />
                    </div>
                  </div>

                  {/* Twitter / X */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-gray-600">Twitter / X</label>
                      <span className="text-[9px] text-gray-400 font-mono">{twitter.length}/150</span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1.5 font-bold text-gray-800 text-xs">𝕏</span>
                      <input
                        type="text"
                        maxLength={150}
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="x.com/username"
                        className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                      />
                    </div>
                  </div>

                  {/* Instagram & Facebook */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-gray-600">Instagram</label>
                        <span className="text-[9px] text-gray-400 font-mono">{instagram.length}/150</span>
                      </div>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-2 w-3.5 h-3.5 text-pink-600" />
                        <input
                          type="text"
                          maxLength={150}
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="instagram.com/username"
                          className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-gray-600">Facebook</label>
                        <span className="text-[9px] text-gray-400 font-mono">{facebook.length}/150</span>
                      </div>
                      <div className="relative">
                        <Facebook className="absolute left-3 top-2 w-3.5 h-3.5 text-blue-600" />
                        <input
                          type="text"
                          maxLength={150}
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                          placeholder="facebook.com/username"
                          className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* =========================================
              SECTION 2: Company Details (Collapsible)
             ========================================= */}
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('company')}
              className="w-full bg-[#faf5f8] px-4 py-3 flex items-center justify-between text-left hover:bg-pink-50/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#80235c] text-white flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  Company Details
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-pink-100/70 text-[#80235c] flex items-center justify-center">
                {openSections.company ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openSections.company && (
              <div className="p-4 sm:p-5 space-y-3.5 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">Company</label>
                      <span className="text-[10px] text-gray-400 font-mono">{company.length}/100</span>
                    </div>
                    <input
                      type="text"
                      maxLength={100}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company Name"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">Designation</label>
                      <span className="text-[10px] text-gray-400 font-mono">{designation.length}/80</span>
                    </div>
                    <input
                      type="text"
                      maxLength={80}
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Job Title"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-700">Company Website</label>
                    <span className="text-[10px] text-gray-400 font-mono">{companyWebsite.length}/150</span>
                  </div>
                  <input
                    type="url"
                    maxLength={150}
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="https://www.company.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-gray-700">Company Address</label>
                    <span className="text-[10px] text-gray-400 font-mono">{companyAddress.length}/250</span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={250}
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="Office address, city, state, pin..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c] resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* =========================================
              SECTION 3: Context & Updates (Collapsible)
              (matches screenshot media_1794976840880_c273ff81.png)
             ========================================= */}
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => toggleSection('context')}
              className="w-full bg-[#faf5f8] px-4 py-3 flex items-center justify-between text-left hover:bg-pink-50/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#80235c] text-white flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  Context & Updates
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-pink-100/70 text-[#80235c] flex items-center justify-center">
                {openSections.context ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openSections.context && (
              <div className="p-4 sm:p-5 space-y-3.5 bg-white">
                
                {/* GPS Options & Use Current Location */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">
                    Gps options
                  </span>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#80235c] hover:underline"
                  >
                    <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Detecting Location...' : 'Use Current Location'}</span>
                  </button>
                </div>

                {/* Met at (Auto-detected location input) */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Met at
                  </label>
                  <input
                    type="text"
                    value={metAt}
                    onChange={(e) => setMetAt(e.target.value)}
                    placeholder="Shaheed Major Rajeev Laul Marg, Janakpuri, Delhi, 110058, India"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                  />
                </div>

                {/* Met on * (Date Picker) */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Met on <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={metOn}
                      onChange={(e) => setMetOn(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#80235c]"
                    />
                  </div>
                </div>

                {/* Updates Textarea with Voice Record Pill Button inside */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Updates
                  </label>
                  <div className="rounded-2xl border border-gray-200 focus-within:border-[#80235c] p-3 space-y-2 bg-white">
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={updatesText}
                      onChange={(e) => setUpdatesText(e.target.value)}
                      placeholder="Summarize your conversation..."
                      className="w-full text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
                    />

                    {/* Bottom Toolbar inside textarea */}
                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                      {/* Voice Record Pill Button */}
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={startVoiceRecording}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdedee] text-[#80235c] hover:bg-pink-100/80 text-xs font-bold transition-all shadow-2xs"
                          title="Record enhanced high-gain voice memo"
                        >
                          <Mic className="w-3.5 h-3.5 text-[#80235c]" />
                          <span>Voice Record</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopVoiceRecording}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold animate-pulse shadow-xs"
                          title="Click to stop recording"
                        >
                          <MicOff className="w-3.5 h-3.5" />
                          <span>Recording... ({recordingSeconds}s) Stop</span>
                        </button>
                      )}

                      {/* Character Counter */}
                      <span className="text-[10px] text-gray-400 font-mono">
                        {updatesText.length} / 500
                      </span>
                    </div>

                    {/* Audio Playback Wave if recorded */}
                    {audioUrl && !isRecording && (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                        <audio ref={audioElementRef} src={audioUrl} onEnded={() => setIsPlayingAudio(false)} className="hidden" />
                        <button
                          type="button"
                          onClick={togglePlayAudio}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#80235c] text-white text-[11px] font-bold"
                        >
                          {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isPlayingAudio ? 'Playing' : 'Play Memo'}</span>
                        </button>
                        <span className="text-[10px] font-bold text-emerald-600">Audio Recorded ✓</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Contact</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
