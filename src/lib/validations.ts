import { z } from 'zod';

export const inquiryTypeEnum = z.enum([
  'Studio project',
  'Partnership',
  'Brand collaboration',
  'Other',
]);

export const contactFormSchema = z.object({
  inquiryType: inquiryTypeEnum,
  name: z.string().min(2, { message: 'Please provide your name or organization.' }).max(80),
  email: z.string().email({ message: 'A valid email address is required for communication.' }),
  company: z.string().max(100).optional().or(z.literal('')),
  budget: z.string().max(50).optional().or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Please describe the project or inquiry in at least 10 characters.' })
    .max(3000),
  // Honeypot field for bot spam deterrence - must remain empty
  website_honeypot: z.string().max(0, { message: 'Bot verification detected.' }).optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
