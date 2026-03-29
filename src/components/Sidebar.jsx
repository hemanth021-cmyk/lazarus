import React, { useState } from 'react';

function MiniSparkline({ data, color }) {
  const w = 260, h = 24;
  const recentData = data.slice(-15);
  if (recentData.length < 2) return null;
  const max = 150, min = 30;
  const points = recentData.map((val, idx) => {
    const x = (idx / (recentData.length - 1)) * w;
    const y = h - ((val - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PatientListItem({ patient, isSelected, onClick }) {
  const isCritical = patient.vitalStatus?.severity === 'CRITICAL';
  const lastBPM = patient.decodedBPMs[patient.decodedBPMs.length - 1] || '--';

  return (
    <div 
      onClick={onClick}
      className={`p-4 cursor-pointer border-l-[3px] transition-all duration-200 border-b border-border-div ${
        isSelected ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-gray-50'
      } ${isCritical && !isSelected ? 'border-neg-red bg-neg-red/5 hover:bg-neg-red/10' : ''}`}
    >
      <div className="flex justify-between items-start">
        <span className={`font-bold text-[14px] ${isCritical ? 'text-neg-red' : 'text-text-dark'}`}>
          {patient.patient_id} <span className="text-[10px] text-text-muted">[{patient.parity}]</span>
        </span>
        <span className={`text-[9px] px-1.5 py-0.5 font-bold tracking-wider rounded-sm ${
          isCritical 
            ? 'animate-pulse bg-neg-red/20 text-neg-red border border-neg-red/30' 
            : 'bg-pos-green/10 text-pos-green border border-pos-green/20'
        }`}>
          {isCritical ? '● CRITICAL' : '● STABLE'}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="text-[12px] text-text-muted truncate font-medium">{patient.decodedName}</div>
        <div className={`text-[8px] px-1 py-[1px] font-bold uppercase tracking-widest rounded-sm border ${patient.corruption_status === 'CLEAN' ? 'bg-pos-green/10 text-pos-green border-pos-green/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
          {patient.corruption_status === 'CLEAN' ? 'CLEAN' : 'ENCRYPTED'}
        </div>
      </div>
      <div className="flex justify-between items-end mt-2.5">
        <span className="text-[10px] text-text-muted font-bold tracking-widest uppercase rounded-sm bg-card border border-border-div px-2 py-0.5 shadow-sm">WARD {patient.ward_code}</span>
        <span className={`text-[12px] font-bold ${isCritical ? 'text-neg-red' : 'text-text-dark'}`}>{lastBPM} BPM</span>
      </div>
      <div className="h-6 mt-3 opacity-90">
        <MiniSparkline data={patient.decodedBPMs} color={isCritical ? '#EF4444' : (isSelected ? '#0EA5E9' : '#888888')} />
      </div>
    </div>
  );
}

export default function Sidebar({ patients, selectedPatientId, onSelectPatient }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p => {
    const searchLow = searchTerm.toLowerCase();
    return p.decodedName.toLowerCase().includes(searchLow) || 
           p.patient_id.toLowerCase().includes(searchLow);
  });

  return (
    <aside className="w-[320px] border-r border-border-div overflow-y-auto bg-card flex flex-col shrink-0 relative z-10 shadow-sm custom-scrollbar">
      <div className="p-4 border-b border-border-div sticky top-0 bg-card/95 backdrop-blur-sm z-10 flex flex-col gap-3 shadow-sm">
        <div className="flex justify-between items-center text-[10px] text-text-muted uppercase tracking-widest font-bold">
          <span>Patient Roster</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-text-dark border border-gray-200">{filteredPatients.length} Match</span>
        </div>
        <div className="relative">
          <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
             <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-page border border-border-div text-text-dark text-[13px] rounded-[6px] pl-9 pr-3 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-medium placeholder-text-muted"
          />
        </div>
      </div>
      <div className="flex flex-col bg-page">
        {filteredPatients.length > 0 ? filteredPatients.map(p => (
          <PatientListItem 
            key={p.uniqueId}
            patient={p} 
            isSelected={selectedPatientId === p.uniqueId} 
            onClick={() => onSelectPatient(p.uniqueId)} 
          />
        )) : (
          <div className="text-center p-8 text-text-muted text-sm font-medium italic">
            No patients found matching "{searchTerm}"
          </div>
        )}
      </div>
    </aside>
  );
}
