import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { SkeletonAdminDashboard } from '../../components/common/Skeleton';

export default function AdminDashboard() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: async () => {
      const response = await api.get('/admin/analytics');
      return response.data;
    },
  });

  if (isLoading) {
    return <SkeletonAdminDashboard />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
          Admin Dashboard
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          System overview & analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-neon-mint/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Total Users</div>
          <div className="text-4xl font-extrabold text-neon-mint neon-glow-text tracking-tighter">
            {analytics?.totalUsers || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-blue-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Total Products</div>
          <div className="text-4xl font-extrabold text-blue-400 tracking-tighter">
            {analytics?.totalProducts || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-yellow-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Total Alerts</div>
          <div className="text-4xl font-extrabold text-yellow-400 tracking-tighter">
            {analytics?.totalAlerts || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-green-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Success Rate</div>
          <div className="text-4xl font-extrabold text-green-400 tracking-tighter">
            {analytics?.successRate?.toFixed(1) || 0}%
          </div>
        </div>
      </div>
    </div>
  );
}
