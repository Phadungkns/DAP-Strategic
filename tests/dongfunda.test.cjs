const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText,
    filename,
  );
const {
  isPublicContent,
  demoEnabled,
  filterContent,
  contentTopics,
  safeLink,
  videoEmbed,
} = require('../lib/dongfunda/model.ts');
const { prepareDraft } = require('../lib/dongfunda/draft-import.ts');
const { demoContent } = require('../lib/dongfunda/demo.ts');
const approved = {
  ...demoContent.find((item) => item.slug === 'bh-five-year-review'),
  _id: 'approved-bh',
  demo: false,
  publish_status: 'published',
  owner_approval_status: 'approved',
  published_at: '2026-01-01T00:00:00Z',
};

test('approved past-dated content is public', () =>
  assert.equal(isPublicContent(approved), true));
test('all demo content is private', () =>
  assert.ok(demoContent.every((i) => !isPublicContent(i))));

test('BDMS clip preview stays private without an uploaded video URL', () => {
  const clip = demoContent.find((item) => item.slug === 'bdms-revenue-profit-business-scale');
  assert.ok(clip);
  assert.equal(isPublicContent(clip), false);
  assert.equal(clip.video_url, undefined);
  assert.equal(clip.video_embed, undefined);
  const source = clip.content_blocks.find((block) => block.heading === 'แหล่งที่มา');
  assert.ok(source);
  assert.equal(source.url, undefined);
  assert.equal(source.text, 'รายได้-กำไร BDMS ระดับแสนล้าน/หมื่นล้าน');
});
test('drafts, versions, pending, rejected, archived, future and undated entries fail closed', () => {
  for (const change of [
    { _id: 'drafts.bh' },
    { _id: 'versions.release.bh' },
    { publish_status: 'draft' },
    { publish_status: 'archived' },
    { owner_approval_status: 'pending' },
    { owner_approval_status: 'rejected' },
    { published_at: '2099-01-01T00:00:00Z' },
    { published_at: undefined },
    { published_at: 'invalid' },
    { slug: '../private' },
  ])
    assert.equal(
      isPublicContent({ ...approved, ...change }),
      false,
      JSON.stringify(change),
    );
});
test('demo requires BOTH local development and explicit opt-in', () => {
  assert.equal(
    demoEnabled({ NODE_ENV: 'development', DONGFUNDA_DEMO: 'true' }),
    true,
  );
  for (const env of [
    { NODE_ENV: 'production', DONGFUNDA_DEMO: 'true' },
    { NODE_ENV: 'test', DONGFUNDA_DEMO: 'true' },
    { NODE_ENV: 'development' },
    { NODE_ENV: 'development', DONGFUNDA_DEMO: 'false' },
  ])
    assert.equal(demoEnabled(env), false);
});
test('search covers title, company, ticker, topic and series', () => {
  for (const q of [
    'BH',
    'Bumrungrad',
    'บำรุงราษฎร์',
    '5Y FS',
    'อ่านธุรกิจผ่านงบ',
  ])
    assert.ok(
      filterContent(demoContent, q, '', '').some(
        (i) => i.slug === approved.slug,
      ),
      q,
    );
  assert.equal(filterContent(demoContent, 'nothing-matches', '', '').length, 0);
});
test('topic and series filters compose and are derived dynamically', () => {
  assert.ok(contentTopics(approved).includes('โรงพยาบาล'));
  assert.equal(
    filterContent(demoContent, '', 'CFO', 'read-the-business').length,
    2,
  );
  assert.equal(
    filterContent(demoContent, '', 'CFO', 'grow-patiently').length,
    0,
  );
});
test('unsafe links and embeds are rejected', () => {
  for (const url of [
    'javascript:alert(1)',
    'data:text/html,x',
    '//evil.test',
    '/\\evil.test',
    'http://example.com',
  ])
    assert.equal(safeLink(url), undefined, url);
  assert.equal(safeLink('/products'), '/products');
  assert.equal(
    videoEmbed('https://www.youtube.com/watch?v=abcdefghijk'),
    'https://www.youtube-nocookie.com/embed/abcdefghijk',
  );
  assert.equal(
    videoEmbed('https://youtu.be/abcdefghijk'),
    'https://www.youtube-nocookie.com/embed/abcdefghijk',
  );
  assert.equal(
    videoEmbed('https://vimeo.com/123456'),
    'https://player.vimeo.com/video/123456',
  );
  for (const url of [
    '<iframe src="x">',
    'https://youtube.com.evil.test/watch?v=abcdefghijk',
    'javascript:alert(1)',
    'https://example.com/embed/abc',
  ])
    assert.equal(videoEmbed(url), undefined);
});
test('AI Ops cannot preserve incoming publication, approval, id or featured privileges', () => {
  const result = prepareDraft({
    content_id: 'DF-001',
    version: 2,
    title: 'Test',
    slug: 'test',
    publish_status: 'published',
    owner_approval_status: 'approved',
    _id: 'public-id',
    featured: true,
    content_blocks: [{}],
  });
  assert.equal(result.document.publish_status, 'draft');
  assert.equal(result.document.owner_approval_status, 'pending');
  assert.equal(result.document.featured, false);
  assert.ok(result.document._id.startsWith('drafts.'));
  assert.equal(result.canPublish, false);
  assert.deepEqual(result.requiresMapping, ['content_blocks']);
});
test('AI Ops rejects malformed required and optional fields', () => {
  const input = {
    content_id: 'DF-001',
    version: 1,
    title: 'Test',
    slug: 'test',
  };
  for (const changes of [
    { title: '' },
    { version: 0 },
    { slug: '../x' },
    { content_id: 'x.y' },
    { tags: [123] },
    { summary: 42 },
  ])
    assert.throws(() => prepareDraft({ ...input, ...changes }));
});
test('hospital context precedes the BH business model without changing other article outlines', () => {
  const bh = demoContent.find(item => item.slug === 'bh-five-year-review');
  assert.deepEqual(bh.content_blocks.slice(0, 5).map(block => block._key), [
    'hospital-big-picture', 'hospital-health-context', 'hospital-service-context', 'hospital-context-conclusion', 'model',
  ]);
  assert.equal(bh.content_blocks.slice(0, 4).filter(block => block.heading).length, 1);
  assert.ok(bh.content_blocks.slice(0, 3).every(block => block.source && safeLink(block.url)));
  assert.equal(bh.research_status, 'macro_context_sourced');
  const lh = demoContent.find(item => item.slug === 'lh-next-chapter');
  assert.equal(lh.content_blocks[0]._key, 'model');
  assert.equal(isPublicContent(bh), false);
});
