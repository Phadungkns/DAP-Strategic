# DongFunda Phase 1: Owner Review

Status: DONGFUNDA_WEBSITE_PHASE_1_READY_FOR_OWNER_REVIEW

This is a LOCAL implementation. No push, production deployment, Sanity document write,
schema deployment, database migration or DNS change is part of this phase.

## Current Stack

- Existing Next.js App Router (package range 15.x), React 19, TypeScript and Tailwind 4.
- Shared Header/Footer, Kanit (Thai/English) and Space Grotesk. New styles are scoped under `.df`.
- Sanity project `10r3gve4`, dataset `production`: existing read-only content client.
- Products and Services are existing Sanity documents and existing routes, not new databases.
- Existing Next API handlers still handle contact submissions and payment webhooks.
- Contact flow to Make.com is unchanged. The abandoned PostgreSQL PR is not merged into this branch.
- Existing GTM/analytics components remain unchanged. Local preview starts without GTM ID.
- Existing GitHub/Vercel deployment convention remains unchanged; both repos use a local
  `codex/dongfunda-content-hub` branch. No production publish has occurred.
- No new PostgreSQL database is required for this CMS-backed content hub.

## Preview

- Hub: http://localhost:3010/dongfunda
- Detail: http://localhost:3010/dongfunda/bh-five-year-review
- Local edge cases: http://localhost:3010/dongfunda-review
- Empty state: http://localhost:3010/dongfunda-review?state=empty

Restart from the frontend repository in PowerShell:

```powershell
$env:DONGFUNDA_DEMO='true'
$env:DONGFUNDA_LOCAL_REVIEW='true'
$env:NEXT_PUBLIC_GTM_ID=''
$env:NEXT_PUBLIC_SITE_URL='https://www.dap.co.th'
node node_modules/next/dist/bin/next dev --turbopack --hostname 127.0.0.1 --port 3010
```

`DONGFUNDA_DEMO=true` works ONLY when `NODE_ENV=development`. Production builds cannot
enable it, even if that environment variable is accidentally set. Local media is served by
an allowlisted development-only route, not placed under `public/`.

## Implementation

- `/dongfunda`: featured article, latest cards, optional verified Trending, metadata-derived
  topic filters, series with existing content, search, and existing Product/Service links.
- Search matches title, company, ticker, topic, tags and series. Filters combine with search;
  state is shareable through `q`, `topic`, and `series` URL parameters.
- `/dongfunda/[slug]`: one reusable template with metadata, image/video, takeaways, flexible
  blocks, tables, charts, related articles and recommendations.
- No raw video embed HTML. Only supported YouTube/Vimeo URLs become embeds. Unsupported
  valid HTTPS video URLs can remain external links.
- Images retain 16:9 ratio, use responsive sizes and lazy loading except primary images.
  Missing or failed images receive a branded icon fallback.
- Full article blocks are not serialized to the hub client. Phase 1 uses simple in-memory
  search; pagination/search indexing should be introduced if the catalogue becomes large.
- Production content refreshes on the existing 30-second revalidation convention.

## CMS Model

Three new Sanity schema types, in the separate Studio repository:

1. `dongfundaContent`: content ID/version; title/slug/excerpt; thumbnail and accessible alt;
   video URL/embed URL and estimated duration; topics/tags/companies/tickers; series;
   summary/takeaways/blocks; related content and existing product/service references;
   SEO/canonical; research/approval/publication status; featured/trending metadata; dates.
2. `dongfundaSeries`: title, slug, description. Only series with visible content appear.
3. `dongfundaBlock`: typed flexible content, including text/headings/quotes/images/videos,
   charts/tables/takeaways, business model/revenue/margin/cash flow/balance sheet/valuation,
   news/comparison/conclusion/CTA. Optional fields keep different article outlines possible.

The site uses Sanity `_updatedAt` for modification metadata. Imported `updated_at` is
retained for editorial context. Trending needs verified analytics provenance and a measurement
date; the component does not invent analytics or fetch ranking from GA4 yet.

## Approval and Draft Boundary

Public queries use the `published` perspective AND require all of:

- published status;
- approved Owner status;
- valid publication date in the past;
- non-draft/non-release document ID;
- valid route slug and non-demo content.

The same filtering protects the hub, detail lookup, related content and sitemap. Unknown
and excluded slugs return 404. Demo pages have noindex metadata and no Article JSON-LD.

`lib/dongfunda/draft-import.ts` is a pure preparation interface, NOT an import endpoint.
It validates basic fields, constructs a versioned `drafts.*` document, strips incoming publish
privileges, and forces `draft` + `pending`. Media, blocks, references and CTA are explicitly
returned in `requiresMapping`; they are NOT silently published or written. A future adapter
must map and validate those fields and implement idempotency/version conflict review.

Important: workflow flags are not role-based security. Before any future publishing rollout,
review Sanity permissions so only authorized people can approve/publish. Do not store confidential
research in publicly readable published documents. Website filtering does not make the underlying
Sanity dataset private. No access-control changes were made in this phase.

## Visual Comparison

Preserved: light editorial layout; left thumbnail/right featured text; blue/teal identity;
three latest cards and compact ranked list; topic chips; series row; course/service banners.

Intentional differences:

- Kept actual DAP Strategic logo, AddLine/YouTube controls and existing footer instead of
  inventing the mockup's search-account-notification header. Search sits in the DongFunda toolbar.
- Added a small local-demo notice so mock data cannot be mistaken for approved research.
- The BH image is an AI-generated illustrative local thumbnail, not a photograph of the actual
  company or an approved original. BDMS/LH use existing supplied-owner media from disk as temporary
  visual placeholders; their embedded titles differ from the demonstration article titles.
- Omitted the featured video CTA until an actual article video URL exists; no dummy player link.
- Sample series contain two articles each and are derived from the seed metadata, not fixed panels.
- The mobile course/service buttons move below the text to avoid squeezed Thai/English headings.
- Preserved 16:9 thumbnail ratio even where the supplied mockup appears cropped.
- No commercial price is duplicated. Course selection uses existing active CMS course records.

## Verification

Automated checks and captured results live under `tests/` and `review/dongfunda/`.

Executed results (9 September 2026): 9/9 unit tests and 14/14 browser groups passed;
no page JavaScript errors on the final run. Production-mode isolation checks passed.
Next production build passed (23 static-generation steps; hub first-load JS approximately
117 kB). Targeted frontend ESLint and TypeScript passed. Studio build, schema extraction
and isolated strict typecheck of the new schema passed.

The restricted execution environment initially blocked development compiler subprocesses.
The final local preview uses Turbopack, an isolated build directory and the necessary local
process permissions. The normal production build configuration is unchanged by default.

- Unit tests: publication/date/draft/demo gates; metadata search/filter; link/embed safety;
  draft import privilege stripping and validation.
- Browser tests: hub/detail, features/cards/trending/series/topics; company search and no matches;
  Product and Service target HTTP responses; unknown/draft 404; metadata; images; tables/charts;
  desktop 1440px, tablet 820px, mobile 390px and small mobile 320px; long Thai/English titles;
  missing images; empty state; mobile navigation; console errors and horizontal overflow.
- Production-mode test: actual local production build with demo flag deliberately set; no demo
  content on hub; demo detail/media/review 404; no demo/draft paths in sitemap.
- Next production build and targeted frontend lint/type checks.
- Studio build and schema extraction; isolated new schema strict typecheck.

Full existing Studio typecheck has pre-existing errors in legacy schemas (implicit `any` and
preview types). Those unrelated files are not refactored here. The new schema checks separately.
Studio dependencies were installed locally within declared package ranges without changing
package.json/package-lock.json; production CI should use the repository's locked install.

## Files

Frontend changes:

- `app/dongfunda/`: hub/detail routes, metadata, layout/styles, error state.
- `app/dongfunda-demo/`, `app/dongfunda-review/`: development-only image/edge-case routes.
- `components/dongfunda/`: cards/thumbnails, hub sections, flexible blocks, recommendations.
- `lib/dongfunda/`: typed model, Sanity adapter, demo fixtures, SEO, draft preparation boundary.
- `components/layout/Header.tsx`: DongFunda navigation, tablet breakpoint and closed-menu focus fix.
- `app/sitemap.ts`: approved article discovery only.
- `next.config.ts`: opt-in isolated local review build directory (default build unchanged).
- `tsconfig.json`: include generated route types for the isolated review directory.
- `next-env.d.ts`: Next-generated reference to local review route types; Next regenerates
  this reference for the normal build directory when running a standard build.
- `demo/dongfunda/`: local review assets; no production public asset path.
- `tests/dongfunda*.cjs`: unit/browser/production checks.
- `.gitignore`: generated typecheck/screenshot/report outputs.
- `docs/dongfunda-phase-1.md`: this handoff.

Studio changes:

- `schemaTypes/dongfunda.ts`: new content/series/block definitions.
- `schemaTypes/index.ts`: register those types.

## Owner Decision / Next Step

Review the local page and screenshots, then provide the final article thumbnails/video URLs,
approved pilot copy and intended course recommendation. After visual/content approval, separately
authorize Studio schema deployment and website deployment. Before that rollout, review editorial
roles, consent/analytics behavior and the approved publishing policy. No mass import or automated
publication should be enabled as part of this phase.
