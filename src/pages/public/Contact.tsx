import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Contact() {
  const { language } = useTranslation();

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-neon-mint/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white neon-glow-text">
            {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            {language === 'id'
              ? 'Ingin demo, integrasi custom, atau diskusi enterprise? Kirim detail kebutuhan Anda.'
              : 'Want a demo, custom integration, or enterprise discussion? Send us your requirements.'}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto pb-24 px-6 grid md:grid-cols-[1.6fr,1.2fr] gap-10">
        <form className="glass-panel p-6 rounded-xl space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-2">
                {language === 'id' ? 'Nama' : 'Name'}
              </label>
              <input
                type="text"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-mint/60"
                placeholder={language === 'id' ? 'Nama lengkap Anda' : 'Your full name'}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-mint/60"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-2">
              {language === 'id' ? 'Perusahaan' : 'Company'}
            </label>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-mint/60"
              placeholder={language === 'id' ? 'Nama perusahaan' : 'Company name'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-2">
              {language === 'id' ? 'Pesan' : 'Message'}
            </label>
            <textarea
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-neon-mint/60 resize-none"
              placeholder={
                language === 'id'
                  ? 'Ceritakan singkat kebutuhan monitoring harga Anda...'
                  : 'Briefly describe your price monitoring needs...'
              }
            />
          </div>

          <button
            type="button"
            className="w-full bg-neon-mint text-obsidian font-bold py-3 rounded-lg text-xs tracking-[0.2em] uppercase hover:bg-neon-mint/90 transition-colors"
          >
            {language === 'id' ? 'Kirim' : 'Send'}
          </button>
        </form>

        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-xl space-y-2 text-sm text-slate-300">
            <h2 className="text-base font-semibold text-white">
              {language === 'id' ? 'Kontak Langsung' : 'Direct Contact'}
            </h2>
            <p>hello@hargacerdas.com</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

