'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  max: number;
  showLabel?: boolean;
  className?: string;
  barClassName?: string;
  glowing?: boolean;
}

export function ProgressBar({
  current,
  max,
  showLabel = false,
  className,
  barClassName,
  glowing = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / max) * 100));

  return (
    <div className={cn('w-full', className)}>
      <div className="relative h-6 bg-secondary rounded-full overflow-hidden border border-border">
        <motion.div
          className={cn(
            'h-full bg-gradient-to-r from-primary to-accent',
            glowing && 'glow-blue',
            barClassName
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-foreground mix-blend-difference">
              {current} / {max} XP
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
