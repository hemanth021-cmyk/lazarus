import React from 'react';

const navItems = [
  { id: 'HOME', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
  { id: 'THREAT', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894l5.447-2.724 5.447 2.724a1 1 0 01.553.894v10.764a1 1 0 01-.553.894L9 20zm0 0l5.447-2.724A1 1 0 0015 16.382V5.618m0 0l5.447 2.724A1 1 0 0121 9.236v10.764a1 1 0 01-.553.894L15 23m0 0V5.618M9 20L3 23v-6.618', label: 'Sector Map' },
  { id: 'CRYPTO', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z', label: 'Key Hub' },
  { id: 'REPORTS', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Export' },
];

export default function GlobalSidebar({ activeTab, setActiveTab }) {
  return (
    <nav className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 gap-6 shrink-0 z-20 shadow-xl relative">
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-10 h-10 rounded-[8px] flex items-center justify-center transition-all duration-200 ${
              isActive 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title={item.label}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
          </button>
        );
      })}
    </nav>
  );
}
