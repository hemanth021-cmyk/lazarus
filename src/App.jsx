import React, { useState } from 'react';
import Header from './components/Header';
import GlobalSidebar from './components/GlobalSidebar';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import AuditLog from './components/BottomPanel/AuditLog';
import ThreatMap from './components/Features/ThreatMap';
import KeyHub from './components/Features/KeyHub';
import ReportExporter from './components/Features/ReportExporter';
import { useLiveTelemetry } from './hooks/useLiveTelemetry';
import './App.css';

function App() {
  const { patients, selectedPatient, setSelectedPatientId, auditLog, loading } = useLiveTelemetry();
  const [activeTab, setActiveTab] = useState('HOME');

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-page text-primary font-bold animate-pulse uppercase tracking-[0.2em]">
        🧬 Initializing Lazarus Forensic Engine...
      </div>
    );
  }

  const stats = {
    activeAlerts: patients.some(p => p.vitalStatus?.severity === 'CRITICAL'),
    recovered: 4
  };

  // Sort patients based on severity for Feature 1 (Triage Engine)
  const sortedPatients = [...patients].sort((a, b) => {
    const aCrit = a.vitalStatus?.severity === 'CRITICAL' ? 2 : (a.vitalStatus?.severity === 'WARNING' ? 1 : 0);
    const bCrit = b.vitalStatus?.severity === 'CRITICAL' ? 2 : (b.vitalStatus?.severity === 'WARNING' ? 1 : 0);
    return bCrit - aCrit;
  });

  return (
    <div className="flex flex-col h-screen w-full bg-page text-text-body font-sans overflow-hidden">
      <Header stats={stats} />
      <div className="flex flex-1 overflow-hidden relative bg-page">
        {/* New 3-column architecture */}
        <GlobalSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Only show patient roster if we are on Dashboard or Reports (which needs a patient selected) */}
        {(activeTab === 'HOME' || activeTab === 'REPORTS') && (
          <Sidebar 
            patients={sortedPatients} 
            selectedPatientId={selectedPatient?.uniqueId} 
            onSelectPatient={setSelectedPatientId} 
          />
        )}

        <div className="flex flex-col flex-1 relative min-w-0 bg-page overflow-x-hidden">
          {activeTab === 'HOME' && (
            <>
              <MainPanel patient={selectedPatient} />
              <AuditLog logs={auditLog} />
            </>
          )}
          {activeTab === 'THREAT' && <ThreatMap />}
          {activeTab === 'CRYPTO' && <KeyHub />}
          {activeTab === 'REPORTS' && <ReportExporter patient={selectedPatient} auditLog={auditLog} />}
        </div>
      </div>
    </div>
  );
}

export default App;
