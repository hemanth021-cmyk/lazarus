import React from 'react';

export default function LiveBPMChart({ patient }) {
  if (!patient || !patient.decodedBPMs) return <div className="bg-card rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col min-h-[380px] h-full justify-center items-center text-text-muted">Waiting for stream...</div>;

  // We are going to plot the last 15 seconds (15 data points)
  const dataPoints = patient.decodedBPMs.slice(-15);
  // Ensure we have 15 points
  while(dataPoints.length < 15) dataPoints.unshift(75);

  const w = 500;
  const h = 210;
  const dx = w / (dataPoints.length - 1);
  const xPoints = dataPoints.map((_, i) => i * dx);

  // Math to map Y between 30 (bottom) and 200 (top)
  const mapY = (val) => h - ((val - 30) / (200 - 30)) * h;
  const yPoints = dataPoints.map(v => mapY(v));

  // Construct a smooth spline string
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

  const activeIdx = dataPoints.length - 1; // current live point
  const activeX = xPoints[activeIdx];
  const activeY = yPoints[activeIdx];
  const currentValue = dataPoints[activeIdx];

  return (
    <div className="bg-card rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col min-h-[380px] h-full relative overflow-hidden">
      {patient.vitalStatus?.severity === 'CRITICAL' && (
        <div className="absolute inset-0 bg-neg-red/5 animate-pulse rounded-[12px] pointer-events-none" />
      )}
      
      <div className="flex justify-between items-center mb-[40px] relative z-10">
        <h2 className="text-[16px] font-semibold text-text-dark">Live BPM Telemetry Spline - {patient.uniqueId}</h2>
        <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pos-green animate-ping"></span>
            <span className="text-[12px] font-semibold text-pos-green">LIVE</span>
        </div>
      </div>
      
      <div className="flex-1 relative flex z-10">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-between items-start w-[30px] h-full pb-6 text-[11px] text-[#9CA3AF]">
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>30</span>
        </div>
        
        {/* Chart Viewport */}
        <div className="flex-1 relative h-full">
          <svg width="100%" height="100%" viewBox={`-10 -10 ${w+20} ${h+20}`} preserveAspectRatio="none" className="overflow-visible">
            
            {/* The primary line */}
            <path d={getSpline()} className="spline-path" stroke={patient.vitalStatus?.severity === 'CRITICAL' ? '#EF4444' : '#2B4EFF'} />
            
            {/* The active point marker */}
            <circle cx={activeX} cy={activeY} r="4" fill="#FFFFFF" stroke={patient.vitalStatus?.severity === 'CRITICAL' ? '#EF4444' : '#2B4EFF'} strokeWidth="2.5" className="drop-shadow-sm" />
          </svg>

          {/* Tooltip HTML overlaid perfectly over current node */}
          <div 
            className="absolute z-10 bg-white border border-gray-100 rounded-[8px] shadow-tooltip p-[12px] px-[14px] flex flex-col gap-1.5"
            style={{
              left: `calc(100% + 20px)`,
              top: `calc(${activeY / h * 100}% - 70px)`,
              transform: 'translateX(-50%)' 
            }}
          >
            <div className="text-[13px] font-semibold text-text-dark">Current Reading</div>
            <div className="flex items-center gap-[6px]">
              <div className={`w-[6px] h-[6px] rounded-full ${patient.vitalStatus?.severity === 'CRITICAL' ? 'bg-neg-red' : 'bg-primary'} shadow-sm`}></div>
              <span className="text-[12px] text-[#4B5563] font-medium">BPM: <span className="font-semibold text-text-dark">{currentValue}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
