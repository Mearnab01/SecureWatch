import { ScanResult, DashboardStats } from '@/types/security';

const STORAGE_KEY = 'securewatch_scans';

// Get all scans for a specific user
export function getUserScans(userId: string): ScanResult[] {
  try {
    const data = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (!data) return [];
    
    const scans = JSON.parse(data);
    return scans.map((scan: ScanResult) => ({
      ...scan,
      timestamp: new Date(scan.timestamp),
    }));
  } catch (error) {
    console.error('Error loading scans:', error);
    return [];
  }
}

// Save a new scan result
export function saveScan(userId: string, scan: ScanResult): void {
  try {
    const existingScans = getUserScans(userId);
    const updatedScans = [scan, ...existingScans];
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(updatedScans));
  } catch (error) {
    console.error('Error saving scan:', error);
  }
}

// Delete a scan by ID
export function deleteScan(userId: string, scanId: string): void {
  try {
    const existingScans = getUserScans(userId);
    const filteredScans = existingScans.filter(scan => scan.id !== scanId);
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(filteredScans));
  } catch (error) {
    console.error('Error deleting scan:', error);
  }
}

// Clear all scans for a user
export function clearUserScans(userId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${userId}`);
  } catch (error) {
    console.error('Error clearing scans:', error);
  }
}

// Calculate dashboard statistics
export function calculateStats(scans: ScanResult[]): DashboardStats {
  const stats: DashboardStats = {
    totalScans: scans.length,
    phishingThreats: 0,
    deepfakeAlerts: 0,
    safeScans: 0,
    suspiciousScans: 0,
    dangerScans: 0,
  };

  scans.forEach(scan => {
    if (scan.type === 'phishing' && scan.riskLevel !== 'safe') {
      stats.phishingThreats++;
    }
    if (scan.type === 'deepfake' && scan.riskLevel !== 'safe') {
      stats.deepfakeAlerts++;
    }
    
    switch (scan.riskLevel) {
      case 'safe':
        stats.safeScans++;
        break;
      case 'suspicious':
        stats.suspiciousScans++;
        break;
      case 'danger':
        stats.dangerScans++;
        break;
    }
  });

  return stats;
}

// Generate a unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
