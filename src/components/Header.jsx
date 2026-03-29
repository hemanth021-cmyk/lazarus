import React from 'react';

export default function Header({ stats }) {
  return (
    <header className="sticky top-0 w-full h-14 border-b border-border-div bg-card z-50 flex items-center justify-between px-6 shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight text-text-dark flex items-center gap-2">
          <img src="./logo.png" alt="Lazarus Logo" className="w-8 h-8 object-contain rounded-md shadow-[0_0_10px_rgba(14,165,233,0.3)]"/>
          Project Lazarus
        </h1>
        <span className="text-xs text-text-muted border-l border-border-div pl-4 py-1">Forensic Recovery System</span>
      </div>
      <div className="flex items-center gap-6">
        {stats.activeAlerts ? (
          <div className="bg-neg-red/10 border border-neg-red/20 text-neg-red px-3 py-1 flex items-center gap-2 font-bold text-xs uppercase tracking-wide rounded-full animate-pulse shadow-sm">
            <span className="w-2 h-2 rounded-full bg-neg-red"></span>
            Critial Telemetry Detected
          </div>
        ) : (
          <div className="bg-pos-green/10 border border-pos-green/20 text-pos-green px-3 py-1 flex items-center gap-2 font-bold text-xs uppercase tracking-wide rounded-full">
            <span className="w-2 h-2 rounded-full bg-pos-green animate-pulse"></span>
            System Active
          </div>
        )}
        <div className="text-xs font-semibold flex items-center gap-2 text-text-muted">
          P-RECOVERED<span className="text-text-dark text-sm bg-gray-100 px-2 py-0.5 rounded-md border border-border-div ml-1 font-bold">{stats.recovered}</span>
        </div>
      </div>
    </header>
  );
}
