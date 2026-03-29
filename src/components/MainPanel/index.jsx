import React from 'react';
import IdentityCard from './IdentityCard';
import VitalsMonitor from './VitalsMonitor';
import PharmacyPortal from './PharmacyPortal';
import AlertBanner from './AlertBanner';

export default function MainPanel({ patient }) {
  if (!patient) {
    return (
      <main className="flex-1 flex items-center justify-center relative bg-page">
        <div className="text-text-muted font-semibold tracking-wide border border-border-div px-8 py-4 bg-white shadow-sm rounded-[12px] flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          Waiting for patient selection...
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col overflow-y-auto p-8 gap-6 relative custom-scrollbar z-0 bg-page">
      <AlertBanner patient={patient} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 flex flex-col gap-6">
          <IdentityCard patient={patient} />
        </div>
        <div className="xl:col-span-2 flex flex-col gap-6">
          <VitalsMonitor patient={patient} />
        </div>
      </div>
      <PharmacyPortal patient={patient} />
    </main>
  );
}
