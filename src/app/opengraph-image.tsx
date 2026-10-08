import { ImageResponse } from 'next/og';

export const alt = 'ZenithDistrict — Venture House';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0B',
          color: '#F3F1EC',
          padding: '80px',
          fontFamily: 'sans-serif',
          border: '16px solid #1A1A1D',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            letterSpacing: '0.15em',
            color: '#8B8984',
            borderBottom: '1px solid rgba(243, 241, 236, 0.15)',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#3882F6', fontWeight: 'bold', marginRight: '12px' }}>
              ZD //
            </span>
            <span>ZENITHDISTRICT</span>
          </div>
          <div style={{ display: 'flex' }}>
            <span>EST. 2026 // INDEPENDENT VENTURE HOUSE</span>
          </div>
        </div>

        {/* Main Title Block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
            }}
          >
            <span>Building what’s</span>
            <span style={{ color: '#3882F6', marginLeft: '16px', fontStyle: 'italic' }}>
              next.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#8B8984',
              maxWidth: '850px',
              lineHeight: 1.4,
              marginTop: '20px',
            }}
          >
            <span>
              We design and build software, launch consumer brands, and run experiments under one roof.
            </span>
          </div>
        </div>

        {/* Bottom Sector Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 16,
            letterSpacing: '0.1em',
            color: '#8B8984',
            borderTop: '1px solid rgba(243, 241, 236, 0.15)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex' }}>Z-01 STUDIO</div>
          <div style={{ display: 'flex' }}>Z-02 BRANDS</div>
          <div style={{ display: 'flex' }}>Z-03 PRODUCTS</div>
          <div style={{ display: 'flex' }}>Z-04 LABS</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
