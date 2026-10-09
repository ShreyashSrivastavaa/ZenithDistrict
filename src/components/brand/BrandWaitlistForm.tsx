'use client';

import React, { useState } from 'react';

interface BrandWaitlistFormProps {
  productSlug?: string;
  colorway?: string;
  size?: string;
  headline?: string;
  caption?: string;
}

export function BrandWaitlistForm({
  productSlug,
  colorway,
  size,
  headline = 'Collection 01 Registry',
  caption = 'Garments are printed strictly on demand. Enter your email to be notified when the first physical sampling run is ready.',
}: BrandWaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          productSlug,
          colorway,
          size,
          website_honeypot: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setStatus('success');
      setFeedback(data.message || 'You have been recorded on the Collection 01 registry.');
      setEmail('');
    } catch (err: unknown) {
      setStatus('error');
      setFeedback(err instanceof Error ? err.message : 'Unable to log waitlist entry. Please retry.');
    }
  }

  return (
    <div id="waitlist" className="p-8 sm:p-12 hairline-border bg-[var(--surface-elevated)] space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-mono-tag text-xs text-[var(--signal)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
          <span>ON-DEMAND SAMPLING // DIRECTORY DISPATCH</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          {headline}
        </h3>
        <p className="text-sm text-[var(--muted-text)] max-w-xl leading-relaxed">
          {caption}
        </p>
      </div>

      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="p-5 border border-[var(--border-color)] bg-[var(--bg-page)] space-y-2"
        >
          <span className="font-mono-tag text-xs font-semibold text-[var(--signal)] block">
            ENTRY RECORDED
          </span>
          <p className="text-sm text-[var(--text-primary)]">
            {feedback}
          </p>
          <span className="font-mono-tag text-[10px] text-[var(--stone)] block">
            We observe strict zero-promotional dispatch. No unsolicited newsletters.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md" noValidate>
          {/* Honeypot field for bot deterrence */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="form_honeypot">Leave blank</label>
            <input
              id="form_honeypot"
              type="text"
              name="website_honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full h-11 px-3.5 bg-[var(--bg-page)] border border-[var(--border-color)] text-sm font-mono-tag text-[var(--text-primary)] placeholder:text-[var(--stone)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] rounded-none transition-colors"
                aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="h-11 px-6 bg-[var(--text-primary)] text-[var(--bg-page)] font-mono-tag text-xs tracking-wider uppercase hover:bg-[var(--signal)] hover:text-white transition-colors disabled:opacity-50 shrink-0 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]"
            >
              {status === 'submitting' ? 'RECORDING...' : 'JOIN REGISTRY'}
            </button>
          </div>

          {status === 'error' && (
            <div
              id="waitlist-error"
              role="alert"
              aria-live="polite"
              className="text-xs font-mono-tag text-red-600 dark:text-red-400"
            >
              {feedback}
            </div>
          )}

          <div className="flex items-center gap-2 font-mono-tag text-[10px] text-[var(--stone)]">
            <span>NO INVENTED SCARCITY</span>
            <span>·</span>
            <span>HONEST DISPATCH ONLY</span>
          </div>
        </form>
      )}
    </div>
  );
}

export default BrandWaitlistForm;
