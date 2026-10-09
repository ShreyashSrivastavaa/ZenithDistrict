import { z } from 'zod';

export const inquiryTypeEnum = z.enum([
  'Studio project',
  'Partnership',
  'Brand collaboration',
  'Brand waitlist',
  'Other',
]);

/**
 * Strips dangerous null bytes and non-printable control characters.
 */
function sanitizeString(val: string): string {
  if (typeof val !== 'string') return '';
  return val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

/**
 * Escapes HTML entities to prevent HTML injection in downstream email/webhook consumers.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const contactFormSchema = z.object({
  inquiryType: inquiryTypeEnum,
  name: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().min(2, { message: 'Please provide your name or organization.' }).max(80)),
  email: z
    .string()
    .transform((val) => sanitizeString(val).toLowerCase())
    .pipe(z.string().email({ message: 'A valid email address is required for communication.' }).max(120)),
  company: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().max(100))
    .optional()
    .or(z.literal('')),
  budget: z
    .string()
    .transform(sanitizeString)
    .pipe(z.string().max(50))
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .transform(sanitizeString)
    .pipe(
      z
        .string()
        .min(10, { message: 'Please describe the project or inquiry in at least 10 characters.' })
        .max(3000)
    ),
  // Honeypot field for bot spam deterrence - must remain empty
  website_honeypot: z
    .string()
    .max(0, { message: 'Bot verification detected.' })
    .optional()
    .or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const brandWaitlistSchema = z.object({
  email: z
    .string()
    .transform((val) => sanitizeString(val).toLowerCase())
    .pipe(z.string().email({ message: 'A valid email address is required.' }).max(120)),
  productSlug: z.string().optional(),
  colorway: z.string().optional(),
  size: z.string().optional(),
  website_honeypot: z
    .string()
    .max(0, { message: 'Bot verification detected.' })
    .optional()
    .or(z.literal('')),
});

export type BrandWaitlistData = z.infer<typeof brandWaitlistSchema>;
