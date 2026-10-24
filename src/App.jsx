import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ApplyScreen } from './components/ApplyScreen';
import { MatchScoreScreen } from './components/MatchScoreScreen';
import { LiveAgentScreen } from './components/LiveAgentScreen';
import { HRHubScreen } from './components/HRHubScreen';
import { BottomNav } from './components/BottomNav';
import { ComparisonModal } from './components/ComparisonModal';
import { SupabaseModal } from './components/SupabaseModal';
import { EmailModal } from './components/EmailModal';
import { 
  Briefcase, 
  Target, 
  Bot, 
  LayoutDashboard, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Mail,
  X
} from 'lucide-react';

export default function App() {
  const { 
    activeTab, 
    setActiveTab, 
    viewMode, 
    n8nLogs, 
    newEmailAlert, 
    setNewEmailAlert, 
    setShowEmailModal,
    setActiveEmail
  } = useApp();

  const steps = [
    { id: 'apply', step: '01', title: 'Candidate Apply', desc: 'Dossier & AI Screening', icon: Briefcase },
    { id: 'match', step: '02', title: 'Match Score (92%)', desc: '4-Node Verification & n8n', icon: Target },
    { id: 'interview', step: '03', title: 'Autonomous Live Agent', desc: 'Real-Time Voice & Video', icon: Bot },
    { id: 'hr', step: '04', title: 'Recruiter HR Hub', desc: 'Scoring & 1-Click Offer', icon: LayoutDashboard }
  ];

  return (
    <div className="min-h-screen bg-[#070a0f] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black relative">
      {/* Top Navbar */}
      <Header />

      {/* Main Full-Frame Content Area */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col justify-start">
        
        {/* VIEW MODE 1: Full-Frame Desktop App (Primary Mode) */}
        {viewMode === 'desktop' && (
          <div className="w-full space-y-5">
            {/* Pipeline Stage Navigation Stepper */}
            <div className="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {steps.map((st) => {
                  const Icon = st.icon;
                  const isActive = activeTab === st.id;
                  
                  return (
                    <button
                      key={st.id}
                      onClick={() => setActiveTab(st.id)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all text-left group ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                          : 'hover:bg-slate-800/60 border border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30' 
                          : 'bg-slate-800 text-slate-300 group-hover:text-cyan-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
                          <span>STEP {st.step}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>}
                        </div>
                        <div className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {st.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate hidden sm:block">
                          {st.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Screen in Full Width Desktop Frame */}
            <div className="w-full min-h-[720px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 bg-[#0b0f17]">
              {activeTab === 'apply' && <ApplyScreen />}
              {activeTab === 'match' && <MatchScoreScreen />}
              {activeTab === 'interview' && <LiveAgentScreen />}
              {activeTab === 'hr' && <HRHubScreen />}
            </div>
          </div>
        )}

        {/* VIEW MODE 2: Centered Mobile Phone Frame */}
        {viewMode === 'mobile' && (
          <div className="flex flex-col items-center justify-center w-full py-4">
            <div className="w-full max-w-[420px] h-[830px] rounded-[36px] p-2.5 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/80 border-2 border-slate-700/70 shadow-2xl relative flex flex-col">
              {/* Speaker / Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center space-x-2 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                <span className="w-8 h-1 rounded-full bg-slate-800"></span>
              </div>

              {/* Screen Content */}
              <div className="flex-1 rounded-[26px] overflow-hidden flex flex-col pt-3 bg-[#0b0f17]">
                <div className="flex-1 overflow-hidden relative">
                  {activeTab === 'apply' && <ApplyScreen />}
                  {activeTab === 'match' && <MatchScoreScreen />}
                  {activeTab === 'interview' && <LiveAgentScreen />}
                  {activeTab === 'hr' && <HRHubScreen />}
                </div>

                <BottomNav active={activeTab} onSelect={setActiveTab} />
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 3: 4-Screen Panorama (Exact Mockup Comparison View) */}
        {viewMode === 'panorama' && (
          <div className="w-full space-y-4 py-2">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-white font-bold">TalentPulse 4-Screen Live Pipeline Panorama</span>
              </div>
              <span className="text-emerald-400 font-bold">100% Autonomous Synchronized Architecture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 pb-6">
              <div className="h-[800px] rounded-[28px] p-2 bg-gradient-to-b from-slate-700/60 to-slate-900/80 border border-slate-700/80 shadow-2xl flex flex-col">
                <div className="flex-1 rounded-[22px] overflow-hidden flex flex-col bg-[#0b0f17]">
                  <div className="flex-1 overflow-hidden">
                    <ApplyScreen />
                  </div>
                  <BottomNav active="apply" onSelect={() => {}} />
                </div>
              </div>

              <div className="h-[800px] rounded-[28px] p-2 bg-gradient-to-b from-slate-700/60 to-slate-900/80 border border-slate-700/80 shadow-2xl flex flex-col">
                <div className="flex-1 rounded-[22px] overflow-hidden flex flex-col bg-[#0b0f17]">
                  <div className="flex-1 overflow-hidden">
                    <MatchScoreScreen />
                  </div>
                  <BottomNav active="match" onSelect={() => {}} />
                </div>
              </div>

              <div className="h-[800px] rounded-[28px] p-2 bg-gradient-to-b from-slate-700/60 to-slate-900/80 border border-slate-700/80 shadow-2xl flex flex-col">
                <div className="flex-1 rounded-[22px] overflow-hidden flex flex-col bg-[#0b0f17]">
                  <div className="flex-1 overflow-hidden">
                    <LiveAgentScreen />
                  </div>
                  <BottomNav active="interview" onSelect={() => {}} />
                </div>
              </div>

              <div className="h-[800px] rounded-[28px] p-2 bg-gradient-to-b from-slate-700/60 to-slate-900/80 border border-slate-700/80 shadow-2xl flex flex-col">
                <div className="flex-1 rounded-[22px] overflow-hidden flex flex-col bg-[#0b0f17]">
                  <div className="flex-1 overflow-hidden">
                    <HRHubScreen />
                  </div>
                  <BottomNav active="hr" onSelect={() => {}} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live n8n Telemetry Drawer Strip */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-4 h-4 fill-cyan-400" />
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">n8n Live Activity Stream:</span>
              <span className="text-cyan-300 truncate max-w-xl">
                {n8nLogs[0]?.title} - {n8nLogs[0]?.desc}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>n8n Relay Connected • Auto-Sync Active</span>
          </div>
        </div>
      </main>

      {/* Floating Incoming Email Notification Pill */}
      {newEmailAlert && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#0f172a] border-2 border-cyan-400 text-slate-100 shadow-2xl shadow-cyan-500/30">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40">
              <Mail className="w-5 h-5 text-red-400" />
            </div>
            <div 
              onClick={() => {
                setActiveEmail(newEmailAlert);
                setShowEmailModal(true);
                setNewEmailAlert(null);
              }}
              className="cursor-pointer"
            >
              <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span>📩 New Email Sent to {newEmailAlert.to}!</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.2 rounded">Click to View</span>
              </div>
              <div className="text-[11px] text-slate-300 truncate max-w-xs">
                {newEmailAlert.subject}
              </div>
            </div>
            <button 
              onClick={() => setNewEmailAlert(null)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ComparisonModal />
      <SupabaseModal />
      <EmailModal />
    </div>
  );
}
