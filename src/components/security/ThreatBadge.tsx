import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/security';
import { Shield, AlertTriangle, XOctagon } from 'lucide-react';

interface ThreatBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function ThreatBadge({ level, size = 'md', showIcon = true, className }: ThreatBadgeProps) {
  const config = {
    safe: {
      label: 'Safe',
      icon: Shield,
      bgClass: 'bg-safe/10',
      textClass: 'text-safe',
      borderClass: 'border-safe/30',
    },
    suspicious: {
      label: 'Suspicious',
      icon: AlertTriangle,
      bgClass: 'bg-warning/10',
      textClass: 'text-warning',
      borderClass: 'border-warning/30',
    },
    danger: {
      label: 'High Risk',
      icon: XOctagon,
      bgClass: 'bg-danger/10',
      textClass: 'text-danger',
      borderClass: 'border-danger/30',
    },
  }[level];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        config.bgClass,
        config.textClass,
        config.borderClass,
        sizeClasses,
        className
      )}
    >
      {showIcon && <Icon className={iconSizes} />}
      {config.label}
    </span>
  );
}
