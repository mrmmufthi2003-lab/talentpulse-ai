import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Clock, 
  ArrowRight, 
  Bot, 
  Activity, 
  CheckCircle2, 
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const LiveAgentScreen = () => {
  const { currentCandidate, submitInterviewAnswer } = useApp();
  
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(744); // 12:24
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1); // Q2

  const questions = [
    {
      number: 1,
      title: "React components render aagum bodhu performance-ah eppadi optimize பண்ணுவீங்க?",
      tags: ['React 18', 'Virtual DOM', 'Memoization'],
      defaultAnswer: "React 18-la `useMemo` and `useCallback` use panni unneeded recalculations thaduppen, concurrent features like `useTransition` use panni heavy rendering UI freeze aagama prioritize pannuven."
    },
    {
      number: 2,
      title: "How do you handle error retries and idempotent data delivery in high-load n8n PostgreSQL Webhooks?",
      tags: ['Idempotency', 'n8n Core', 'PostgreSQL'],
      defaultAnswer: "In n8n, I configure the Webhook node with customized error workflow triggers. For idempotent processing, I implement upsert deduplication using PostgreSQL unique transaction keys combined with exponential retry backoff logic..."
    },
    {
      number: 3,
      title: "Supabase Row Level Security (RLS) policies-ah high-security workflow-la eppadi enforce pannuveenga?",
      tags: ['Supabase', 'RLS Policies', 'JWT Auth'],
      defaultAnswer: "Supabase table level-la auth.uid() match aagura record-ku mattum SELECT/UPDATE access allow panni, n8n webhook service-role key-ah edge function moolama validate panni store pannuven."
    }
  ];

  const currentQ = questions[activeQuestionIndex];
  const [transcriptText, setTranscriptText] = useState(currentQ.defaultAnswer);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitInterviewAnswer(transcriptText);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0f17] text-slate-100 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/60 bg-[#0d131f]/80 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">TalentPulse</div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Autonomous AI Voice Agent
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/40 p-0.5 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Screen Body with Responsive 2-Column Desktop Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Virtual AI Interviewer & Camera Studio */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-bold text-white uppercase tracking-wider">AI Interview Live Session</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400 font-bold">Q {currentQ.number} of 5</span>
              </div>
            </div>

            {/* AI Synthesizing Assessment Cinematic Canvas */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0c1626] to-[#080d17] border border-cyan-500/40 overflow-hidden shadow-2xl p-5 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
              {/* Stream Overlay Meta */}
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-200 flex items-center gap-1.5 font-bold">
                    <Bot className="w-4 h-4 text-cyan-400" />
                    TalentPulse v4.2
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    ONLINE
                  </span>
                </div>
                <div className="text-slate-400">1080p • 60fps Ultra HD</div>
              </div>

              {/* Futuristic Audio Waveform Visualizer */}
              <div className="my-auto flex flex-col items-center justify-center space-y-3 py-6">
                <div className="flex items-center space-x-2 h-20">
                  <span className="w-1.5 bg-cyan-400 rounded-full animate-wave-1"></span>
                  <span className="w-2 bg-emerald-400 rounded-full animate-wave-2"></span>
                  <span className="w-1.5 bg-cyan-300 rounded-full animate-wave-3"></span>
                  <span className="w-2.5 bg-purple-400 rounded-full animate-wave-4"></span>
                  <span className="w-3 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-full animate-wave-2"></span>
                  <span className="w-2.5 bg-cyan-400 rounded-full animate-wave-5"></span>
                  <span className="w-2 bg-emerald-300 rounded-full animate-wave-1"></span>
                  <span className="w-1.5 bg-purple-400 rounded-full animate-wave-3"></span>
                  <span className="w-2 bg-cyan-400 rounded-full animate-wave-4"></span>
                </div>
                <div className="text-xs sm:text-sm font-mono tracking-widest text-cyan-300 uppercase font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
                  AI Synthesizing Assessment & Audio Stream
                </div>
              </div>

              {/* Inset PiP Candidate Camera Preview */}
              <div className="absolute bottom-4 right-4 w-28 h-36 rounded-2xl border-2 border-cyan-500/40 bg-slate-900/90 shadow-2xl overflow-hidden group">
                {isVideoOn ? (
                  <div className="relative w-full h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" 
                      alt="Candidate Video" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-emerald-400 font-bold">
                      LIVE
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                      You
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-[10px]">
                    <VideoOff className="w-5 h-5 mb-1" />
                    <span>Camera Off</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hardware Controls */}
            <div className="flex items-center space-x-3 pt-1">
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                  isMicOn 
                    ? 'bg-slate-900 border-cyan-500/40 text-cyan-400 shadow-md shadow-cyan-500/10' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                <span>{isMicOn ? 'Mic Active' : 'Mic Muted'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                  isVideoOn 
                    ? 'bg-slate-900 border-cyan-500/40 text-cyan-400 shadow-md shadow-cyan-500/10' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                <span>{isVideoOn ? 'Camera Active' : 'Camera Off'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextIdx = (activeQuestionIndex + 1) % questions.length;
                  setActiveQuestionIndex(nextIdx);
                  setTranscriptText(questions[nextIdx].defaultAnswer);
                }}
                className="px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-cyan-400 text-xs font-mono flex items-center gap-2 transition-colors ml-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Switch Query</span>
              </button>
            </div>
          </div>

          {/* Right Column: Question Card & Real-Time Transcription */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            {/* Technical Query Card */}
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  TECHNICAL QUERY #{currentQ.number}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                  Weight: 25%
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentQ.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {currentQ.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-700/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Real-Time Transcription Stream */}
            <div className="p-5 rounded-2xl bg-[#0f172a]/70 border border-slate-800/90 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  REAL-TIME TRANSCRIPTION STREAM
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  98ms Latency
                </span>
              </div>

              <div className="relative">
                <textarea
                  rows={4}
                  value={transcriptText}
                  onChange={(e) => setTranscriptText(e.target.value)}
                  className="w-full p-4 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-500/50 resize-none shadow-inner"
                  placeholder="Speak or type candidate answer..."
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <div className="text-slate-400">
                  AI Speech Confidence: <span className="text-emerald-400 font-bold">97.8% Clear Delivery</span>
                </div>
                <div className="text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Real-Time NLP Validated</span>
                </div>
              </div>
            </div>

            {/* Submit & Next Evaluation CTA */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-extrabold tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-500/30 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>{isSubmitting ? 'Generating AI Report Card & Pushing to Supabase...' : 'Submit & Next -> (Advance to HR Hub)'}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <div className="text-[11px] text-center text-slate-500 font-mono leading-tight pt-1">
                Autonomous Assessment encrypted end-to-end. Compliant with AI Hiring Transparency Standard v2.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
