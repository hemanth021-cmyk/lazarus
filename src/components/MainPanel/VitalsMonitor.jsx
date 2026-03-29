import React from 'react';
import BPMGraph from './BPMGraph';
import O2Graph from './O2Graph';

export default function VitalsMonitor({ patient }) {
  return (
    <div className="flex flex-col gap-6 h-full min-h-[500px]">
      <BPMGraph patient={patient} />
      <O2Graph patient={patient} />
    </div>
  );
}
