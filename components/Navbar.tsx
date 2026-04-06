'use client';

import Link from 'next/link';
import { SITE } from '@/lib/data';

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-[500] flex items-center justify-between px-10 h-14 bg-base"
      style={{ borderBottom: '1px solid var(--neon-border)' }}
    >
      {/* Logo */}
      <Link href="#home" className="flex items-center gap-2 font-mono text-[13px] font-bold tracking-[0.04em] text-smoke no-underline">
        <span className="text-neon text-lg leading-none">✦</span>
        {SITE.name}
      </Link>

      {/* Centre links */}
      <div className="hidden md:flex gap-9">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-smoke hover:text-neon transition-colors no-underline"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right: social icons */}
      <div className="flex items-center gap-2">
        {[
          { label: 'GitHub',   href: SITE.github,   icon: 'GH' },
          { label: 'LinkedIn', href: SITE.linkedin,  icon: 'LI' },
          { label: 'YouTube',  href: SITE.youtube,   icon: 'YT' },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-7 h-7 flex items-center justify-center font-mono text-[10px] font-bold text-smoke hover:text-neon hover:border-neon transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.25)' }}
          >
            {icon}
          </a>
        ))}
      </div>
    </nav>
  );
}
