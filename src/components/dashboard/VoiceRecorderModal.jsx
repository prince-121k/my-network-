import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Sparkles, 
  Check, 
  Clock, 
  Tag, 
  Calendar,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { extractContactFromVoiceNote } from '../../utils/aiExtractor';
import confetti from 'canvas-confetti';

export default function VoiceRecorderModal({ isOpen, onClose, onSaveContact, activeSpaceId }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [micError, setMicError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioElementRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Initialize Web Speech API if available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Recognizes Indian English & Hinglish well

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  // Timer while recording
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isRecording]);

  if (!isOpen) return null;

  // Start real recording
  const startRecording = async () => {
    setMicError(null);
    setAudioUrl(null);
    setExtractedData(null);
    setTranscript('');
    setRecordingSeconds(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Recognition start error:', e);
        }
      }
    } catch (err) {
      console.error('Mic access error:', err);
      setMicError('Microphone access was denied or not available. You can type your meeting notes below.');
    }
  };

  // Stop real recording
  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    // Auto extract if we have transcript
    setTimeout(() => {
      const currentText = transcript.trim();
      if (currentText) {
        const parsed = extractContactFromVoiceNote(currentText);
        setExtractedData(parsed);
      }
    }, 500);
  };

  // Run AI extraction
  const handleRunAiExtraction = () => {
    if (!transcript.trim()) return;
    const parsed = extractContactFromVoiceNote(transcript);
    setExtractedData(parsed);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
  };

  // Preset quick fill
  const loadPreset = (text) => {
    setTranscript(text);
    const parsed = extractContactFromVoiceNote(text);
    setExtractedData(parsed);
  };

  // Save contact to store
  const handleSave = () => {
    if (!extractedData) return;
    onSaveContact({
      ...extractedData,
      spaceId: activeSpaceId !== 'all' ? activeSpaceId : 'space_techsparks',
      audioUrl: audioUrl || null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcf786] text-gray-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#80235c]" />
            Live Voice Memory
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            Record a Meeting Voice Memo
          </h3>
          <p className="text-sm text-gray-600">
            Speak in Hindi, English, or Hinglish. mynetworkk.ai will transcribe and extract contact details automatically.
          </p>
        </div>

        {/* Microphone Error Alert */}
        {micError && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{micError}</span>
          </div>
        )}

        {/* Recording Visual & Controls */}
        <div className="bg-[#fdedee] p-6 rounded-2xl border border-pink-200/80 text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200'
                  : 'bg-[#80235c] hover:bg-[#6a1b4b] text-white hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <div>
            <span className="text-sm font-bold text-gray-900 block">
              {isRecording ? `🔴 Recording Live (${recordingSeconds}s)... Tap to Stop` : 'Tap to Start Real Mic Recording'}
            </span>
            <span className="text-xs text-gray-500">
              {isRecording ? 'Speak now: "Met Rohan from BharatCart, send deck Monday"' : 'Powered by Browser Speech Recognition'}
            </span>
          </div>

          {/* Audio Player if recorded */}
          {audioUrl && (
            <div className="pt-2">
              <audio ref={audioElementRef} src={audioUrl} controls className="w-full h-10 rounded-lg mx-auto" />
            </div>
          )}
        </div>

        {/* Live Transcript / Edit Area */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span>Speech Transcript (or type notes directly):</span>
            <div className="flex gap-2 text-[11px] font-normal text-[#80235c]">
              <span>Sample:</span>
              <button 
                type="button"
                onClick={() => loadPreset("Abhi Rohan se mila, BharatCart me partnerships head hai. Monday ko pitch deck WhatsApp pe bhej dena.")}
                className="hover:underline font-semibold"
              >
                Hinglish Sample
              </button>
              <span>•</span>
              <button 
                type="button"
                onClick={() => loadPreset("Met Priya Sharma at Nexus Ventures. Interested in our seed round, requested calendar link for Zoom call next Wednesday.")}
                className="hover:underline font-semibold"
              >
                Investor Sample
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Talk into your microphone or paste meeting notes here... (e.g. 'Abhi Rohan se mila, BharatCart me head of partnerships hai, usne Monday ko deck bhejne ko bola')"
            className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c] bg-gray-50/50"
          />

          <div className="flex justify-end">
            <button
              onClick={handleRunAiExtraction}
              disabled={!transcript.trim()}
              className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#80235c] text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Extract Structured Contact via AI</span>
            </button>
          </div>
        </div>

        {/* Extracted Contact Preview Card */}
        {extractedData && (
          <div className="mt-5 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                AI Extracted Details
              </span>
              <span className="text-[10px] bg-white text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                Ready to save
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block text-[10px]">Name:</span>
                <input 
                  type="text" 
                  value={extractedData.name} 
                  onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
                  className="font-bold text-gray-900 bg-white border border-gray-200 rounded px-2 py-1 w-full" 
                />
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">Company:</span>
                <input 
                  type="text" 
                  value={extractedData.company} 
                  onChange={(e) => setExtractedData({ ...extractedData, company: e.target.value })}
                  className="font-bold text-gray-900 bg-white border border-gray-200 rounded px-2 py-1 w-full" 
                />
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">Role:</span>
                <input 
                  type="text" 
                  value={extractedData.role} 
                  onChange={(e) => setExtractedData({ ...extractedData, role: e.target.value })}
                  className="text-gray-700 bg-white border border-gray-200 rounded px-2 py-1 w-full" 
                />
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">Follow-Up Date:</span>
                <input 
                  type="text" 
                  value={extractedData.followUpDate} 
                  onChange={(e) => setExtractedData({ ...extractedData, followUpDate: e.target.value })}
                  className="text-[#80235c] font-semibold bg-white border border-gray-200 rounded px-2 py-1 w-full" 
                />
              </div>
            </div>

            <div>
              <span className="text-gray-500 block text-[10px]">Action Item:</span>
              <input 
                type="text" 
                value={extractedData.actionItem} 
                onChange={(e) => setExtractedData({ ...extractedData, actionItem: e.target.value })}
                className="text-xs text-gray-800 bg-white border border-gray-200 rounded px-2 py-1 w-full" 
              />
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!extractedData}
            className="px-7 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
          >
            Save Contact to Network
          </button>
        </div>

      </div>
    </div>
  );
}
