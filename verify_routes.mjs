const routes = [
  '/',
  '/login',
  '/register',
  '/entrepreneur/dashboard',
  '/entrepreneur/business-profile',
  '/entrepreneur/approval-roadmap',
  '/entrepreneur/dependency-graph',
  '/entrepreneur/documents',
  '/entrepreneur/documents/ocr',
  '/entrepreneur/applications',
  '/entrepreneur/schemes',
  '/entrepreneur/simulator',
  '/entrepreneur/copilot',
  '/entrepreneur/notifications',
  '/entrepreneur/settings',
  '/officer/dashboard',
  '/officer/applications',
  '/officer/inspections',
  '/officer/analytics',
  '/admin/dashboard',
  '/admin/rules',
  '/admin/sources',
  '/admin/schemes',
  '/admin/users',
  '/admin/analytics'
];

async function verify() {
  console.log('Testing UdyamSetu AI HTTP Endpoints:');
  let passed = 0;
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      if (res.status === 200) {
        console.log(`[PASS 200] ${r}`);
        passed++;
      } else {
        console.log(`[FAIL ${res.status}] ${r}`);
      }
    } catch (e) {
      console.error(`[ERROR] ${r}: ${e.message}`);
    }
  }
  console.log(`\nResult: ${passed}/${routes.length} routes verified successfully with HTTP 200 OK.`);
}

verify();
