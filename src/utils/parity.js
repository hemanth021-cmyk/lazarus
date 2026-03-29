export function calculateParity(bpmReadings) {
  if (!bpmReadings || !Array.isArray(bpmReadings)) return 'UNKNOWN';
  // Filter out NaNs if any, though the decode pipeline should probably handle this safely
  const sum = bpmReadings.reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
  return sum % 2 === 0 ? 'EVEN' : 'ODD';
}
