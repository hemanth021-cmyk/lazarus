import React from 'react';

export default function IdentityCard({ patient }) {
  const isCritical = patient.vitalStatus?.severity === 'CRITICAL';
  return (
    <div className={`border bg-card rounded-[12px] relative shadow-card transition-colors ${isCritical ? 'border-neg-red' : 'border-border-div'}`}>
      <div className={`px-5 py-3 flex justify-between items-center border-b rounded-t-[12px] ${isCritical ? 'bg-neg-red/5 border-neg-red/20' : 'bg-white border-border-div'}`}>
        <h2 className={`font-semibold tracking-wide text-[13px] flex items-center gap-2 ${isCritical ? 'text-neg-red' : 'text-text-dark'}`}>
          Patient Identity
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isCritical ? 'bg-neg-red/10 text-neg-red' : 'bg-pos-green/10 text-pos-green'}`}>VERIFIED</span>
        </h2>
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div>
          <label className="text-[11px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Decoded Name</label>
          <div className="text-[20px] font-bold text-text-dark font-sans tracking-tight">{patient.decodedName}</div>
          <div className="text-[11px] text-text-muted mt-1 font-mono tracking-tight bg-gray-50 p-2 rounded-md border border-gray-100 inline-block">RAW HEX: {patient.raw_name}</div>
        </div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <label className="text-[11px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Patient ID</label>
            <div className="text-[14px] font-bold text-text-dark">{patient.patient_id}</div>
          </div>
          <div>
            <label className="text-[11px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Parity Key</label>
            <div className={`text-[11px] font-bold px-2 py-0.5 rounded-md inline-block border ${patient.parity === 'EVEN' ? 'bg-primary/5 text-primary border-primary/20' : 'bg-[#F59E0B]/5 text-[#F59E0B] border-[#F59E0B]/20'}`}>{patient.parity}</div>
          </div>
          <div>
            <label className="text-[11px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Age / DOB</label>
            <div className="text-[14px] font-bold text-text-dark">{patient.age || '--'} YRS <span className="text-[11px] text-text-muted block font-medium">{patient.dob || 'Missing Record'}</span></div>
          </div>
          <div>
            <label className="text-[11px] text-text-muted font-semibold uppercase tracking-wider block mb-1">Ward</label>
            <div className="text-[14px] font-bold text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 inline-block rounded-md">{patient.ward_code}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 pt-5 border-t border-border-div">
          <label className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Live Status</label>
          <div className={`text-[13px] font-bold tracking-wide flex items-center gap-2 ${isCritical ? 'text-neg-red' : 'text-pos-green'}`}>
            <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-neg-red animate-pulse' : 'bg-pos-green'}`}></span>
            {isCritical ? 'CRITICAL' : 'STABLE'}
          </div>
        </div>
      </div>
    </div>
  );
}
