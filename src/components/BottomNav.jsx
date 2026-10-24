import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Target, Bot, LayoutDashboard } from 'lucide-react';

export const BottomNav = ({ active, onSelect }) => {
  const { activeTab, setActiveTab } = useApp();
  const current = active || activeTab;
  const setTab = onSelect || setActiveTab;

  const tabs = [
    { id: 'apply', label: 'Apply', icon: Briefcase },
    { id: 'match', label: 'Match Score', icon: Target },
    { id: 'interview', label: 'Live Agent', icon: Bot },
    { id: 'hr', label: 'HR Hub', icon: LayoutDashboard }
  ];

  return (
    <div className="flex items-center justify-around py-2.5 px-3 border-t border-slate-800/80 bg-[#0d131f]/95 backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = current === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-all ${
              isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-500/10' : ''}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono tracking-tight font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
