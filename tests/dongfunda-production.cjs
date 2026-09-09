const assert = require('node:assert/strict');
const base = process.env.PRODUCTION_REVIEW_URL || 'http://127.0.0.1:3011';
(async () => {
  const hub = await fetch(`${base}/dongfunda`);
  assert.equal(hub.status, 200);
  const html = await hub.text();
  assert.ok(!html.includes('LOCAL PREVIEW'));
  assert.ok(!html.includes('bh-five-year-review'));
  assert.ok(html.includes('bdms-revenue-profit-business-scale'));
  const article = await fetch(`${base}/dongfunda/bdms-revenue-profit-business-scale`);
  assert.equal(article.status, 200);
  const articleHtml = await article.text();
  assert.ok(articleHtml.includes('113,000'));
  assert.ok(articleHtml.includes('แหล่งที่มา'));
  assert.ok(!articleHtml.includes('LOCAL PREVIEW'));
  assert.ok(!articleHtml.includes('รหัสคลิป DF-LF'));
  for (const path of [
    '/dongfunda/bh-five-year-review',
    '/dongfunda/does-not-exist',
    '/dongfunda-demo/bh.png',
    '/dongfunda-demo/bdms-sf04.png',
    '/dongfunda-review',
    '/dongfunda-review?state=empty',
  ])
    assert.equal((await fetch(`${base}${path}`)).status, 404, path);
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes('https://www.dap.co.th/dongfunda'));
  assert.ok(sitemap.includes('/dongfunda/bdms-revenue-profit-business-scale'));
  for (const privatePath of [
    'bh-five-year-review',
    'bdms-cash-flow',
    'dongfunda-demo',
    'dongfunda-review',
    'drafts.',
  ])
    assert.ok(!sitemap.includes(privatePath), privatePath);
  console.log(
    'PASS approved BDMS content is public; demo detail/media/review return 404; sitemap includes BDMS and excludes demos and drafts.',
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
