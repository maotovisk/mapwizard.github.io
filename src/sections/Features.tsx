import { useEffect, useRef, useState } from 'preact/hooks';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-preact';

type Shot = { src: string; alt: string; caption: string };

const SHOTS: Shot[] = [
    { src: '/img/screenshots/hscopier.png', alt: 'Hitsound Copier with an origin beatmap selected, destination difficulties and a list of copy options with toggles.', caption: 'hitsound copier — origin → destination' },
    { src: '/img/screenshots/mappicker.png', alt: 'The Map Picker modal: a search field with beatmap rows showing cover art, mapper names and difficulty counts.', caption: 'map picker — shared library browser' },
    { src: '/img/screenshots/metadata.png', alt: 'Metadata Manager showing editable title and artist fields next to general settings like preview time and audio file.', caption: 'metadata manager · beatmap set metadata' },
    { src: '/img/screenshots/visualizer.png', alt: 'Hitsound Visualizer timeline showing sample changes across hitnormal, hitwhistle, hitfinish and hitclap layers with playback controls.', caption: 'hitsound visualizer — every layer, on the timeline' },
    { src: '/img/screenshots/colours.png', alt: 'Combo Colour Studio listing six combo colours with hex pickers, saved project state and apply/export actions.', caption: 'combo colour studio — project saved' },
    { src: '/img/screenshots/cleaner.png', alt: 'Map Cleaner with beat snap presets 1/8 and 1/2 and action toggles for resnapping, mute removal and unused greenlines.', caption: 'map cleaner · timing and greenline options' },
];

function Frame({
    shot,
    index,
    onExpand,
    right,
}: {
    shot: Shot;
    index: number;
    onExpand: (index: number) => void;
    right?: string;
}) {
    return (
        <figure class="frame frame--zoom">
            <img src={shot.src} width={1280} height={748} alt={shot.alt} loading="lazy" onClick={() => onExpand(index)} />
            <button
                type="button"
                class="frame__expand"
                onClick={() => onExpand(index)}
                aria-label={`Enlarge screenshot: ${shot.caption}`}
            >
                <Expand size={14} strokeWidth={2} aria-hidden="true" />
            </button>
            <figcaption>
                <span>{shot.caption}</span>
                {right && <span>{right}</span>}
            </figcaption>
        </figure>
    );
}

function Lightbox({
    index,
    onClose,
    onGo,
}: {
    index: number;
    onClose: () => void;
    onGo: (index: number) => void;
}) {
    const shot = SHOTS[index];
    const panelRef = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);
    const timerRef = useRef(0);

    /* mount hidden, fade in on the next frames; fade out before unmount */
    useEffect(() => {
        const raf = requestAnimationFrame(() =>
            requestAnimationFrame(() => setShown(true)),
        );
        panelRef.current?.focus();
        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(timerRef.current);
        };
    }, []);

    const close = () => {
        setShown(false);
        timerRef.current = window.setTimeout(onClose, 220);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowRight') onGo((index + 1) % SHOTS.length);
            else if (e.key === 'ArrowLeft') onGo((index - 1 + SHOTS.length) % SHOTS.length);
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [index]);

    return (
        <div class={`lightbox ${shown ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label={`Enlarged screenshot: ${shot.caption}`}>
            <div class="lightbox__backdrop" onClick={close} />
            <div class="lightbox__panel" ref={panelRef} tabIndex={-1}>
                <img key={shot.src} class="lightbox__img" src={shot.src} alt={shot.alt} />
                <div class="lightbox__bar">
                    <span class="lightbox__cap">{shot.caption}</span>
                    <span class="lightbox__count" aria-hidden="true">{index + 1} / {SHOTS.length}</span>
                    <span class="lightbox__btns">
                        <button type="button" class="lightbox__btn" onClick={() => onGo((index - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous screenshot">
                            <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                        <button type="button" class="lightbox__btn" onClick={() => onGo((index + 1) % SHOTS.length)} aria-label="Next screenshot">
                            <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                        <button type="button" class="lightbox__btn" onClick={close} aria-label="Close preview">
                            <X size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * Workbench tour — each tool is one screenshot block. Layout rhythm alternates
 * 5/7 ⇄ 7/5 with directional reveals.
 */
export default function Features() {
    const [preview, setPreview] = useState<number | null>(null);

    return (
        <section class="tour" id="screenshots">
            <div class="tour__head reveal">
                <div><span class="section-label">Application interface</span><h2>Tools and screenshots</h2></div>
                <p>Five beatmap tools with a shared map picker.</p>
            </div>

            {/* 01 · Hitsound Copier */}
            <div class="tool" id="tool-hitsound-copier">
                <div class="tool__text reveal reveal--left">
                    <span class="tool__index">01</span>
                    <h3>Hitsound Copier</h3>
                    <p>
                        Copy samples, volumes and slider ticks from an origin
                        difficulty to destination difficulties with a configurable
                        timing tolerance.
                    </p>
                </div>
                <div class="tool__shot reveal reveal--right">
                    <Frame shot={SHOTS[0]} index={0} onExpand={setPreview} />
                </div>
            </div>

            {/* shared · Map Picker — not a tool, the browser inside every tool */}
            <div class="tool tool--flip tool--picker" id="feature-map-picker">
                <div class="tool__text reveal reveal--right">
                    <span class="tool__eyebrow">Shared · in every tool</span>
                    <h3>Map picker</h3>
                    <p>
                        Browse the Songs folder, search beatmap sets and select
                        difficulties. Open a local folder manually when needed.
                    </p>
                </div>
                <div class="tool__shot reveal reveal--left">
                    <Frame shot={SHOTS[1]} index={1} onExpand={setPreview} right="modal" />
                </div>
            </div>

            {/* 02 · Metadata Manager */}
            <div class="tool" id="tool-metadata-manager">
                <div class="tool__text reveal reveal--left">
                    <span class="tool__index">02</span>
                    <h3>Metadata Manager</h3>
                    <p>
                        Edit title, artist, creator, preview time and media settings
                        across selected difficulties.
                    </p>
                </div>
                <div class="tool__shot reveal reveal--right">
                    <Frame shot={SHOTS[2]} index={2} onExpand={setPreview} />
                </div>
            </div>

            {/* 03 · Hitsound Visualizer — flipped */}
            <div class="tool tool--flip" id="tool-hitsound-visualizer">
                <div class="tool__text reveal reveal--right">
                    <span class="tool__index">03</span>
                    <h3>Hitsound Visualizer</h3>
                    <p>
                        Inspect normal, whistle, finish and clap layers on a timeline
                        with sample bank selection and audio playback.
                    </p>
                </div>
                <div class="tool__shot reveal reveal--left">
                    <Frame shot={SHOTS[3]} index={3} onExpand={setPreview} right="6:12.767" />
                </div>
            </div>

            {/* 04 · Combo Colour Studio */}
            <div class="tool" id="tool-combo-colour-studio">
                <div class="tool__text reveal reveal--left">
                    <span class="tool__index">04</span>
                    <h3>Combo Colour Studio</h3>
                    <p>
                        Configure and reorder combo colours, apply palettes to
                        difficulties and save reusable project files.
                    </p>
                    <div class="swatches" aria-hidden="true">
                        <span style="background: var(--combo-1)" />
                        <span style="background: var(--combo-2)" />
                        <span style="background: var(--combo-3)" />
                        <span style="background: var(--combo-4)" />
                        <span style="background: var(--combo-5)" />
                        <span style="background: var(--combo-6)" />
                    </div>
                </div>
                <div class="tool__shot reveal reveal--right">
                    <Frame shot={SHOTS[4]} index={4} onExpand={setPreview} right="#c05457 → #7f3468" />
                </div>
            </div>

            {/* 05 · Map Cleaner — flipped */}
            <div class="tool tool--flip" id="tool-map-cleaner">
                <div class="tool__text reveal reveal--right">
                    <span class="tool__index">05</span>
                    <h3>Map Cleaner</h3>
                    <p>
                        Resnap hit objects and timing points to selected divisors,
                        remove muting sections and delete unused greenlines.
                    </p>
                </div>
                <div class="tool__shot reveal reveal--left">
                    <Frame shot={SHOTS[5]} index={5} onExpand={setPreview} />
                </div>
            </div>
            {preview !== null && (
                <Lightbox index={preview} onClose={() => setPreview(null)} onGo={setPreview} />
            )}
        </section>
    );
}
