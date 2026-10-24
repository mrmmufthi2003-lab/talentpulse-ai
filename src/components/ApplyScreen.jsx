import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  FileText, 
  GitBranch, 
  Mail, 
  RefreshCw, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';

export const ApplyScreen = () => {
  const { currentCandidate, runAiScreening, isScanning, scanProgress } = useApp();
  const [candidateName, setCandidateName] = useState(currentCandidate.name);
  const [candidateEmail, setCandidateEmail] = useState(currentCandidate.email);
  const [githubUrl, setGithubUrl] = useState(currentCandidate.github);
  const [resumeName, setResumeName] = useState(currentCandidate.resumeFilename);

  const handleRunScreening = (e) => {
    e.preventDefault();
    runAiScreening({
      name: candidateName,
      email: candidateEmail,
      github: githubUrl,
      resumeFilename: resumeName
    });
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
              Apply & AI Screening
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>n8n Engine: Ready</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Job Spec & Candidate Dossier */}
          <div className="lg:col-span-7 space-y-4">
            {/* Company & Job Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="font-semibold text-slate-300">TechCorp Labs</span>
                  <span className="text-slate-600">•</span>
                  <span className="font-mono text-[11px] text-cyan-400">n8n Workflow Cluster 04</span>
                </div>
                <span className="px-3 py-1 text-[10px] font-bold tracking-wide uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-3 h-3 fill-purple-400 text-purple-400" />
                  Urgent Hiring
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                Senior React & n8n Specialist
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs">
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">
                  Remote (Global)
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold border border-emerald-500/25">
                  $85k - $110k
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-400 border border-slate-700/50">
                  Full-time
                </span>
              </div>

              {/* Required Architecture Nodes */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-medium flex items-center justify-between">
                  <span>Required Architecture Nodes</span>
                  <span className="text-emerald-400 text-[10px]">6 Nodes Required</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="font-medium">React 18</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium">n8n Engine</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                    <span className="font-mono text-xs font-bold text-slate-400">N</span>
                    <span className="font-medium">Next.js 14</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium">Supabase</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-medium">Docker</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                    <span className="text-[10px] font-mono text-purple-400">API</span>
                    <span className="font-medium">GraphQL / REST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate Dossier & GitHub Telemetry */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a]/70 border border-slate-800/90 space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800/50">
                <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Candidate Verification Dossier
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  v2.4 LIVE WEBHOOK
                </span>
              </div>

              {/* 1. Candidate Dossier */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-medium text-slate-300">1. Candidate Dossier (OCR Vectorized)</span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Parsed & Ready
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-semibold text-slate-200 truncate">{resumeName}</div>
                      <div className="text-[11px] font-mono text-slate-400">2.4 MB • OCR Vectorized (Extracted Skills: React 18, n8n, Supabase, Node.js)</div>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      const alt = resumeName.includes('Mufthi') ? 'Mufthi_Updated_Fullstack_n8n.pdf' : 'Mufthi_Resume_React_n8n.pdf';
                      setResumeName(alt);
                    }}
                    title="Change or reload resume"
                    className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2. GitHub Telemetry */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-medium text-slate-300">2. GitHub Telemetry & Repos</span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    42 repos indexed
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <GitBranch className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input 
                    type="text" 
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full pl-10 pr-24 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Sync OK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Decision Relay & AI Screening Action */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Decision Relay Endpoint */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f172a]/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  3. Decision Relay Endpoint
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Auto Routing</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-500/60"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Autonomous interview slotting invite will be triggered to this inbox upon scoring threshold &gt; 85%.
              </p>
            </div>

            {/* Neural Scanner Terminal Simulation */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  Neural Parser Pipeline
                </span>
                <span className="text-emerald-400">STATUS: READY</span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>&gt; Candidate: <span className="text-white font-bold">{candidateName}</span></div>
                <div>&gt; Target Role: <span className="text-cyan-300">React & n8n Specialist</span></div>
                <div>&gt; Auto Supabase Push: <span className="text-emerald-400">ENABLED</span></div>
                <div>&gt; n8n Webhook Hook: <span className="text-indigo-300">http://localhost:3001/api/screen</span></div>
              </div>
            </div>

            {/* Giant Action Button: Run Instant 2-Sec AI Screening */}
            <div className="pt-1">
              <button
                onClick={handleRunScreening}
                disabled={isScanning}
                className="w-full relative group overflow-hidden rounded-2xl p-[1px] font-medium transition-all duration-300 disabled:opacity-70 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-2xl group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative px-6 py-4 bg-gradient-to-r from-indigo-950/90 to-blue-950/90 rounded-[15px] flex flex-col items-center justify-center space-y-1.5 shadow-lg shadow-indigo-500/25 group-hover:bg-opacity-90 transition-all">
                  {isScanning ? (
                    <div className="w-full space-y-2 text-center py-1">
                      <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm font-bold">
                        <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                        <span>Neural OCR & GitHub Parsing... {scanProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-300 ease-out"
                          style={{ width: `${scanProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 text-white font-extrabold text-sm sm:text-base tracking-wide">
                        <Zap className="w-5 h-5 fill-cyan-400 text-cyan-400" />
                        <span>Run Instant 2-Sec AI Screening</span>
                        <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                      <div className="text-xs text-cyan-200/80 font-mono tracking-tight flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Powered by n8n Webhook & LLM Parser
                      </div>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Screening Metrics Footer */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-sm font-bold text-cyan-400">1.8s</div>
                <div className="text-[10px] text-slate-400 uppercase font-medium mt-0.5">Scan Latency</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-sm font-bold text-emerald-400">100%</div>
                <div className="text-[10px] text-slate-400 uppercase font-medium mt-0.5">Autonomous</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-sm font-bold text-purple-400">Zero-Wait</div>
                <div className="text-[10px] text-slate-400 uppercase font-medium mt-0.5">Queue Slot</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
