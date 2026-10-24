import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Terminal, 
  Network,
  Cpu,
  Layers,
  Database,
  Code2
} from 'lucide-react';

export const MatchScoreScreen = () => {
  const { currentCandidate, confirmCalendarSlot } = useApp();
  const [selectedSlot, setSelectedSlot] = useState(currentCandidate.calendarSlot || 'Today 4:00 PM');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      confirmCalendarSlot(selectedSlot);
      setIsConfirming(false);
    }, 600);
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
              AI Match Score & Verification
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            n8n: Live Relay
          </span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Radial Fit Score & Candidate Verified Dossier */}
          <div className="lg:col-span-5 space-y-4">
            {/* Verification Banner */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium">AI Deep-Scan in 1.9s</span>
              </div>
              <div className="text-slate-400 text-right">
                sha256:7f3b8a • <span className="text-emerald-400 font-bold">Verified</span>
              </div>
            </div>

            {/* Candidate Profile Strip */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-md">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 border border-cyan-400/40 flex items-center justify-center font-bold text-base text-white shadow-lg shadow-cyan-500/20">
                  M
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{currentCandidate.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                      {currentCandidate.level}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Fullstack & Workflow Automation</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Terminal className="w-4 h-4 hover:text-cyan-400 transition-colors cursor-pointer" />
                <Network className="w-4 h-4 hover:text-emerald-400 transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Big Radial Fit Score Meter */}
            <div className="p-6 rounded-2xl bg-[#0f172a]/90 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none"></div>

              {/* SVG Circular Ring */}
              <div className="relative w-44 h-44 flex items-center justify-center my-2">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-slate-800/80"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="url(#gradientScore)"
                    strokeWidth="7"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * currentCandidate.matchScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                  <defs>
                    <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Centered Score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tight">
                    {currentCandidate.matchScore}%
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                    Fit Score
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Exceptional Fit
                </span>
                <p className="text-xs text-slate-400 mt-1.5 font-mono">
                  Top 1% of 1,000 Verified System Applicants
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Skill Breakdown & n8n Calendar Booking */}
          <div className="lg:col-span-7 space-y-4">
            {/* Skill Verification Breakdown */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a]/80 border border-slate-800/90 space-y-3.5">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold pb-1.5 border-b border-slate-800/60">
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Skill Verification Analysis
                </span>
                <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  4/4 Nodes Passed
                </span>
              </div>

              {/* 1. n8n Orchestration */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    n8n Orchestration
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{currentCandidate.skills.n8n}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${currentCandidate.skills.n8n}%` }}></div>
                </div>
                <p className="text-xs text-slate-400">
                  PostgreSQL webhooks, custom nodes & autonomous triggers validated.
                </p>
              </div>

              {/* 2. React Architecture */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    React Architecture
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">{currentCandidate.skills.react}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${currentCandidate.skills.react}%` }}></div>
                </div>
                <p className="text-xs text-slate-400">
                  Custom Hooks, Redux Toolkit & Virtual DOM optimization verified via GitHub commits.
                </p>
              </div>

              {/* 3. Supabase / PostgreSQL */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    Supabase / PostgreSQL
                  </span>
                  <span className="font-mono text-indigo-400 font-bold">{currentCandidate.skills.supabase}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${currentCandidate.skills.supabase}%` }}></div>
                </div>
                <p className="text-xs text-slate-400">
                  Row Level Security (RLS), edge functions and relational schema normalization.
                </p>
              </div>

              {/* 4. Docker & Cloud DevOps */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    Docker & Cloud DevOps
                  </span>
                  <span className="font-mono text-purple-400 font-bold">{currentCandidate.skills.docker}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${currentCandidate.skills.docker}%` }}></div>
                </div>
                <p className="text-xs text-slate-400">
                  Multi-stage builds, container orchestration, CI/CD pipeline automated deployments.
                </p>
              </div>
            </div>

            {/* n8n Execution Engine & Auto Trigger Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0e1726] to-[#0a101d] border border-cyan-500/30 space-y-3.5 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  n8n Execution Engine Automation
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Active & Running
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 fill-emerald-400" />
                  Webhook Triggered Automatically!
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated interview invitation dispatched to <span className="font-mono text-cyan-300 font-bold">{currentCandidate.email}</span> with integrated Google Calendar sync.
                </p>
              </div>

              {/* Calendar Slot Selection */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Direct Google Calendar Booking
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">Instant Match Slot</span>
                </div>
                <p className="text-xs text-slate-400">
                  Select candidate's pre-cleared interview slot:
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedSlot('Today 4:00 PM')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedSlot === 'Today 4:00 PM'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold">Today 4:00 PM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSlot('Tomorrow 11:00 AM')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedSlot === 'Tomorrow 11:00 AM'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold">Tomorrow 11:00 AM</span>
                  </button>
                </div>

                {/* Confirm Interview Slot CTA */}
                <button
                  onClick={handleConfirm}
                  disabled={isConfirming}
                  className="w-full mt-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{isConfirming ? 'Locking Slot in Google Calendar...' : 'Confirm Interview Slot & Proceed to Live Agent'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
