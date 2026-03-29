/**
 * Extremely lightweight CSV parser for the Project Lazarus forensic dashboard.
 * Designed to run in-browser without external dependencies.
 */
export async function parseCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const text = await response.text();
    
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      // Simple regex to handle common CSV cases (dots, commas inside quotes not handled here for brevity)
      // but sufficient for the Lazarus datasets based on inspection.
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] || "";
      });
      return obj;
    });
  } catch (error) {
    console.error("CSV Parse Error:", error);
    return [];
  }
}
