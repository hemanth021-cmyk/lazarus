// STEP 1: ROT-13 decode
export function rot13(str) {
  if (!str) return '';
  return str.replace(/[a-zA-Z]/g, char => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}

// STEP 2: Age-relative reverse shift
export function ageShiftDecode(str, age) {
  if (age === null || age === undefined || isNaN(age)) return str;
  const shift = age % 26;
  return str.split('').map(char => {
    if (!char.match(/[a-zA-Z]/)) return char;
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base - shift + 26) % 26) + base
    );
  }).join('');
}

// COMBINED: Apply ROT-13 first, then age-shift decode
export function decodePatientName(encodedName, age) {
  const afterRot13 = rot13(encodedName);
  return ageShiftDecode(afterRot13, age);
}

// BPM hex decode
export function decodeBPM(hexString) {
  if (!hexString || typeof hexString !== 'string' || !hexString.startsWith('0x')) return NaN;
  return parseInt(hexString, 16);
}

// O2 hex decode
export function decodeO2(hexString) {
  if (!hexString || typeof hexString !== 'string' || !hexString.startsWith('0x') || hexString === '0x00') return null;
  const decimal = parseInt(hexString, 16);
  return Math.min(100, Math.max(85, Math.round(decimal / 1.27)));
}

// Medication Decryption Logic (Caesar Cipher, age-based):
export function decryptMedication(encryptedName, patientAge) {
  if (!patientAge) return encryptedName;
  const shift = patientAge % 26;
  return encryptedName.split('').map(char => {
    if (!char.match(/[a-zA-Z]/)) return char;
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base - shift + 26) % 26) + base
    );
  }).join('');
}
