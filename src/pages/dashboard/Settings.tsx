import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { useAuthStore } from '../../store/auth.store';
import { useTranslation } from '../../hooks/useTranslation';

export default function Settings() {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  const { data: userData } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
  });

  const displayUser = userData || user;

  const getRoleDisplay = () => {
    if (displayUser?.role === 'PREMIUM') return 'PRO TRACKER';
    if (displayUser?.role === 'ADMIN') return 'ADMIN';
    if (displayUser?.role === 'SUPERADMIN') return 'SUPERADMIN';
    return 'FREE';
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10 lg:px-20">
      <div className="max-w-[800px] mx-auto space-y-12">
        {/* Page Heading */}
        <header className="space-y-2">
          <h2 className="text-4xl font-black tracking-tight text-white uppercase">{t('settings.title')}</h2>
          <p className="text-slate-500 text-sm font-light tracking-wide">
            {t('settings.description')}
          </p>
        </header>

        {/* Profile Section */}
        <section className="glass-module rounded-xl p-8 space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="size-24 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl">person</span>
              </div>
              <button className="absolute bottom-0 right-0 size-8 bg-primary rounded-full flex items-center justify-center text-background-dark border-4 border-obsidian-grey group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm font-bold">edit</span>
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {displayUser?.name || t('settings.profile')}
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-[0.15em] font-medium mt-1">
                {t('settings.authorized')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
                {t('settings.fullName')}
              </span>
              <input
                type="text"
                value={displayUser?.name || ''}
                disabled
                className="bg-background-dark/50 border border-glass-border focus:border-primary/50 focus:ring-0 rounded-lg h-12 px-4 text-white text-sm transition-all"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
                {t('settings.email')}
              </span>
              <input
                type="email"
                value={displayUser?.email || ''}
                disabled
                className="bg-background-dark/50 border border-glass-border focus:border-primary/50 focus:ring-0 rounded-lg h-12 px-4 text-white text-sm transition-all"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
                {t('settings.role')}
              </span>
              <input
                type="text"
                value={displayUser?.role || ''}
                disabled
                className="bg-background-dark/50 border border-glass-border focus:border-primary/50 focus:ring-0 rounded-lg h-12 px-4 text-white text-sm transition-all"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
                {t('settings.accountType')}
              </span>
              <input
                type="text"
                value={getRoleDisplay()}
                disabled
                className="bg-background-dark/50 border border-glass-border focus:border-primary/50 focus:ring-0 rounded-lg h-12 px-4 text-white text-sm transition-all"
              />
            </label>
          </div>
        </section>

        {/* Subscription Status Card */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">
            {t('settings.subscription')}
          </h3>
          <div className="glass-module rounded-xl p-6 border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary to-transparent"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-2xl font-black text-white italic">{getRoleDisplay()}</h4>
                  <span className="bg-primary/20 text-primary text-[10px] font-black px-2 py-0.5 rounded border border-primary/30 tracking-tighter uppercase neon-glow-primary">
                    {t('settings.active')}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-light tracking-wide">
                  Your account is currently active and monitoring products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations & Security */}
        <div className="grid md:grid-cols-2 gap-6 pb-20">
          <section className="glass-module rounded-xl p-6 space-y-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">hub</span>
              {t('settings.marketplaceSync')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-[#ed4d2d] flex items-center justify-center font-black text-[10px] text-white italic">
                    SH
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight">Shopee ID</span>
                </div>
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-[#42b549] flex items-center justify-center font-black text-[10px] text-white italic">
                    TK
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight">Tokopedia</span>
                </div>
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              </div>
              <button className="w-full py-2 border border-dashed border-glass-border text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:text-white hover:border-white/30 transition-all">
                {t('settings.connectMarketplace')}
              </button>
            </div>
          </section>

          <section className="glass-module rounded-xl p-6 space-y-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">security</span>
              {t('settings.security')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{t('settings.twoFactor')}</p>
                  <p className="text-[10px] text-slate-500">{t('settings.secureWhatsApp')}</p>
                </div>
                <div className="w-10 h-5 bg-primary/20 border border-primary/40 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 size-3 bg-primary rounded-full shadow-[0_0_8px_#25f49d]"></div>
                </div>
              </div>
              <div className="h-px bg-glass-border"></div>
              <button className="flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">lock_reset</span>
                {t('settings.resetPassword')}
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">api</span>
                {t('settings.rotateApiKeys')}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
