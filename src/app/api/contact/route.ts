import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { submitContactInquiry } from '@/lib/contact';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Validate request body with Zod schema
    const parseResult = contactFormSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { website_honeypot } = parseResult.data;

    // Honeypot check: If bot filled the hidden honeypot, return silent 200 without dispatching
    if (website_honeypot && website_honeypot.length > 0) {
      console.warn('[Contact Route] Spam bot caught by honeypot.');
      return NextResponse.json(
        { success: true, message: 'Inquiry received.' },
        { status: 200 }
      );
    }

    // Submit inquiry through pluggable adapter
    const result = await submitContactInquiry(parseResult.data);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[Contact Route] Server error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your inquiry.',
      },
      { status: 500 }
    );
  }
}
