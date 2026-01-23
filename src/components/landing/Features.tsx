interface Feature {
  icon: string;
  title: string;
  description: string;
  items: string[];
  imageIcon?: string;
  reverse?: boolean;
  linkText?: string;
  linkHref?: string;
}

interface FeaturesProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: 'radar',
    title: 'Omni-Channel Surveillance',
    description: 'Automatically crawl thousands of product listings every minute. Our proprietary engine bypasses anti-bot measures to deliver the most accurate market landscape in Indonesia.',
    items: [
      'Real-time Price Indexing',
      'Stock Level Monitoring',
      'Buy-box Prediction AI'
    ],
    imageIcon: 'grid_view'
  },
  {
    icon: 'hub',
    title: 'Dynamic Alert Protocol',
    description: 'Never miss a movement. Receive instant encrypted notifications via WhatsApp, Telegram, or Webhook as soon as your competitive threshold is breached.',
    imageIcon: 'dynamic_feed',
    reverse: true,
    linkText: 'Explore Alert Engine',
    linkHref: '#'
  }
];

export const Features = ({ features = defaultFeatures }: FeaturesProps) => {
  return (
    <section className="max-w-7xl mx-auto py-32 space-y-48 px-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center gap-24 ${
            feature.reverse ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="flex-1 space-y-8">
            <div className="w-14 h-14 bg-neon-mint/10 border border-neon-mint/20 flex items-center justify-center">
              <span className={`material-symbols-outlined text-neon-mint text-3xl mint-icon-glow`}>
                {feature.icon}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {feature.title}
            </h2>
            
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              {feature.description}
            </p>
            
            {feature.items && (
              <ul className="space-y-4 text-sm font-bold tracking-wide uppercase text-slate-500">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-4">
                    <span className="w-4 h-[1px] bg-neon-mint"></span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            
            {feature.linkText && feature.linkHref && (
              <div className="pt-4">
                <a
                  href={feature.linkHref}
                  className="text-neon-mint font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all"
                >
                  {feature.linkText}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            )}
          </div>
          
          <div className="flex-1 w-full aspect-video bg-white/5 border border-white/5 rounded-sm flex items-center justify-center relative overflow-hidden group">
            <div
              className={`absolute inset-0 bg-gradient-to-${
                feature.reverse ? 'bl' : 'tr'
              } from-neon-mint/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
            ></div>
            <span className="material-symbols-outlined text-white/10 text-9xl group-hover:text-neon-mint/20 transition-colors">
              {feature.imageIcon || 'grid_view'}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};
