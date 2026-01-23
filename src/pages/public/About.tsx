import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function About() {
  const { language } = useTranslation();

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-neon-mint/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white neon-glow-text">
            {language === 'id' ? 'Tentang HargaCerdas' : 'About HargaCerdas'}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {language === 'id'
              ? 'HargaCerdas dibangun untuk membantu brand dan seller di Indonesia memenangkan perang harga di marketplace dengan data yang presisi dan real-time.'
              : 'HargaCerdas is built to help brands and sellers in Indonesia win the marketplace price war with precise, real-time data.'}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto pb-24 px-6 grid md:grid-cols-2 gap-10">
        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-bold text-white">
            {language === 'id' ? 'Misi' : 'Our Mission'}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {language === 'id'
              ? 'Memberikan infrastruktur intelijen harga kelas enterprise yang bisa diakses oleh semua ukuran bisnis.'
              : 'To provide enterprise-grade price intelligence infrastructure that is accessible for businesses of all sizes.'}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-bold text-white">
            {language === 'id' ? 'Fokus' : 'Our Focus'}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {language === 'id'
              ? 'Kecepatan data, keakuratan scraping, dan insight yang langsung bisa dieksekusi oleh tim pricing Anda.'
              : 'Data speed, scraping accuracy, and insights that can be acted on immediately by your pricing team.'}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

