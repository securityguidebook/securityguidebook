import { SITE } from '@/lib/data';

export default function Footer() {
  return (
    <footer
      className="px-10 py-4 flex items-center justify-between bg-base"
      style={{ borderTop: '1px solid var(--neon-border)' }}
    >
      {/* Name */}
      <p className="font-mono text-[11px] font-bold text-smoke">
        © {new Date().getFullYear()}{' '}
        <span className="text-neon">{SITE.owner}</span>
      </p>

      {/* Status dot */}
      <div className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.14em] uppercase text-dim">
        <span
          className="w-[7px] h-[7px] rounded-full bg-neon"
          style={{
            boxShadow: '0 0 6px #39ff14',
            animation: 'status-pulse 2s infinite',
          }}
        />
        {SITE.status}
      </div>

      {/* Domain */}
      <p
        className="font-mono text-[9px] font-bold tracking-[0.12em] uppercase"
        style={{ color: 'rgba(57,255,20,0.6)' }}
      >
        {SITE.domain}
      </p>
    </footer>
  );
}
