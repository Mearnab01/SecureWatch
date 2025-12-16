import { useState, useEffect, useCallback } from 'react';
import { ScanResult, DashboardStats } from '@/types/security';
import { getUserScans, saveScan, deleteScan, calculateStats, generateId } from '@/utils/storage';
import { useAuthUser } from './useAuthUser';

export function useScanHistory() {
  const { userId } = useAuthUser();
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalScans: 0,
    phishingThreats: 0,
    deepfakeAlerts: 0,
    safeScans: 0,
    suspiciousScans: 0,
    dangerScans: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load scans when userId changes
  useEffect(() => {
    if (userId) {
      const userScans = getUserScans(userId);
      setScans(userScans);
      setStats(calculateStats(userScans));
    } else {
      setScans([]);
      setStats({
        totalScans: 0,
        phishingThreats: 0,
        deepfakeAlerts: 0,
        safeScans: 0,
        suspiciousScans: 0,
        dangerScans: 0,
      });
    }
    setIsLoading(false);
  }, [userId]);

  // Add a new scan
  const addScan = useCallback((scanData: Omit<ScanResult, 'id' | 'userId' | 'timestamp'>) => {
    if (!userId) return null;

    const newScan: ScanResult = {
      ...scanData,
      id: generateId(),
      userId,
      timestamp: new Date(),
    };

    saveScan(userId, newScan);
    setScans(prev => [newScan, ...prev]);
    setStats(prev => calculateStats([newScan, ...scans]));

    return newScan;
  }, [userId, scans]);

  // Remove a scan
  const removeScan = useCallback((scanId: string) => {
    if (!userId) return;

    deleteScan(userId, scanId);
    setScans(prev => {
      const updated = prev.filter(s => s.id !== scanId);
      setStats(calculateStats(updated));
      return updated;
    });
  }, [userId]);

  // Get recent scans
  const getRecentScans = useCallback((limit: number = 5) => {
    return scans.slice(0, limit);
  }, [scans]);

  // Filter by type
  const filterByType = useCallback((type: 'phishing' | 'deepfake') => {
    return scans.filter(s => s.type === type);
  }, [scans]);

  return {
    scans,
    stats,
    isLoading,
    addScan,
    removeScan,
    getRecentScans,
    filterByType,
  };
}
