import { z } from 'zod';

export interface QikinkAuthResponse {
  success: boolean;
  authenticated: boolean;
  message?: string;
  error?: string;
  environment?: 'sandbox' | 'production';
  expiresIn?: number;
  token?: string; // Internal use only
}

/**
 * Validates Qikink credentials against the Qikink authentication API and returns the access token.
 * Safe to call from server actions or API routes.
 */
export async function getQikinkToken(): Promise<QikinkAuthResponse> {
  const clientId = process.env.QIKINK_CLIENT_ID?.trim();
  const clientSecret = process.env.QIKINK_CLIENT_SECRET?.trim();
  const rawBaseUrl = process.env.QIKINK_API_BASE_URL?.trim();
  
  if (!clientId || !clientSecret || !rawBaseUrl) {
    return {
      success: false,
      authenticated: false,
      error: 'Qikink credentials (ID, Secret, Base URL) are not configured on the server.',
    };
  }

  const apiBaseUrl = rawBaseUrl.replace(/\/+$/, '');
  const tokenUrl = `${apiBaseUrl}/api/token`;
  const isSandbox = apiBaseUrl.toLowerCase().includes('sandbox');

  const formData = new URLSearchParams();
  formData.append('ClientId', clientId);
  formData.append('client_secret', clientSecret);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const qikinkRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formData.toString(),
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    let data: Record<string, unknown> | null = null;
    try {
      data = (await qikinkRes.json()) as Record<string, unknown>;
    } catch {
      data = null;
    }

    if (qikinkRes.ok) {
      const token = data?.Accesstoken || data?.access_token || data?.token;
      if (!token) {
        return {
          success: false,
          authenticated: false,
          error: String(data?.error || data?.message || 'Authentication rejected by provider.'),
        };
      }

      const expiresIn =
        typeof data?.expires_in === 'number'
          ? data.expires_in
          : typeof data?.expires_in === 'string'
            ? parseInt(data.expires_in, 10) || undefined
            : undefined;

      return {
        success: true,
        authenticated: true,
        message: 'Qikink authentication succeeded.',
        environment: isSandbox ? 'sandbox' : 'production',
        expiresIn,
        token: String(token),
      };
    }

    if (qikinkRes.status === 401 || qikinkRes.status === 403) {
      return {
        success: false,
        authenticated: false,
        error: 'Invalid Qikink credentials (unauthorized).',
      };
    }

    return {
      success: false,
      authenticated: false,
      error: `Upstream Qikink API returned status ${qikinkRes.status}.`,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === 'AbortError') {
      return {
        success: false,
        authenticated: false,
        error: 'Connection to Qikink authentication server timed out.',
      };
    }

    return {
      success: false,
      authenticated: false,
      error: 'Network error communicating with Qikink authentication server.',
    };
  }
}

// Zod validation schemas for Sandbox Test Orders
export const qikinkShippingSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  address1: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state_id: z.string().optional(),
  country_id: z.string().optional(),
  zip: z.string().min(5, 'Pincode is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
});

export const sandboxOrderTestSchema = z.object({
  // Accept standard customer inputs
  customer: qikinkShippingSchema,
  // Strict test guard - require an explicit flag to ensure intentional invocation
  is_sandbox_test: z.literal(true, {
    message: 'Sandbox test flag must be true.',
  }),
});
