import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Database, 
  Columns3, 
  Smartphone, 
  HelpCircle, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const Header = () => {
  const { 
    viewMode, 
    setViewMode, 
    setShowComparison, 
    setShowSupabaseModal, 
    supabaseState, 
    lastAutoSaveTime,
    autoSaveNotification
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#070a0f]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">
                TalentPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">AI</span>
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                n8n v2.4 Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Autonomous Recruitment Pipeline • React & n8n Specialist Flow
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Supabase Auto-Save Status Badge */}
          <button
            onClick={() => setShowSupabaseModal(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400 text-slate-300 text-xs font-mono transition-all group"
            title="Click to configure Supabase URL & Key"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>
              {supabaseState.isConfigured ? 'Supabase: Cloud Live' : 'Supabase: Auto-Saving'}
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          {/* View Mode Switcher: Desktop Full Frame vs Mobile vs 4-Screen Panorama */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'desktop'
                  ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Full Frame</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'mobile'
                  ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone</span>
            </button>

            <button
              onClick={() => setViewMode('panorama')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'panorama'
                  ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4-Screen Panorama</span>
            </button>
          </div>

          {/* Traditional vs TalentPulse Comparison Modal Trigger */}
          <button
            onClick={() => setShowComparison(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Traditional vs AI</span>
          </button>
        </div>
      </div>

      {/* Floating Auto-Save Notification Toast */}
      {autoSaveNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono shadow-2xl backdrop-blur-md">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>{autoSaveNotification}</span>
          </div>
        </div>
      )}
    </header>
  );
};
