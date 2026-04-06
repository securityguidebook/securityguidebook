'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/data';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function ElapsedClock() {
  const [time, setTime] = useState({ days: 0, hrs: '00', min: '00', sec: '00' });

  useEffect(() => {
    function tick() {
      const diff    = Date.now() - SITE.since.getTime();
      const total   = Math.floor(diff / 1000);
      const days    = Math.floor(total / 86400);
      const hrs     = Math.floor((total % 86400) / 3600);
      const mins    = Math.floor((total % 3600) / 60);
      const secs    = total % 60;
      setTime({ days, hrs: pad(hrs), min: pad(mins), sec: pad(secs) });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Label */}
      <p className="flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-neon mb-4">
        <span className="text-[7px]">▶</span>
        Safer Internet Elapsed
      </p>

      {/* Days counter */}
      <div
        className="font-bebas leading-none text-smoke mb-1"
        style={{ fontSize: 'clamp(80px, 10vw, 110px)', letterSpacing: '0.02em' }}
      >
        {time.days.toLocaleString()}
      </div>
      <p className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-dim mb-7">
        Days
      </p>

      {/* H / M / S row */}
      <div
        className="flex mb-8"
        style={{ border: '1px solid var(--neon-border)' }}
      >
        {[
          { val: time.hrs, key: 'Hours'   },
          { val: time.min, key: 'Minutes' },
          { val: time.sec, key: 'Seconds' },
        ].map(({ val, key }, i) => (
          <div
            key={key}
            className="flex-1 px-3 py-3"
            style={{ borderRight: i < 2 ? '1px solid var(--neon-border)' : 'none' }}
          >
            <div className="font-bebas text-[32px] text-neon leading-none tracking-[0.04em]">
              {val}
            </div>
            <div className="font-mono text-[8px] font-bold tracking-[0.14em] uppercase text-dim mt-0.5">
              {key}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
