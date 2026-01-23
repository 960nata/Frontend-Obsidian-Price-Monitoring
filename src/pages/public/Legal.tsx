import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Legal() {
  const { language } = useTranslation();

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-neon-mint/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white neon-glow-text">
            {language === 'id' ? 'Legal & Privasi' : 'Legal & Privacy'}
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            {language === 'id'
              ? 'Ringkasan singkat mengenai ketentuan penggunaan dan privasi data di HargaCerdas.'
              : 'A brief summary of the terms of use and data privacy at HargaCerdas.'}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto pb-24 px-6 space-y-8 text-sm text-slate-300">
        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-lg font-bold text-white">
            {language === 'id' ? 'Ketentuan Penggunaan (Ringkas)' : 'Terms of Use (Summary)'}
          </h2>
          <p>
            {language === 'id'
              ? 'Produk ini masih dalam tahap pengembangan. Untuk produksi, mohon siapkan dokumen Terms of Service dan Privacy Policy lengkap sesuai kebutuhan bisnis dan regulasi.'
              : 'This product is still under active development. For production, please prepare full Terms of Service and Privacy Policy documents matching your business and regulations.'}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-lg font-bold text-white">
            {language === 'id' ? 'Data & Privasi' : 'Data & Privacy'}
          </h2>
          <p>
            {language === 'id'
              ? 'HargaCerdas dirancang untuk menyimpan data dengan aman dan terenkripsi. Implementasi final harus mengikuti standar compliance (misalnya GDPR) jika berlaku.'
              : 'HargaCerdas is designed to store data securely and encrypted. The final implementation should follow relevant compliance standards (e.g. GDPR) where applicable.'}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

