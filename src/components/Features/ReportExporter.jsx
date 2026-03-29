import React, { useState } from 'react';

export default function ReportExporter({ patient, auditLog }) {
  const [exporting, setExporting] = useState(false);

  if (!patient) return <div className="p-8 text-center text-text-muted mt-20 font-bold tracking-widest uppercase">Select Patient from Roster to Generate Export.</div>;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('Medical Audit PDF Generated.');
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-auto p-12 bg-page flex justify-center items-start custom-scrollbar">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        
        <div className="flex justify-between items-center bg-card p-6 rounded-[12px] border border-border-div shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-text-dark tracking-tight">System Record Exporter</h1>
            <p className="text-sm text-text-muted font-medium mt-1">Export clean telemetry logs & verified pharmacy data.</p>
          </div>
          <button 
            onClick={handleExport}
            disabled={exporting}
            className={`px-6 py-2.5 rounded-[8px] font-bold text-sm text-white shadow-sm flex items-center transition-all ${exporting ? 'bg-primary/50 cursor-wait' : 'bg-primary hover:opacity-90'}`}
          >
            {exporting ? 'Processing File...' : 'Download Export'}
          </button>
        </div>

        {/* The Minimalist Document */}
        <div className="bg-white border border-border-div shadow-sm p-12 aspect-[1/1.4] relative overflow-hidden flex flex-col gap-8 rounded-lg">
          
          <div className="text-center pb-8 border-b border-border-div">
            <h2 className="text-2xl font-bold tracking-wide text-text-dark uppercase">Lazarus Recovery Platform</h2>
            <p className="text-xs font-bold tracking-widest text-text-muted mt-2 uppercase">VERIFIED PATIENT HEALTH RECORD</p>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-[14px]">
            <div className="flex flex-col"><span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Medical ID</span><span className="font-bold text-text-dark text-lg">{patient.patient_id}-{patient.parity}</span></div>
            <div className="flex flex-col"><span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Decrypted Profile</span><span className="font-bold text-lg text-primary">{patient.decodedName}</span></div>
            <div className="flex flex-col"><span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Ward Node</span><span className="font-bold text-text-dark">{patient.ward_code}</span></div>
            <div className="flex flex-col"><span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Verification Date</span><span className="font-bold text-text-dark">{new Date().toLocaleDateString()}</span></div>
            <div className="flex flex-col"><span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Encryption Status</span><span className={`font-bold tracking-wide uppercase ${patient.corruption_status === 'CLEAN' ? 'text-pos-green' : 'text-neg-red'}`}>{patient.corruption_status}</span></div>
          </div>
          
          <div className="mt-4 flex-1">
            <h3 className="font-bold border-b border-border-div pb-2 mb-4 uppercase tracking-wider text-text-muted text-xs">Verified Pharmaceutical Data</h3>
            <div className="flex flex-col gap-3">
              {patient.decryptedMeds?.map((m, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-text-muted">#{idx+1}</span>
                    <span className="font-bold text-sm text-text-dark">{m.decrypted_name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-text-dark text-sm">{m.dosage}</div>
                    <div className="text-[11px] font-medium text-text-muted">{m.frequency}</div>
                  </div>
                </div>
              ))}
              {(!patient.decryptedMeds || patient.decryptedMeds.length === 0) && (
                <div className="text-text-muted text-center w-full py-6 italic text-sm border border-dashed border-border-div rounded-md">
                  No verified pharmacy data stored for this profile.
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-auto flex justify-between items-end border-t border-border-div pt-6">
             <div className="text-[9px] uppercase font-bold tracking-widest w-[60%] text-text-muted leading-relaxed">
                Legally binding documentation of decrypted medical logs.
             </div>
             <div className="w-40 border-b border-border-div text-right pb-1">
                <span className="text-[9px] font-bold uppercase text-text-muted">Medical Authority Sign</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
