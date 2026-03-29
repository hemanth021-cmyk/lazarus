import React from 'react';

export default function PharmacyPortal({ patient }) {
  const meds = patient.decryptedMeds || [];
  const names = meds.map(m => m.decrypted_name.toLowerCase());
  let interactionWarning = null;
  
  if (names.includes('morphine') && names.includes('aspirin')) {
    interactionWarning = 'MORPHINE + ASPIRIN: Increased risk of bleeding / CNS depression.';
  } else if (names.includes('doxorubicin') && names.includes('ondansetron')) {
    interactionWarning = 'DOXORUBICIN + ONDANSETRON: QT Prolongation Risk (Monitor ECG).';
  }

  return (
    <div className="bg-white rounded-[12px] border border-border-div shadow-card flex flex-col relative overflow-hidden">
      <div className="bg-gray-50 px-5 py-4 border-b border-border-div flex justify-between items-center">
        <h2 className="text-text-dark font-semibold text-[14px] flex items-center gap-2">
          Decrypted Pharmacy Portal
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">READY</span>
        </h2>
      </div>
      
      {interactionWarning && (
        <div className="bg-[#F59E0B]/10 border-b border-[#F59E0B]/30 px-5 py-3 text-[#F59E0B] text-[13px] font-semibold flex gap-3 items-center">
          <span className="bg-[#F59E0B] text-white rounded-md px-1.5 py-0.5 text-[10px] tracking-wider uppercase">Interaction Risk</span>
          {interactionWarning}
        </div>
      )}

      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-border-div text-[11px] text-text-muted uppercase tracking-wider bg-white">
              <th className="p-3 pl-5 w-12 font-medium">#</th>
              <th className="p-3 font-medium">Encrypted Cipher</th>
              <th className="p-3 font-medium">Decrypted Med</th>
              <th className="p-3 font-medium">Dosage / Freq</th>
              <th className="p-3 font-medium">Cipher Key</th>
              <th className="p-3 pr-5 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {meds.map((med, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-3 pl-5 text-text-muted">{i + 1}</td>
                <td className="p-3 font-mono text-text-muted bg-gray-50 border-x border-gray-100/50 line-through opacity-70">{med.scrambled}</td>
                <td className="p-3 font-mono text-text-dark font-bold bg-primary/5 border-r border-primary/10">{med.decrypted_name}</td>
                <td className="p-3">
                  <div className="text-text-dark font-semibold">{med.dosage}</div>
                  <div className="text-[11px] text-text-muted mt-0.5">{med.frequency}</div>
                </td>
                <td className="p-3 text-[11px] text-text-muted font-mono">
                  SHIFT = {med.age_key} % 26 = <span className="text-text-dark font-bold bg-gray-100 px-1 rounded-sm">{med.age_key % 26}</span>
                </td>
                <td className="p-3 pr-5 text-right font-bold tracking-wide text-pos-green text-[11px]">
                  ✓ DECRYPTED
                </td>
              </tr>
            ))}
            {meds.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-text-muted text-[13px] italic">Awaiting prescription records...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
