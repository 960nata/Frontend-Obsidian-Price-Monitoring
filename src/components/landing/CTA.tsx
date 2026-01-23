import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface CTAProps {
  title?: string | ReactNode;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const CTA = ({
  title = (
    <>
      SCALE TO <br />
      DOMINANCE.
    </>
  ),
  subtitle = 'Secure your competitive edge with our institutional-grade intelligence platform.',
  buttonText = 'Initialize System',
  buttonLink = '/register'
}: CTAProps) => {
  return (
    <section className="py-40 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-neon-mint/5 blur-[150px] rounded-full scale-50 opacity-20"></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 neon-glow-text">
          {title}
        </h2>
        <p className="text-slate-400 text-lg mb-12 font-light">{subtitle}</p>
        <Link
          to={buttonLink}
          className="neon-border-glow bg-neon-mint text-obsidian px-12 py-6 rounded-sm text-sm font-black uppercase tracking-[0.3em] hover:scale-105 transition-all inline-block"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};
