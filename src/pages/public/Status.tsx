import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Status() {
  const { language } = useTranslation();

  const services = [
    { name: 'API Core', status: 'operational' },
    { name: 'Scraping Cluster', status: 'operational' },
    { name: 'Dashboard UI', status: 'operational' },
    { name: 'Alerts & Email', status: 'degraded' },
  ];

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-mint/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-mint/80">
              {language === 'id' ? 'Status Sistem' : 'System Status'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4 neon-glow-text">
            {language === 'id' ? 'Status' : 'Status'}{' '}
            <span className="text-neon-mint">Cluster</span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            {language === 'id'
              ? 'Pantau kesehatan layanan HargaCerdas secara real-time. Transparansi uptime untuk tim Anda.'
              : 'Monitor the health of HargaCerdas services in real time. Uptime transparency for your team.'}
          </p>
        </div>
      </section>

      {/* Status cards */}
      <section className="max-w-7xl mx-auto pb-24 px-6 space-y-6">
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-mint animate-pulse" />
            <span className="text-sm font-semibold text-slate-100">
              {language === 'id' ? 'Semua sistem utama beroperasi' : 'All core systems operational'}
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            99.9% UPTIME (SAMPLE)
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.name} className="glass-panel p-6 rounded-xl flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">{service.name}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'id'
                    ? 'Status simulasi untuk tampilan halaman status.'
                    : 'Simulated status for the status page view.'}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] ${
                  service.status === 'operational'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/40'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-400/40'
                }`}
              >
                {service.status === 'operational'
                  ? language === 'id'
                    ? 'Operasional'
                    : 'Operational'
                  : language === 'id'
                    ? 'Terganggu'
                    : 'Degraded'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

