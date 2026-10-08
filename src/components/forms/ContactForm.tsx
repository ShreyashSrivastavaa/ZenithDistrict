'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { contactFormSchema, ContactFormData } from '@/lib/validations';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

const INQUIRY_TYPES = [
  'Studio project',
  'Partnership',
  'Brand collaboration',
  'Other',
] as const;

const BUDGET_OPTIONS = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+',
  'Flexible / Undetermined',
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type');

  const [inquiryType, setInquiryType] = useState<ContactFormData['inquiryType']>(
    (initialType === 'Partnership'
      ? 'Partnership'
      : initialType === 'Brand'
      ? 'Brand collaboration'
      : 'Studio project') as ContactFormData['inquiryType']
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const formData: ContactFormData = {
      inquiryType,
      name,
      email,
      company: company || undefined,
      budget: budget || undefined,
      message,
      website_honeypot: honeypot || undefined,
    };

    const parseResult = contactFormSchema.safeParse(formData);

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[String(err.path[0])] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to submit inquiry.');
      }

      setSubmitSuccess(resData.message);
      setReferenceId(resData.referenceId || null);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setBudget('');
    setMessage('');
    setErrors({});
    setSubmitSuccess(null);
    setReferenceId(null);
    setServerError(null);
  };

  if (submitSuccess) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="p-8 border border-[var(--signal)] bg-[var(--surface-elevated)] space-y-6"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[var(--signal)] shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-medium text-[var(--text-primary)]">
              Inquiry Logged Successfully
            </h3>
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              {submitSuccess}
            </p>
            {referenceId && (
              <p className="font-mono-tag text-xs text-[var(--stone)] pt-2">
                REFERENCE CODE // {referenceId}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4 hairline-border-t flex items-center justify-between">
          <span className="font-mono-tag text-xs text-[var(--stone)]">
            A COPY HAS BEEN ROUTED TO PRINCIPAL REVIEW
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="font-mono-tag text-xs text-[var(--signal)] hover:underline uppercase"
          >
            SEND ANOTHER MESSAGE →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 p-6 sm:p-8 border border-[var(--border-color)] bg-[var(--surface)]"
      aria-label="Direct Inquiry Form"
    >
      {/* Honeypot hidden input */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_honeypot">Leave this blank</label>
        <input
          id="website_honeypot"
          name="website_honeypot"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-4 border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Inquiry Type Radio Selector */}
      <fieldset className="space-y-3">
        <legend className="font-mono-tag text-xs text-[var(--stone)] tracking-wider">
          01 // INQUIRY CATEGORY <span className="text-[var(--signal)]">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {INQUIRY_TYPES.map((type) => {
            const isChecked = inquiryType === type;
            return (
              <label
                key={type}
                className={`p-3 border cursor-pointer flex items-center justify-between text-xs font-mono-tag transition-colors select-none ${
                  isChecked
                    ? 'border-[var(--signal)] bg-[var(--surface-elevated)] text-[var(--text-primary)]'
                    : 'border-[var(--border-color)] hover:border-[var(--stone)] text-[var(--muted-text)]'
                }`}
              >
                <span>{type}</span>
                <input
                  type="radio"
                  name="inquiryType"
                  value={type}
                  checked={isChecked}
                  onChange={() => setInquiryType(type)}
                  className="sr-only"
                />
                {isChecked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Contact Fields */}
      <div className="space-y-6 pt-2">
        <div className="font-mono-tag text-xs text-[var(--stone)]">
          02 // CONTACT & SCOPE METRICS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block font-mono-tag text-xs text-[var(--text-primary)]"
            >
              YOUR NAME / ORG <span className="text-[var(--signal)]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[var(--surface-elevated)] border text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] rounded-none ${
                errors.name ? 'border-red-500' : 'border-[var(--border-color)]'
              }`}
              placeholder="e.g. Alex Mercer"
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-500 font-mono-tag">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-mono-tag text-xs text-[var(--text-primary)]"
            >
              EMAIL ADDRESS <span className="text-[var(--signal)]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-3.5 py-2.5 text-sm bg-[var(--surface-elevated)] border text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] rounded-none ${
                errors.email ? 'border-red-500' : 'border-[var(--border-color)]'
              }`}
              placeholder="alex@example.com"
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500 font-mono-tag">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company */}
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block font-mono-tag text-xs text-[var(--text-primary)]"
            >
              COMPANY / VENTURE <span className="text-[var(--stone)]">(OPTIONAL)</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] rounded-none"
              placeholder="Acme Corp"
            />
          </div>

          {/* Budget Range (Studio Only or General) */}
          <div className="space-y-2">
            <label
              htmlFor="budget"
              className="block font-mono-tag text-xs text-[var(--text-primary)]"
            >
              BUDGET ESTIMATE <span className="text-[var(--stone)]">(OPTIONAL)</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] rounded-none"
            >
              <option value="">Select scope tier...</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block font-mono-tag text-xs text-[var(--text-primary)]"
          >
            PROJECT BRIEF OR MESSAGE <span className="text-[var(--signal)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-3.5 py-2.5 text-sm bg-[var(--surface-elevated)] border text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] rounded-none ${
              errors.message ? 'border-red-500' : 'border-[var(--border-color)]'
            }`}
            placeholder="Outline your timeline, goals, core problem, or collaboration concept..."
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500 font-mono-tag">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 hairline-border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-[11px] font-mono-tag text-[var(--stone)]">
          {"// ENCRYPTED TRANSMISSION DIRECT TO PRINCIPALS"}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 bg-[var(--ink)] text-[var(--bone)] dark:bg-[var(--bone)] dark:text-[var(--ink)] hover:bg-[var(--signal)] hover:text-white dark:hover:bg-[var(--signal)] dark:hover:text-white font-mono-tag text-xs tracking-wider uppercase transition-colors rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>TRANSMITTING...</span>
            </>
          ) : (
            <>
              <span>SUBMIT INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
