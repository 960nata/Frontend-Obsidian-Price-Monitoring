interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

interface StatsProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    label: 'Operations',
    value: '2.4M',
    suffix: '+',
    description: 'SKUs Monitored Daily'
  },
  {
    label: 'Response',
    value: '0.8',
    suffix: 's',
    description: 'System Latency'
  },
  {
    label: 'Coverage',
    value: '100',
    suffix: '%',
    description: 'Indo Marketplaces'
  },
  {
    label: 'Growth',
    value: '12',
    suffix: 'k',
    description: 'Scale-up Partners'
  }
];

export const Stats = ({ stats = defaultStats }: StatsProps) => {
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-mint/60">
              {stat.label}
            </p>
            <h4 className="text-4xl font-extrabold">
              {stat.value}
              {stat.suffix && (
                <span className="text-neon-mint text-2xl">{stat.suffix}</span>
              )}
            </h4>
            <p className="text-xs text-slate-500 font-bold tracking-tight">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
