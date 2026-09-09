// Pure preparation boundary only: no network, credentials, CMS writes or publish action.
export interface DraftPackage {
  content_id: string;
  version: number;
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  primary_topic?: string;
  secondary_topics?: string[];
  tags?: string[];
  companies?: string[];
  tickers?: string[];
  key_takeaways?: string[];
  seo_title?: string;
  meta_description?: string;
  research_status?: string;
  owner_approval_status?: string;
  publish_status?: string;
  // Media, blocks, series and references require mapping/validation before a future write adapter.
  thumbnail?: unknown;
  video?: unknown;
  series?: unknown;
  content_blocks?: unknown[];
  related_content?: unknown[];
  cta?: unknown;
}

export function prepareDraft(input: DraftPackage) {
  if (
    !input ||
    typeof input !== 'object' ||
    typeof input.content_id !== 'string' ||
    !/^[\w-]{1,100}$/.test(input.content_id)
  )
    throw new Error('Invalid Content ID');
  if (!Number.isInteger(input.version) || input.version < 1)
    throw new Error('Invalid version');
  if (
    typeof input.title !== 'string' ||
    !input.title.trim() ||
    input.title.length > 500
  )
    throw new Error('Invalid title');
  if (
    typeof input.slug !== 'string' ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) ||
    input.slug.length > 100
  )
    throw new Error('Invalid slug');
  const strings = [
    'excerpt',
    'summary',
    'primary_topic',
    'seo_title',
    'meta_description',
    'research_status',
  ] as const;
  const arrays = [
    'secondary_topics',
    'tags',
    'companies',
    'tickers',
    'key_takeaways',
  ] as const;
  const fields: Record<string, string | string[]> = {};
  for (const key of strings) {
    if (input[key] !== undefined) {
      if (typeof input[key] !== 'string' || input[key].length > 20000)
        throw new Error(`Invalid ${key}`);
      fields[key] = input[key];
    }
  }
  for (const key of arrays) {
    const value = input[key];
    if (value !== undefined) {
      if (
        !Array.isArray(value) ||
        value.length > 100 ||
        !value.every((v) => typeof v === 'string' && v.length <= 2000)
      )
        throw new Error(`Invalid ${key}`);
      fields[key] = value;
    }
  }
  return {
    document: {
      _id: `drafts.dongfunda-${input.content_id}-v${input.version}`,
      _type: 'dongfundaContent',
      content_id: input.content_id,
      version: input.version,
      title: input.title.trim(),
      slug: { _type: 'slug', current: input.slug },
      ...fields,
      publish_status: 'draft' as const,
      owner_approval_status: 'pending' as const,
      featured: false,
    },
    requiresMapping: (
      [
        'thumbnail',
        'video',
        'series',
        'content_blocks',
        'related_content',
        'cta',
      ] as const
    ).filter((key) => input[key] !== undefined),
    canPublish: false as const,
  };
}
