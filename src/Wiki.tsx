import { useEffect, useLayoutEffect, useState } from 'preact/hooks';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ArrowLeft, ArrowUpRight, BookOpen, Search } from 'lucide-preact';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { scrollToTopInstant } from '@/lib/scroll';
import { articles, DEFAULT_ARTICLE, findArticle } from '@/lib/wiki';

export default function Wiki({ route }: { route: string }) {
    const slug = route.replace(/^#\/wiki\/?/, '') || DEFAULT_ARTICLE;
    const article = findArticle(slug);
    const [query, setQuery] = useState('');
    const html = article ? DOMPurify.sanitize(marked.parse(article.markdown, { async: false })) : '';
    const needle = query.trim().toLowerCase();
    const visible = needle
        ? articles.filter((entry) => `${entry.title} ${entry.slug}`.toLowerCase().includes(needle))
        : articles;
    useLayoutEffect(() => {
        /* Pre-paint so entering the wiki never flashes the old position. */
        scrollToTopInstant();
    }, [slug]);
    useEffect(() => {
        const previous = document.title;
        document.title = `${article?.title ?? 'Page not found'} · MapWizard Wiki`;
        return () => { document.title = previous; };
    }, [slug]);
    return (
        <>
            <Navigation page="wiki" />
            <div class="wiki-page">
                <a class="skip-link" href="#wiki-article" onClick={(event) => { event.preventDefault(); document.getElementById('wiki-article')?.focus(); }}>Skip to article</a>
                <main class="wiki-layout">
                    <aside class="wiki-sidebar">
                        <a class="wiki-back" href="#top"><ArrowLeft size={15} />Back to website</a>
                        <span class="section-label"><BookOpen size={15} />Documentation</span>
                        <label class="wiki-filter">
                            <Search size={14} strokeWidth={2} aria-hidden="true" />
                            <input
                                type="search"
                                placeholder="Filter guides…"
                                aria-label="Filter guides"
                                value={query}
                                onInput={(event) => setQuery((event.target as HTMLInputElement).value)}
                            />
                        </label>
                        <nav aria-label="Wiki articles">
                            {visible.map((entry) => <a key={entry.slug} href={`#/wiki/${entry.slug}`} aria-current={entry.slug === slug ? 'page' : undefined}>{entry.title}</a>)}
                            {visible.length === 0 && <p class="wiki-empty">No guides match “{query.trim()}”.</p>}
                        </nav>
                    </aside>
                    <article class="wiki-article" id="wiki-article" tabIndex={-1}>
                        <div class="wiki-breadcrumb">Wiki <span>/</span> {article?.title ?? 'Page not found'}</div>
                        {article ? <><div class="markdown" dangerouslySetInnerHTML={{ __html: html }} /><footer class="wiki-article-footer"><span>Help improve this guide.</span><a href={`https://github.com/maotovisk/mapwizard.github.io/edit/main/wiki/${article.slug}.md`} target="_blank" rel="noopener noreferrer">Edit this page on GitHub <ArrowUpRight size={14} /></a></footer></> : <div class="markdown"><h1>Page not found</h1><p>This wiki article does not exist yet.</p><a href={`#/wiki/${DEFAULT_ARTICLE}`}>Read Getting Started</a></div>}
                    </article>
                </main>
            </div>
            <Footer />
        </>
    );
}
