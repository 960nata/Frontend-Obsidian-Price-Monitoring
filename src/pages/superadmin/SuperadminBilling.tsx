import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

export default function SuperadminBilling() {
  const { data: billing, isLoading } = useQuery({
    queryKey: ['superadmin', 'billing'],
    queryFn: async () => {
      const response = await api.get('/superadmin/billing');
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
          Billing
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          Subscription management & revenue
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-neon-mint/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Total Subscriptions</div>
          <div className="text-4xl font-extrabold text-neon-mint neon-glow-text tracking-tighter">
            {billing?.totalSubscriptions || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-blue-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Premium</div>
          <div className="text-4xl font-extrabold text-blue-400 tracking-tighter">
            {billing?.premiumCount || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-slate-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">Free</div>
          <div className="text-4xl font-extrabold text-slate-400 tracking-tighter">
            {billing?.freeCount || 0}
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {billing?.subscriptions?.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-bold">{sub.user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded border text-xs font-black uppercase tracking-wider bg-primary/20 text-primary border-primary/30">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded border text-xs font-black uppercase tracking-wider ${
                        sub.isActive
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                      }`}
                    >
                      {sub.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(!billing?.subscriptions || billing.subscriptions.length === 0) && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-16 rounded-sm text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-7xl text-slate-600/50">payments</span>
          </div>
          <p className="text-slate-400 font-light text-lg">No subscriptions found</p>
        </div>
      )}
    </div>
  );
}
