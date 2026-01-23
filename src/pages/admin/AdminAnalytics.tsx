import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

export default function AdminAnalytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: async () => {
      const response = await api.get('/admin/analytics');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white/60 text-sm uppercase tracking-widest">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
          Analytics
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          System statistics & insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Statistics */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm">
          <h2 className="text-2xl font-extrabold text-white mb-6 tracking-tight">System Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-400 text-sm font-light">Total Users</span>
              <span className="font-extrabold text-neon-mint text-xl tracking-tighter">{analytics?.totalUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-400 text-sm font-light">Total Products</span>
              <span className="font-extrabold text-blue-400 text-xl tracking-tighter">{analytics?.totalProducts || 0}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-400 text-sm font-light">Total Alerts</span>
              <span className="font-extrabold text-yellow-400 text-xl tracking-tighter">{analytics?.totalAlerts || 0}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-400 text-sm font-light">Total Scrapes</span>
              <span className="font-extrabold text-green-400 text-xl tracking-tighter">{analytics?.totalScrapes || 0}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 text-sm font-light">Success Rate</span>
              <span className="font-extrabold text-neon-mint text-xl tracking-tighter">
                {analytics?.successRate?.toFixed(1) || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Users by Role */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm">
          <h2 className="text-2xl font-extrabold text-white mb-6 tracking-tight">Users by Role</h2>
          <div className="space-y-4">
            {analytics?.usersByRole?.map((item: any) => (
              <div key={item.role} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                <span className="text-slate-400 text-sm font-light">{item.role}</span>
                <span className="font-extrabold text-neon-mint text-xl tracking-tighter">{item._count}</span>
              </div>
            ))}
            {(!analytics?.usersByRole || analytics.usersByRole.length === 0) && (
              <div className="text-center py-8 text-slate-500 text-sm">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
