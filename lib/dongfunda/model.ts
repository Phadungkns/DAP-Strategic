export type BlockKind =
  | 'text'
  | 'heading'
  | 'quote'
  | 'video'
  | 'image'
  | 'chart'
  | 'financial_table'
  | 'key_takeaways'
  | 'business_model'
  | 'revenue_analysis'
  | 'margin_analysis'
  | 'cash_flow'
  | 'balance_sheet'
  | 'valuation'
  | 'news_impact'
  | 'comparison'
  | 'conclusion'
  | 'cta';

export interface ContentBlock {
  _key: string;
  kind: BlockKind;
  heading?: string;
  text?: string;
  items?: string[];
  image?: { url: string; alt: string };
  url?: string;
  label?: string;
  caption?: string;
  columns?: string[];
  rows?: { _key: string; cells: string[] }[];
  points?: { _key: string; label: string; value: number }[];
  unit?: string;
  source?: string;
}

export interface ContentSeries {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Recommendation {
  title: string;
  slug: string;
}

export interface DongFundaContent {
  _id: string;
  content_id: string;
  version: number;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail?: { url: string; alt: string; aspectRatio?: number };
  video_url?: string;
  video_embed?: string;
  duration_minutes?: number;
  primary_topic?: string;
  secondary_topics?: string[];
  tags?: string[];
  companies?: string[];
  tickers?: string[];
  series?: ContentSeries;
  summary?: string;
  key_takeaways?: string[];
  content_blocks?: ContentBlock[];
  related_content?: string[];
  product?: Recommendation;
  service?: Recommendation;
  seo_title?: string;
  meta_description?: string;
  canonical_url?: string;
  publish_status: 'draft' | 'published' | 'archived';
  owner_approval_status: 'pending' | 'approved' | 'rejected';
  research_status?: string;
  featured?: boolean;
  trending_rank?: number;
  trending_source?: 'analytics' | 'demo';
  trending_measured_at?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  demo?: boolean;
}

export function demoEnabled(
  env: Record<string, string | undefined> = process.env,
) {
  return env.NODE_ENV === 'development' && env.DONGFUNDA_DEMO === 'true';
}

export function isPublicContent(item: DongFundaContent, now = Date.now()) {
  return (
    !item.demo &&
    !item._id.startsWith('drafts.') &&
    !item._id.startsWith('versions.') &&
    item.publish_status === 'published' &&
    item.owner_approval_status === 'approved' &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) &&
    !!item.published_at &&
    Number.isFinite(Date.parse(item.published_at)) &&
    Date.parse(item.published_at) <= now
  );
}

export function contentTopics(item: DongFundaContent) {
  return [
    ...new Set(
      [
        item.primary_topic,
        ...(item.tickers || []),
        ...(item.secondary_topics || []),
        ...(item.tags || []),
      ].filter((s): s is string => !!s),
    ),
  ];
}

export function filterContent(
  items: DongFundaContent[],
  query: string,
  topic: string,
  series: string,
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    const haystack = [
      item.title,
      item.excerpt,
      ...contentTopics(item),
      ...(item.companies || []),
      item.series?.title,
    ]
      .join(' ')
      .toLocaleLowerCase();
    return (
      terms.every((term) => haystack.includes(term)) &&
      (!topic || contentTopics(item).includes(topic)) &&
      (!series || item.series?.slug === series)
    );
  });
}

export function safeLink(value?: string): string | undefined {
  if (!value) return;
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password)
      return url.href;
  } catch {
    /* Invalid CMS URL is omitted. */
  }
}

export function videoEmbed(value?: string): string | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return;
    const host = url.hostname.replace(/^www\./, '');
    if (
      host === 'youtu.be' ||
      host === 'youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const id =
        host === 'youtu.be'
          ? url.pathname.slice(1)
          : url.searchParams.get('v') ||
            url.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)$/)?.[1];
      if (id && /^[\w-]{11}$/.test(id))
        return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = url.pathname.match(/^\/(?:video\/)?(\d+)$/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    /* Never render raw embed HTML. */
  }
}

export function contentHref(item: Pick<DongFundaContent, 'slug'>) {
  return `/dongfunda/${encodeURIComponent(item.slug)}`;
}

export function discoveryContent(item: DongFundaContent): DongFundaContent {
  const {
    content_blocks,
    key_takeaways,
    related_content,
    research_status,
    ...card
  } = item;
  void content_blocks;
  void key_takeaways;
  void related_content;
  void research_status;
  return { ...card, summary: card.summary?.slice(0, 140) };
}
