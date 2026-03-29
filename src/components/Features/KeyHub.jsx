import React, { useState, useEffect } from 'react';

const mockLogs = [
  "[SHA-256] Initialization vector found at offset 0x3F4A",
  "[BruteForce] Testing key space 14M/sec...",
  "[AES-128] Cipher text block entropy analysis: HIGH",
  "[RansomNote] Extracting public key from decrypt.exe",
  "[Match] Partial hit for 'Ondansetron' cipher text...",
  "[Decrypt] Validating block signature...",
  "[Network] Restoring packet continuity for node 32...",
];

export default function KeyHub() {
  const [terminal, setTerminal] = useState([]);
  
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 50) return;
      const rLog = mockLogs[Math.floor(Math.random() * mockLogs.length)] + ` (t+${count*123}ms)`;
      setTerminal(prev => [...prev.slice(-14), rLog]);
      count++;
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 overflow-auto p-8 custom-scrollbar bg-page flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-6 h-full">
        <div className="bg-card shadow-sm border border-border-div p-6 rounded-[12px]">
          <h1 className="text-xl font-bold text-text-dark tracking-tight">Decryption Engine Monitor</h1>
          <p className="text-sm text-text-muted mt-1 font-medium">Real-time cryptographic restore logs for protected health information.</p>
        </div>

        <div className="flex-1 bg-white rounded-[12px] p-6 shadow-sm border border-border-div font-mono text-[12px] flex flex-col gap-2 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 border-b border-border-div pb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-neg-red/20 border border-neg-red/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-pos-green/20 border border-pos-green/50"></span>
            <span className="ml-4 text-text-muted font-bold tracking-widest uppercase text-[10px]">RECOVERY_SHELL_V2</span>
          </div>
          {terminal.map((text, i) => (
            <div key={i} className="text-text-body font-medium">
              <span className="opacity-50 text-text-muted mr-4">system@lazarus:~$</span>
              {text}
            </div>
          ))}
          <div className="text-primary font-bold animate-pulse">
            <span className="opacity-50 text-text-muted mr-4 font-medium">system@lazarus:~$</span>_
          </div>
        </div>
      </div>
    </div>
  );
}
