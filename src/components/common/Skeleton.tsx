import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const baseClasses = 'bg-white/5 border border-white/5';
  const variantClasses = {
    text: 'rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-sm',
    rounded: 'rounded-sm',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Pre-built skeleton components
export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm ${className}`}>
    <Skeleton variant="text" width="40%" height={12} className="mb-3" />
    <Skeleton variant="text" width="60%" height={32} />
  </div>
);

export const SkeletonStatsCard = () => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm">
    <Skeleton variant="text" width="40%" height={10} className="mb-3" />
    <Skeleton variant="text" width="70%" height={36} />
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
    <div className="mb-4">
      <Skeleton variant="text" width="30%" height={20} className="mb-2" />
      <Skeleton variant="text" width="50%" height={12} />
    </div>
    <Skeleton variant="rectangular" width="100%" height={300} />
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
    <div className="p-6 border-b border-white/5">
      <Skeleton variant="text" width="25%" height={24} />
    </div>
    <div className="p-6 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="rectangular" width="100%" height={48} />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonSidebar = () => (
  <aside className="w-64 border-r border-white/5 bg-obsidian flex flex-col">
    <div className="p-6 flex items-center gap-3">
      <Skeleton variant="rounded" width={32} height={32} />
      <Skeleton variant="text" width={120} height={20} />
    </div>
    <nav className="flex-1 px-4 py-4 space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={120} height={16} />
        </div>
      ))}
    </nav>
    <div className="p-4 border-t border-white/5">
      <div className="p-4 rounded-sm bg-white/5 border border-white/5 flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" height={14} className="mb-2" />
          <Skeleton variant="text" width="50%" height={12} />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={40} />
    </div>
  </aside>
);

export const SkeletonHeader = () => (
  <header className="sticky top-0 z-40 glass-obsidian border-b border-white/5">
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Skeleton variant="rectangular" width={24} height={24} className="lg:hidden" />
        <Skeleton variant="text" width={150} height={20} />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton variant="rectangular" width={60} height={28} />
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={32} height={32} />
          <div className="hidden md:block">
            <Skeleton variant="text" width={100} height={14} className="mb-1" />
            <Skeleton variant="text" width={60} height={10} />
          </div>
        </div>
        <Skeleton variant="rectangular" width={80} height={28} />
      </div>
    </div>
  </header>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="mb-12">
      <Skeleton variant="text" width="40%" height={56} className="mb-4" />
      <Skeleton variant="text" width="60%" height={20} />
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3].map((i) => (
        <SkeletonStatsCard key={i} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonChart key={i} />
      ))}
    </div>

    {/* Recent Products */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <Skeleton variant="text" width="25%" height={24} />
      </div>
      <div className="p-6 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-sm">
            <Skeleton variant="rectangular" width={64} height={64} />
            <div className="flex-1">
              <Skeleton variant="text" width="60%" height={16} className="mb-2" />
              <Skeleton variant="text" width="40%" height={12} />
            </div>
            <Skeleton variant="text" width={100} height={20} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonAdminDashboard = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="mb-12">
      <Skeleton variant="text" width="35%" height={56} className="mb-4" />
      <Skeleton variant="text" width="55%" height={20} />
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonStatsCard key={i} />
      ))}
    </div>
  </div>
);

export const SkeletonProducts = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="mb-8 flex items-center justify-between">
      <div>
        <Skeleton variant="text" width="30%" height={48} className="mb-2" />
        <Skeleton variant="text" width="50%" height={18} />
      </div>
      <Skeleton variant="rectangular" width={140} height={40} />
    </div>

    {/* Filters */}
    <div className="flex items-center gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="rectangular" width={100} height={36} />
      ))}
    </div>

    {/* Product Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
          <Skeleton variant="rectangular" width="100%" height={200} />
          <div className="p-4 space-y-3">
            <Skeleton variant="text" width="80%" height={18} />
            <Skeleton variant="text" width="60%" height={14} />
            <Skeleton variant="text" width="40%" height={20} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonAlerts = () => (
  <div className="space-y-6">
    {/* Page Header */}
    <div className="mb-8">
      <Skeleton variant="text" width="25%" height={48} className="mb-2" />
      <Skeleton variant="text" width="60%" height={18} />
    </div>

    {/* Alert Cards */}
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
          <div className="flex items-start gap-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="70%" height={18} />
              <Skeleton variant="text" width="50%" height={14} />
              <Skeleton variant="text" width="40%" height={12} />
            </div>
            <Skeleton variant="rectangular" width={80} height={32} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
