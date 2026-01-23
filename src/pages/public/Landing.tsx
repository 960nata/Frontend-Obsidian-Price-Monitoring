import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Hero } from '../../components/landing/Hero';
import { Features } from '../../components/landing/Features';
import { Stats } from '../../components/landing/Stats';
import { CTA } from '../../components/landing/CTA';
import { Footer } from '../../components/landing/Footer';

export default function Landing() {
  return (
    <main className="relative">
      <ObsidianHeader />
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
