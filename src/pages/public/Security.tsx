import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Security() {
  const { language } = useTranslation();

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
              {language === 'id' ? 'Keamanan Enterprise' : 'Enterprise Security'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-4 neon-glow-text">
            {language === 'id' ? 'Keamanan' : 'Security'}{' '}
            <span className="text-neon-mint">by Design</span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg leading-relaxed">
            {language === 'id'
              ? 'Enkripsi end-to-end, kontrol akses granular, dan audit trail lengkap untuk setiap event sistem.'
              : 'End-to-end encryption, granular access control, and full audit trails for every system event.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto pb-24 px-6 grid md:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-bold text-white">Encryption</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {language === 'id'
              ? 'Data disimpan dan ditransmisikan menggunakan AES-256 dan TLS 1.3 dengan praktik terbaik keamanan.'
              : 'Data is stored and transmitted using AES-256 and TLS 1.3 following industry best practices.'}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-bold text-white">
            {language === 'id' ? 'Kontrol Akses' : 'Access Control'}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {language === 'id'
              ? 'Role-based access control (RBAC) untuk memisahkan akses user, admin, dan superadmin.'
              : 'Role-based access control (RBAC) to separate user, admin, and superadmin access clearly.'}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-bold text-white">Compliance</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {language === 'id'
              ? 'Dirancang untuk membantu tim Anda memenuhi standar compliance seperti GDPR dan SOC 2.'
              : 'Designed to help your team meet compliance standards such as GDPR and SOC 2.'}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

