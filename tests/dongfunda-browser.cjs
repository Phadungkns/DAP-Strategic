const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const base = process.env.REVIEW_URL || 'http://localhost:3010';
const out = path.resolve('review/dongfunda');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const results = [];
  async function ready() {
    // Exclude Next's local developer chrome from owner-facing screenshots.
    await page.addStyleTag({content: 'nextjs-portal { display: none !important; }'});
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.df img').evaluateAll((imgs) =>
      Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              }),
        ),
      ),
    );
  }
  async function noOverflow() {
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      'horizontal overflow',
    );
    assert.ok(
      await page
        .locator('.df-promo>div')
        .evaluateAll((nodes) =>
          nodes.every((node) => node.getBoundingClientRect().width >= 150),
        ),
      'promo copy is too narrow',
    );
  }
  async function check(name, fn) {
    await fn();
    results.push({ name, status: 'passed' });
    console.log('PASS', name);
  }
  try {
    await check('desktop hub, thumbnails, featured and cards', async () => {
      await page.goto(`${base}/dongfunda`);
      await ready();
      await page.locator('.df-card').first().waitFor();
      assert.equal(await page.locator('.df-card').count(), 3);
      assert.equal(await page.locator('.df-hero h1').innerText(), 'BH งบ 5 ปี');
      assert.ok(
        await page
          .locator('.df img')
          .evaluateAll((imgs) =>
            imgs.every((img) => img.complete && img.naturalWidth > 0),
          ),
      );
      await noOverflow();
      await page.screenshot({
        path: path.join(out, 'desktop.png'),
        fullPage: true,
      });
    });
    await check('search company and clear', async () => {
      await page.getByRole('searchbox').fill('Bumrungrad');
      assert.equal(await page.locator('.df-card').count(), 1);
      await page
        .getByRole('button', { name: 'ล้างคำค้น', exact: true })
        .click();
      assert.equal(await page.locator('.df-card').count(), 3);
    });
    await check('topic filtering and empty search', async () => {
      await page.getByRole('button', { name: 'CFO', exact: true }).click();
      assert.equal(await page.locator('.df-card').count(), 2);
      await page.getByRole('button', { name: 'ล้างตัวกรอง' }).click();
      await page.getByRole('searchbox').fill('no-matching-company');
      await page
        .getByRole('heading', { name: 'ไม่พบบทความที่ตรงกับการค้นหา' })
        .waitFor();
      await page
        .getByRole('button', { name: 'ล้างคำค้น', exact: true })
        .click();
    });
    await check('series filter', async () => {
      await page
        .getByRole('button', { name: 'ดูทั้งหมด อ่านธุรกิจผ่านงบ' })
        .click();
      assert.equal(await page.locator('.df-card').count(), 2);
      await page.getByRole('button', { name: 'ล้างตัวกรอง' }).click();
    });
    await check('show all and trending links', async () => {
      await page
        .getByRole('button', { name: 'ดูทั้งหมด', exact: true })
        .click();
      assert.equal(await page.locator('.df-card').count(), 6);
      assert.equal(await page.locator('.df-trending li').count(), 3);
      assert.ok(
        (
          await page.locator('.df-trending a').first().getAttribute('href')
        ).includes('/dongfunda/'),
      );
    });
    await check('product and service targets resolve', async () => {
      for (const link of await page.locator('.df-promo a').all()) {
        const href = await link.getAttribute('href');
        assert.ok(/^\/(products|services)/.test(href));
        const response = await page.request.get(`${base}${href}`);
        assert.equal(response.status(), 200, href);
      }
    });
    await check('detail, table, chart and metadata', async () => {
      await page.goto(`${base}/dongfunda/bh-five-year-review`);
      await ready();
      assert.equal(await page.locator('article h1').innerText(), 'BH งบ 5 ปี');
      assert.equal(await page.locator('.df-chart-row').count(), 5);
      assert.equal(
        await page.locator('.df-financial-table tbody tr').count(),
        3,
      );
      assert.ok(
        (
          await page.locator('meta[name="robots"]').getAttribute('content')
        ).includes('noindex'),
      );
      assert.ok(
        (
          await page.locator('link[rel="canonical"]').getAttribute('href')
        ).endsWith('/dongfunda/bh-five-year-review'),
      );
      await noOverflow();
      await page.screenshot({
        path: path.join(out, 'detail.png'),
        fullPage: true,
      });
    });
    await check('unknown and draft slugs return 404', async () => {
      for (const slug of ['does-not-exist', 'drafts.private-content']) {
        const response = await page.request.get(`${base}/dongfunda/${slug}`);
        assert.equal(response.status(), 404);
      }
    });
    for (const [name, width, height] of [
      ['tablet', 820, 1180],
      ['mobile', 390, 844],
      ['small-mobile', 320, 740],
    ])
      await check(`${name} hub and detail`, async () => {
        await page.setViewportSize({ width, height });
        await page.goto(`${base}/dongfunda`);
        await ready();
        await noOverflow();
        await page.screenshot({
          path: path.join(out, `${name}.png`),
          fullPage: true,
        });
        await page.goto(`${base}/dongfunda/bh-five-year-review`);
        await ready();
        await noOverflow();
        if (name === 'mobile')
          await page.screenshot({
            path: path.join(out, 'detail-mobile.png'),
            fullPage: true,
          });
      });
    await check('long Thai/English titles and missing thumbnails', async () => {
      await page.goto(`${base}/dongfunda-review`);
      await ready();
      await noOverflow();
      assert.equal(
        await page.locator('.df-card .df-image-fallback').count(),
        3,
      );
      await page.screenshot({
        path: path.join(out, 'edge-cases-mobile.png'),
        fullPage: true,
      });
    });
    await check('empty CMS state', async () => {
      await page.goto(`${base}/dongfunda-review?state=empty`);
      await page
        .getByRole('heading', { name: 'ยังไม่มีบทความเผยแพร่' })
        .waitFor();
      await noOverflow();
      assert.equal(await page.locator('.df-hero').count(), 0);
    });
    await check('mobile navigation remains functional', async () => {
      await page.getByRole('button', { name: 'เปิดเมนู' }).click();
      await page.getByRole('link', { name: 'DongFunda', exact: true }).click();
      await page.locator('.df-hero').waitFor();
      assert.equal(
        await page
          .getByRole('button', { name: 'เปิดเมนู' })
          .getAttribute('aria-expanded'),
        'false',
      );
    });
    assert.deepEqual(errors, [], 'browser errors');
    fs.writeFileSync(
      path.join(out, 'browser-results.json'),
      JSON.stringify({ base, results, errors }, null, 2),
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
