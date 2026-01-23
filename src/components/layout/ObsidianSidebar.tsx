import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types/user.types';
import { useTranslation } from '../../hooks/useTranslation';
import { useNotifications } from '../../hooks/useNotifications';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  roles?: UserRole[];
  badge?: number | null;
}

interface ObsidianSidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { name: 'Products', path: '/products', icon: 'package_2' },
  { name: 'Alerts', path: '/alerts', icon: 'notifications', badge: null }, // Will be set dynamically
  { name: 'Settings', path: '/settings', icon: 'settings' },
];

const adminNavItems: NavItem[] = [
  { name: 'Admin Dashboard', path: '/admin/dashboard', icon: 'admin_panel_settings', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Users', path: '/admin/users', icon: 'people', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Pricing', path: '/admin/pricing', icon: 'payments', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Analytics', path: '/admin/analytics', icon: 'analytics', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
];

const superadminNavItems: NavItem[] = [
  { name: 'Superadmin', path: '/superadmin/dashboard', icon: 'shield', roles: [UserRole.SUPERADMIN] },
  { name: 'Admins', path: '/superadmin/admins', icon: 'admin_panel_settings', roles: [UserRole.SUPERADMIN] },
  { name: 'Billing', path: '/superadmin/billing', icon: 'payments', roles: [UserRole.SUPERADMIN] },
];

export const ObsidianSidebar = ({ isMobileOpen = false, onClose }: ObsidianSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { t } = useTranslation();
  const { unreadCount, isAdmin } = useNotifications();

  const isActive = (path: string) => location.pathname === path;

  const canAccess = (item: NavItem) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role as UserRole);
  };

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

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  // Update alerts badge with real-time count (only for non-admin users)
  const alertsItem = navItems.find(item => item.name === 'Alerts');
  if (alertsItem && !isAdmin) {
    alertsItem.badge = unreadCount > 0 ? unreadCount : null;
  } else if (alertsItem) {
    alertsItem.badge = null; // No badge for admin/superadmin
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-white/5 bg-obsidian flex flex-col z-[50] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-mint flex items-center justify-center">
              <span className="material-symbols-outlined text-obsidian font-bold text-xl">
                insights
              </span>
            </div>
            <div>
              <Link to="/" className="text-xl font-extrabold tracking-tight uppercase text-white" onClick={handleLinkClick}>
                HargaCerdas
              </Link>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-neon-mint transition-colors"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors relative ${
                isActive(item.path)
                  ? 'bg-white/5 text-neon-mint border border-neon-mint/30'
                  : 'text-slate-400 hover:text-neon-mint hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium flex-1">
                {item.name === 'Dashboard' ? t('sidebar.dashboard') :
                 item.name === 'Products' ? t('sidebar.products') :
                 item.name === 'Alerts' ? t('sidebar.alerts') :
                 item.name === 'Settings' ? t('sidebar.settings') : item.name}
              </span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm min-w-[20px] text-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </Link>
          ))}

          {(user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN) && (
            <>
              <div className="pt-10 pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] px-4">
                {t('sidebar.system')}
              </div>
              {adminNavItems
                .filter(canAccess)
                .map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                      isActive(item.path)
                        ? 'bg-white/5 text-neon-mint border border-neon-mint/30'
                        : 'text-slate-400 hover:text-neon-mint hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="text-sm font-medium">
                      {item.name === 'Admin Dashboard' ? t('sidebar.adminDashboard') :
                       item.name === 'Users' ? t('sidebar.users') :
                       item.name === 'Pricing' ? t('sidebar.pricing') :
                       item.name === 'Analytics' ? t('sidebar.analytics') :
                       item.name === 'Superadmin' ? t('sidebar.superadmin') :
                       item.name === 'Admins' ? t('sidebar.admins') :
                       item.name === 'Billing' ? t('sidebar.billing') : item.name}
                    </span>
                  </Link>
                ))}
            </>
          )}

          {user?.role === UserRole.SUPERADMIN && (
            <>
              {superadminNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/5 text-neon-mint border border-neon-mint/30'
                      : 'text-slate-400 hover:text-neon-mint hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <div className="p-4 rounded-sm bg-white/5 backdrop-blur-xl border border-white/5 flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-neon-mint">person</span>
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-extrabold text-white truncate tracking-tight">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate font-light">{getRoleDisplay()}</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleLogout();
              if (onClose) onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-black tracking-[0.2em] uppercase">{t('sidebar.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-obsidian flex flex-col hidden lg:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-mint flex items-center justify-center">
            <span className="material-symbols-outlined text-obsidian font-bold text-xl">
              insights
            </span>
          </div>
          <div>
            <Link to="/" className="text-xl font-extrabold tracking-tight uppercase text-white">
              HargaCerdas
            </Link>
          </div>
        </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors relative ${
              isActive(item.path)
                ? 'bg-white/5 text-neon-mint border border-neon-mint/30'
                : 'text-slate-400 hover:text-neon-mint hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-medium flex-1">
              {item.name === 'Dashboard' ? t('sidebar.dashboard') :
               item.name === 'Products' ? t('sidebar.products') :
               item.name === 'Alerts' ? t('sidebar.alerts') :
               item.name === 'Settings' ? t('sidebar.settings') : item.name}
            </span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm min-w-[20px] text-center">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </Link>
        ))}

        {(user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN) && (
          <>
            <div className="pt-10 pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] px-4">
              {t('sidebar.system')}
            </div>
            {adminNavItems
              .filter(canAccess)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/5 text-neon-mint border border-neon-mint/30'
                      : 'text-slate-400 hover:text-neon-mint hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm font-medium">
                    {item.name === 'Admin Dashboard' ? t('sidebar.adminDashboard') :
                     item.name === 'Users' ? t('sidebar.users') :
                     item.name === 'Pricing' ? t('sidebar.pricing') :
                     item.name === 'Analytics' ? t('sidebar.analytics') :
                     item.name === 'Superadmin' ? t('sidebar.superadmin') :
                     item.name === 'Admins' ? t('sidebar.admins') :
                     item.name === 'Billing' ? t('sidebar.billing') : item.name}
                  </span>
                </Link>
              ))}
          </>
        )}

        {user?.role === UserRole.SUPERADMIN && (
          <>
            {superadminNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive(item.path)
                    ? 'bg-white/5 text-neon-mint border border-neon-mint/30'
                    : 'text-slate-400 hover:text-neon-mint hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-sm bg-white/5 backdrop-blur-xl border border-white/5 flex items-center gap-3">
          <div className="size-10 rounded-full bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-neon-mint">person</span>
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-extrabold text-white truncate tracking-tight">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-400 truncate font-light">{getRoleDisplay()}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-black tracking-[0.2em] uppercase">{t('sidebar.logout')}</span>
        </button>
      </div>
      </aside>
    </>
  );
};
