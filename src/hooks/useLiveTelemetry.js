import { useState, useEffect } from 'react';

export function useLiveTelemetry() {
  const [patients, setPatients] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [globalAlert, setGlobalAlert] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/telemetry');
        if (!res.ok) return;
        const data = await res.json();
        setPatients(data.patients);
        setAuditLog(data.auditLog);
        setGlobalAlert(data.globalAlert);
        
        // Auto-select first if none selected
        if (!selectedPatientId && data.patients.length > 0) {
          setSelectedPatientId(data.patients[0].uniqueId);
        }
      } catch (err) {
        console.error('Failed to fetch telemetry from backend', err);
      }
    };

    // Fetch immediately
    fetchTelemetry();

    // Poll every 2 seconds matching the backend tick
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, [selectedPatientId]);

  return {
    patients,
    selectedPatient: patients.find(p => p.uniqueId === selectedPatientId) || patients[0],
    setSelectedPatientId,
    auditLog,
    globalAlert
  };
}
