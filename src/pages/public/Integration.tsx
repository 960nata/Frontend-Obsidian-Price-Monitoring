import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Integration() {
  const { language } = useTranslation();

  const integrations = [
    'Tokopedia',
    'Shopee',
    'Lazada',
    'Bukalapak',
    'Custom ERP',
    'Data Warehouse',
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
              {language === 'id' ? 'Integrasi Terhubung' : 'Connected Integrations'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4 neon-glow-text">
            {language === 'id' ? 'Integrasi' : 'Integration'}{' '}
            <span className="text-neon-mint">Stack</span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            {language === 'id'
              ? 'Hubungkan HargaCerdas dengan marketplace, sistem internal, dan data warehouse hanya dalam beberapa klik.'
              : 'Connect HargaCerdas with marketplaces, internal systems, and data warehouses in just a few clicks.'}
          </p>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="max-w-7xl mx-auto pb-24 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((name) => (
          <div key={name} className="glass-panel p-6 rounded-xl space-y-3">
            <h2 className="text-lg font-bold text-white">{name}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {language === 'id'
                ? 'Integrasi siap pakai dengan konfigurasi minimal dan dokumentasi yang jelas.'
                : 'Ready-to-use integration with minimal configuration and clear documentation.'}
            </p>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}

