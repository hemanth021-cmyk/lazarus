import express from 'express';
import cors from 'cors';
import { mockPatients } from './src/utils/mockData.js';
import { decodePatientName, decodeBPM, decodeO2, decryptMedication } from './src/utils/decoders.js';
import { interpolateReadings } from './src/utils/interpolation.js';
import { checkVitals } from './src/utils/alerts.js';
import { calculateParity } from './src/utils/parity.js';

const app = express();
app.use(cors());

// State holding mechanism
let currentPatients = [];
let globalAlert = false;
let globalAuditLog = [];

// INTIAL INGESTION
const initData = () => {
  let log = [];
  const processed = mockPatients.map((p, idx) => {
    // Demographics
    const age = p.dob ? Math.floor((new Date() - new Date(p.dob).getTime()) / 3.15576e+10) : null;
    const decodedName = decodePatientName(p.raw_name, age);
    
    // Vitals
    const decodedBPMs = p.hex_bpm.map(hex => decodeBPM(hex)).map(b => isNaN(b) ? 0 : Math.max(30, Math.min(200, b)));
    const decodedO2s = p.hex_o2.map(decodeO2);
    const interpolatedO2s = interpolateReadings(decodedO2s).map(o => o === null ? 0 : Math.max(85, Math.min(100, o)));
    
    const parity = calculateParity(decodedBPMs);
    const uniqueId = `${p.patient_id}-${parity}`;
    
    // Meds
    const decryptedMeds = p.medications.map(m => ({
      ...m,
      decrypted_name: decryptMedication(m.scrambled, m.age_key)
    }));

    // Status
    const currentBPM = decodedBPMs[decodedBPMs.length - 1];
    const currentO2 = interpolatedO2s[interpolatedO2s.length - 1];
    const vitalStatus = checkVitals(currentBPM, currentO2);

    // Initial log inserts
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
  
  currentPatients = processed;
  globalAuditLog = log.reverse();
  console.log('[SERVER] Lazarus Datastore Initialized.');
};

initData();

// TICK INTERVAL ENGINE
setInterval(() => {
  let isGlobalCritical = false;
  const timestamp = new Date().toLocaleTimeString();
  let newEntries = [];

  currentPatients = currentPatients.map(p => {
    // Generate organic 2-second increment fake value
    const lastBPM = p.decodedBPMs[p.decodedBPMs.length - 1] || 75;
    const newBPMDec = Math.max(30, Math.min(200, lastBPM + Math.floor(Math.random() * 11) - 5));
    const newBPMHex = '0x' + newBPMDec.toString(16).toUpperCase().padStart(2, '0');
    
    let newO2Hex, newO2Dec;
    if (Math.random() > 0.9) { // drop frame
      newO2Hex = '0x00';
      newO2Dec = null;
    } else {
      const lastO2 = p.interpolatedO2s[p.interpolatedO2s.length - 1] || 98;
      newO2Dec = Math.max(85, Math.min(100, lastO2 + Math.floor(Math.random() * 3) - 1));
      newO2Hex = '0x' + Math.round(newO2Dec * 1.27).toString(16).toUpperCase().padStart(2, '0');
    }

    // Array crunch
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

  globalAlert = isGlobalCritical;
  globalAuditLog = [...newEntries.reverse(), ...globalAuditLog].slice(0, 200);

}, 2000);

// API ROUTES
app.get('/api/telemetry', (req, res) => {
  res.json({
    globalAlert,
    patients: currentPatients,
    auditLog: globalAuditLog
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[SERVER] Lazarus Telemetry API listening on http://localhost:${PORT}`);
});
