import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RiskMeter } from '@/components/security/RiskMeter';
import { AlertCard } from '@/components/security/AlertCard';
import { ThreatBadge } from '@/components/security/ThreatBadge';
import { useScanHistory } from '@/hooks/useScanHistory';
import { analyzeUrl } from '@/utils/phishingRules';
import { isValidUrl, sanitizeUrl } from '@/utils/validators';
import { RiskAnalysis } from '@/types/security';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, Search, Loader2, History, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Phishing() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RiskAnalysis | null>(null);
  const [scannedUrl, setScannedUrl] = useState('');
  const { addScan, filterByType } = useScanHistory();
  const recentPhishingScans = filterByType('phishing').slice(0, 3);

  const handleScan = async () => {
    const sanitizedUrl = sanitizeUrl(url);
    
    if (!isValidUrl(sanitizedUrl)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL starting with http:// or https://',
        variant: 'destructive',
      });
      return;
    }

    setIsScanning(true);
    setResult(null);
    setScannedUrl(sanitizedUrl);

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const analysis = analyzeUrl(sanitizedUrl);
    setResult(analysis);
    setIsScanning(false);

    // Save to history
    addScan({
      type: 'phishing',
      input: sanitizedUrl,
      riskScore: analysis.score,
      riskLevel: analysis.level,
      verdict: analysis.verdict,
      details: analysis.details,
    });

    toast({
      title: 'Scan Complete',
      description: `URL has been analyzed. Risk Level: ${analysis.level.toUpperCase()}`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isScanning) {
      handleScan();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Phishing Detection
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze URLs for potential phishing threats and malicious content
          </p>
        </motion.div>

        {/* Scan Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">URL Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter URL to scan (e.g., https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button 
                  onClick={handleScan} 
                  disabled={isScanning || !url.trim()}
                  className="gap-2 min-w-[120px]"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Scanning
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Scan URL
                    </>
                  )}
                </Button>
              </div>

              {/* Scan Animation */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                  >
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-3">
                      Analyzing URL structure and patterns...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && !isScanning && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Risk Score */}
              <Card className="bg-card border-border">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[280px]">
                  <RiskMeter score={result.score} level={result.level} size="lg" />
                  <div className="mt-4 text-center">
                    <ThreatBadge level={result.level} size="lg" />
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Details */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Scanned URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 font-mono text-sm break-all">
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground">{scannedUrl}</span>
                    </div>
                  </CardContent>
                </Card>

                <AlertCard
                  title={result.verdict}
                  message={`This URL has been assigned a risk score of ${result.score}% based on multiple security checks.`}
                  level={result.level}
                  details={result.details}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Scans */}
        {recentPhishingScans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Recent Phishing Scans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPhishingScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-foreground truncate">
                          {scan.input}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <span className="font-mono text-sm text-muted-foreground">
                          {scan.riskScore}%
                        </span>
                        <ThreatBadge level={scan.riskLevel} size="sm" showIcon={false} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
