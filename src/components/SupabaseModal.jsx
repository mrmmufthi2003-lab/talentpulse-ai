import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPABASE_SQL_SCHEMA, getSupabaseStatus } from '../supabaseClient';
import { X, Database, Copy, Check, ShieldCheck, Key, Globe, Table, Server } from 'lucide-react';

export const SupabaseModal = () => {
  const { showSupabaseModal, setShowSupabaseModal, saveSupabaseConfig, currentCandidate } = useApp();
  const [url, setUrl] = useState(() => localStorage.getItem('tp_supabase_url') || '');
  const [anonKey, setAnonKey] = useState(() => localStorage.getItem('tp_supabase_key') || '');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'schema' | 'preview'

  if (!showSupabaseModal) return null;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveSupabaseConfig(url, anonKey);
  };

  const currentStatus = getSupabaseStatus();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0d131f]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Supabase PostgreSQL Live Auto-Save
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {currentStatus.isConfigured ? 'Connected' : 'Auto-Sync Active'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Database synchronization for candidates, n8n events & interview transcripts</p>
            </div>
          </div>
          <button
            onClick={() => setShowSupabaseModal(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-5 text-xs font-mono">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Connection Settings
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'schema'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            SQL Table Schema
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors ${
              activeTab === 'preview'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Live Table Preview
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'settings' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-emerald-400">💡 Zero Setup Required:</span> TalentPulse AI automatically auto-saves all candidates, interview scores, and n8n webhooks reactively. To connect your live Supabase cloud project, paste your credentials below!
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://your-project.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                  Supabase Anon / Public Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                Save Supabase Credentials & Activate Cloud Sync
              </button>
            </form>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Run this SQL in your Supabase SQL Editor to create tables:
                </span>
                <button
                  type="button"
                  onClick={handleCopySchema}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[300px]">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
                <span>Table: public.candidates</span>
                <span className="text-emerald-400">Status: Auto-Synced</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Candidate ID:</span>
                  <span className="text-white">{currentCandidate.id}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Name:</span>
                  <span className="text-cyan-400 font-bold">{currentCandidate.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Role:</span>
                  <span className="text-slate-200">{currentCandidate.role}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Match Score:</span>
                  <span className="text-emerald-400 font-bold">{currentCandidate.matchScore}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Calendar Slot:</span>
                  <span className="text-purple-400">{currentCandidate.calendarSlot || 'Pending'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hiring Status:</span>
                  <span className="text-emerald-300 font-bold">{currentCandidate.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d131f] flex justify-end">
          <button
            onClick={() => setShowSupabaseModal(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
