import React from 'react';

export default function NoShowChart() {
  const data = [
    { x: 'Jan', y: 4.8 },
    { x: 'Feb', y: 5.5 },
    { x: 'Mar', y: 6.0 }, // active point
    { x: 'Apr', y: 4.5 },
    { x: 'May', y: 3.8 },
    { x: 'Jun', y: 5.9 }
  ];

  // SVG metrics
  const w = 500;
  const h = 210;
  
  // X coords for the 6 months
  const dx = w / 5;
  const xPoints = data.map((_, i) => i * dx);

  // Math to map Y strictly between 0 and 8 No-Show Rate
  const mapY = (val) => h - (val / 8) * h;
  const yPoints = data.map(d => mapY(d.y));

  // Construct a smooth spline string (basic bezier approximation for standard charting)
  // Tension = 0.3
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

  const activeIdx = 2; // March
  const activeX = xPoints[activeIdx];
  const activeY = yPoints[activeIdx];

  return (
    <div className="bg-card rounded-[12px] border border-border-div p-[24px] shadow-card flex flex-col min-h-[380px] h-full">
      <h2 className="text-[16px] font-semibold text-text-dark mb-[40px]">No-Show Rate Trend</h2>
      
      <div className="flex-1 relative flex">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-between items-start w-[30px] h-full pb-6 text-[11px] text-[#9CA3AF]">
          <span>8</span>
          <span>6</span>
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>
        
        {/* Chart Viewport */}
        <div className="flex-1 relative h-full">
          <svg width="100%" height="100%" viewBox={`-10 -10 ${w+20} ${h+20}`} preserveAspectRatio="none" className="overflow-visible">
            
            {/* The primary line */}
            <path d={getSpline()} className="spline-path" stroke="#2B4EFF" />
            
            {/* The active point marker */}
            <circle cx={activeX} cy={activeY} r="4" fill="#FFFFFF" stroke="#2B4EFF" strokeWidth="2.5" className="drop-shadow-sm" />
          </svg>

          {/* Tooltip HTML overlaid perfectly over 'March' */}
          <div 
            className="absolute z-10 bg-white border border-gray-100 rounded-[8px] shadow-tooltip p-[12px] px-[14px] flex flex-col gap-1.5"
            style={{
              left: `calc(${(activeIdx / 5) * 100}% + 20px)`,
              top: `calc(${activeY / h * 100}% - 70px)`,
              transform: 'translateX(-50%)' // center above point roughly
            }}
          >
            <div className="text-[13px] font-semibold text-text-dark">March</div>
            <div className="flex items-center gap-[6px]">
              <div className="w-[6px] h-[6px] rounded-full bg-primary shadow-[0_0_2px_rgba(43,78,255,0.4)]"></div>
              <span className="text-[12px] text-[#4B5563] font-medium">No-Show Rate (%): <span className="font-semibold text-text-dark">6</span></span>
            </div>
          </div>

          {/* X Axis Labels */}
          <div className="absolute left-0 bottom-0 w-full flex justify-between transform translate-y-6 text-[11px] text-[#9CA3AF] font-medium pl-0.5">
            {data.map((d, i) => (
               <span key={i} className={`w-8 text-center ${i===activeIdx ? 'text-primary font-semibold' : ''}`} style={{marginLeft: '-16px'}}>{d.x}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
