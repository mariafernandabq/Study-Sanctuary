import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  gradient?: 'calm' | 'success' | 'warm' | 'accent';
  className?: string;
}

export const StatCard = ({ title, value, subtitle, icon, gradient = 'calm', className }: StatCardProps) => {
  const gradientClasses = {
    calm: 'from-primary-light to-primary',
    success: 'from-secondary-light to-secondary',
    warm: 'from-warm to-warm/80',
    accent: 'from-accent-light to-accent',
  };

  return (
    <div className={cn('card-soft card-hover p-6 relative overflow-hidden', className)}>
      {/* Background decoration */}
      <div className={cn('absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-2xl', gradientClasses[gradient])} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn('p-3 rounded-2xl bg-gradient-to-br', gradientClasses[gradient])}>
            <div className="text-white">{icon}</div>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold mb-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};
