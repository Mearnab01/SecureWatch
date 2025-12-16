import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/security';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AlertCardProps {
  title: string;
  message: string;
  level: RiskLevel;
  details?: string[];
  className?: string;
}

export function AlertCard({ title, message, level, details, className }: AlertCardProps) {
  const config = {
    safe: {
      icon: CheckCircle,
      borderClass: 'border-safe/30',
      bgClass: 'bg-safe/5',
      iconClass: 'text-safe',
      glowClass: 'glow-safe',
    },
    suspicious: {
      icon: AlertTriangle,
      borderClass: 'border-warning/30',
      bgClass: 'bg-warning/5',
      iconClass: 'text-warning',
      glowClass: 'glow-warning',
    },
    danger: {
      icon: XCircle,
      borderClass: 'border-danger/30',
      bgClass: 'bg-danger/5',
      iconClass: 'text-danger',
      glowClass: 'glow-danger',
    },
  }[level];

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-lg border p-4',
        config.borderClass,
        config.bgClass,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-full', config.bgClass, config.glowClass)}>
          <Icon className={cn('w-5 h-5', config.iconClass)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-muted-foreground text-sm mt-1">{message}</p>
          
          {details && details.length > 0 && (
            <div className="mt-3 space-y-1">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Info className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{detail}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
