import { RiskAnalysis, RiskLevel } from '@/types/security';
import { SUSPICIOUS_KEYWORDS, SUSPICIOUS_TLDS, TRUSTED_DOMAINS, RISK_THRESHOLDS, VERDICTS } from '@/data/constants';

interface PhishingCheckResult {
  score: number;
  detail: string;
}

// Check URL length
function checkUrlLength(url: string): PhishingCheckResult {
  if (url.length > 75) {
    return { score: 15, detail: 'URL is unusually long (>75 characters)' };
  } else if (url.length > 50) {
    return { score: 8, detail: 'URL is moderately long (>50 characters)' };
  }
  return { score: 0, detail: '' };
}

// Check for HTTPS
function checkHttps(url: string): PhishingCheckResult {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'https:') {
      return { score: 20, detail: 'URL does not use HTTPS encryption' };
    }
  } catch {
    return { score: 25, detail: 'Invalid URL format' };
  }
  return { score: 0, detail: '' };
}

// Check for suspicious keywords
function checkSuspiciousKeywords(url: string): PhishingCheckResult {
  const lowerUrl = url.toLowerCase();
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter(kw => lowerUrl.includes(kw));
  
  if (foundKeywords.length >= 3) {
    return { score: 25, detail: `Multiple suspicious keywords found: ${foundKeywords.slice(0, 3).join(', ')}` };
  } else if (foundKeywords.length > 0) {
    return { score: 10, detail: `Suspicious keyword detected: ${foundKeywords[0]}` };
  }
  return { score: 0, detail: '' };
}

// Check for suspicious TLD
function checkTld(url: string): PhishingCheckResult {
  const lowerUrl = url.toLowerCase();
  const suspiciousTld = SUSPICIOUS_TLDS.find(tld => lowerUrl.includes(tld));
  
  if (suspiciousTld) {
    return { score: 20, detail: `Suspicious top-level domain: ${suspiciousTld}` };
  }
  return { score: 0, detail: '' };
}

// Check for IP address instead of domain
function checkIpAddress(url: string): PhishingCheckResult {
  const ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
  if (ipPattern.test(url)) {
    return { score: 25, detail: 'URL uses IP address instead of domain name' };
  }
  return { score: 0, detail: '' };
}

// Check for excessive subdomains
function checkSubdomains(url: string): PhishingCheckResult {
  try {
    const urlObj = new URL(url);
    const subdomainCount = urlObj.hostname.split('.').length - 2;
    if (subdomainCount > 3) {
      return { score: 15, detail: 'URL has excessive subdomains' };
    } else if (subdomainCount > 1) {
      return { score: 5, detail: 'URL has multiple subdomains' };
    }
  } catch {
    return { score: 0, detail: '' };
  }
  return { score: 0, detail: '' };
}

// Check for typosquatting (similar to trusted domains)
function checkTyposquatting(url: string): PhishingCheckResult {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    for (const trusted of TRUSTED_DOMAINS) {
      const trustedName = trusted.split('.')[0];
      if (hostname.includes(trustedName) && !hostname.endsWith(trusted)) {
        return { score: 30, detail: `Possible typosquatting of ${trusted}` };
      }
    }
  } catch {
    return { score: 0, detail: '' };
  }
  return { score: 0, detail: '' };
}

// Check for @ symbol (credential stuffing attempt)
function checkAtSymbol(url: string): PhishingCheckResult {
  if (url.includes('@')) {
    return { score: 20, detail: 'URL contains @ symbol (possible credential attack)' };
  }
  return { score: 0, detail: '' };
}

// Determine risk level from score
function getRiskLevel(score: number): RiskLevel {
  if (score <= RISK_THRESHOLDS.SAFE_MAX) return 'safe';
  if (score <= RISK_THRESHOLDS.SUSPICIOUS_MAX) return 'suspicious';
  return 'danger';
}

// Main phishing analysis function
export function analyzeUrl(url: string): RiskAnalysis {
  const checks = [
    checkUrlLength(url),
    checkHttps(url),
    checkSuspiciousKeywords(url),
    checkTld(url),
    checkIpAddress(url),
    checkSubdomains(url),
    checkTyposquatting(url),
    checkAtSymbol(url),
  ];

  const totalScore = Math.min(100, checks.reduce((sum, check) => sum + check.score, 0));
  const details = checks.filter(check => check.detail).map(check => check.detail);
  const level = getRiskLevel(totalScore);

  // If no issues found, add a positive detail
  if (details.length === 0) {
    details.push('No suspicious patterns detected');
    details.push('HTTPS encryption verified');
    details.push('Domain appears legitimate');
  }

  return {
    score: totalScore,
    level,
    verdict: VERDICTS.phishing[level],
    details,
  };
}
