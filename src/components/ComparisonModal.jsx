import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, AlertCircle, Zap, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const ComparisonModal = () => {
  const { showComparison, setShowComparison } = useApp();

  if (!showComparison) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-[#0b0f17] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0d131f]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Traditional Hiring vs TalentPulse AI</h3>
              <p className="text-xs text-slate-400">Key differences in speed, accuracy and human overhead</p>
            </div>
          </div>
          <button
            onClick={() => setShowComparison(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <span>🎯 Real-World Problem vs TalentPulse AI Solution</span>
            </div>
            <p>
              Standard industry flow-la 1,000 applicants apply pannumbodhu HR manual-a review panna 2-3 weeks aagum, neraiya talent miss aagum. TalentPulse AI-la n8n + LLM + Autonomous Voice Agent use panni 2-sec screening mudithu 1-2 days-la offer dispatch pannidalam!
            </p>
          </div>

          {/* Comparison Table */}
          <div className="rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="grid grid-cols-3 bg-slate-900/90 p-3 font-bold border-b border-slate-800 text-slate-200">
              <div>Hiring Step</div>
              <div className="text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Traditional / LinkedIn
              </div>
              <div className="text-emerald-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> TalentPulse AI
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-3 p-3.5 border-b border-slate-800/60 bg-[#0c121e]/50 text-slate-300">
              <div className="font-semibold text-white">1. Resume Screening</div>
              <div className="text-red-300/80">HR manual-a 2-3 weeks paakkanum (Fatigue & Bias)</div>
              <div className="text-emerald-300 font-medium">AI Agent 2 seconds-la scan & verify pannum</div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 p-3.5 border-b border-slate-800/60 bg-[#0c121e]/30 text-slate-300">
              <div className="font-semibold text-white">2. Interview Scheduling</div>
              <div className="text-red-300/80">Phone calls, back-and-forth emails</div>
              <div className="text-emerald-300 font-medium">n8n Workflow automatic-a Google Cal sync pannum</div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-3 p-3.5 border-b border-slate-800/60 bg-[#0c121e]/50 text-slate-300">
              <div className="font-semibold text-white">3. Technical Assessment</div>
              <div className="text-red-300/80">Human HR 1-2 hours per candidate spend pannanum</div>
              <div className="text-emerald-300 font-medium">Autonomous AI Interviewer live audio stream edukkum</div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-3 p-3.5 bg-emerald-500/5 text-slate-300">
              <div className="font-semibold text-white">4. Final Turnaround</div>
              <div className="text-red-400 font-bold">Very slow process (1 Month)</div>
              <div className="text-emerald-400 font-bold">Instant & Autonomous (1-2 Days)</div>
            </div>
          </div>

          {/* Architecture Stack Badges */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Tech Stack Inside TalentPulse AI
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">React 18</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">n8n Workflow Engine</span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-mono">Supabase PostgreSQL</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono">Node.js Express</span>
              <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono">LLM Parser</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0d131f] flex justify-end">
          <button
            onClick={() => setShowComparison(false)}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
