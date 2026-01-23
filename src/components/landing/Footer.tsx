interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

const defaultSections: FooterSection[] = [
  {
    title: 'Interface',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Terminal', href: '/terminal' },
      { label: 'Analytics', href: '/analytics' }
    ]
  },
  {
    title: 'Protocols',
    links: [
      { label: 'Security', href: '/security' },
      { label: 'Integration', href: '/integration' },
      { label: 'Status', href: '/status' }
    ]
  },
  {
    title: 'Registry',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Legal', href: '/legal' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

const defaultBottomLinks: FooterLink[] = [
  { label: 'Terminal Log', href: '#' },
  { label: 'Privacy Ops', href: '#' }
];

export const Footer = ({
  sections = defaultSections,
  copyright = '© 2024 Obsidian Intelligence Systems Group.',
  bottomLinks = defaultBottomLinks
}: FooterProps) => {
  return (
    <footer className="border-t border-white/5 py-24 px-6 bg-obsidian">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20">
        <div className="max-w-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-neon-mint flex items-center justify-center">
              <span className="material-symbols-outlined text-obsidian font-bold text-sm">
                insights
              </span>
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">HargaCerdas</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Platform kecerdasan harga terdepan untuk retailer berkecepatan tinggi di Asia Tenggara.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
          {sections.map((section, index) => (
            <div key={index} className="space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-neon-mint">
                {section.title}
              </h5>
              <ul className="space-y-4 text-xs font-bold text-slate-500">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
        <p>{copyright}</p>
        <div className="flex gap-8">
          {bottomLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-neon-mint transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
