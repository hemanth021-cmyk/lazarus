import React from 'react';

export default function Navbar() {
  const links = ['Overview', 'Registry', 'Telemetry', 'Pharmacy'];

  return (
    <nav className="w-full h-[64px] bg-card px-8 flex flex-row items-center justify-between border-b border-border-div shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-primary text-white w-6 h-6 rounded flex items-center justify-center shadow-sm">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <span className="text-text-dark font-bold text-[18px]">Project Lazarus</span>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex flex-row items-center gap-[32px]">
        {links.map((link) => (
          link === 'Telemetry' ? (
            <button key={link} className="bg-text-dark text-white rounded-[20px] px-[18px] py-[6px] text-[14px] font-medium transition-transform hover:scale-105 shadow-md">
              {link}
            </button>
          ) : (
            <a key={link} href="#" className="text-[#4B5563] text-[14px] font-medium hover:text-text-dark transition-colors">
              {link}
            </a>
          )
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 ml-2 cursor-pointer group">
          <div className="w-[36px] h-[36px] bg-gray-100 rounded-full flex items-center justify-center font-semibold text-text-dark text-[14px]">
            Dr
          </div>
          <div className="hidden lg:flex flex-col ml-1">
            <span className="text-[13px] font-semibold text-text-dark leading-snug flex items-center gap-1">
              Dr. Confidency
            </span>
            <span className="text-[11px] text-[#9CA3AF] leading-none mt-0.5">St Jude's Recovery</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
