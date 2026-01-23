import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-mint/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-mint/80">
            Quantum Tracking Active
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-extrabold leading-[0.95] tracking-tighter mb-8 neon-glow-text">
          UNRIVALED <br />
          <span className="text-neon-mint">MARKET VISION.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12">
          The definitive pricing intelligence suite for Indonesian marketplaces. 
          Experience real-time telemetry across Shopee, Tokopedia, and Lazada.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Link
            to="/register"
            className="neon-border-glow bg-neon-mint text-obsidian px-10 py-5 rounded-sm text-sm font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
          >
            Establish Link
          </Link>
          <Link
            to="/login"
            className="px-10 py-5 rounded-sm text-sm font-black uppercase tracking-[0.2em] border border-white/10 hover:border-white/20 transition-all bg-white/5"
          >
            View Systems
          </Link>
        </div>
        
        <div className="relative w-full max-w-5xl mx-auto mt-10">
          <div className="mockup-float rounded-2xl border border-white/10 bg-slate-900/40 p-1 backdrop-blur-3xl">
            <div className="rounded-xl overflow-hidden bg-obsidian border border-white/5 shadow-2xl">
              <div className="h-8 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </div>
              <div className="p-8 grid grid-cols-12 gap-6 h-[400px]">
                <div className="col-span-3 space-y-4">
                  <div className="h-4 w-full bg-white/5 rounded-full"></div>
                  <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
                  <div className="h-32 w-full border border-neon-mint/20 rounded-lg bg-neon-mint/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-neon-mint opacity-40">
                      query_stats
                    </span>
                  </div>
                </div>
                <div className="col-span-9 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
                    <div className="h-8 w-24 bg-neon-mint/20 rounded-lg"></div>
                  </div>
                  <div className="h-64 border border-white/5 bg-white/5 rounded-xl flex items-end p-6 gap-2">
                    <div className="w-full bg-neon-mint/20 h-1/2 rounded-sm"></div>
                    <div className="w-full bg-neon-mint/30 h-3/4 rounded-sm"></div>
                    <div className="w-full bg-neon-mint/40 h-2/3 rounded-sm"></div>
                    <div className="w-full bg-neon-mint/60 h-4/5 rounded-sm"></div>
                    <div className="w-full bg-neon-mint h-full rounded-sm"></div>
                    <div className="w-full bg-neon-mint/80 h-3/4 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-12 -bottom-10 w-64 p-6 glass-obsidian rounded-xl border border-neon-mint/30 hidden lg:block mockup-float">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-neon-mint mint-icon-glow">
                notifications_active
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-neon-mint">
                Alert Triggered
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Price deviation detected in Competitor A (-12%)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
