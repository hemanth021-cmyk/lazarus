export function interpolateReadings(readings) {
  const filled = [...readings];
  for (let i = 0; i < filled.length; i++) {
    if (filled[i] === null || filled[i] === 0) {
      let prevIdx = i - 1;
      let nextIdx = i + 1;
      
      // Find the next non-null value
      while (nextIdx < filled.length && (filled[nextIdx] === null || filled[nextIdx] === 0)) {
        nextIdx++;
      }
      
      // We can only interpolate if we have bounds on both sides
      // For this hackathon, we assume outer edge gaps are either rare or we copy the nearest
      if (prevIdx >= 0 && nextIdx < filled.length) {
        const y1 = filled[prevIdx];
        const y2 = filled[nextIdx];
        filled[i] = y1 + (i - prevIdx) * (y2 - y1) / (nextIdx - prevIdx);
        filled[i] = Math.round(filled[i]);
      } else if (prevIdx >= 0) {
        // Fallback: Copy previous if at the end
        filled[i] = filled[prevIdx];
      } else if (nextIdx < filled.length) {
        // Fallback: Copy next if at the start
        filled[i] = filled[nextIdx];
      }
    }
  }
  return filled;
}
