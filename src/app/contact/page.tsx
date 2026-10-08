import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/data/site';
import { constructMetadata } from '@/lib/seo';
import { Mail, MapPin, Clock } from 'lucide-react';
import { GithubIcon, XIcon } from '@/components/ui/BrandSocialIcons';

export const metadata: Metadata = constructMetadata({
  title: 'Direct Inquiries // Start a Project or Partnership',
  description:
    'Initiate a studio project, technical partnership, or brand collaboration with ZenithDistrict. Direct communication with principals.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="pt-12 md:pt-20 pb-24 md:pb-36 space-y-16">
      <Container>
        <SectionHeader
          index="MSG"
          title="COMMUNICATION DISPATCH"
          code="DIRECT"
          caption="Direct technical inquiry channel. No intermediaries or account managers."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-[var(--text-primary)]">
                Have an ambitious idea to build?
              </h1>
              <p className="text-base text-[var(--muted-text)] leading-relaxed">
                Whether you’re commissioning a bespoke web system from our Studio, exploring an equity partnership, or discussing consumer distribution, every message is reviewed directly by our principals.
              </p>
            </div>

            {/* Response Time & Details */}
            <div className="p-6 border border-[var(--border-color)] bg-[var(--surface-elevated)] space-y-4 text-xs font-mono-tag">
              <div className="flex items-center gap-3 text-[var(--text-primary)]">
                <Clock className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span>AVERAGE RESPONSE: 24–48 BUSINESS HOURS</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-primary)]">
                <MapPin className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span>LOCATION: {siteConfig.location.toUpperCase()}</span>
              </div>
              <div className="pt-2 hairline-border-t text-[var(--stone)]">
                CONFIDENTIALITY GUARANTEED // MUTUAL NDAS EXECUTED UPON REQUEST
              </div>
            </div>

            {/* Direct Mailbox & Socials */}
            <div className="space-y-3 pt-2">
              <span className="font-mono-tag text-xs text-[var(--stone)] uppercase">
                DIRECT MAILBOX:
              </span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="flex items-center gap-2 text-base font-medium font-mono text-[var(--text-primary)] hover:text-[var(--signal)] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[var(--signal)] shrink-0" />
                <span>{siteConfig.contactEmail}</span>
              </a>

              <div className="pt-4 flex items-center gap-6 font-mono-tag text-xs text-[var(--stone)]">
                {siteConfig.socials.github && (
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] flex items-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GITHUB ↗</span>
                  </a>
                )}
                {siteConfig.socials.x && (
                  <a
                    href={siteConfig.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--signal)] flex items-center gap-1.5 transition-colors"
                  >
                    <XIcon className="w-4 h-4" />
                    <span>X PROFILE ↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form with Suspense Boundary */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 border border-[var(--border-color)] bg-[var(--surface)] text-center font-mono-tag text-xs text-[var(--stone)]">
                  INITIALIZING SECURE TRANSMISSION CHANNEL...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
