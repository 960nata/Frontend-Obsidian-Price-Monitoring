import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { UserRole } from '../../types/user.types';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Products', path: '/products', icon: '📦' },
  { name: 'Alerts', path: '/alerts', icon: '🔔' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

const adminNavItems: NavItem[] = [
  { name: 'Admin Dashboard', path: '/admin/dashboard', icon: '👨‍💼', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Users', path: '/admin/users', icon: '👥', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
  { name: 'Analytics', path: '/admin/analytics', icon: '📈', roles: [UserRole.ADMIN, UserRole.SUPERADMIN] },
];

const superadminNavItems: NavItem[] = [
  { name: 'Superadmin', path: '/superadmin/dashboard', icon: '👑', roles: [UserRole.SUPERADMIN] },
  { name: 'Admins', path: '/superadmin/admins', icon: '🔐', roles: [UserRole.SUPERADMIN] },
  { name: 'Billing', path: '/superadmin/billing', icon: '💳', roles: [UserRole.SUPERADMIN] },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const canAccess = (item: NavItem) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role as UserRole);
  };

  return (
    <aside className="w-64 bg-gray-50 min-h-screen border-r">
      <nav className="p-4 space-y-2">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </h2>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}

        {(user?.role === UserRole.ADMIN || user?.role === UserRole.SUPERADMIN) && (
          <>
            <div className="mt-8 mb-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Admin
              </h2>
            </div>

            {adminNavItems
              .filter(canAccess)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
          </>
        )}

        {user?.role === UserRole.SUPERADMIN && (
          <>
            <div className="mt-8 mb-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Superadmin
              </h2>
            </div>

            {superadminNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </>
        )}
      </nav>
    </aside>
  );
};
