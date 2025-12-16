import { RiskLevel } from '@/types/security';
import { RISK_THRESHOLDS } from '@/data/constants';

export function calculateRiskScore(factors: number[]): number {
  const total = factors.reduce((sum, factor) => sum + factor, 0);
  return Math.min(100, Math.max(0, total));
}

export function getRiskLevel(score: number): RiskLevel {
  if (score <= RISK_THRESHOLDS.SAFE_MAX) return 'safe';
  if (score <= RISK_THRESHOLDS.SUSPICIOUS_MAX) return 'suspicious';
  return 'danger';
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'safe':
      return 'hsl(145, 70%, 45%)';
    case 'suspicious':
      return 'hsl(38, 90%, 50%)';
    case 'danger':
      return 'hsl(0, 75%, 55%)';
  }
}

export function getRiskLabel(level: RiskLevel): string {
  switch (level) {
    case 'safe':
      return 'Safe';
    case 'suspicious':
      return 'Suspicious';
    case 'danger':
      return 'High Risk';
  }
}

export function formatRiskScore(score: number): string {
  return `${Math.round(score)}%`;
}
