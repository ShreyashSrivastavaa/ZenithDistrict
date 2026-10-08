import { ContactFormData } from './validations';

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  referenceId?: string;
  error?: string;
}

/**
 * Pluggable contact adapter for ZenithDistrict.
 * In production, connect this to:
 * - Resend API (`resend.emails.send`)
 * - Webhook endpoint (Slack / Discord incoming webhook)
 * - CRM or database ingestion (HubSpot / Notion / PostgreSQL)
 */
export async function submitContactInquiry(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  const referenceId = `ZD-${Date.now().toString(36).toUpperCase()}`;

  // Log incoming inquiry with architectural metadata
  console.info(`[ZenithDistrict::ContactAdapter] New submission received:`, {
    referenceId,
    inquiryType: data.inquiryType,
    name: data.name,
    email: data.email,
    company: data.company || 'N/A',
    budget: data.budget || 'Not specified',
    messageLength: data.message.length,
    timestamp: new Date().toISOString(),
  });

  // Example webhook / Resend hook placeholder:
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceId, ...data }),
      });
    } catch (err) {
      console.error('[ZenithDistrict::ContactAdapter] Webhook dispatch failed:', err);
      // Non-fatal for client response
    }
  }

  return {
    success: true,
    message: 'Your inquiry has been logged. We review every note directly and respond within 24–48 hours.',
    referenceId,
  };
}
