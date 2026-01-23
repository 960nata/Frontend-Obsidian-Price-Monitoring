import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ObsidianLayout } from './ObsidianLayout';
import { DashboardLayout } from './DashboardLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  // Dashboard tidak pakai header/footer home page
  if (isDashboard) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  // Halaman lain pakai header dan footer home page
  return <ObsidianLayout showHeaderFooter={true}>{children}</ObsidianLayout>;
}
