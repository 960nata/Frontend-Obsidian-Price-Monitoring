import { ReactNode, useState } from 'react';
import { ObsidianSidebar } from './ObsidianSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-obsidian">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <ObsidianSidebar isMobileOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={toggleMobileMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
