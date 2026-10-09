import { siteConfig } from '@/data/site';
import { ApparelProduct, ShopMode } from '@/data/types';

export interface ProductAction {
  type: 'waitlist' | 'external' | 'disabled' | 'inquire' | 'internal_checkout';
  label: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  secondaryText?: string;
}

export interface CommerceAdapter {
  getMode(): ShopMode;
  formatPrice(price: number, currency?: string): string;
  getProductActions(product: ApparelProduct, options?: { mode?: ShopMode; colorway?: string; size?: string }): ProductAction[];
  buildCheckoutUrl(product: ApparelProduct, options?: { colorway?: string; size?: string }): string;
  generateProductJsonLd(product: ApparelProduct, siteUrl: string, mode?: ShopMode): Record<string, unknown>;
}

export const commerceAdapter: CommerceAdapter = {
  getMode(): ShopMode {
    return siteConfig.shop?.mode || 'preview';
  },

  formatPrice(price: number, currency: string = 'INR'): string {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return `₹${price.toLocaleString()}`;
    }
  },

  buildCheckoutUrl(product: ApparelProduct, options?: { colorway?: string; size?: string }): string {
    if (product.externalCheckoutUrl) {
      const url = new URL(product.externalCheckoutUrl, 'https://checkout.zenithdistrict.com');
      if (options?.colorway) url.searchParams.set('color', options.colorway);
      if (options?.size) url.searchParams.set('size', options.size);
      return url.toString();
    }
    // Default fallback external partner checkout link
    return `https://zenithdistrict.com/checkout?product=${product.code}&size=${options?.size || 'M'}&color=${options?.colorway || product.colorways[0]?.id}`;
  },

  getProductActions(
    product: ApparelProduct,
    options?: { mode?: ShopMode; colorway?: string; size?: string }
  ): ProductAction[] {
    const activeMode = options?.mode || this.getMode();

    if (activeMode === 'preview') {
      return [
        {
          type: 'waitlist',
          label: 'JOIN COLLECTION WAITLIST',
          href: '#waitlist',
          secondaryText: 'Not yet available for direct checkout. Made to order on launch.',
        },
      ];
    }

    if (activeMode === 'waitlist') {
      return [
        {
          type: 'waitlist',
          label: 'REQUEST EARLY SAMPLING',
          href: '#waitlist',
          secondaryText: 'Enter your email for first drop allocation.',
        },
      ];
    }

    if (activeMode === 'external') {
      return [
        {
          type: 'external',
          label: 'ORDER PIECE (PRINT ON DEMAND)',
          href: this.buildCheckoutUrl(product, options),
          external: true,
          secondaryText: 'Redirects to fulfillment partner. Printed individually to order.',
        },
      ];
    }

    // Live mode (trigger native checkout)
    return [
      {
        type: 'internal_checkout',
        label: 'PURCHASE (PRINT ON DEMAND)',
        secondaryText: 'Ships directly from our fulfillment partner.',
      },
    ];
  },

  generateProductJsonLd(
    product: ApparelProduct,
    siteUrl: string,
    mode?: ShopMode
  ): Record<string, unknown> {
    const activeMode = mode || this.getMode();
    const productUrl = `${siteUrl}/brands/brand-one/shop/${product.slug}`;

    const jsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.code,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'Brand One (working title)',
      },
      url: productUrl,
      material: product.fabric.composition,
      category: 'Apparel',
    };

    // Honesty rule: Product JSON-LD includes offers ONLY when mode is "external" or "live"
    // AND price is marked confirmed; otherwise omit offers entirely.
    if ((activeMode === 'external' || activeMode === 'live') && product.priceConfirmed) {
      jsonLd.offers = {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency,
        availability: 'https://schema.org/PreOrder',
        url: productUrl,
      };
    }

    return jsonLd;
  },
};
