import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ObsidianLayout } from './ObsidianLayout';
import { DashboardLayout } from './DashboardLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Check if current route is a dashboard route (protected pages)
  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/products') ||
    location.pathname.startsWith('/alerts') ||
    location.pathname.startsWith('/settings') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/superadmin');

  // Dashboard routes tidak pakai header/footer home page
  if (isDashboardRoute) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Halaman lain pakai header dan footer home page
  return <ObsidianLayout showHeaderFooter={true}>{children}</ObsidianLayout>;
}
