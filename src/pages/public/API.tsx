import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function API() {
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
              {language === 'id' ? 'API Aktif' : 'API Active'}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold leading-[0.95] tracking-tighter mb-8 neon-glow-text">
            {language === 'id' ? 'API' : 'API'} <br />
            <span className="text-neon-mint">{language === 'id' ? 'TERBUKA.' : 'OPEN.'}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12">
            {language === 'id'
              ? 'Integrasikan data harga real-time ke dalam aplikasi Anda dengan RESTful API yang powerful dan mudah digunakan. Dokumentasi lengkap dan dukungan developer tersedia 24/7.'
              : 'Integrate real-time price data into your applications with powerful and easy-to-use RESTful API. Complete documentation and 24/7 developer support available.'
            }
          </p>
        </div>
      </section>

      {/* API Features */}
      <section className="max-w-7xl mx-auto py-20 px-6 space-y-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                code
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'RESTful API' : 'RESTful API'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'API modern dengan standar REST, mudah diintegrasikan dengan bahasa pemrograman apapun.'
                : 'Modern API with REST standards, easy to integrate with any programming language.'
              }
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                description
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Dokumentasi Lengkap' : 'Complete Documentation'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Dokumentasi interaktif dengan contoh kode untuk semua endpoint dan fitur.'
                : 'Interactive documentation with code examples for all endpoints and features.'
              }
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                speed
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'High Performance' : 'High Performance'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Response time kurang dari 100ms dengan rate limit yang generous untuk semua plan.'
                : 'Response time under 100ms with generous rate limits for all plans.'
              }
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="glass-panel p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-6">
            {language === 'id' ? 'Contoh Penggunaan' : 'Usage Example'}
          </h3>
          <div className="bg-obsidian-black rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-slate-300 font-mono">
              <code>{`// ${language === 'id' ? 'Ambil data harga produk' : 'Get product price data'}
GET https://api.hargacerdas.com/v1/products/{id}

// ${language === 'id' ? 'Response' : 'Response'}
{
  "id": "prod_123",
  "name": "iPhone 15 Pro",
  "currentPrice": 17999000,
  "marketplace": "TOKOPEDIA",
  "priceHistory": [...]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
