import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from 'react-router-dom';

export default function Enterprise() {
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
              {language === 'id' ? 'Solusi Perusahaan' : 'Enterprise Solution'}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold leading-[0.95] tracking-tighter mb-8 neon-glow-text">
            {language === 'id' ? 'PERUSAHAAN' : 'ENTERPRISE'} <br />
            <span className="text-neon-mint">{language === 'id' ? 'SOLUSI.' : 'SOLUTIONS.'}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12">
            {language === 'id'
              ? 'Solusi enterprise lengkap untuk bisnis besar. Dapatkan dukungan dedicated, SLA terjamin, dan fitur custom sesuai kebutuhan perusahaan Anda.'
              : 'Complete enterprise solutions for large businesses. Get dedicated support, guaranteed SLA, and custom features tailored to your company needs.'
            }
          </p>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="max-w-7xl mx-auto py-20 px-6 space-y-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                support_agent
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Dukungan Dedicated' : 'Dedicated Support'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Tim support khusus 24/7 dengan response time kurang dari 1 jam untuk semua isu kritis.'
                : 'Dedicated 24/7 support team with under 1 hour response time for all critical issues.'
              }
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                verified
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'SLA Terjamin' : 'Guaranteed SLA'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Service Level Agreement dengan uptime 99.9% dan kompensasi jika tidak tercapai.'
                : 'Service Level Agreement with 99.9% uptime and compensation if not met.'
              }
            </p>
          </div>

          <div className="glass-panel p-8 rounded-xl space-y-4">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-3xl mint-icon-glow">
                tune
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {language === 'id' ? 'Custom Features' : 'Custom Features'}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {language === 'id'
                ? 'Fitur custom yang dikembangkan khusus sesuai kebutuhan bisnis Anda.'
                : 'Custom features developed specifically for your business needs.'
              }
            </p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="glass-panel p-8 rounded-xl">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            {language === 'id' ? 'Paket Enterprise' : 'Enterprise Plans'}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-primary/30 rounded-xl p-6 space-y-4">
              <h4 className="text-xl font-bold text-white">
                {language === 'id' ? 'Enterprise Standard' : 'Enterprise Standard'}
              </h4>
              <div className="text-4xl font-black text-primary">
                {language === 'id' ? 'Kustom' : 'Custom'}
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-mint text-sm">check</span>
                  {language === 'id' ? 'Unlimited Products' : 'Unlimited Products'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-mint text-sm">check</span>
                  {language === 'id' ? 'Priority Support' : 'Priority Support'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-mint text-sm">check</span>
                  {language === 'id' ? 'Custom Integrations' : 'Custom Integrations'}
                </li>
              </ul>
            </div>

            <div className="border border-primary/30 rounded-xl p-6 space-y-4">
              <h4 className="text-xl font-bold text-white">
                {language === 'id' ? 'Enterprise Premium' : 'Enterprise Premium'}
              </h4>
              <div className="text-4xl font-black text-primary">
                {language === 'id' ? 'Kustom+' : 'Custom+'}
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-mint text-sm">check</span>
                  {language === 'id' ? 'Semua fitur Standard' : 'All Standard features'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-mint text-sm">check</span>
                  {language === 'id' ? 'Dedicated Account Manager' : 'Dedicated Account Manager'}
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-neon-mint text-sm">check</span>
                  {language === 'id' ? 'On-Premise Deployment' : 'On-Premise Deployment'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/register"
            className="neon-border-glow bg-neon-mint text-obsidian px-12 py-6 rounded-sm text-sm font-black uppercase tracking-[0.3em] hover:scale-105 transition-all inline-block"
          >
            {language === 'id' ? 'Hubungi Tim Sales' : 'Contact Sales Team'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
