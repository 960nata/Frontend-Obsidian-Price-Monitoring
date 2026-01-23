import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

interface GoogleAnalyticsWidgetProps {
  enabled?: boolean;
  measurementId?: string;
}

interface GAStats {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ path: string; views: number }>;
}

export const GoogleAnalyticsWidget = ({ enabled = false, measurementId }: GoogleAnalyticsWidgetProps) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const { data: stats, isLoading } = useQuery<GAStats>({
    queryKey: ['google-analytics', 'stats'],
    queryFn: async () => {
      const response = await api.get('/analytics/google');
      return response.data;
    },
    enabled: isEnabled && !!measurementId,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  if (!isEnabled || !measurementId) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-xl">analytics</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">Google Analytics</h3>
          </div>
          <button
            onClick={() => setIsEnabled(true)}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-sm hover:border-neon-mint/30 hover:bg-white/10 transition-all text-xs font-black uppercase tracking-[0.2em]"
          >
            Enable
          </button>
        </div>
        <p className="text-slate-400 text-sm font-light">
          Connect your Google Analytics account to view detailed insights and metrics.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-sm bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-neon-mint text-xl">analytics</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Google Analytics</h3>
        </div>
        <div className="text-slate-400 text-sm">Loading analytics data...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-neon-mint text-xl">analytics</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Google Analytics</h3>
        </div>
        <button
          onClick={() => setIsEnabled(false)}
          className="text-slate-400 hover:text-white transition-colors"
          title="Disable Analytics"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 border border-white/5 rounded-sm p-4">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">Page Views</div>
          <div className="text-2xl font-extrabold text-neon-mint tracking-tighter">
            {stats?.pageViews?.toLocaleString() || '0'}
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-sm p-4">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">Visitors</div>
          <div className="text-2xl font-extrabold text-blue-400 tracking-tighter">
            {stats?.uniqueVisitors?.toLocaleString() || '0'}
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-sm p-4">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">Bounce Rate</div>
          <div className="text-2xl font-extrabold text-yellow-400 tracking-tighter">
            {stats?.bounceRate?.toFixed(1) || '0'}%
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-sm p-4">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">Avg Session</div>
          <div className="text-2xl font-extrabold text-green-400 tracking-tighter">
            {stats?.avgSessionDuration ? `${Math.floor(stats.avgSessionDuration / 60)}m` : '0m'}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      {stats?.topPages && stats.topPages.length > 0 && (
        <div>
          <h4 className="text-sm font-extrabold text-white mb-3 tracking-tight">Top Pages</h4>
          <div className="space-y-2">
            {stats.topPages.slice(0, 5).map((page, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-sm hover:border-neon-mint/30 transition-all"
              >
                <span className="text-sm text-slate-300 font-light truncate flex-1">{page.path}</span>
                <span className="text-sm font-extrabold text-neon-mint tracking-tighter ml-4">
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
