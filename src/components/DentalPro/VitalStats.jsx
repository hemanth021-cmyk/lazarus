import React from 'react';

export default function VitalStats({ patient }) {
  if (!patient) return null;

  const currentBPM = patient.decodedBPMs[patient.decodedBPMs.length - 1];
  const currentO2 = patient.interpolatedO2s[patient.interpolatedO2s.length - 1];
  const isCritical = patient.vitalStatus?.severity === 'CRITICAL';

  const cards = [
    { label: 'Current Heart Rate', value: `${currentBPM} BPM`, bg: isCritical ? 'bg-red-100' : 'bg-stat-green', specialColor: isCritical ? 'text-neg-red' : '' },
    { label: 'Oxygen Saturation', value: `${currentO2}%`, bg: 'bg-stat-blue' },
    { label: 'Decoded Identifier', value: patient.decodedName, bg: 'bg-stat-yellow' },
    { label: 'Ward Detail', value: `Age: ${patient.age} Parity: ${patient.parity}`, bg: 'bg-stat-peach' }
  ];

  return (
    <div className="bg-card rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col h-full h-full min-h-[380px] relative z-10 transition-colors">
      <h2 className="text-[16px] font-semibold text-text-dark mb-[20px]">Decoded Patient Vital Stats</h2>
      <div className="flex flex-col gap-[12px] flex-1">
        {cards.map((c, i) => (
          <div key={i} className={`flex-1 rounded-[10px] ${c.bg} p-[14px] px-[18px] flex flex-col justify-center border border-black/5 transition-colors`}>
            <span className="text-[12px] font-medium text-text-muted">{c.label}</span>
            <span className={`text-[26px] font-bold text-text-dark mt-0.5 tracking-tight ${c.specialColor}`}>{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
