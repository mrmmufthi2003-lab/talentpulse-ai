import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Calendar, CheckCircle2, FileText, ExternalLink, ShieldCheck, Sparkles, Send } from 'lucide-react';

export const EmailModal = () => {
  const { showEmailModal, setShowEmailModal, activeEmail, confirmCalendarSlot } = useApp();

  if (!showEmailModal || !activeEmail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Gmail Mock Window Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#0d131f]">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center">
              <Mail className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                Gmail Inbox • Candidate Notification
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Delivered via n8n
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">From: automated-hiring@techcorp-labs.com</div>
            </div>
          </div>
          <button
            onClick={() => setShowEmailModal(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Header Info */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/40 space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            {activeEmail.subject}
          </h2>
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1 font-mono gap-2">
            <div>
              To: <span className="text-cyan-300 font-semibold">{activeEmail.to}</span>
            </div>
            <div>
              {activeEmail.timestamp || 'Just now'}
            </div>
          </div>
        </div>

        {/* Email Message Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-200 leading-relaxed font-sans">
          {/* Greeting */}
          <div className="font-semibold text-white">
            Hi {activeEmail.candidateName || 'Mufthi'},
          </div>

          {/* Body Text */}
          <p className="text-slate-300">
            {activeEmail.message}
          </p>

          {/* Highlight Badge Card */}
          {activeEmail.type === 'INTERVIEW_INVITE' && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  AI Deep-Scan Result: {activeEmail.matchScore}% Match
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Pre-Cleared Slot
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Your resume and GitHub telemetry passed our automated screening threshold (&gt; 85%). You are invited to choose an interview slot:
              </p>
              
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    confirmCalendarSlot('Today 4:00 PM');
                    setShowEmailModal(false);
                  }}
                  className="p-3 rounded-lg bg-cyan-500/15 border border-cyan-400/50 hover:bg-cyan-500/25 text-left text-xs font-mono text-white transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="font-bold">Today 4:00 PM</div>
                    <div className="text-[10px] text-cyan-300">Click to Confirm Slot</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    confirmCalendarSlot('Tomorrow 11:00 AM');
                    setShowEmailModal(false);
                  }}
                  className="p-3 rounded-lg bg-cyan-500/15 border border-cyan-400/50 hover:bg-cyan-500/25 text-left text-xs font-mono text-white transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="font-bold">Tomorrow 11:00 AM</div>
                    <div className="text-[10px] text-cyan-300">Click to Confirm Slot</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeEmail.type === 'OFFER_LETTER' && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Official Employment Offer
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded font-bold">
                  Status: Approved by HR
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Position:</span>
                  <span className="text-white font-bold">Senior React & n8n Specialist</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Base Compensation:</span>
                  <span className="text-emerald-400 font-bold">$105,000 USD / Year + Equity</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Employment Type:</span>
                  <span className="text-slate-200">Full-Time (Remote Global)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dispatch Node:</span>
                  <span className="text-cyan-400 font-bold">n8n Node #425 (Gmail + Telegram Relay)</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer signoff */}
          <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div>Best regards,</div>
            <div className="font-bold text-slate-200 mt-0.5">TechCorp Labs Autonomous Hiring Engine</div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">Powered by TalentPulse AI & n8n Automation</div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d131f] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Delivered to {activeEmail.to}</span>
          </div>
          <button
            onClick={() => setShowEmailModal(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Email
          </button>
        </div>
      </div>
    </div>
  );
};
