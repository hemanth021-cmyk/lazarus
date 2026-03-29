import React from 'react';

export default function PageHeader() {
  return (
    <div className="w-full bg-white px-[32px] pt-[28px] pb-[20px] flex flex-col xl:flex-row xl:items-center justify-between gap-4 shadow-sm relative z-10">
      <div className="flex flex-col">
        <h1 className="text-[28px] font-bold text-text-dark tracking-tight leading-tight">Forensic Recovery System</h1>
        <p className="text-[13px] text-text-muted mt-1 font-medium">Real-time ransomware remediation telemetry & decryption</p>
      </div>
      
      <div className="flex flex-row flex-wrap items-center gap-[12px] pt-1">
        <div className="relative flex items-center">
          <svg className="w-[15px] h-[15px] text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search patient ID..." 
            className="w-[220px] h-[38px] rounded-[20px] border border-border-div pl-9 pr-4 text-[13px] outline-none hover:border-gray-300 focus:border-primary transition-colors font-medium bg-transparent"
          />
        </div>

        <button className="h-[38px] border border-border-div rounded-[8px] px-[14px] flex items-center gap-2 bg-white hover:bg-gray-50 transition-colors text-text-body font-medium text-[13px]">
          Ward: Oncology
          <svg className="w-[14px] h-[14px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button className="h-[38px] bg-primary text-white font-semibold rounded-[8px] px-[18px] text-[13px] flex items-center gap-2 hover:bg-[#2040E0] shadow-sm transform transition">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Run Diagnostic
        </button>
      </div>
    </div>
  );
}
