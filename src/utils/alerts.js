export function checkVitals(decodedBPM, decodedO2) {
  if (decodedBPM < 60 || decodedBPM > 100) {
    return { severity: 'CRITICAL', color: '#FF3B5C',
             message: `BPM ${decodedBPM} — OUTSIDE SAFE RANGE` };
  }
  if (decodedBPM < 65 || decodedBPM > 95) {
    return { severity: 'WARNING', color: '#FF9900',
             message: `BPM ${decodedBPM} — APPROACHING THRESHOLD` };
  }
  if (decodedO2 !== null && decodedO2 < 95) {
    if (decodedO2 < 90) {
      return { severity: 'CRITICAL', color: '#FF3B5C',
               message: `O2 ${decodedO2}% — DANGEROUSLY LOW HYPOXIA` };
    }
    return { severity: 'WARNING', color: '#FF9900',
             message: `O2 ${decodedO2}% — LOW SATURATION` };
  }
  return { severity: 'NORMAL', color: '#00E5A0', message: 'VITALS STABLE' };
}
