import React from 'react';

export default function BottomPlaceholders() {
  return (
    <div className="flex flex-col md:flex-row gap-[20px] overflow-hidden -mb-[64px]">
      <div className="flex-1 bg-card rounded-t-[12px] border-t border-l border-r border-border-div h-[120px] p-[24px] shadow-card">
         <h2 className="text-[15px] font-semibold text-text-dark">Appointment Status Breakdown by Month</h2>
         <div className="mt-6 flex gap-8 opacity-30 px-4">
            <div className="w-10 h-16 bg-blue-100 rounded-t-sm"></div>
            <div className="w-10 h-24 bg-blue-100 rounded-t-sm"></div>
            <div className="w-10 h-12 bg-blue-100 rounded-t-sm"></div>
            <div className="w-10 h-20 bg-blue-100 rounded-t-sm"></div>
         </div>
      </div>
      <div className="flex-1 bg-card rounded-t-[12px] border-t border-l border-r border-border-div h-[120px] p-[24px] shadow-card">
         <h2 className="text-[15px] font-semibold text-text-dark">Monthly No-Show Details</h2>
         <div className="mt-6 flex flex-col gap-3 opacity-30">
            <div className="h-6 w-full bg-gray-100 rounded-sm"></div>
            <div className="h-6 w-[80%] bg-gray-100 rounded-sm"></div>
         </div>
      </div>
    </div>
  );
}
