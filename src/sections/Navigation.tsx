import { useEffect, useRef, useState } from 'preact/hooks';
import {
    Search, Github, Home, Images, Info, Download as DownloadIcon,
} from 'lucide-preact';
import { scrollToHash } from '@/lib/scroll';
import { useMorph, useScrollState } from '@/lib/reveal';

const SECTIONS = ['top', 'screenshots', 'about', 'download'];

const NAV_ITEMS = [
    { id: 'top', label: 'Start', icon: Home },
    { id: 'screenshots', label: 'Screenshots', icon: Images },
    { id: 'about', label: 'About', icon: Info },
    { id: 'download', label: 'Download', icon: DownloadIcon },
];

const GITHUB = 'https://github.com/maotovisk/MapWizard';

const IS_MAC =
    typeof navigator !== 'undefined' &&
    /mac/i.test(`${navigator.platform ?? ''} ${navigator.userAgent ?? ''}`);

type Command = { name: string; desc: string; run: () => void };

export default function Navigation() {
    const { active, scrolled } = useScrollState(SECTIONS);
    useMorph();

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const go = (id: string) => {
        setOpen(false);
        setTimeout(
            () => scrollToHash(`#${id}`, { offset: 84, updateHash: id !== 'top' }),
            40,
        );
    };

    const openPalette = () => {
        setQuery('');
        setActiveIdx(0);
        setOpen(true);
    };

    /* palette commands */
    const groups = [
        {
            group: 'Tools',
            items: [
                { name: 'Hitsound Copier', desc: 'Copy hitsounds between difficulties', run: () => go('tool-hitsound-copier') },
                { name: 'Metadata Manager', desc: 'One edit, every difficulty', run: () => go('tool-metadata-manager') },
                { name: 'Hitsound Visualizer', desc: 'See every layer on a timeline', run: () => go('tool-hitsound-visualizer') },
                { name: 'Combo Colour Studio', desc: 'Saveable combo palettes', run: () => go('tool-combo-colour-studio') },
                { name: 'Map Cleaner', desc: 'Resnap and strip greenlines', run: () => go('tool-map-cleaner') },
            ],
        },
        {
            group: 'Shared',
            items: [
                { name: 'Map picker', desc: 'Library browser inside every tool', run: () => go('feature-map-picker') },
            ],
        },
        {
            group: 'Navigate',
            items: [
                { name: 'Screenshots', desc: 'What the app looks like', run: () => go('screenshots') },
                { name: 'About', desc: 'Why this exists', run: () => go('about') },
                { name: 'Download', desc: 'Get the latest release', run: () => go('download') },
                {
                    name: 'GitHub repository',
                    desc: 'maotovisk/MapWizard',
                    run: () => window.open(GITHUB, '_blank'),
                },
            ],
        },
    ] as { group: string; items: Command[] }[];

    const filtered = groups
        .map((g) => ({
            ...g,
            items: g.items.filter(
                (item) =>
                    item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.desc.toLowerCase().includes(query.toLowerCase()),
            ),
        }))
        .filter((g) => g.items.length > 0);

    const flat = filtered.flatMap((g) => g.items);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 30);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                open ? setOpen(false) : openPalette();
                return;
            }
            if (!open) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                setOpen(false);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIdx((a) => Math.min(a + 1, flat.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIdx((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                flat[activeIdx]?.run();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, query, activeIdx, flat.length]);

    useEffect(() => {
        listRef.current
            ?.querySelector('.cmdk__item.is-active')
            ?.scrollIntoView({ block: 'nearest' });
    }, [activeIdx, query]);

    const itemProps = (id: string) => ({
        'data-section': id,
        onClick: (e: MouseEvent) => {
            e.preventDefault();
            go(id);
        },
    });
    const itemClass = (base: string, id: string) =>
        active === id ? `${base} is-active` : base;

    let itemIndex = -1;

    return (
        <>
            <a
                class="head-mobile-brand"
                href="#top"
                onClick={(e) => {
                    e.preventDefault();
                    go('top');
                }}
            >
                <img src="/img/app-icon.png" alt="" width={26} height={26} />
                <span>MapWizard</span>
            </a>
            {/* single nav — full bar at top, floating dock once you scroll */}
            <header class={`site-head ${scrolled ? 'is-scrolled' : ''}`}>
                <div class="site-head__inner">
                    <a
                        class="head-brand"
                        href="#top"
                        onClick={(e) => {
                            e.preventDefault();
                            go('top');
                        }}
                    >
                        <img src="/img/app-icon.png" alt="" width={26} height={26} />
                        <span class="head-brand__word">MapWizard</span>
                    </a>

                    <nav class="head-links" aria-label="Primary">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.id}
                                class={itemClass('head-link', item.id)}
                                href={`#${item.id}`}
                                aria-current={active === item.id ? 'true' : undefined}
                                {...itemProps(item.id)}
                            >
                                <item.icon size={15} strokeWidth={2} aria-hidden="true" />
                                <span class="head-link__label">{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    <div class="head-tools">
                        <button
                            type="button"
                            class="head-search"
                            onClick={openPalette}
                            aria-label={`Search (press ${IS_MAC ? 'Command K' : 'Control K'})`}
                        >
                            <Search size={14} strokeWidth={2} aria-hidden="true" />
                            <span>Search…</span>
                            <kbd aria-hidden="true">{IS_MAC ? '⌘K' : 'Ctrl + K'}</kbd>
                        </button>
                        <a
                            class="head-icon head-icon--github"
                            href={GITHUB}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="MapWizard on GitHub"
                        >
                            <Github size={16} strokeWidth={1.9} aria-hidden="true" />
                        </a>
                        <a
                            class="btn btn--primary btn--sm"
                            href="#download"
                            onClick={(e) => {
                                e.preventDefault();
                                go('download');
                            }}
                        >
                            <DownloadIcon size={14} strokeWidth={2} aria-hidden="true" />
                            <span class="head-cta__label">Download</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* ⌘K palette */}
            <div class={`cmdk ${open ? 'is-open' : ''}`} aria-hidden={!open}>
                <div class="cmdk__backdrop" onClick={() => setOpen(false)} />
                <div class="cmdk__panel" role="dialog" aria-modal="true" aria-label="Search MapWizard">
                    <div class="cmdk__field">
                        <Search size={15} strokeWidth={2} aria-hidden="true" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search tools and pages…"
                            value={query}
                            onInput={(e) => {
                                setQuery((e.target as HTMLInputElement).value);
                                setActiveIdx(0);
                            }}
                            aria-label="Search tools and pages"
                        />
                        <kbd aria-hidden="true">esc</kbd>
                    </div>
                    <div class="cmdk__results" ref={listRef}>
                        {filtered.length === 0 && (
                            <p class="cmdk__group">No results for “{query}”</p>
                        )}
                        {filtered.map((g) => (
                            <div key={g.group}>
                                <p class="cmdk__group">{g.group}</p>
                                {g.items.map((item) => {
                                    itemIndex += 1;
                                    const idx = itemIndex;
                                    return (
                                        <button
                                            type="button"
                                            key={item.name}
                                            class={`cmdk__item ${idx === activeIdx ? 'is-active' : ''}`}
                                            onClick={() => item.run()}
                                            onMouseEnter={() => setActiveIdx(idx)}
                                        >
                                            <span class="cmdk__item-name">{item.name}</span>
                                            <span class="cmdk__item-desc">{item.desc}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div class="cmdk__foot" aria-hidden="true">
                        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                        <span><kbd>↵</kbd> open</span>
                        <span><kbd>esc</kbd> close</span>
                    </div>
                </div>
            </div>
        </>
    );
}
