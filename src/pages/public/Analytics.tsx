import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';
import { ApexChart } from '../../components/charts/ApexChart';

export default function Analytics() {
  const { language } = useTranslation();

  const series = [
    {
      name: language === 'id' ? 'Harga Rata-rata' : 'Average Price',
      data: [120, 132, 128, 140, 136, 150, 160],
    },
  ];

  const options = {
    chart: { toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories:
        language === 'id'
          ? ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
          : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { colors: '#64748b' } },
    },
    yaxis: {
      labels: { style: { colors: '#64748b' } },
    },
    grid: { borderColor: 'rgba(148, 163, 184, 0.2)' },
  };

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
              {language === 'id' ? 'Wawasan Harga' : 'Pricing Insights'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4 neon-glow-text">
            {language === 'id' ? 'Analytics' : 'Analytics'}{' '}
            <span className="text-neon-mint">
              {language === 'id' ? 'Harga' : 'Pricing'}
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            {language === 'id'
              ? 'Layer visualisasi untuk memahami pergerakan harga lintas marketplace, kategori, dan kompetitor.'
              : 'A visualization layer to understand price movements across marketplaces, categories, and competitors.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto pb-24 px-6 grid lg:grid-cols-[1.8fr,1.2fr] gap-10">
        <div className="glass-panel p-6 md:p-8 rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {language === 'id' ? 'Tren Harga Mingguan' : 'Weekly Price Trend'}
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neon-mint">
              {language === 'id' ? 'Data Simulasi' : 'Sample Data'}
            </span>
          </div>

          <div className="h-72 md:h-80">
            <ApexChart options={options} series={series} type="area" height="100%" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-3">
            <h3 className="text-lg font-bold text-white">
              {language === 'id' ? 'Metrix Utama' : 'Key Metrics'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• {language === 'id' ? 'Elastisitas harga per kategori' : 'Price elasticity per category'}</li>
              <li>• {language === 'id' ? 'Deteksi perang harga kompetitor' : 'Competitor price war detection'}</li>
              <li>• {language === 'id' ? 'Margin dan rekomendasi penyesuaian' : 'Margin and optimization suggestions'}</li>
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-xl space-y-3">
            <h3 className="text-lg font-bold text-white">
              {language === 'id' ? 'Use Case' : 'Use Cases'}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {language === 'id'
                ? 'Tim pricing, growth, dan revenue bisa menggunakan analytics untuk mengatur strategi diskon, bundling, dan positioning harga.'
                : 'Pricing, growth, and revenue teams can use analytics to design discount strategies, bundling, and price positioning.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

