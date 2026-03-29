import React from 'react';

export default function AuditLog({ logs }) {
  return (
    <div className="h-64 border-t flex-shrink-0 border-border-div bg-white flex flex-col custom-scrollbar shadow-card z-20">
      <div className="px-6 py-3 border-b border-border-div flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <h2 className="text-text-dark font-semibold tracking-wide text-[13px] uppercase flex items-center gap-2">
          Forensic Telemetry Audit
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">LIVE FEED</span>
        </h2>
      </div>
      <div className="flex-1 overflow-auto p-0 relative bg-gray-50">
        <table className="w-full text-left text-[12px] relative">
          <thead className="sticky top-0 bg-white z-20 shadow-sm">
            <tr className="text-text-muted uppercase tracking-wider border-b border-border-div text-[10px]">
              <th className="p-3 pl-6 w-32 font-semibold">Timestamp</th>
              <th className="p-3 w-40 font-semibold">Patient ID</th>
              <th className="p-3 w-24 font-semibold">Type</th>
              <th className="p-3 font-mono font-semibold">Decoded Value</th>
              <th className="p-3 font-mono font-semibold">Raw Hex Input</th>
              <th className="p-3 font-semibold">Status / Interpolation</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className={`border-b border-border-div/50 hover:bg-white transition-colors text-text-dark font-mono ${log.interpolated ? 'bg-[#F59E0B]/5' : ''}`}>
                <td className="py-2.5 px-6 text-text-muted whitespace-nowrap">{log.timestamp}</td>
                <td className="py-2.5 p-3 font-sans font-bold text-text-dark">{log.patientId}</td>
                <td className={`py-2.5 p-3 font-bold font-sans ${log.type === 'BPM' ? 'text-primary' : 'text-pos-green'}`}>
                  <span className={`px-2 py-0.5 rounded-sm ${log.type === 'BPM' ? 'bg-primary/10' : 'bg-pos-green/10'}`}>{log.type}</span>
                </td>
                <td className="py-2.5 p-3 font-mono font-bold whitespace-nowrap text-text-dark text-[14px]">
                  {log.decodedVal} <span className="text-[10px] text-text-muted font-sans font-normal">{log.type === 'O2' ? '%' : 'BPM'}</span>
                </td>
                <td className="py-2.5 p-3 font-mono text-text-muted tracking-widest">{log.rawHex}</td>
                <td className="py-2.5 p-3 font-sans">
                  {log.interpolated ? (
                     <span className="text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded-sm border border-[#F59E0B]/20 font-semibold text-[10px] inline-flex items-center gap-1.5 flex-nowrap whitespace-nowrap">
                       <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-sm transform rotate-45"></span>
                       INTERPOLATED (MISSING HEX)
                     </span>
                  ) : <span className="text-text-muted text-[10px] font-medium">✓ Verified</span>}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-text-muted text-[13px] italic bg-white">Waiting for incoming telemetry streams...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
