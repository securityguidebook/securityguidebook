'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Fingerprint ridge data (whorl pattern) ──
// Ellipses with slight cy drift create the characteristic whorl curvature.
// All ridges are clipped to a circle so outer edges look natural.
const RIDGES = [
  { cx: 100, cy: 100, rx: 5,  ry: 6   },
  { cx: 100, cy: 99,  rx: 11, ry: 14  },
  { cx: 100, cy: 98,  rx: 17, ry: 22  },
  { cx: 100, cy: 97,  rx: 23, ry: 30  },
  { cx: 100, cy: 97,  rx: 29, ry: 38  },
  { cx: 100, cy: 97,  rx: 35, ry: 46  },
  { cx: 100, cy: 98,  rx: 41, ry: 54  },
  { cx: 100, cy: 99,  rx: 47, ry: 62  },
  { cx: 100, cy: 100, rx: 53, ry: 69  },
  { cx: 100, cy: 101, rx: 59, ry: 75  },
  { cx: 100, cy: 102, rx: 65, ry: 80  },
  { cx: 100, cy: 103, rx: 71, ry: 84  },
];

// ── Scan timing constants ──
const SCAN_DURATION_MS = 3000;  // total scan time
const TICK_MS          = 30;    // update interval → ~100 steps
const STEP             = 100 / (SCAN_DURATION_MS / TICK_MS); // progress per tick

type Phase = 'scanning' | 'granted' | 'exit';

interface Props {
  onUnlock: () => void;
}

export default function UnlockScreen({ onUnlock }: Props) {
  // null = not yet determined (avoid SSR/hydration mismatch)
  const [show,     setShow]     = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase,    setPhase]    = useState<Phase>('scanning');

  // Check sessionStorage only in the browser
  useEffect(() => {
    const seen = sessionStorage.getItem('sg-unlocked');
    setShow(!seen);
  }, []);

  const completeUnlock = useCallback(() => {
    sessionStorage.setItem('sg-unlocked', '1');
    setTimeout(onUnlock, 900); // let ACCESS GRANTED flash for 900ms before exit
  }, [onUnlock]);

  // Drive the progress counter
  useEffect(() => {
    if (!show) return;

    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + STEP;
        if (next >= 100) {
          clearInterval(id);
          setPhase('granted');
          return 100;
        }
        return next;
      });
    }, TICK_MS);

    return () => clearInterval(id);
  }, [show]);

  // Trigger exit once ACCESS GRANTED is shown
  useEffect(() => {
    if (phase === 'granted') {
      completeUnlock();
    }
  }, [phase, completeUnlock]);

  // Don't render until we know whether to show (prevents flash on return visits)
  if (show === null || show === false) return null;

  // scanY: maps 0-100% progress → y position (25–175) inside the 200×200 SVG viewBox
  const scanY     = 25 + (progress / 100) * 150;
  const clipH     = Math.max(0, scanY - 25);
  const pct       = Math.round(progress);
  const isGranted = phase === 'granted';

  return (
    <AnimatePresence>
      <motion.div
        key="unlock"
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-base"
        initial={{ opacity: 1 }}
        exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      >

        {/* ── Brand label ── */}
        <div className="mb-10 flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] uppercase text-smoke/60">
          <span className="text-neon">✦</span>
          SecurityGuidebook
        </div>

        {/* ── Fingerprint scanner SVG ── */}
        <motion.div
          animate={isGranted ? { filter: 'drop-shadow(0 0 24px #39ff14)' } : { filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.3))' }}
          transition={{ duration: 0.4 }}
        >
          <svg
            viewBox="0 0 200 200"
            width="220"
            height="220"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Fingerprint scanner"
          >
            <defs>
              {/* Clip to fingerprint circle */}
              <clipPath id="fp-circle">
                <circle cx="100" cy="100" r="77" />
              </clipPath>
              {/* Clip "scanned" layer to area above scan line */}
              <clipPath id="fp-scanned">
                <rect x="20" y="20" width="160" height={clipH} />
              </clipPath>
              {/* Glow filter for scan line */}
              <filter id="glow" x="-20%" y="-200%" width="140%" height="500%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Background grid (subtle, like reference) ── */}
            <g stroke="rgba(57,255,20,0.06)" strokeWidth="0.5">
              {[40, 60, 80, 100, 120, 140, 160].map((v) => (
                <g key={v}>
                  <line x1={v}  y1="20" x2={v}  y2="180" />
                  <line x1="20" y1={v}  x2="180" y2={v}  />
                </g>
              ))}
            </g>

            {/* ── Outer circle boundary ── */}
            <circle
              cx="100" cy="100" r="80"
              fill="none"
              stroke={isGranted ? 'rgba(57,255,20,0.6)' : 'rgba(57,255,20,0.25)'}
              strokeWidth="1"
              style={{ transition: 'stroke 0.4s' }}
            />
            <circle
              cx="100" cy="100" r="85"
              fill="none"
              stroke={isGranted ? 'rgba(57,255,20,0.2)' : 'rgba(57,255,20,0.08)'}
              strokeWidth="0.5"
              style={{ transition: 'stroke 0.4s' }}
            />

            {/* ── Unscanned ridges (dim) ── */}
            <g clipPath="url(#fp-circle)" fill="none" stroke="rgba(57,255,20,0.18)" strokeWidth="1.5">
              {RIDGES.map((r, i) => <ellipse key={i} {...r} />)}
            </g>

            {/* ── Scanned ridges (bright) ── */}
            <g clipPath="url(#fp-scanned)" fill="none">
              <g clipPath="url(#fp-circle)" stroke="#39ff14" strokeWidth="1.5">
                {RIDGES.map((r, i) => <ellipse key={i} {...r} />)}
              </g>
            </g>

            {/* ── Scan line ── */}
            {!isGranted && (
              <>
                {/* Glow halo */}
                <line
                  x1="20" y1={scanY} x2="180" y2={scanY}
                  stroke="rgba(57,255,20,0.4)"
                  strokeWidth="6"
                  filter="url(#glow)"
                />
                {/* Core bright line */}
                <line
                  x1="20" y1={scanY} x2="180" y2={scanY}
                  stroke="#39ff14"
                  strokeWidth="1.5"
                />
                {/* White hot centre */}
                <line
                  x1="40" y1={scanY} x2="160" y2={scanY}
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="0.5"
                />
              </>
            )}

            {/* ── Corner brackets ── */}
            {[
              'M 22,42 L 22,22 L 42,22',   // top-left
              'M 158,22 L 178,22 L 178,42', // top-right
              'M 22,158 L 22,178 L 42,178', // bottom-left
              'M 158,178 L 178,178 L 178,158', // bottom-right
            ].map((d, i) => (
              <path
                key={i} d={d} fill="none"
                stroke={isGranted ? '#39ff14' : 'rgba(57,255,20,0.7)'}
                strokeWidth="2"
                strokeLinecap="square"
                style={{ transition: 'stroke 0.3s' }}
              />
            ))}

            {/* ── ACCESS GRANTED checkmark ── */}
            {isGranted && (
              <g>
                <circle cx="100" cy="100" r="20" fill="none" stroke="#39ff14" strokeWidth="1.5" />
                <path d="M 90,100 L 97,108 L 113,92" fill="none" stroke="#39ff14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </svg>
        </motion.div>

        {/* ── Status text ── */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {!isGranted ? (
            <>
              <p className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-neon">
                Scanning
                <span className="inline-block w-4 text-left">
                  {pct < 33 ? '.' : pct < 66 ? '..' : '...'}
                </span>
              </p>

              {/* Progress bar */}
              <div className="w-48 h-[3px] bg-card overflow-hidden" style={{ border: '1px solid var(--neon-border)' }}>
                <motion.div
                  className="h-full bg-neon"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Percentage */}
              <p className="font-mono text-[9px] font-bold tracking-[0.16em] uppercase text-dim">
                {pct}%
              </p>
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[13px] font-bold tracking-[0.24em] uppercase text-neon"
            >
              ✓ Access Granted
            </motion.p>
          )}
        </div>

        {/* ── Skip link (accessibility + impatient visitors) ── */}
        {!isGranted && (
          <button
            onClick={() => {
              setProgress(100);
              setPhase('granted');
            }}
            className="absolute bottom-8 font-mono text-[9px] tracking-[0.14em] uppercase text-dim/50 hover:text-dim transition-colors cursor-pointer"
          >
            Skip →
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
