import React from 'react';

export default function BPMGraph({ patient }) {
  if (!patient || !patient.decodedBPMs) return <div className="bg-card rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col min-h-[300px] h-full justify-center items-center text-text-muted">Waiting for stream...</div>;

  const dataPoints = patient.decodedBPMs.slice(-15);
  while(dataPoints.length < 15) dataPoints.unshift(75);

  const w = 500;
  const h = 210;
  const dx = w / (dataPoints.length - 1);
  const xPoints = dataPoints.map((_, i) => i * dx);

  const mapY = (val) => h - ((val - 30) / (200 - 30)) * h;
  const yPoints = dataPoints.map(v => mapY(v));

  const getSpline = () => {
    let path = `M ${xPoints[0]} ${yPoints[0]}`;
    for (let i = 0; i < dataPoints.length - 1; i++) {
      const cx1 = xPoints[i] + dx * 0.4;
      const cy1 = yPoints[i];
      const cx2 = xPoints[i+1] - dx * 0.4;
      const cy2 = yPoints[i+1];
      const ex = xPoints[i+1];
      const ey = yPoints[i+1];
      path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${ey}`;
    }
    return path;
  };

  const activeIdx = dataPoints.length - 1;
  const activeX = xPoints[activeIdx];
  const activeY = yPoints[activeIdx];
  const currentValue = dataPoints[activeIdx];

  const isCrit = patient.vitalStatus?.severity === 'CRITICAL';

  return (
    <div className="bg-white rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col h-full min-h-[300px] relative overflow-hidden">
      {isCrit && (
        <div className="absolute inset-0 bg-neg-red/5 animate-pulse rounded-[12px] pointer-events-none" />
      )}
      
      <div className="flex justify-between items-center mb-[40px] relative z-10">
        <h2 className="text-[14px] font-semibold text-text-dark tracking-wide">Live Heart Rate Telemetry</h2>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 shadow-sm">
            <span className="w-2 rounded-full h-2 bg-pos-green animate-ping"></span>
            <span className="text-[12px] font-bold text-pos-green tracking-widest">{currentValue} BPM</span>
        </div>
      </div>
      
      <div className="flex-1 relative flex z-10">
        <div className="flex flex-col justify-between items-start w-[30px] h-full pb-6 text-[10px] text-text-muted font-mono">
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>30</span>
        </div>
        
        <div className="flex-1 relative h-full">
          <svg width="100%" height="100%" viewBox={`-10 -10 ${w+20} ${h+20}`} preserveAspectRatio="none" className="overflow-visible">
            <path d={getSpline()} className="spline-path" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke={isCrit ? '#EF4444' : '#FF6B00'} />
            <circle cx={activeX} cy={activeY} r="4.5" fill="#FFFFFF" stroke={isCrit ? '#EF4444' : '#FF6B00'} strokeWidth="2.5" className="drop-shadow-sm" />
          </svg>
        </div>
      </div>
    </div>
  );
}
