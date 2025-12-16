import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ScanTable } from '@/components/security/ScanTable';
import { useScanHistory } from '@/hooks/useScanHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Download, Trash2, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export default function HistoryPage() {
  const { scans, removeScan, isLoading, filterByType } = useScanHistory();
  const [typeFilter, setTypeFilter] = useState<'all' | 'phishing' | 'deepfake'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'safe' | 'suspicious' | 'danger'>('all');

  const filteredScans = scans.filter((scan) => {
    if (typeFilter !== 'all' && scan.type !== typeFilter) return false;
    if (levelFilter !== 'all' && scan.riskLevel !== levelFilter) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    removeScan(id);
    toast({
      title: 'Scan deleted',
      description: 'The scan has been removed from your history.',
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['Type', 'Input', 'Risk Score', 'Risk Level', 'Verdict', 'Timestamp'].join(','),
      ...filteredScans.map((scan) =>
        [
          scan.type,
          `"${scan.input}"`,
          scan.riskScore,
          scan.riskLevel,
          `"${scan.verdict}"`,
          new Date(scan.timestamp).toISOString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `securewatch-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Export complete',
      description: 'Your scan history has been exported to CSV.',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
              <History className="w-8 h-8 text-primary" />
              Scan History
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage all your security scans
            </p>
          </div>
          {filteredScans.length > 0 && (
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filters:</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Select value={typeFilter} onValueChange={(value: 'all' | 'phishing' | 'deepfake') => setTypeFilter(value)}>
                    <SelectTrigger className="w-[140px] bg-input border-border">
                      <SelectValue placeholder="Scan Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="deepfake">Deepfake</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={levelFilter} onValueChange={(value: 'all' | 'safe' | 'suspicious' | 'danger') => setLevelFilter(value)}>
                    <SelectTrigger className="w-[140px] bg-input border-border">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="safe">Safe</SelectItem>
                      <SelectItem value="suspicious">Suspicious</SelectItem>
                      <SelectItem value="danger">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(typeFilter !== 'all' || levelFilter !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTypeFilter('all');
                      setLevelFilter('all');
                    }}
                    className="text-muted-foreground"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground font-mono">
                {scans.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Scans</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-safe font-mono">
                {scans.filter(s => s.riskLevel === 'safe').length}
              </div>
              <div className="text-sm text-muted-foreground">Safe</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning font-mono">
                {scans.filter(s => s.riskLevel === 'suspicious').length}
              </div>
              <div className="text-sm text-muted-foreground">Suspicious</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-danger font-mono">
                {scans.filter(s => s.riskLevel === 'danger').length}
              </div>
              <div className="text-sm text-muted-foreground">High Risk</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                {filteredScans.length === scans.length
                  ? `All Scans (${scans.length})`
                  : `Filtered Results (${filteredScans.length} of ${scans.length})`
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Loading scan history...
                </div>
              ) : (
                <ScanTable 
                  scans={filteredScans} 
                  showDelete 
                  onDelete={handleDelete} 
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
