import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/security';
import { getRiskLabel } from '@/utils/riskScorer';

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RiskMeter({ 
  score, 
  level, 
  size = 'md', 
  showLabel = true,
  className 
}: RiskMeterProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const strokeWidth = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  const radius = size === 'sm' ? 40 : size === 'md' ? 60 : 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorClass = {
    safe: 'stroke-safe',
    suspicious: 'stroke-warning',
    danger: 'stroke-danger',
  }[level];

  const glowClass = {
    safe: 'glow-safe',
    suspicious: 'glow-warning',
    danger: 'glow-danger',
  }[level];

  const textColorClass = {
    safe: 'text-safe',
    suspicious: 'text-warning',
    danger: 'text-danger',
  }[level];

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn('relative', sizeClasses[size], glowClass, 'rounded-full')}>
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            className="opacity-30"
          />
          {/* Progress circle */}
          <motion.circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={colorClass}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={cn('font-mono font-bold', textSizes[size], textColorClass)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {Math.round(score)}
          </motion.span>
          <span className="text-muted-foreground text-xs uppercase tracking-wider">
            Risk Score
          </span>
        </div>
      </div>
      {showLabel && (
        <motion.span 
          className={cn('font-semibold uppercase tracking-wide text-sm', textColorClass)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {getRiskLabel(level)}
        </motion.span>
      )}
    </div>
  );
}
