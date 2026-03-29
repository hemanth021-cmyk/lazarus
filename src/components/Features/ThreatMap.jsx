import React, { useState, useEffect } from 'react';

const Wards = [
  { id: 'ICU', name: 'Intensive Care Unit', status: 'ENCRYPTED', progress: 45, threat: 'HIGH' },
  { id: 'ER', name: 'Emergency Room', status: 'DECRYPTING', progress: 82, threat: 'MODERATE' },
  { id: 'OR-1', name: 'Operating Room 1', status: 'CLEAN', progress: 100, threat: 'NONE' },
  { id: 'NICU', name: 'Neonatal ICU', status: 'ENCRYPTED', progress: 12, threat: 'CRITICAL' },
  { id: 'LAB', name: 'Pathology Lab', status: 'CLEAN', progress: 100, threat: 'NONE' },
  { id: 'PHARM', name: 'Pharmacy SubNet', status: 'DECRYPTING', progress: 95, threat: 'LOW' },
];

export default function ThreatMap() {
  const [nodes, setNodes] = useState(Wards);

  // Simulate progress
  useEffect(() => {
    const i = setInterval(() => {
      setNodes(prev => prev.map(n => {
        if (n.status === 'DECRYPTING') {
          const newP = Math.min(100, n.progress + Math.floor(Math.random() * 5));
          if (newP === 100) return { ...n, progress: 100, status: 'CLEAN', threat: 'NONE' };
          return { ...n, progress: newP };
        }
        return n;
      }));
    }, 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-page">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="bg-card shadow-sm border border-border-div p-6 rounded-[12px] flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-text-dark tracking-tight">Node Integrity Map</h1>
            <p className="text-sm text-text-muted mt-1 font-medium">Monitoring sector-level decryption progress</p>
          </div>
          <div className="flex gap-4 p-2">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-neg-red"></span><span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Encrypted</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span><span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Decrypting</span></div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-pos-green"></span><span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Clean</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map(node => (
            <div key={node.id} className="bg-card shadow-sm rounded-[12px] p-6 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md border border-border-div">
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-text-dark tracking-tight">{node.id}</h3>
                  <p className="text-xs text-text-muted font-bold tracking-widest uppercase mt-1">{node.name}</p>
                </div>
                <div className={`px-2 py-1 text-[10px] font-bold rounded-sm uppercase tracking-widest border ${
                  node.status === 'CLEAN' ? 'bg-pos-green/10 text-pos-green border-pos-green/20' :
                  node.status === 'DECRYPTING' ? 'bg-primary/10 text-primary border-primary/20 animate-pulse' :
                  'bg-neg-red/10 text-neg-red border-neg-red/20'
                }`}>
                  {node.status}
                </div>
              </div>
              
              <div className="mt-auto relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Network Restoration</span>
                  <span className="text-lg font-bold font-mono text-text-dark">{node.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${node.progress === 100 ? 'bg-pos-green' : 'bg-primary'}`} 
                    style={{width: `${node.progress}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
