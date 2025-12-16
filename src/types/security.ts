export type RiskLevel = 'safe' | 'suspicious' | 'danger';

export type ScanType = 'phishing' | 'deepfake';

export interface ScanResult {
  id: string;
  type: ScanType;
  input: string;
  riskScore: number;
  riskLevel: RiskLevel;
  verdict: string;
  details: string[];
  timestamp: Date;
  userId: string;
}

export interface PhishingScanInput {
  url: string;
}

export interface DeepfakeScanInput {
  filename: string;
  fileType: 'image' | 'video';
  fileSize: number;
}

export interface RiskAnalysis {
  score: number;
  level: RiskLevel;
  verdict: string;
  details: string[];
}

export interface DashboardStats {
  totalScans: number;
  phishingThreats: number;
  deepfakeAlerts: number;
  safeScans: number;
  suspiciousScans: number;
  dangerScans: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}
