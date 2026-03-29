import { useState, useEffect } from 'react';
import { mockPatients } from '../utils/mockData.js';
import { decodePatientName, decodeBPM, decodeO2, decryptMedication } from '../utils/decoders.js';
import { interpolateReadings } from '../utils/interpolation.js';
import { checkVitals } from '../utils/alerts.js';
import { calculateParity } from '../utils/parity.js';

export function useLiveTelemetry() {
  const [patients, setPatients] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [globalAlert, setGlobalAlert] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Initialize Data Once
  useEffect(() => {
    let log = [];
    const processed = mockPatients.map((p) => {
      const age = p.dob ? Math.floor((new Date() - new Date(p.dob).getTime()) / 3.15576e+10) : null;
      const decodedName = decodePatientName(p.raw_name, age);
      
      const decodedBPMs = p.hex_bpm.map(hex => decodeBPM(hex)).map(b => isNaN(b) ? 0 : Math.max(30, Math.min(200, b)));
      const decodedO2s = p.hex_o2.map(decodeO2);
      const interpolatedO2s = interpolateReadings(decodedO2s).map(o => o === null ? 0 : Math.max(85, Math.min(100, o)));
      
      const parity = calculateParity(decodedBPMs);
      const uniqueId = `${p.patient_id}-${parity}`;
      
      const decryptedMeds = p.medications.map(m => ({
        ...m,
        decrypted_name: decryptMedication(m.scrambled, m.age_key)
      }));

      const currentBPM = decodedBPMs[decodedBPMs.length - 1];
      const currentO2 = interpolatedO2s[interpolatedO2s.length - 1];
      const vitalStatus = checkVitals(currentBPM, currentO2);

      p.hex_bpm.forEach((hex, i) => {
        log.push({ timestamp: new Date().toLocaleTimeString(), patientId: uniqueId, type: 'BPM', rawHex: hex, decodedVal: decodedBPMs[i] });
      });
      p.hex_o2.forEach((hex, i) => {
        log.push({ timestamp: new Date().toLocaleTimeString(), patientId: uniqueId, type: 'O2', rawHex: hex, decodedVal: interpolatedO2s[i], interpolated: hex === '0x00' });
      });

      return {
        ...p,
        uniqueId, age, decodedName, decodedBPMs, interpolatedO2s, decryptedMeds, parity, vitalStatus
      };
    });

    setPatients(processed);
    setAuditLog(log.reverse());
    setSelectedPatientId(processed[0]?.uniqueId);
  }, []); // Run only on mount

  // Simulation Interval Engine
  useEffect(() => {
    if (patients.length === 0) return;

    const intervalId = setInterval(() => {
      setPatients(prevPatients => {
        let isGlobalCritical = false;
        let newEntries = [];
        const timestamp = new Date().toLocaleTimeString();

        const updated = prevPatients.map(p => {
          const lastBPM = p.decodedBPMs[p.decodedBPMs.length - 1] || 75;
          const newBPMDec = Math.max(30, Math.min(200, lastBPM + Math.floor(Math.random() * 11) - 5));
          const newBPMHex = '0x' + newBPMDec.toString(16).toUpperCase().padStart(2, '0');
          
          let newO2Hex, newO2Dec;
          if (Math.random() > 0.9) { 
            newO2Hex = '0x00';
            newO2Dec = null;
          } else {
            const lastO2 = p.interpolatedO2s[p.interpolatedO2s.length - 1] || 98;
            newO2Dec = Math.max(85, Math.min(100, lastO2 + Math.floor(Math.random() * 3) - 1));
            newO2Hex = '0x' + Math.round(newO2Dec * 1.27).toString(16).toUpperCase().padStart(2, '0');
          }

          const newBPMArray = [...p.decodedBPMs, decodeBPM(newBPMHex)].slice(-30);
          const newO2RawArray = [...p.hex_o2, newO2Hex].slice(-30);
          const newInterpolatedO2s = interpolateReadings(newO2RawArray.map(decodeO2));
          
          const currentBPM = newBPMArray[newBPMArray.length - 1];
          const currentO2 = newInterpolatedO2s[newInterpolatedO2s.length - 1];
          const newStatus = checkVitals(currentBPM, currentO2);

          if (newStatus.severity === 'CRITICAL') isGlobalCritical = true;

          newEntries.push({ timestamp, patientId: p.uniqueId, type: 'BPM', rawHex: newBPMHex, decodedVal: currentBPM });
          newEntries.push({ timestamp, patientId: p.uniqueId, type: 'O2', rawHex: newO2Hex, decodedVal: currentO2, interpolated: newO2Hex === '0x00' });

          return {
            ...p,
            decodedBPMs: newBPMArray,
            hex_o2: newO2RawArray,
            interpolatedO2s: newInterpolatedO2s,
            vitalStatus: newStatus
          };
        });

        setGlobalAlert(isGlobalCritical);
        setAuditLog(prevLog => [...newEntries.reverse(), ...prevLog].slice(0, 200));

        return updated;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [patients.length]); // Re-bind interval only if initial array length changed

  return {
    patients,
    selectedPatient: patients.find(p => p.uniqueId === selectedPatientId) || patients[0],
    setSelectedPatientId,
    auditLog,
    globalAlert
  };
}
