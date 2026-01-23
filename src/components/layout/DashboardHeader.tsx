import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useTranslation } from '../../hooks/useTranslation';
import { UserRole } from '../../types/user.types';
import { useNotifications } from '../../hooks/useNotifications';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();
  const { unreadCount, isAdmin } = useNotifications();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const getRoleDisplay = () => {
    if (user?.role === UserRole.PREMIUM) return t('sidebar.proPlan');
    if (user?.role === UserRole.ADMIN) return t('sidebar.admin');
    if (user?.role === UserRole.SUPERADMIN) return t('sidebar.superadminRole');
    return t('sidebar.freePlan');
  };

  return (
    <header className="sticky top-0 z-[42] glass-obsidian border-b border-white/5">
      <div className="px-6 py-5 flex items-center justify-between">
        {/* Left side - Burger menu for mobile */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-slate-400 hover:text-neon-mint transition-colors p-2 z-[60] relative"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>

        {/* Right side - User info and actions */}
        <div className="flex items-center gap-4">
          {/* Notifications Badge - Only for non-admin users */}
          {!isAdmin && (
            <Link
              to="/alerts"
              className="relative text-slate-400 hover:text-neon-mint transition-colors p-2"
              aria-label="Alerts"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-obsidian">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="text-xs font-bold tracking-widest text-slate-400 hover:text-neon-mint transition-all uppercase px-3 py-2 hover:bg-white/5 rounded-sm"
          >
            {language === 'id' ? 'EN' : 'ID'}
          </button>

          {/* User Info - No box, just clean design */}
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint text-sm">person</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-extrabold text-white leading-tight tracking-tight">{user?.name || 'User'}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-light">{getRoleDisplay()}</p>
            </div>
          </div>

          {/* Logout Button - Minimal style */}
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 transition-colors p-2"
            aria-label="Logout"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
