import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useTranslation } from '../../hooks/useTranslation';

export const ObsidianHeader = () => {
  const { isAuthenticated } = useAuthStore();
  const { t, language, setLanguage } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
                {t('header.intelligence')}
              </Link>
              <Link to="/networks" className="hover:text-neon-mint transition-colors">
                {t('header.networks')}
              </Link>
              <Link to="/api" className="hover:text-neon-mint transition-colors">
                {t('header.api')}
              </Link>
              <Link to="/enterprise" className="hover:text-neon-mint transition-colors">
                {t('header.enterprise')}
              </Link>
            </nav>
          )}
          
          <div className="flex items-center gap-4 md:gap-6">
            {isAuthenticated() ? (
              <Link
                to="/dashboard"
                className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-all"
              >
                {t('common.dashboard')}
              </Link>
            ) : (
              <>
                {/* Desktop: Show Login & Connect Now */}
                <Link
                  to="/login"
                  className="hidden md:inline-block text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-all"
                >
                  {t('login.access')}
                </Link>
                <Link
                  to="/register"
                  className="hidden md:inline-block neon-border-glow px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-transparent hover:bg-neon-mint hover:text-obsidian transition-all"
                >
                  {t('header.connectNow')}
                </Link>
              </>
            )}

            {/* Language Toggle - Always visible, dengan bendera CSS */}
            <button
              onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 hover:text-neon-mint transition-all uppercase"
              aria-label="Toggle language"
            >
              <span className="relative w-5 h-4 rounded-sm overflow-hidden border border-white/20">
                {language === 'id' ? (
                  // Flag Indonesia - Merah Putih
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-600"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>
                  </>
                ) : (
                  // Flag Inggris - Union Jack style (simplified)
                  <>
                    <div className="absolute inset-0 bg-blue-700"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-white"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rotate-90">
                      <div className="w-full h-0.5 bg-white"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rotate-45">
                      <div className="w-full h-0.5 bg-red-600"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                      <div className="w-full h-0.5 bg-red-600"></div>
                    </div>
                  </>
                )}
              </span>
              <span className="hidden sm:inline">{language === 'id' ? 'EN' : 'ID'}</span>
            </button>

            {/* Mobile: Menu Burger Button - Paling Kanan */}
            {!isAuthenticated() && (
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-slate-400 hover:text-neon-mint transition-colors p-2"
                aria-label="Toggle menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-obsidian border-l border-white/5 z-[50] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-mint flex items-center justify-center">
              <span className="material-symbols-outlined text-obsidian font-bold text-xl">
                insights
              </span>
            </div>
            <span className="text-xl font-extrabold tracking-tight uppercase text-white">
              HargaCerdas
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-slate-400 hover:text-neon-mint transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <nav className="p-6 space-y-4 overflow-y-auto">
          {/* Navigation Links */}
          <Link
            to="/intelligence"
            onClick={closeMobileMenu}
            className="block text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-neon-mint transition-colors py-2"
          >
            {t('header.intelligence')}
          </Link>
          <Link
            to="/networks"
            onClick={closeMobileMenu}
            className="block text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-neon-mint transition-colors py-2"
          >
            {t('header.networks')}
          </Link>
          <Link
            to="/api"
            onClick={closeMobileMenu}
            className="block text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-neon-mint transition-colors py-2"
          >
            {t('header.api')}
          </Link>
          <Link
            to="/enterprise"
            onClick={closeMobileMenu}
            className="block text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-neon-mint transition-colors py-2"
          >
            {t('header.enterprise')}
          </Link>
          
          {/* Auth Buttons */}
          <div className="pt-6 border-t border-white/5 space-y-3">
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="block text-sm font-bold tracking-widest text-slate-400 hover:text-white transition-colors py-2"
            >
              {t('login.access')}
            </Link>
            <Link
              to="/register"
              onClick={closeMobileMenu}
              className="block w-full text-center neon-border-glow px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest bg-transparent hover:bg-neon-mint hover:text-obsidian transition-all border border-neon-mint/30"
            >
              {t('header.connectNow')}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
