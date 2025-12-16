// Phishing detection constants and keywords
export const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'verify', 'account', 'password', 'secure', 'update',
  'confirm', 'banking', 'paypal', 'amazon', 'apple', 'microsoft', 'google',
  'facebook', 'netflix', 'support', 'help', 'urgent', 'suspended', 'locked',
  'unusual', 'activity', 'recover', 'restore', 'validate', 'expire'
];

export const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.pw', '.cc',
  '.click', '.link', '.work', '.date', '.download', '.stream', '.racing'
];

export const TRUSTED_DOMAINS = [
  'google.com', 'facebook.com', 'amazon.com', 'apple.com', 'microsoft.com',
  'github.com', 'twitter.com', 'linkedin.com', 'netflix.com', 'paypal.com'
];

// Risk thresholds
export const RISK_THRESHOLDS = {
  SAFE_MAX: 30,
  SUSPICIOUS_MAX: 70,
};

// Risk labels
export const RISK_LABELS = {
  safe: 'Safe',
  suspicious: 'Suspicious',
  danger: 'High Risk',
} as const;

// Verdict messages
export const VERDICTS = {
  phishing: {
    safe: 'URL appears to be safe',
    suspicious: 'URL shows suspicious characteristics',
    danger: 'High probability of phishing attempt',
  },
  deepfake: {
    safe: 'No manipulation detected',
    suspicious: 'Possible signs of manipulation',
    danger: 'High probability of deepfake content',
  },
};

// Dashboard mock data
export const MOCK_SCAN_TRENDS = [
  { name: 'Mon', phishing: 4, deepfake: 2 },
  { name: 'Tue', phishing: 6, deepfake: 3 },
  { name: 'Wed', phishing: 8, deepfake: 5 },
  { name: 'Thu', phishing: 5, deepfake: 4 },
  { name: 'Fri', phishing: 10, deepfake: 6 },
  { name: 'Sat', phishing: 3, deepfake: 2 },
  { name: 'Sun', phishing: 4, deepfake: 3 },
];

export const MOCK_THREAT_DISTRIBUTION = [
  { name: 'Safe', value: 65, color: 'hsl(145, 70%, 45%)' },
  { name: 'Suspicious', value: 25, color: 'hsl(38, 90%, 50%)' },
  { name: 'High Risk', value: 10, color: 'hsl(0, 75%, 55%)' },
];
