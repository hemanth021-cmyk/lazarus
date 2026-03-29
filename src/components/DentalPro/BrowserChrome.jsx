import React from 'react';

export default function BrowserChrome({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-0 m-0 bg-[#e0e0e0]">
      <div className="w-full max-w-[1440px] bg-white shadow-2xl overflow-hidden mt-0 sm:mt-10 mb-0 sm:mb-10 rounded-none sm:rounded-xl border border-gray-300">
        
        {/* Browser Chrome Toolbar */}
        <div className="h-12 bg-[#F6F6F6] border-b border-gray-300 flex items-center px-4 justify-between select-none">
          {/* macOS Traffic Lights */}
          <div className="flex gap-2 w-32">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D8A027]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#23B038]"></div>
          </div>
          
          {/* Browser Navigation Left Controls */}
          <div className="flex gap-3 text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-lg mx-4 flex items-center justify-center px-4 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm gap-2">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span className="text-[13px] text-gray-800 font-medium">dentalPro.be</span>
            <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>

          {/* Right Icons */}
          <div className="flex gap-3 text-gray-500 w-32 justify-end">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </div>
        </div>

        {/* Application Content */}
        <div className="w-full flex-1 overflow-x-hidden">
          {children}
        </div>
        
      </div>
    </div>
  );
}
