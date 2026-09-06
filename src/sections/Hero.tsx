import { useEffect, useRef, useState } from 'preact/hooks';
import { Download, BookOpen } from 'lucide-preact';
import { detectOS } from '@/lib/release';
import { scrollToHash } from '@/lib/scroll';

export default function Hero() {
    const [os, setOs] = useState<'Windows' | 'macOS' | 'Linux'>('Windows');
    const stageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOs(detectOS());
    }, []);

    /* pointer parallax on the mock stage — lerped toward the pointer so it
       glides instead of snapping. fine pointers + motion allowed only. */
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const fine = window.matchMedia('(pointer: fine)').matches;
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || still) return;

        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;
        let raf = 0;
        const loop = () => {
            cx += (tx - cx) * 0.08;
            cy += (ty - cy) * 0.08;
            if (Math.abs(tx - cx) < 0.0005 && Math.abs(ty - cy) < 0.0005) {
                cx = tx;
                cy = ty;
                raf = 0;
            } else {
                raf = requestAnimationFrame(loop);
            }
            stage.style.setProperty('--px', cx.toFixed(4));
            stage.style.setProperty('--py', cy.toFixed(4));
        };
        const kick = () => {
            if (!raf) raf = requestAnimationFrame(loop);
        };
        const onMove = (e: PointerEvent) => {
            const rect = stage.getBoundingClientRect();
            tx = ((e.clientX - rect.left) / rect.width - 0.5) * -2;
            ty = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
            kick();
        };
        const onLeave = () => {
            tx = 0;
            ty = 0;
            kick();
        };
        stage.addEventListener('pointermove', onMove);
        stage.addEventListener('pointerleave', onLeave);
        return () => {
            cancelAnimationFrame(raf);
            stage.removeEventListener('pointermove', onMove);
            stage.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return (
        <section class="hero" id="top">
            <div class="hero__grid">
                <div>
                    <h1 class="hero__title reveal" style="--i: 1">
                        Beatmap tools for osu!
                    </h1>

                    <p class="hero__lede reveal" style="--i: 2">
                        Copy hitsounds between difficulties, edit metadata across a beatmap
                        set, configure combo colours and resnap hit objects.
                        Available for Windows, macOS and Linux.
                    </p>

                    <div class="hero__actions reveal" style="--i: 3">
                        <a
                            class="btn btn--primary"
                            href="#download"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToHash('#download', { offset: 76, updateHash: true });
                            }}
                        >
                            <Download size={16} strokeWidth={2} aria-hidden="true" />
                            Download for {os}
                        </a>
                        <a
                            class="link-cta"
                            href="#/wiki/Getting_started/en"
                        >
                            Getting started
                            <BookOpen size={15} strokeWidth={2} aria-hidden="true" />
                        </a>
                    </div>

                    <p class="hero__facts reveal" style="--i: 4">
                        <span>Made with<b>.NET 10</b> + Avalonia</span>
                        <span><b>MIT</b> license</span>
                    </p>
                </div>

                <div class="hero__stage reveal" style="--i: 2" ref={stageRef}>
                    <figure class="frame hero__mock--back" aria-hidden="true">
                        <img
                            src="/img/screenshots/hscopier.png"
                            width={1280}
                            height={748}
                            alt=""
                            loading="lazy"
                        />
                    </figure>
                    <figure class="frame hero__mock">
                        <img
                            src="/img/screenshots/start.png"
                            width={1280}
                            height={748}
                            alt="The MapWizard start screen: three tool cards — Hitsound Copier, Metadata Manager and Combo Colour Studio — beside the tool rail."
                            fetchpriority="high"
                        />
                    </figure>
                </div>
            </div>
        </section>
    );
}
