import { ContactFormData } from './validations';

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  referenceId?: string;
  error?: string;
}

function isSafeWebhookUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    const isDev = process.env.NODE_ENV !== 'production';

    // Must be HTTPS in production; allow HTTP only for localhost in development
    if (url.protocol !== 'https:') {
      if (isDev && url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
        return true;
      }
      return false;
    }

    // Defense-in-depth: Block known internal/metadata domains and IP addresses
    const hostname = url.hostname.toLowerCase();
    if (
      hostname === '169.254.169.254' || // AWS/GCP/Azure instance metadata
      hostname.endsWith('.internal') ||
      hostname.endsWith('.local') ||
      hostname === 'metadata.google.internal'
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
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

  // Log incoming inquiry with operational metadata
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

  // Outbound webhook dispatcher with SSRF and timeout guards
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    if (!isSafeWebhookUrl(webhookUrl)) {
      console.error('[ZenithDistrict::ContactAdapter] Insecure or invalid CONTACT_WEBHOOK_URL rejected.');
    } else {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referenceId, ...data }),
          signal: AbortSignal.timeout(5000), // 5-second timeout protection
        });
      } catch (err) {
        console.error('[ZenithDistrict::ContactAdapter] Webhook dispatch failed or timed out:', err);
        // Non-fatal for client response
      }
    }
  }

  return {
    success: true,
    message: 'Your inquiry has been logged. We review every note directly and respond within 24–48 hours.',
    referenceId,
  };
}
