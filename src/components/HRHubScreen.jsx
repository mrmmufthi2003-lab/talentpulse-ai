import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';

export const HRHubScreen = () => {
  const { currentCandidate, candidatesList, hireCandidate, n8nLogs } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isHiring, setIsHiring] = useState(false);

  const handleHireClick = () => {
    setIsHiring(true);
    setTimeout(() => {
      hireCandidate(currentCandidate.id);
      setIsHiring(false);
    }, 800);
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
              HR Hub & Autonomous Dispatch
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 text-xs font-mono font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            n8n Node #410 Active
          </span>
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/40 p-0.5 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
              alt="HR Manager" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Screen Body with Responsive 2-Column Desktop Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">
        
        {/* Recruiter Telemetry & Funnel Banner */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Morning, Sarah!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                5 High-Match Candidates Ready for autonomous dispatch.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-emerald-400" />
                14 Days Saved with n8n Automation
              </span>
            </div>
          </div>

          {/* Screening Funnel Grid (Full Width) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Autonomous Recruitment Funnel
              </span>
              <span className="text-[11px] font-mono text-slate-400">Zero Human Screening Hours</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Applied</div>
                <div className="text-lg font-black text-white mt-0.5">1,000</div>
                <div className="text-[10px] text-slate-400">Raw Candidate Pool</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Screened</div>
                <div className="text-lg font-black text-cyan-400 mt-0.5">100%</div>
                <div className="text-[10px] text-cyan-400">Autonomous LLM Scan</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Shortlist</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">12</div>
                <div className="text-[10px] text-emerald-400">&gt;90% Fit Score</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-sm shadow-emerald-500/10">
                <div className="text-xs text-emerald-300 font-bold">Interview</div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">5 Done</div>
                <div className="text-[10px] text-emerald-300 font-bold">Ready for Offer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Responsive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Ranked #1 Top Candidate Profile & Offer Action */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#111a2e] to-[#0c1424] border border-cyan-500/40 space-y-4 shadow-2xl relative overflow-hidden">
              {/* Candidate Header & Rank */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
                      <div className="w-full h-full bg-[#0b0f17] rounded-[14px] flex items-center justify-center font-extrabold text-xl text-cyan-300">
                        M
                      </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b0f17] flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{currentCandidate.name}</h3>
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium">React & n8n Specialist</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {currentCandidate.location}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono shadow-sm shadow-emerald-500/20">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                    {currentCandidate.matchScore}% Match
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mt-1.5 tracking-wider">
                    RANKED #1
                  </div>
                </div>
              </div>

              {/* Score Matrix */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase font-semibold">
                  <span>Autonomous Assessment</span>
                  <span className="text-cyan-400">Score Matrix</span>
                </div>

                {/* Technical Knowledge */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300 flex items-center gap-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Technical Knowledge
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{currentCandidate.ratings.technical}/10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${currentCandidate.ratings.technical * 10}%` }}></div>
                  </div>
                </div>

                {/* Problem Solving */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300 flex items-center gap-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      Problem Solving
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">{currentCandidate.ratings.problemSolving}/10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${currentCandidate.ratings.problemSolving * 10}%` }}></div>
                  </div>
                </div>

                {/* Communication */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300 flex items-center gap-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      Communication
                    </span>
                    <span className="font-mono text-purple-400 font-bold">{currentCandidate.ratings.communication}/10</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${currentCandidate.ratings.communication * 10}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Evaluation Insight */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Autonomous Evaluation Insight
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Demonstrated deep mastery of <span className="text-emerald-400 font-bold">n8n webhook pipelines</span> and React memoization. Zero human screening time required.
                </p>
              </div>

              {/* AI Highlight Segment Audio Player */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    AI HIGHLIGHT SEGMENT
                  </span>
                  <span className="text-slate-400">01:24 Timestamp</span>
                </div>

                <div className="flex items-center space-x-3.5">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0 transition-transform active:scale-95"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>

                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                      n8n PostgreSQL Webhook explanation
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-1">
                      <span>{isPlayingAudio ? '00:34' : '00:00'}</span>
                      <div className="flex items-center space-x-1 px-3 flex-1 justify-center">
                        {[12, 24, 18, 30, 16, 28, 22, 14, 26, 20, 12, 18, 24, 15, 29, 21, 13, 27].map((h, i) => (
                          <span 
                            key={i} 
                            className={`w-1 rounded-full transition-all ${
                              isPlayingAudio && i < 8 ? 'bg-cyan-400' : 'bg-slate-700'
                            }`} 
                            style={{ height: `${h}px` }}
                          ></span>
                        ))}
                      </div>
                      <span>01:24</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruiter Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleHireClick}
                  disabled={isHiring || currentCandidate.isHired}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-xl ${
                    currentCandidate.isHired
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                      : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-indigo-500/30'
                  }`}
                >
                  <Zap className="w-5 h-5 fill-current" />
                  <span>
                    {currentCandidate.isHired
                      ? '✓ Offer Letter Dispatched via n8n & Synced to Supabase'
                      : isHiring
                      ? 'Generating Offer & Triggering n8n...'
                      : 'Hire & Auto-Send Offer Letter via n8n'}
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full py-3 px-5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-slate-700/60 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Schedule 15-min Final Sync</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Other Candidates & Live n8n Activity Audit */}
          <div className="lg:col-span-5 space-y-4">
            {/* Other Screened Candidates List */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Other Screened Candidates</span>
                <span className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer">
                  View All 12
                </span>
              </div>

              <div className="space-y-2.5">
                {candidatesList.filter(c => !c.isTopCandidate).map((cand) => (
                  <div 
                    key={cand.id}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-200">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">{cand.name}</div>
                        <div className="text-xs text-slate-400">{cand.role}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          {cand.tags?.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {cand.matchScore}% Match
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* n8n Telemetry Events Stream Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800 font-bold">
                <span className="flex items-center gap-2 text-cyan-400">
                  <Zap className="w-4 h-4" />
                  n8n Automation Audit Stream
                </span>
                <span className="text-emerald-400">LIVE</span>
              </div>

              <div className="space-y-2">
                {n8nLogs.slice(0, 3).map((log, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-semibold">{log.title}</span>
                      <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{log.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
