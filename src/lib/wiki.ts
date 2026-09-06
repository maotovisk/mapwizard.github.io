/** Shared wiki article index, used by the ⌘K palette and the wiki page. */

export type WikiArticle = {
    slug: string;
    title: string;
    language: string;
    markdown: string;
};

const files = import.meta.glob('../../wiki/**/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

const titleOf = (markdown: string, fallback: string) =>
    markdown.match(/^# (.+)$/m)?.[1]?.trim() || fallback;

export const articles: WikiArticle[] = Object.entries(files)
    .map(([path, markdown]) => {
        const slug = path.replace('../../wiki/', '').replace(/\.md$/, '');
        const language = slug.split('/').pop() ?? '';
        return { slug, title: titleOf(markdown, slug), language, markdown };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

export const DEFAULT_ARTICLE = 'Getting_started/en';

export const findArticle = (slug: string) =>
    articles.find((entry) => entry.slug === slug);
