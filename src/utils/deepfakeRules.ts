import { RiskAnalysis, RiskLevel } from '@/types/security';
import { RISK_THRESHOLDS, VERDICTS } from '@/data/constants';

interface DeepfakeCheckResult {
  score: number;
  detail: string;
}

// Simulate metadata analysis
function analyzeMetadata(filename: string): DeepfakeCheckResult {
  const hasStandardExtension = /\.(jpg|jpeg|png|gif|mp4|mov|avi|webm)$/i.test(filename);
  if (!hasStandardExtension) {
    return { score: 15, detail: 'Unusual file extension detected' };
  }
  return { score: 0, detail: 'File format appears standard' };
}

// Simulate compression artifact detection
function analyzeCompression(fileSize: number): DeepfakeCheckResult {
  // Simulated check based on file size patterns
  const randomFactor = Math.random();
  
  if (randomFactor < 0.1) {
    return { score: 25, detail: 'Unusual compression artifacts detected' };
  } else if (randomFactor < 0.25) {
    return { score: 15, detail: 'Minor compression inconsistencies' };
  }
  return { score: 0, detail: 'Compression analysis passed' };
}

// Simulate facial inconsistency detection
function analyzeFacialFeatures(): DeepfakeCheckResult {
  const randomFactor = Math.random();
  
  if (randomFactor < 0.08) {
    return { score: 35, detail: 'Facial boundary inconsistencies detected' };
  } else if (randomFactor < 0.2) {
    return { score: 20, detail: 'Slight facial asymmetry detected' };
  } else if (randomFactor < 0.35) {
    return { score: 10, detail: 'Minor facial lighting irregularities' };
  }
  return { score: 0, detail: 'Facial analysis passed' };
}

// Simulate temporal consistency analysis (for videos)
function analyzeTemporalConsistency(fileType: 'image' | 'video'): DeepfakeCheckResult {
  if (fileType !== 'video') {
    return { score: 0, detail: '' };
  }

  const randomFactor = Math.random();
  
  if (randomFactor < 0.1) {
    return { score: 30, detail: 'Frame-to-frame inconsistencies detected' };
  } else if (randomFactor < 0.25) {
    return { score: 15, detail: 'Minor temporal flickering observed' };
  }
  return { score: 0, detail: 'Temporal consistency verified' };
}

// Simulate audio-visual sync analysis (for videos)
function analyzeAudioVisualSync(fileType: 'image' | 'video'): DeepfakeCheckResult {
  if (fileType !== 'video') {
    return { score: 0, detail: '' };
  }

  const randomFactor = Math.random();
  
  if (randomFactor < 0.15) {
    return { score: 25, detail: 'Lip sync inconsistencies detected' };
  } else if (randomFactor < 0.3) {
    return { score: 10, detail: 'Minor audio-visual desync' };
  }
  return { score: 0, detail: 'Audio-visual sync verified' };
}

// Simulate background analysis
function analyzeBackground(): DeepfakeCheckResult {
  const randomFactor = Math.random();
  
  if (randomFactor < 0.05) {
    return { score: 20, detail: 'Background blending artifacts detected' };
  } else if (randomFactor < 0.15) {
    return { score: 8, detail: 'Slight background edge irregularities' };
  }
  return { score: 0, detail: 'Background analysis passed' };
}

// Determine risk level from score
function getRiskLevel(score: number): RiskLevel {
  if (score <= RISK_THRESHOLDS.SAFE_MAX) return 'safe';
  if (score <= RISK_THRESHOLDS.SUSPICIOUS_MAX) return 'suspicious';
  return 'danger';
}

// Main deepfake analysis function
export function analyzeMedia(
  filename: string,
  fileType: 'image' | 'video',
  fileSize: number
): RiskAnalysis {
  const checks = [
    analyzeMetadata(filename),
    analyzeCompression(fileSize),
    analyzeFacialFeatures(),
    analyzeTemporalConsistency(fileType),
    analyzeAudioVisualSync(fileType),
    analyzeBackground(),
  ];

  const totalScore = Math.min(100, checks.reduce((sum, check) => sum + check.score, 0));
  const details = checks
    .filter(check => check.detail)
    .map(check => check.detail);

  const level = getRiskLevel(totalScore);

  return {
    score: totalScore,
    level,
    verdict: VERDICTS.deepfake[level],
    details,
  };
}
