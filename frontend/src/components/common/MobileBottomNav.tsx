import React from 'react';
import { Home, Bot, FileText, ShieldCheck, MessageSquareText } from 'lucide-react';
import { LanguageCode } from '../../types';
import { getTranslation } from '../../data/translations';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentLang: LanguageCode;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  currentLang,
}) => {
  const items = [
    { id: 'home', label: getTranslation(currentLang, 'navHome'), icon: Home },
    { id: 'schemes', label: 'Schemes', icon: FileText },
    { id: 'chat', label: 'CoopSathi', icon: Bot, isCenter: true },
    { id: 'pmfby', label: 'PMFBY', icon: ShieldCheck },
    { id: 'grievance', label: 'Grievance', icon: MessageSquareText },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-2 py-1.5">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
                aria-label="Open AI Assistant"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF9933] to-[#EA580C] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 active:scale-95 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-800 mt-0.5">
                  AI Chat
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors focus:outline-none ${
                isActive ? 'text-[#0A2540] font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0A2540] stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
