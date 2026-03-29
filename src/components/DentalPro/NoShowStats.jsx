import React from 'react';

export default function NoShowStats() {
  const cards = [
    { label: 'Total Scheduled', value: '3040', bg: 'bg-stat-green' },
    { label: 'Completed', value: '2743', bg: 'bg-stat-blue' },
    { label: 'No-Shows', value: '177', bg: 'bg-stat-yellow' },
    { label: 'Cancelled', value: '120', bg: 'bg-stat-peach' }
  ];

  return (
    <div className="bg-card rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col h-full h-full min-h-[380px]">
      <h2 className="text-[16px] font-semibold text-text-dark mb-[20px]">No-Show Statistics</h2>
      <div className="flex flex-col gap-[12px] flex-1">
        {cards.map((c, i) => (
          <div key={i} className={`flex-1 rounded-[10px] ${c.bg} p-[14px] px-[18px] flex flex-col justify-center border border-black/5`}>
            <span className="text-[12px] font-medium text-text-muted">{c.label}</span>
            <span className="text-[26px] font-bold text-text-dark mt-0.5 tracking-tight">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
