import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Intelligence() {
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
              {language === 'id' ? 'Kecerdasan Aktif' : 'Intelligence Active'}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold leading-[0.95] tracking-tighter mb-8 neon-glow-text">
            {language === 'id' ? 'KECERDASAN' : 'INTELLIGENCE'} <br />
            <span className="text-neon-mint">{language === 'id' ? 'PASAR.' : 'MARKET.'}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12">
            {language === 'id' 
              ? 'Platform kecerdasan harga terdepan untuk marketplace Indonesia. Dapatkan wawasan real-time tentang pergerakan harga kompetitor dengan teknologi AI terdepan.'
              : 'The leading price intelligence platform for Indonesian marketplaces. Get real-time insights into competitor price movements with cutting-edge AI technology.'
            }
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 space-y-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                analytics
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Analisis Prediktif' : 'Predictive Analytics'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Gunakan AI untuk memprediksi pergerakan harga masa depan dan peluang terbaik untuk membeli atau menjual.'
                : 'Use AI to predict future price movements and the best opportunities to buy or sell.'
              }
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                auto_awesome
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Machine Learning' : 'Machine Learning'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Algoritma pembelajaran mesin yang terus berkembang untuk akurasi yang lebih tinggi setiap hari.'
                : 'Continuously evolving machine learning algorithms for higher accuracy every day.'
              }
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                insights
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Wawasan Real-Time' : 'Real-Time Insights'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Dapatkan notifikasi instan tentang perubahan harga, trend, dan peluang pasar.'
                : 'Get instant notifications about price changes, trends, and market opportunities.'
              }
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
