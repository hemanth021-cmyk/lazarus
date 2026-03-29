import React from 'react';

export default function TabNavigation() {
  const tabs = ['Dashboard', 'Vitals Monitor', 'Pharmacy Portal', 'Audit Log'];

  return (
    <div className="w-full flex flex-row items-center gap-[8px] py-[8px]">
      {tabs.map((tab) => {
        const isActive = tab === 'Vitals Monitor';
        return (
          <button 
            key={tab}
            className={`
              rounded-[20px] px-[18px] py-[7px] text-[13px] transition-colors
              ${isActive 
                ? 'bg-stat-blue border border-[#BFDBFE] text-primary font-semibold shadow-sm' 
                : 'bg-white border border-border-div text-[#4B5563] font-medium hover:bg-gray-50'
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
