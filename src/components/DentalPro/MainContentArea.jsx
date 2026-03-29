import React from 'react';
import LiveBPMChart from './LiveBPMChart';
import VitalStats from './VitalStats';
import BottomDataSection from './BottomDataSection';

export default function MainContentArea({ patient, auditLog }) {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-[20px]">
        <LiveBPMChart patient={patient} />
        <VitalStats patient={patient} />
      </div>
      <BottomDataSection patient={patient} auditLog={auditLog} />
    </div>
  );
}
