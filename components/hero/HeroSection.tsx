import ElapsedClock   from './ElapsedClock';
import TypewriterLines from './TypewriterLines';
import { SITE, KPIS, CERTS } from '@/lib/data';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="grid min-h-[calc(100vh-56px)] relative overflow-hidden"
      style={{ gridTemplateColumns: '1fr 200px 1fr' }}
    >
      {/* Hero scanline decoration */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(57,255,20,0.3), transparent)',
          animation: 'scanmove 8s ease-in-out infinite',
        }}
      />

      {/* ── LEFT: Elapsed clock + typewriter ── */}
      <div
        className="flex flex-col justify-between px-9 py-14"
        style={{ borderRight: '1px solid var(--neon-border)' }}
      >
        <div>
          <ElapsedClock />
          <TypewriterLines />
        </div>
        <p className="font-mono text-[9px] tracking-[0.1em] uppercase mt-7 flex items-center gap-2"
           style={{ color: 'rgba(57,255,20,0.5)' }}>
          <span className="text-dim">//</span>
          since {SITE.since.toISOString().slice(0, 10)} · {SITE.location}
        </p>
      </div>

      {/* ── CENTRE: Animated lock SVG ── */}
      <div className="flex flex-col items-center justify-center px-2.5 py-6 gap-4 relative">
        {/* Starburst decoration */}
        <svg
          viewBox="0 0 60 60"
          className="absolute top-[14%] opacity-70"
          style={{ width: 50, height: 50 }}
          aria-hidden
        >
          <polygon
            points="30,2 34,22 50,10 38,26 58,30 38,34 50,50 34,38 30,58 26,38 10,50 22,34 2,30 22,26 10,10 26,22"
            fill="none"
            stroke="rgba(57,255,20,0.5)"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-3.5">
          {/* Lock SVG */}
          <div
            className="relative"
            style={{ filter: 'drop-shadow(0 0 12px rgba(57,255,20,0.25))' }}
          >
            {/* Scan line on the lock */}
            <div
              className="absolute left-0 right-0 h-0.5 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, #39ff14, transparent)',
                animation: 'lscan 2.5s ease-in-out infinite',
              }}
            />
            <svg width="110" height="140" viewBox="0 0 110 140" xmlns="http://www.w3.org/2000/svg" aria-label="Padlock">
              <path d="M30,68 L30,38 Q30,8 55,8 Q80,8 80,38 L80,68"  fill="none" stroke="#2a2a2a" strokeWidth="16" strokeLinecap="round"/>
              <path d="M30,68 L30,38 Q30,12 55,12 Q78,12 78,38 L78,68" fill="none" stroke="#444"   strokeWidth="9"  strokeLinecap="round"/>
              <path d="M30,68 L30,38 Q30,12 55,12 Q78,12 78,38 L78,68" fill="none" stroke="rgba(57,255,20,0.12)" strokeWidth="9" strokeLinecap="round"/>
              <rect x="8"  y="62" width="94" height="70" rx="6" fill="#1a1a1a"/>
              <rect x="10" y="64" width="90" height="30" rx="5" fill="#242424"/>
              <rect x="10" y="64" width="90" height="14" rx="5" fill="#2c2c2c"/>
              <rect x="8"  y="62" width="94" height="70" rx="6" fill="none" stroke="rgba(57,255,20,0.25)" strokeWidth="1"/>
              <circle cx="55" cy="100" r="9"  fill="#0a0a0a"/>
              <rect   x="51" y="104" width="8" height="14" rx="3" fill="#0a0a0a"/>
              <circle cx="55" cy="100" r="12" fill="none" stroke="rgba(57,255,20,0.4)" strokeWidth="1"/>
              <rect x="14" y="68" width="40" height="3" rx="1" fill="white" opacity="0.04"/>
            </svg>
          </div>

          {/* Password dots */}
          <div
            className="flex gap-2.5 items-center justify-center px-4 py-2"
            style={{
              background: '#161616',
              border: '1px solid rgba(57,255,20,0.4)',
              width: 140,
            }}
          >
            {['0s', '0.2s', '0.4s', '0.6s'].map((delay, i) => (
              <span
                key={i}
                className="font-mono font-bold text-neon"
                style={{
                  fontSize: 16,
                  animation: `dot-blink 3s ${delay} infinite`,
                }}
              >
                *
              </span>
            ))}
          </div>

          <p className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase text-center"
             style={{ color: 'rgba(57,255,20,0.5)' }}>
            secured · monitored<br />defended
          </p>
        </div>
      </div>

      {/* ── RIGHT: Headline + KPIs + certs + CTAs ── */}
      <div
        className="flex flex-col justify-between px-9 py-14"
        style={{ borderLeft: '1px solid var(--neon-border)' }}
      >
        <div>
          {/* Headline */}
          <div className="mb-8">
            <div
              className="font-bebas text-smoke leading-[0.95]"
              style={{ fontSize: 'clamp(48px, 5.5vw, 68px)', letterSpacing: '0.02em', marginBottom: 6 }}
            >
              CYBER
            </div>
            <div
              className="font-bebas bg-neon text-base inline-block leading-none px-2.5 mb-4"
              style={{ fontSize: 'clamp(48px, 5.5vw, 68px)', letterSpacing: '0.02em' }}
            >
              SECURITY
            </div>
          </div>

          {/* Info box */}
          <div
            className="bg-card mb-6 p-5 relative"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span
              className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-smoke inline-block px-2.5 py-1 mb-3"
              style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              // KEY INDICATORS
            </span>
            <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-3"
               style={{ color: '#39ff14' }}>
              <span className="text-dim">//</span>
              Performance Metrics
            </p>

            {/* KPI grid */}
            <div
              className="grid grid-cols-2 gap-px mb-5"
              style={{ background: 'rgba(57,255,20,0.12)', border: '1px solid rgba(57,255,20,0.12)' }}
            >
              {KPIS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-base hover:bg-card transition-colors px-4 py-3.5 cursor-default"
                >
                  <div className="font-bebas text-[30px] text-neon leading-none tracking-[0.04em]">
                    {value}
                  </div>
                  <div className="font-mono text-[8px] font-bold tracking-[0.1em] uppercase text-dim mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Cert chips */}
            <div className="flex gap-1.5 flex-wrap mb-5">
              {CERTS.map(({ label, active }) => (
                <span
                  key={label}
                  className="font-mono text-[8px] font-bold tracking-[0.08em] uppercase px-2.5 py-1"
                  style={{
                    border: `1px solid ${active ? 'rgba(57,255,20,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    color:  active ? '#39ff14' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5">
            <a
              href="#projects"
              className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase bg-neon text-base px-5 py-3 hover:opacity-85 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase text-smoke px-5 py-3 hover:border-white/50 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
