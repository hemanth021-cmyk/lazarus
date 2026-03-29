import React from 'react';

export default function O2Graph({ patient }) {
  if (!patient || !patient.interpolatedO2s) return null;

  const data = patient.interpolatedO2s.slice(-15);
  while(data.length < 15) data.unshift(98);
  const raw = patient.hex_o2.slice(-15);
  while(raw.length < 15) raw.unshift('0x62');

  const currentO2 = data[data.length - 1] || 0;
  
  const w = 500, h = 210;
  const min = 80, max = 100;
  const dx = w / (data.length - 1);
  const xPoints = data.map((_, i) => i * dx);

  const mapY = (val) => h - ((Math.max(min, Math.min(max, val)) - min) / (max - min)) * h;
  const yPoints = data.map(v => mapY(v));

  const getSpline = () => {
    let path = `M ${xPoints[0]} ${yPoints[0]}`;
    for (let i = 0; i < data.length - 1; i++) {
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

  const isWarning = currentO2 < 95;
  const isCritical = currentO2 < 90;

  let lineColor = '#FF6B00'; 
  if (isCritical) lineColor = '#EF4444';
  else if (isWarning) lineColor = '#F59E0B';

  return (
    <div className="bg-white rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col h-full min-h-[300px] relative overflow-hidden">
      {isCritical && (
        <div className="absolute inset-0 bg-neg-red/5 animate-pulse rounded-[12px] pointer-events-none" />
      )}
      <div className="flex justify-between items-center mb-[40px] relative z-10 w-full">
        <h2 className="text-[14px] font-semibold text-text-dark tracking-wide flex items-center gap-3">
          Blood Oxygen Saturation
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 border border-primary/20 rounded-md font-bold shadow-sm">INTERPOLATION ENGINE</span>
        </h2>
        <div className="flex flex-col items-end">
          <span className="text-[20px] font-bold tabular-nums drop-shadow-sm" style={{color: lineColor}}>
            {currentO2}% <span className="text-[12px] text-text-muted font-medium ml-1">SpO2</span>
          </span>
        </div>
      </div>

      <div className="flex-1 relative flex z-10">
        <div className="flex flex-col justify-between items-start w-[30px] h-full pb-6 text-[10px] text-text-muted font-mono">
          <span>100</span>
          <span>95</span>
          <span>90</span>
          <span>80</span>
        </div>
        
        <div className="flex-1 relative h-full">
          <svg width="100%" height="100%" viewBox={`-10 -10 ${w+20} ${h+20}`} preserveAspectRatio="none" className="overflow-visible">
            {/* Threshold Lines */}
            <line x1="0" y1={mapY(95)} x2={w} y2={mapY(95)} stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4" />
            <line x1="0" y1={mapY(90)} x2={w} y2={mapY(90)} stroke="#EF4444" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 4" />

            <path d={getSpline()} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" stroke={lineColor} />

            {data.map((val, i) => {
              const isInterpolated = raw[i] === '0x00';
              const cx = xPoints[i];
              const cy = mapY(val);
              if (isInterpolated) {
                // Orange Diamond
                return <path key={i} d={`M${cx-5},${cy} L${cx},${cy-5} L${cx+5},${cy} L${cx},${cy+5} Z`} fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" className="drop-shadow-sm" />
              }
              return <circle key={i} cx={cx} cy={cy} r="4" fill="#FFFFFF" stroke={lineColor} strokeWidth="2.5" className="drop-shadow-sm" />
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
