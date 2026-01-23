import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types/user.types';
import { useTranslation } from '../../hooks/useTranslation';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  roles?: UserRole[];
  badge?: number;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { name: 'Products', path: '/products', icon: 'package_2' },
  { name: 'Alerts', path: '/alerts', icon: 'notifications', badge: 12 },
  { name: 'Settings', path: '/settings', icon: 'settings' },
];

const adminNavItems: NavItem[] = [
  { name: 'Admin Dashboard', path: '/admin/dashboard', icon: 'admin_panel_settings', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Users', path: '/admin/users', icon: 'people', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Analytics', path: '/admin/analytics', icon: 'analytics', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
];

const superadminNavItems: NavItem[] = [
  { name: 'Superadmin', path: '/superadmin/dashboard', icon: 'shield', roles: [UserRole.SUPERADMIN] },
  { name: 'Admins', path: '/superadmin/admins', icon: 'admin_panel_settings', roles: [UserRole.SUPERADMIN] },
  { name: 'Billing', path: '/superadmin/billing', icon: 'payments', roles: [UserRole.SUPERADMIN] },
];

export const ObsidianSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const { t } = useTranslation();

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

  return (
    <aside className="w-64 border-r border-[#23483f] bg-background-light dark:bg-background-dark flex flex-col hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(19,236,182,0.5)]">
          <span className="material-symbols-outlined text-background-dark font-bold">monitoring</span>
        </div>
        <div>
          <h1 className="text-white text-lg font-black tracking-tight leading-none uppercase">HargaCerdas</h1>
          <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Price Monitor</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-slate-400 hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm font-medium">
              {item.name === 'Dashboard' ? t('sidebar.dashboard') :
               item.name === 'Products' ? t('sidebar.products') :
               item.name === 'Alerts' ? t('sidebar.alerts') :
               item.name === 'Settings' ? t('sidebar.settings') : item.name}
            </span>
            {item.badge && (
              <span className="ml-auto bg-primary text-background-dark text-[10px] font-bold px-1.5 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        {(user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN) && (
          <>
            <div className="pt-10 pb-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4">
              {t('sidebar.system')}
            </div>
            {adminNavItems
              .filter(canAccess)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-slate-400 hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="text-sm font-medium">
                    {item.name === 'Admin Dashboard' ? t('sidebar.adminDashboard') :
                     item.name === 'Users' ? t('sidebar.users') :
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-slate-400 hover:text-primary'
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
        <div className="p-4 rounded-xl bg-obsidian border border-white/5 flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 truncate">{getRoleDisplay()}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/5 transition-all neon-glow-red"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-sm font-bold tracking-widest uppercase">{t('sidebar.logout')}</span>
        </button>
      </div>
    </aside>
  );
};
