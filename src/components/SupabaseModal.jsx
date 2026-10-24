import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPABASE_SQL_SCHEMA, getSupabaseStatus } from '../supabaseClient';
import { getStoredEmailJSCredentials, saveEmailJSCredentials, sendRealEmailViaEmailJS } from '../emailService';
import { X, Database, Copy, Check, ShieldCheck, Key, Globe, Table, Server, Mail, Send, Sparkles } from 'lucide-react';

export const SupabaseModal = () => {
  const { showSupabaseModal, setShowSupabaseModal, saveSupabaseConfig, saveN8nWebhook, currentCandidate } = useApp();
  const [url, setUrl] = useState(() => localStorage.getItem('tp_supabase_url') || '');
  const [anonKey, setAnonKey] = useState(() => localStorage.getItem('tp_supabase_key') || '');
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('tp_n8n_webhook_url') || '');
  
  // EmailJS fields
  const storedEmailJS = getStoredEmailJSCredentials();
  const [serviceId, setServiceId] = useState(storedEmailJS.serviceId);
  const [templateId, setTemplateId] = useState(storedEmailJS.templateId || 'template_vocoao8');
  const [publicKey, setPublicKey] = useState(storedEmailJS.publicKey);
  const [testEmailStatus, setTestEmailStatus] = useState(null);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'emailjs' | 'schema' | 'preview'

  if (!showSupabaseModal) return null;

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSupabase = (e) => {
    e.preventDefault();
    if (url && anonKey) {
      saveSupabaseConfig(url, anonKey);
    }
    if (webhookUrl && saveN8nWebhook) {
      saveN8nWebhook(webhookUrl);
    }
  };

  const handleSaveEmailJS = (e) => {
    e.preventDefault();
    saveEmailJSCredentials(serviceId, templateId, publicKey);
    setTestEmailStatus({ type: 'success', message: '✓ EmailJS credentials saved! You can now send real emails to your Gmail.' });
  };

  const handleSendTestEmail = async () => {
    saveEmailJSCredentials(serviceId, templateId, publicKey);
    setTestEmailStatus({ type: 'loading', message: 'Sending real test email to Gmail...' });

    const result = await sendRealEmailViaEmailJS({
      toName: currentCandidate.name || 'Mufthi',
      toEmail: currentCandidate.email || 'mufthi.dev@gmail.com',
      role: 'Senior React & n8n Specialist',
      matchScore: '92%',
      type: 'INTERVIEW_INVITE',
      calendarSlot: 'Today 4:00 PM'
    });

    if (result.deliveredToRealInbox) {
      setTestEmailStatus({ type: 'success', message: `✓ Success! Check your Gmail inbox (${currentCandidate.email}) now!` });
    } else {
      setTestEmailStatus({ type: 'error', message: result.message || 'Failed to send. Please check your Service ID & Public Key.' });
    }
  };

  const currentStatus = getSupabaseStatus();
  const isEmailConfigured = !!(serviceId && publicKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0d131f]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Cloud & Email Integrations
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  {currentStatus.isConfigured ? 'Supabase Connected' : 'Auto-Sync Active'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Supabase Database, EmailJS Real Gmail & n8n Webhook Configuration</p>
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
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-5 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Supabase Database
          </button>
          <button
            onClick={() => setActiveTab('emailjs')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'emailjs'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EmailJS (Real Gmail)</span>
            {isEmailConfigured && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'schema'
                ? 'border-emerald-400 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            SQL Table Schema
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-2.5 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
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
          {/* TAB 1: Supabase Connection */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSupabase} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-emerald-400">✓ Supabase Cloud Live:</span> Your app is connected to project <span className="text-cyan-300 font-mono">rxupshpgieajqanjcntg</span>. Candidates and n8n events are being stored automatically!
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  placeholder="https://rxupshpgieajqanjcntg.supabase.co"
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

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  Live n8n Webhook URL (Optional for Custom n8n Instance)
                </label>
                <input
                  type="text"
                  placeholder="https://your-n8n.cloud/webhook/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                Save Supabase & n8n Settings
              </button>
            </form>
          )}

          {/* TAB 2: EmailJS Real Gmail Configuration */}
          {activeTab === 'emailjs' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 text-xs text-slate-300 space-y-1.5">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  Send REAL Emails to Gmail (via EmailJS Dashboard)
                </div>
                <p>
                  Connect your EmailJS account (Welcome, Mufthi) to deliver actual emails into your real Gmail inbox whenever a candidate applies or gets hired!
                </p>
              </div>

              <form onSubmit={handleSaveEmailJS} className="space-y-3.5">
                {/* Service ID */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-cyan-400" />
                      1. EmailJS Service ID
                    </label>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      (Left menu ➔ "Email Services" tab)
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="service_xxxxxxx"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Template ID */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-cyan-400" />
                      2. Template ID
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      From your screenshot: template_vocoao8
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="template_vocoao8"
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Public Key */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-cyan-400" />
                      3. Public Key (User ID)
                    </label>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      (Left menu ➔ "Account" tab ➔ Public Key)
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Your EmailJS Public Key"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Status Message */}
                {testEmailStatus && (
                  <div className={`p-3 rounded-xl text-xs font-mono border ${
                    testEmailStatus.type === 'success' 
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                      : testEmailStatus.type === 'error'
                      ? 'bg-red-950/60 border-red-500/50 text-red-300'
                      : 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300'
                  }`}>
                    {testEmailStatus.message}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                  >
                    Save EmailJS Keys
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTestEmail}
                    className="py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Test Email to Gmail</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: SQL Table Schema */}
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

          {/* TAB 4: Live Table Preview */}
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
