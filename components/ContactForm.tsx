'use client';

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

// ── Set these in .env.local ──
// NEXT_PUBLIC_EMAILJS_SERVICE_ID
// NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
// NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-card font-mono text-[11px] text-smoke tracking-[0.04em] px-4 py-3 outline-none transition-colors placeholder:text-dim/50 focus:border-neon';
  const inputStyle = { border: '1px solid rgba(255,255,255,0.1)' };

  return (
    <section
      id="contact"
      className="px-10 py-14"
      style={{ borderTop: '1px solid var(--neon-border)' }}
    >
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-7">
        <h2 className="font-bebas text-[42px] text-smoke tracking-[0.04em] leading-none">
          CONTACT
        </h2>
        <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-neon">
          // get in touch
        </span>
        <div className="flex-1 h-px ml-2" style={{ background: 'var(--neon-border)' }} />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
        {/* Left: copy */}
        <div className="flex flex-col justify-center gap-5">
          <p className="font-mono text-[11px] text-dim leading-[1.9] tracking-[0.04em] uppercase">
            Open to SOC analyst, AppSec, and cloud security roles in Australia.
            Collaborations and consulting welcome.
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Location', value: 'Bangkok → Melbourne, AUS' },
              { label: 'Availability', value: 'Open · Immediate start' },
              { label: 'Focus',    value: 'SOC · AppSec · Cloud' },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3 font-mono text-[10px]">
                <span className="text-neon tracking-[0.1em] uppercase w-24 shrink-0">{label}</span>
                <span className="text-smoke">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="from_name"
            type="text"
            placeholder="YOUR NAME"
            required
            className={inputClass}
            style={inputStyle}
          />
          <input
            name="reply_to"
            type="email"
            placeholder="YOUR EMAIL"
            required
            className={inputClass}
            style={inputStyle}
          />
          <input
            name="subject"
            type="text"
            placeholder="SUBJECT"
            className={inputClass}
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="YOUR MESSAGE"
            required
            rows={5}
            className={`${inputClass} resize-none`}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase bg-neon text-base px-5 py-3 hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'idle'    && 'Send Message'}
            {status === 'sending' && 'Sending...'}
            {status === 'sent'    && '✓ Message Sent'}
            {status === 'error'   && 'Retry — Error Occurred'}
          </button>

          {status === 'error' && (
            <p className="font-mono text-[9px] text-[#f43f5e] tracking-[0.08em]">
              Delivery failed. Check EmailJS credentials in .env.local.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
