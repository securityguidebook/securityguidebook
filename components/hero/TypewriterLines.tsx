'use client';

import { useEffect, useState } from 'react';
import { TYPEWRITER_LINES } from '@/lib/data';

interface LineState {
  text:    string;
  done:    boolean;
}

export default function TypewriterLines() {
  const [lines, setLines] = useState<LineState[]>(
    TYPEWRITER_LINES.map(() => ({ text: '', done: false }))
  );
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let lineIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    // 600ms initial delay before typing starts
    const start = setTimeout(function typeNext() {
      if (lineIndex >= TYPEWRITER_LINES.length) return;

      const target = TYPEWRITER_LINES[lineIndex];

      if (charIndex < target.length) {
        const captured = lineIndex; // capture for closure
        setLines((prev) =>
          prev.map((l, i) =>
            i === captured ? { ...l, text: target.slice(0, charIndex + 1) } : l
          )
        );
        charIndex++;
        timeout = setTimeout(typeNext, 38);
      } else {
        // Line done — mark it and move to next after a short pause
        const captured = lineIndex;
        setLines((prev) =>
          prev.map((l, i) => (i === captured ? { ...l, done: true } : l))
        );
        lineIndex++;
        charIndex = 0;
        setActiveLine(lineIndex);
        if (lineIndex < TYPEWRITER_LINES.length) {
          timeout = setTimeout(typeNext, 300);
        }
      }
    }, 600);

    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ borderLeft: '3px solid #39ff14', paddingLeft: '14px' }}>
      {lines.map((line, i) => (
        <div key={i} className="font-mono text-[11px] text-dim leading-[1.9] min-h-[1.9em]">
          <span className="text-smoke">{line.text}</span>
          {i === activeLine && !line.done && (
            <span
              className="inline-block align-middle bg-neon"
              style={{
                width: '2px',
                height: '12px',
                marginLeft: '2px',
                animation: 'cur-blink 0.7s step-end infinite',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
