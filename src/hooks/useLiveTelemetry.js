import { useState, useEffect, useRef } from 'react';
import { parseCSV } from '../utils/csvParser.js';
import { decodePatientName, decodeBPM, decodeO2, decryptMedication } from '../utils/decoders.js';
import { interpolateReadings } from '../utils/interpolation.js';
import { checkVitals } from '../utils/alerts.js';
import { calculateParity } from '../utils/parity.js';

export function useLiveTelemetry() {
  const [patients, setPatients] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [globalAlert, setGlobalAlert] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use refs to store the large datasets and indices without triggering re-renders
  const rawDataRef = useRef({ demographics: [], prescriptions: {}, telemetry: {} });
  const indicesRef = useRef({}); // ghost_id -> currentPacketIndex

  // 1. Initial Data Load & Join
  useEffect(() => {
    async function loadLazarusData() {
      try {
        const [demoData, rxData, telData] = await Promise.all([
          parseCSV('./data/demographics.csv'),
          parseCSV('./data/prescriptions.csv'),
          parseCSV('./data/telemetry.csv')
        ]);

        console.log(`Lazarus Engine: Loaded ${demoData.length} patients, ${telData.length} telemetry packets.`);

        // Group prescriptions by ghost_id
        const prescriptionsByGhost = rxData.reduce((acc, curr) => {
          if (!acc[curr.ghost_id]) acc[curr.ghost_id] = [];
          acc[curr.ghost_id].push(curr);
          return acc;
        }, {});

        // Group telemetry by ghost_id
        const telemetryByGhost = telData.reduce((acc, curr) => {
          if (!acc[curr.ghost_id]) acc[curr.ghost_id] = [];
          acc[curr.ghost_id].push(curr);
          return acc;
        }, {});

        rawDataRef.current = { 
          demographics: demoData, 
          prescriptions: prescriptionsByGhost, 
          telemetry: telemetryByGhost 
        };

        // Initialize state for a subset of patients (e.g., first 10 for the dashboard)
        const initialPatients = demoData.slice(0, 15).map(p => {
          const age = parseInt(p.age);
          const decodedName = decodePatientName(p.name, age);
          const ghostId = p.ghost_id;
          
          // Get first few packets for initial chart
          const pTel = telemetryByGhost[ghostId] || [];
          const initialPackets = pTel.slice(0, 10);
          
          const decodedBPMs = initialPackets.map(pkt => decodeBPM(pkt.heart_rate_hex));
          const rawO2s = initialPackets.map(pkt => pkt.spO2 === "" ? null : parseFloat(pkt.spO2));
          // Wrap in a fake hex-like object structure for existing interpolator
          const hexO2s = initialPackets.map(pkt => pkt.spO2 === "" ? '0x00' : '0xFF');
          const interpolatedO2s = interpolateReadings(rawO2s);

          const currentBPM = decodedBPMs[decodedBPMs.length - 1] || 0;
          const currentO2 = interpolatedO2s[interpolatedO2s.length - 1] || 0;
          
          const parity = calculateParity(decodedBPMs);
          const uniqueId = `${p.internal_id}-${parity}`;
          indicesRef.current[ghostId] = 10; // Start playback from index 10

          const pMeds = (prescriptionsByGhost[ghostId] || []).map(m => ({
            ...m,
            decrypted_name: decryptMedication(m.scrambled_med, age)
          }));

          return {
            ...p,
            uniqueId,
            age,
            decodedName,
            decodedBPMs,
            hex_o2: hexO2s, // Maintain for legacy compatibility in logic
            interpolatedO2s,
            decryptedMeds: pMeds,
            parity,
            vitalStatus: checkVitals(currentBPM, currentO2)
          };
        });

        setPatients(initialPatients);
        setSelectedPatientId(initialPatients[0]?.uniqueId);
        setLoading(false);
      } catch (err) {
        console.error("Lazarus Data Loading Failed:", err);
      }
    }

    loadLazarusData();
  }, []);

  // 2. Playback Engine
  useEffect(() => {
    if (loading || patients.length === 0) return;

    const intervalId = setInterval(() => {
      const { telemetry } = rawDataRef.current;
      const timestamp = new Date().toLocaleTimeString();
      let isGlobalCritical = false;
      let newLogEntries = [];

      setPatients(prevPatients => {
        return prevPatients.map(p => {
          const ghostId = p.ghost_id;
          const pTel = telemetry[ghostId] || [];
          const currentIndex = indicesRef.current[ghostId] || 0;
          
          // Get the next packet
          const nextIndex = currentIndex >= pTel.length ? 0 : currentIndex;
          const packet = pTel[nextIndex];
          indicesRef.current[ghostId] = nextIndex + 1;

          if (!packet) return p;

          const newBPM = decodeBPM(packet.heart_rate_hex);
          const newO2Raw = packet.spO2 === "" ? null : parseFloat(packet.spO2);
          
          const updatedBPMs = [...p.decodedBPMs, newBPM].slice(-30);
          const updatedRawO2s = [...p.interpolatedO2s, newO2Raw].slice(-30); 
          const finalO2s = interpolateReadings(updatedRawO2s);

          const currentBPM = updatedBPMs[updatedBPMs.length - 1];
          const currentO2 = finalO2s[finalO2s.length - 1];
          const status = checkVitals(currentBPM, currentO2);

          if (status.severity === 'CRITICAL') isGlobalCritical = true;

          // Add to log
          newLogEntries.push({
            timestamp,
            patientId: p.uniqueId,
            type: 'BPM',
            rawHex: packet.heart_rate_hex,
            decodedVal: newBPM,
            packetId: packet.packet_id,
            roomId: packet.room_id
          });
          newLogEntries.push({
            timestamp,
            patientId: p.uniqueId,
            type: 'O2',
            rawHex: packet.spO2 === "" ? '0x00' : '0xFF',
            decodedVal: currentO2,
            interpolated: packet.spO2 === "" ,
            packetId: packet.packet_id,
            roomId: packet.room_id
          });

          return {
            ...p,
            decodedBPMs: updatedBPMs,
            interpolatedO2s: finalO2s,
            vitalStatus: status
          };
        });
      });

      setGlobalAlert(isGlobalCritical);
      setAuditLog(prev => [...newLogEntries.reverse(), ...prev].slice(0, 150));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [loading, patients.length]);

  return {
    patients,
    selectedPatient: patients.find(p => p.uniqueId === selectedPatientId) || patients[0],
    setSelectedPatientId,
    auditLog,
    globalAlert,
    loading
  };
}

