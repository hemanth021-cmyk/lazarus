import React, { useState } from 'react';

export default function AlertBanner({ patient }) {
  const [snoozed, setSnoozed] = useState(false);
  
  const v = patient.vitalStatus;
  
  React.useEffect(() => {
    if (v?.severity === 'NORMAL') {
      setSnoozed(false);
    }
  }, [v?.severity]);

  if (v?.severity !== 'CRITICAL' && v?.severity !== 'WARNING') return null;
  if (snoozed && v?.severity !== 'CRITICAL') return null; 

  const isCrit = v.severity === 'CRITICAL';
  const colorBanner = isCrit ? 'border-neg-red bg-neg-red/5' : 'border-[#F59E0B] bg-[#F59E0B]/5';
  const colorText = isCrit ? 'text-neg-red' : 'text-[#F59E0B]';
  const colorDot = isCrit ? 'bg-neg-red shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-[#F59E0B]';

  return (
    <div className={`rounded-[12px] border p-4 flex items-center justify-between shadow-sm transition-all ${colorBanner} ${isCrit && !snoozed ? 'animate-pulse' : ''}`} role="alert">
      <div className="flex flex-col gap-1.5">
        <h3 className={`font-bold text-[15px] flex items-center gap-3 ${colorText}`}>
          <span className={`w-2 h-2 rounded-full ${colorDot}`}></span>
          {v.severity.charAt(0).toUpperCase() + v.severity.slice(1).toLowerCase()} Notice
        </h3>
        <p className="text-[13px] font-semibold text-text-dark">
          Patient {patient.patient_id} ({patient.parity}) &nbsp;—&nbsp; <span className={colorText}>{v.message}</span>
        </p>
      </div>
      <button 
        onClick={() => setSnoozed(true)}
        className={`px-4 py-1.5 rounded-[6px] font-semibold text-[12px] transition-colors border ${isCrit ? 'border-neg-red/30 hover:bg-neg-red/10 text-neg-red' : 'border-[#F59E0B]/30 hover:bg-[#F59E0B]/10 text-[#F59E0B]'}`}
      >
        Acknowledge
      </button>
    </div>
  );
}
