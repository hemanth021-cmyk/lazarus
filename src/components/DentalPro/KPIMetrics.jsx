import React from 'react';

export default function KPIMetrics({ patients }) {
  const totalPatients = patients?.length || 0;
  
  const criticalCount = patients.filter(p => p.vitalStatus?.severity === 'CRITICAL').length;
  const stableCount = patients.filter(p => p.vitalStatus?.severity === 'NORMAL').length;
  const missingCount = patients.reduce((acc, p) => acc + p.hex_o2.filter(h => h === '0x00').length, 0);
  const medCount = patients.reduce((acc, p) => acc + (p.decryptedMeds?.length || 0), 0);

  const KPIData = [
    {
      label: 'Recovered Nodes',
      value: totalPatients.toString(),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      subtext: 'Decrypted Successfully',
    },
    {
      label: 'Stable Patients',
      value: stableCount.toString(),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      trend: 'up',
      trendVal: '100%',
      trendText: 'Safe',
    },
    {
      label: 'Active Critical Alerts',
      value: criticalCount.toString(),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      trend: criticalCount > 0 ? 'down' : 'up',
      trendVal: criticalCount > 0 ? 'Urgent' : 'Clear',
      trendText: 'Triage Queue',
    },
    {
      label: 'Interpolation Gaps Fixed',
      value: missingCount.toString(),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
      trend: 'up',
      trendVal: 'Live',
      trendText: 'Mathematical Fix',
    },
    {
      label: 'Decrypted Pharmacy Logs',
      value: medCount.toString(),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />,
      subtext: 'Double Cipher Smashed',
    }
  ];

  return (
    <div className="w-full bg-card rounded-[12px] border border-border-div px-[32px] py-[24px] shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border-div gap-y-6">
        {KPIData.map((kpi, idx) => (
          <div key={idx} className={`flex flex-col ${idx === 0 ? 'md:pr-6' : idx === 4 ? 'md:pl-6' : 'md:px-6'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-text-muted">{kpi.label}</span>
              <svg className="w-[18px] h-[18px] text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {kpi.icon}
              </svg>
            </div>
            
            <div className={`text-[28px] font-bold text-text-dark mt-3 mb-2 tracking-tight ${!kpi.trendVal ? 'mb-0' : ''}`}>
              {kpi.value}
            </div>
            
            {kpi.subtext && (
              <div className="text-[12px] text-text-muted font-medium mt-1">
                {kpi.subtext}
              </div>
            )}
            
            {kpi.trendVal && (
              <div className="flex items-center gap-1.5 mt-auto">
                <div className={`flex items-center font-medium ${kpi.trend === 'up' ? 'text-pos-green' : 'text-neg-red'}`}>
                  {kpi.trend === 'up' ? (
                    <svg className="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  <span className="text-[12px] leading-none block">{kpi.trendVal}</span>
                </div>
                <span className="text-[12px] text-text-muted font-medium ml-1 leading-none">{kpi.trendText}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
