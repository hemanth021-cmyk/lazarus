import React from 'react';

export default function BottomDataSection({ patient, auditLog }) {
  if (!patient) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-[20px] mb-8">
      {/* Pharmacy Portal */}
      <div className="flex-1 bg-card rounded-[12px] border border-border-div flex flex-col shadow-card overflow-hidden h-[300px]">
        <div className="px-[24px] py-[16px] border-b border-border-div">
          <h2 className="text-[15px] font-semibold text-text-dark flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Decrypted Pharmacy Dashboard
          </h2>
        </div>
        <div className="flex-1 overflow-auto p-[24px] bg-[#fafafa]">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border-div">
                <th className="pb-2 text-text-muted font-medium w-1/3">Raw Scramble</th>
                <th className="pb-2 text-text-muted font-medium w-1/3">Cipher Age Key</th>
                <th className="pb-2 text-text-dark font-semibold">Decoded Medication</th>
              </tr>
            </thead>
            <tbody>
              {patient.decryptedMeds?.map((med, i) => (
                <tr key={i} className="border-b border-border-div/50 bg-white shadow-sm rounded-md my-1">
                  <td className="py-3 px-2 font-mono text-xs text-text-muted border-l-4 border-gray-300 line-through opacity-70">{med.scrambled}</td>
                  <td className="py-3 px-2 text-text-muted">{med.age_key}</td>
                  <td className="py-3 px-2 font-bold text-pos-green">{med.decrypted_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log */}
      <div className="flex-1 bg-card rounded-[12px] border border-border-div flex flex-col shadow-card overflow-hidden h-[300px]">
        <div className="px-[24px] py-[16px] border-b border-border-div">
          <h2 className="text-[15px] font-semibold text-text-dark">Real-Time Telemetry Audit Log</h2>
        </div>
        <div className="flex-1 overflow-auto p-[24px]">
          <table className="w-full text-[12px] text-left">
             <thead>
               <tr className="border-b border-border-div text-text-muted">
                 <th className="pb-2 font-medium">Timestamp</th>
                 <th className="pb-2 font-medium">Sensor</th>
                 <th className="pb-2 font-medium">Raw Hex</th>
                 <th className="pb-2 font-medium">Processed Value</th>
               </tr>
             </thead>
             <tbody>
               {auditLog?.slice(0, 15).map((log, i) => (
                 <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-2.5 text-text-muted font-mono">{log.timestamp}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${log.type === 'BPM' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-xs text-text-muted">{log.rawHex}</td>
                    <td className="py-2.5 font-semibold text-text-dark">
                      {log.decodedVal} {log.interpolated && <span className="text-orange-500 ml-1 text-[10px] bg-orange-50 px-1 rounded-sm border border-orange-200">(Interpolated)</span>}
                    </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
