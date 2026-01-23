import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Networks() {
  const { t, language } = useTranslation();

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-mint/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-mint/80">
              {language === 'id' ? 'Jaringan Terhubung' : 'Network Connected'}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold leading-[0.95] tracking-tighter mb-8 neon-glow-text">
            {language === 'id' ? 'JARINGAN' : 'NETWORKS'} <br />
            <span className="text-neon-mint">{language === 'id' ? 'MARKETPLACE.' : 'MARKETPLACE.'}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12">
            {language === 'id'
              ? 'Terhubung dengan semua marketplace utama di Indonesia. Pantau ribuan produk secara bersamaan dengan infrastruktur yang handal dan scalable.'
              : 'Connected to all major marketplaces in Indonesia. Monitor thousands of products simultaneously with reliable and scalable infrastructure.'
            }
          </p>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            // Warna & inisial disesuaikan dengan brand masing-masing marketplace
            { name: 'Tokopedia', color: '#42b549', initial: 'T' },
            { name: 'Shopee', color: '#ee4d2d', initial: 'S' },
            { name: 'Lazada', color: '#0f146d', initial: 'L' },
            { name: 'Bukalapak', color: '#e31e52', initial: 'B' },
          ].map((marketplace) => (
            <div key={marketplace.name} className="glass-panel p-6 rounded-xl text-center space-y-4">
              <div
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg shadow-black/40 border border-white/10"
                style={{ backgroundColor: marketplace.color }}
              >
                {/* Icon bergaya seperti logo aplikasi: huruf inisial dengan warna brand */}
                <span className="text-white text-2xl font-black tracking-tight">
                  {marketplace.initial}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{marketplace.name}</h3>
              <p className="text-slate-400 text-sm">
                {language === 'id' ? 'Terhubung & Aktif' : 'Connected & Active'}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div className="glass-panel p-8 rounded-xl space-y-6">
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Infrastruktur Global' : 'Global Infrastructure'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Server terdistribusi di seluruh dunia untuk kecepatan maksimal dan uptime 99.9%.'
                : 'Distributed servers worldwide for maximum speed and 99.9% uptime.'
              }
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-mint"></span>
                {language === 'id' ? 'CDN Global' : 'Global CDN'}
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-mint"></span>
                {language === 'id' ? 'Load Balancing' : 'Load Balancing'}
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-mint"></span>
                {language === 'id' ? 'Auto Scaling' : 'Auto Scaling'}
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-6">
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Keamanan Data' : 'Data Security'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Enkripsi end-to-end dan protokol keamanan tingkat enterprise untuk melindungi data Anda.'
                : 'End-to-end encryption and enterprise-grade security protocols to protect your data.'
              }
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-mint"></span>
                {language === 'id' ? 'AES-256 Encryption' : 'AES-256 Encryption'}
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-mint"></span>
                {language === 'id' ? 'SSL/TLS Secure' : 'SSL/TLS Secure'}
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-neon-mint"></span>
                {language === 'id' ? 'GDPR Compliant' : 'GDPR Compliant'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
