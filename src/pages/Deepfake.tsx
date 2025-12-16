import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RiskMeter } from '@/components/security/RiskMeter';
import { AlertCard } from '@/components/security/AlertCard';
import { ThreatBadge } from '@/components/security/ThreatBadge';
import { FileUploader } from '@/components/upload/FileUploader';
import { useScanHistory } from '@/hooks/useScanHistory';
import { analyzeMedia } from '@/utils/deepfakeRules';
import { getMediaType } from '@/utils/validators';
import { RiskAnalysis } from '@/types/security';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScanFace, Loader2, History, Image, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Deepfake() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RiskAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { addScan, filterByType } = useScanHistory();
  const recentDeepfakeScans = filterByType('deepfake').slice(0, 3);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please upload an image or video to analyze',
        variant: 'destructive',
      });
      return;
    }

    setIsScanning(true);
    setResult(null);

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mediaType = getMediaType(selectedFile);
    if (!mediaType) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a valid image or video file',
        variant: 'destructive',
      });
      setIsScanning(false);
      return;
    }

    const analysis = analyzeMedia(selectedFile.name, mediaType, selectedFile.size);
    setResult(analysis);
    setIsScanning(false);

    // Save to history
    addScan({
      type: 'deepfake',
      input: selectedFile.name,
      riskScore: analysis.score,
      riskLevel: analysis.level,
      verdict: analysis.verdict,
      details: analysis.details,
    });

    toast({
      title: 'Analysis Complete',
      description: `Media has been analyzed. Risk Level: ${analysis.level.toUpperCase()}`,
    });
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
            <ScanFace className="w-8 h-8 text-primary" />
            Deepfake Detection
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze images and videos for signs of AI manipulation or deepfake content
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Media Analyzer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUploader onFileSelect={handleFileSelect} />
              
              {selectedFile && (
                <div className="flex justify-end">
                  <Button 
                    onClick={handleScan} 
                    disabled={isScanning}
                    className="gap-2"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing
                      </>
                    ) : (
                      <>
                        <ScanFace className="w-4 h-4" />
                        Analyze Media
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Scan Animation */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                      />
                    </div>
                    <div className="text-center mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Analyzing media for manipulation artifacts...
                      </p>
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span>Facial Analysis</span>
                        <span>•</span>
                        <span>Compression Check</span>
                        <span>•</span>
                        <span>Metadata Scan</span>
                      </div>
                    </div>
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

              {/* Preview & Analysis */}
              <div className="lg:col-span-2 space-y-4">
                {/* File Preview */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Analyzed File</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-24 h-24 rounded-lg object-cover border border-border"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center border border-border">
                          {selectedFile?.type.startsWith('video/') ? (
                            <Video className="w-10 h-10 text-muted-foreground" />
                          ) : (
                            <Image className="w-10 h-10 text-muted-foreground" />
                          )}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{selectedFile?.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedFile?.type.startsWith('video/') ? 'Video' : 'Image'} File
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AlertCard
                  title={result.verdict}
                  message={`This ${selectedFile?.type.startsWith('video/') ? 'video' : 'image'} has been assigned a deepfake probability of ${result.score}% based on multiple analysis factors.`}
                  level={result.level}
                  details={result.details}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Scans */}
        {recentDeepfakeScans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Recent Deepfake Scans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDeepfakeScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Image className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm text-foreground truncate max-w-[200px]">
                          {scan.input}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
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
