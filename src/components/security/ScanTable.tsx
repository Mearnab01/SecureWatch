import { motion } from 'framer-motion';
import { ScanResult } from '@/types/security';
import { ThreatBadge } from './ThreatBadge';
import { formatDate, truncateString } from '@/utils/validators';
import { cn } from '@/lib/utils';
import { Globe, Image, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ScanTableProps {
  scans: ScanResult[];
  onDelete?: (id: string) => void;
  showDelete?: boolean;
  className?: string;
}

export function ScanTable({ scans, onDelete, showDelete = false, className }: ScanTableProps) {
  if (scans.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Globe className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">No scans yet</h3>
        <p className="text-muted-foreground mt-1">
          Start monitoring by scanning a URL or uploading media.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border border-border overflow-hidden', className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-semibold">Type</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Input</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Risk Score</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Time</TableHead>
            {showDelete && <TableHead className="text-muted-foreground font-semibold w-12"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {scans.map((scan, index) => (
            <motion.tr
              key={scan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-border hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  {scan.type === 'phishing' ? (
                    <Globe className="w-4 h-4 text-primary" />
                  ) : (
                    <Image className="w-4 h-4 text-primary" />
                  )}
                  <span className="capitalize text-foreground">{scan.type}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm text-muted-foreground">
                  {truncateString(scan.input, 40)}
                </span>
              </TableCell>
              <TableCell>
                <span className={cn(
                  'font-mono font-semibold',
                  scan.riskLevel === 'safe' && 'text-safe',
                  scan.riskLevel === 'suspicious' && 'text-warning',
                  scan.riskLevel === 'danger' && 'text-danger',
                )}>
                  {scan.riskScore}%
                </span>
              </TableCell>
              <TableCell>
                <ThreatBadge level={scan.riskLevel} size="sm" />
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {formatDate(new Date(scan.timestamp))}
                </span>
              </TableCell>
              {showDelete && onDelete && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(scan.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-danger"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              )}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
