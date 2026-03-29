# 🧬 Project Lazarus: Forensic Recovery Dashboard

**Project Lazarus** is a real-time Forensic Medical Recovery Dashboard designed to operate during a catastrophic hospital ransomware attack. When a cyberattack encrypts patient records and scrambles live telemetry from ICU machines, Project Lazarus steps in to decode, interpolate, and restore order.

---

## 🎯 The Core Engine
This project goes beyond a static UI by running a live, in-browser cryptographic reconstruction engine:

1.  **The Cryptography Engine:** Patient names and pharmacy databases are locked behind ciphers (simulated via age-based cryptographic shifting). The system actively decodes them on the fly so doctors can read them.
2.  **Hexadecimal Interpolation:** Vitals like Heart Rate (BPM) and Oxygen (O2) are corrupted, dropping frames as `0x00` packets. The engine spots the missing hexadecimal frames and uses interpolation mathematics to rebuild the patient's continuous live charts.
3.  **Algorithmic Triage Sorting:** Once the invisible data is mathematically recovered, an algorithm scans the vitals. If a patient's O2 dips below 90 or BPM spikes/crashes, the system overrides the sorting and throws them to the top of the roster with a pulsing `CRITICAL` tag.

---

## 🖥️ The Four Main Dashboard Features

The dashboard uses a **Minimalist Clinical Interface** mixed with a striking **Dark Navigation Rail** to cleanly separate medical workflows from forensic cyber tools.

### 1. The Vitals Monitor (Dashboard)
The central medical hub. Once you select a patient from the roster, it streams their recovered information. The clean SVG splines you see are structurally rebuilt from corrupted hexadecimal packets in real-time.

### 2. Node Integrity Map (Sector Map)
A visual layout of the hospital's network topology (ER, ICU, Pathology, etc). It tracks the brute-force recovery of the hospital network, displaying which areas are Locked, Decrypting, or Cleaned.

### 3. Decryption Engine Monitor (Key Hub)
A simulated live cyber terminal that gives forensic insights into the background calculations the platform is using to crack the ransomware keys.

### 4. Forensic System Exporter (Report)
Because the hospital's digital infrastructure is compromised, doctors need hard-copy proof of dosages to treat patients legally. This tool bundles the recovered clean data into a printable, professional clinical dossier for legal/medical sign-off.

---

## 🚀 How to Run Locally

Project Lazarus is a mathematically complex but structurally lightweight React application powered by Vite.

1. **Clone the repository:** `git clone https://github.com/hemanth021-cmyk/lazarus.git`
2. **Install Dependencies:** `npm install`
3. **Start the Engine:** `npm start`
4. **View Dashboard:** Open your browser to `http://localhost:5173/`
