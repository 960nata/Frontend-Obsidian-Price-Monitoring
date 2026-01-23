import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useTranslation } from '../../hooks/useTranslation';

export const ObsidianHeader = () => {
  const { isAuthenticated } = useAuthStore();
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-obsidian">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-mint flex items-center justify-center">
            <span className="material-symbols-outlined text-obsidian font-bold text-xl">
              insights
            </span>
          </div>
          <Link to="/" className="text-xl font-extrabold tracking-tight uppercase">
            HargaCerdas
          </Link>
        </div>
        
        {!isAuthenticated() && (
          <nav className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <Link to="/intelligence" className="hover:text-neon-mint transition-colors">
              Intelligence
            </Link>
            <Link to="/networks" className="hover:text-neon-mint transition-colors">
              Networks
            </Link>
            <Link to="/api" className="hover:text-neon-mint transition-colors">
              API
            </Link>
            <Link to="/enterprise" className="hover:text-neon-mint transition-colors">
              Enterprise
            </Link>
          </nav>
        )}
        
        <div className="flex items-center gap-6">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="text-xs font-bold tracking-widest text-slate-400 hover:text-neon-mint transition-all uppercase"
          >
            {language === 'id' ? 'EN' : 'ID'}
          </button>
          
          {isAuthenticated() ? (
            <Link
              to="/dashboard"
              className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-all"
            >
              {t('common.dashboard')}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-all"
              >
                {language === 'id' ? 'MASUK' : 'ACCESS'}
              </Link>
              <Link
                to="/register"
                className="neon-border-glow px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-transparent hover:bg-neon-mint hover:text-obsidian transition-all"
              >
                {language === 'id' ? 'Hubungkan Sekarang' : 'Connect Now'}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
