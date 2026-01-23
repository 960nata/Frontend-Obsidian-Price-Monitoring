# Landing Page Components

Komponen-komponen reusable untuk halaman landing dengan style **Obsidian Intelligence** yang futuristik.

## 🎨 Style Classes yang Tersedia

Semua style classes berikut sudah tersedia di `index.css` dan bisa digunakan di halaman lain:

### Utility Classes

- `.neon-glow-text` - Text dengan efek glow neon mint
- `.neon-border-glow` - Border dengan efek glow neon mint (dengan hover effect)
- `.glass-obsidian` - Background glass effect dengan backdrop blur
- `.mockup-float` - Drop shadow untuk efek floating
- `.mint-icon-glow` - Filter glow untuk icon

### Custom Colors (Tailwind)

- `bg-obsidian` / `text-obsidian` - `#05070a`
- `bg-midnight` / `text-midnight` - `#0a1118`
- `bg-neon-mint` / `text-neon-mint` - `#00ffcc`
- `bg-deep-slate` / `text-deep-slate` - `#1a242f`

## 📦 Komponen

### ObsidianHeader

Header dengan glass effect untuk landing page.

```tsx
import { ObsidianHeader } from '@/components/landing';

<ObsidianHeader />
```

### Hero

Hero section dengan title besar, description, CTA buttons, dan mockup dashboard.

```tsx
import { Hero } from '@/components/landing';

<Hero />
```

### Features

Section untuk menampilkan fitur-fitur dengan layout alternatif.

```tsx
import { Features } from '@/components/landing';

// Menggunakan default features
<Features />

// Atau dengan custom features
<Features 
  features={[
    {
      icon: 'radar',
      title: 'Custom Feature',
      description: 'Description here',
      items: ['Item 1', 'Item 2'],
      imageIcon: 'grid_view',
      reverse: false
    }
  ]}
/>
```

### Stats

Section untuk menampilkan statistik dengan grid layout.

```tsx
import { Stats } from '@/components/landing';

// Menggunakan default stats
<Stats />

// Atau dengan custom stats
<Stats 
  stats={[
    {
      label: 'Custom',
      value: '100',
      suffix: '+',
      description: 'Description'
    }
  ]}
/>
```

### CTA

Call-to-action section dengan title besar dan button.

```tsx
import { CTA } from '@/components/landing';

// Menggunakan default
<CTA />

// Atau dengan custom content
<CTA 
  title="CUSTOM TITLE"
  subtitle="Custom subtitle"
  buttonText="Click Here"
  buttonLink="/register"
/>
```

### Footer

Footer dengan logo, links sections, dan copyright.

```tsx
import { Footer } from '@/components/landing';

// Menggunakan default
<Footer />

// Atau dengan custom content
<Footer 
  sections={[
    {
      title: 'Custom Section',
      links: [
        { label: 'Link 1', href: '#' }
      ]
    }
  ]}
  copyright="© 2024 Custom"
  bottomLinks={[
    { label: 'Link', href: '#' }
  ]}
/>
```

## 🚀 Penggunaan di Halaman Lain

### Contoh: Halaman About

```tsx
import { ObsidianHeader, Hero, Features, Footer } from '@/components/landing';

export default function About() {
  return (
    <main className="relative">
      <ObsidianHeader />
      
      <Hero />
      
      <Features 
        features={[
          {
            icon: 'info',
            title: 'About Us',
            description: 'Our story...',
            imageIcon: 'business'
          }
        ]}
      />
      
      <Footer />
    </main>
  );
}
```

### Contoh: Menggunakan Style Classes di Komponen Custom

```tsx
export function CustomSection() {
  return (
    <div className="glass-obsidian p-8 rounded-xl">
      <h2 className="neon-glow-text text-4xl font-bold mb-4">
        Custom Title
      </h2>
      <button className="neon-border-glow px-6 py-3 rounded-full">
        Click Me
      </button>
    </div>
  );
}
```

## 📝 Catatan

- Semua komponen sudah responsive (mobile-first)
- Font "Plus Jakarta Sans" sudah di-import di `index.css`
- Material Symbols Icons sudah tersedia via Google Fonts
- Pastikan `dark` class ada di `<html>` tag untuk dark mode
