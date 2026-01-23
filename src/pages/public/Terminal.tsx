import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Terminal() {
  const { language } = useTranslation();

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-mint/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-mint/80">
              {language === 'id' ? 'Konsol Langsung' : 'Live Console'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4 neon-glow-text">
            {language === 'id' ? 'Terminal' : 'Terminal'}{' '}
            <span className="text-neon-mint">
              {language === 'id' ? 'Harga' : 'Pricing'}
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            {language === 'id'
              ? 'Pantau aktivitas scraping, status node, dan log sistem secara real-time dalam satu konsol terpusat.'
              : 'Monitor scraping activity, node status, and system logs in real time from a single unified console.'}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto pb-24 px-6 grid lg:grid-cols-[2fr,1.2fr] gap-10">
        <div className="glass-panel p-6 md:p-8 rounded-xl space-y-4 font-mono text-xs text-slate-200 bg-gradient-to-b from-white/5 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">
              {language === 'id' ? 'Stream Log Sistem' : 'System Log Stream'}
            </span>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neon-mint">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse" />
              {language === 'id' ? 'Online' : 'Online'}
            </span>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-lg p-4 h-64 md:h-80 overflow-hidden">
            <p className="text-slate-500 mb-2">
              {language === 'id'
                ? 'Simulasi output terminal. Di produksi, area ini dapat diisi dengan stream log live dari backend.'
                : 'Terminal output simulation. In production, this area can be wired to a live log stream from the backend.'}
            </p>
            <div className="space-y-1 text-[11px]">
              <p className="text-neon-mint/80">
                [node-obsidian-01] scraping job started for marketplace TOKOPEDIA...
              </p>
              <p className="text-slate-300">
                [scheduler] next run in 04:59 — cluster size: 4 — region: ap-southeast-1
              </p>
              <p className="text-slate-300">
                [price-engine] 128 products updated · 12 alerts triggered · 0 errors
              </p>
              <p className="text-slate-400">
                [security] all connections encrypted with AES-256 / TLS 1.3
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-3">
            <h2 className="text-xl font-bold text-white">
              {language === 'id' ? 'Monitoring Node' : 'Node Monitoring'}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {language === 'id'
                ? 'Pantau kesehatan node scraping, antrian job, dan konsumsi resource untuk memastikan pipeline data tetap stabil.'
                : 'Track scraping node health, job queues, and resource usage to keep your data pipeline stable.'}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl space-y-3">
            <h2 className="text-xl font-bold text-white">
              {language === 'id' ? 'Kontrol Operasional' : 'Operational Control'}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {language === 'id'
                ? 'Terminal dirancang sebagai pusat observabilitas—restart worker, pause cluster, atau inspect satu produk secara langsung.'
                : 'The terminal is designed as an observability hub—restart workers, pause clusters, or inspect a single product directly.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

