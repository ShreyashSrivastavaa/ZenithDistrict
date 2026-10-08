// Automated verification script for security hardening

async function runSecurityTests() {
  const baseUrl = 'http://localhost:3000';

  console.log('[Security Audit] 1. Testing Security Headers on HTML responses...');
  const res = await fetch(`${baseUrl}/`);
  const h = res.headers;

  const checks = [
    { name: 'Content-Security-Policy', ok: !!h.get('content-security-policy') },
    { name: 'X-Frame-Options (DENY)', ok: h.get('x-frame-options') === 'DENY' },
    { name: 'X-Content-Type-Options (nosniff)', ok: h.get('x-content-type-options') === 'nosniff' },
    { name: 'Referrer-Policy', ok: h.get('referrer-policy') === 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', ok: !!h.get('permissions-policy') },
    { name: 'X-Powered-By hidden', ok: !h.get('x-powered-by') },
  ];

  for (const c of checks) {
    console.log(`  - ${c.name}: ${c.ok ? 'PASS' : 'FAIL'}`);
  }

  console.log('\n[Security Audit] 2. Testing /api/contact Content-Type verification...');
  const ctRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: 'plain text',
  });
  console.log(`  - Non-JSON rejected with 415: ${ctRes.status === 415 ? 'PASS (415)' : 'FAIL (' + ctRes.status + ')'}`);

  console.log('\n[Security Audit] 3. Testing /api/contact Cross-Origin CSRF rejection...');
  const originRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://malicious-origin.com',
      Host: 'localhost:3000',
    },
    body: JSON.stringify({ name: 'Cross Origin Test' }),
  });
  console.log(`  - Untrusted Origin rejected with 403: ${originRes.status === 403 ? 'PASS (403)' : 'FAIL (' + originRes.status + ')'}`);

  console.log('\n[Security Audit] 4. Testing /api/contact Payload size cap...');
  const bigBody = JSON.stringify({ name: 'X'.repeat(70000) });
  const bigRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': String(Buffer.byteLength(bigBody)),
    },
    body: bigBody,
  });
  console.log(`  - Oversized payload rejected with 413: ${bigRes.status === 413 ? 'PASS (413)' : 'FAIL (' + bigRes.status + ')'}`);

  console.log('\n[Security Audit] 5. Testing /api/contact Rate Limiting...');
  const validData = {
    name: 'Sec Auditor',
    email: 'audit@zenithdistrict.com',
    inquiryType: 'Studio project',
    message: 'Automated verification payload for rate limit inspection.',
  };

  let rateLimitHit = false;
  for (let i = 1; i <= 6; i++) {
    const r = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validData),
    });
    const rem = r.headers.get('x-ratelimit-remaining');
    console.log(`  - Probe #${i} -> HTTP ${r.status} (Remaining: ${rem})`);
    if (r.status === 429) {
      rateLimitHit = true;
      break;
    }
  }
  console.log(`  - Rate limiting active (HTTP 429 triggered): ${rateLimitHit ? 'PASS' : 'FAIL'}`);

  console.log('\n[Security Audit] All automated checks completed.');
}

runSecurityTests().catch((err) => {
  console.error('Audit script encountered an error:', err);
  process.exit(1);
});
