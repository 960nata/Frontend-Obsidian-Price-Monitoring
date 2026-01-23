import { ReactNode } from 'react';
import { ObsidianSidebar } from './ObsidianSidebar';
import { ObsidianHeader } from '../landing/ObsidianHeader';
import { Footer } from '../landing/Footer';

interface ObsidianLayoutProps {
  children: ReactNode;
  showHeaderFooter?: boolean;
}

export const ObsidianLayout = ({ children, showHeaderFooter = true }: ObsidianLayoutProps) => {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {showHeaderFooter && <ObsidianHeader />}
      
      <div className="flex flex-1 pt-20">
        <ObsidianSidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          {children}
        </main>
      </div>
      
      {showHeaderFooter && <Footer />}
    </div>
  );
};
