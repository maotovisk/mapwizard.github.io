import { useEffect, useState } from 'preact/hooks';
import { Download } from 'lucide-preact';
import { fetchRelease, detectOS } from '@/lib/release';
import { scrollToHash } from '@/lib/scroll';

/**
 * Sticky bottom CTA — appears once the tour has scrolled past
 * #tool-metadata-manager, slides away when #download comes into
 * view. rAF-throttled passive scroll check.
 */
export default function StickyCta() {
    const [shown, setShown] = useState(false);
    const [os, setOs] = useState<'Windows' | 'macOS' | 'Linux'>('Windows');
    const [version, setVersion] = useState<string>('latest');

    useEffect(() => {
        setOs(detectOS());
        fetchRelease().then((r) => {
            if (!r.error) setVersion(r.version);
        });

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const anchor = document.getElementById('tool-metadata-manager');
                const download = document.getElementById('download');
                if (!anchor || !download) {
                    ticking = false;
                    return;
                }
                const pastTour = anchor.getBoundingClientRect().bottom < 120;
                const atDownload =
                    download.getBoundingClientRect().top < window.innerHeight;
                setShown(pastTour && !atDownload);
                ticking = false;
            });
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <aside class={`cta-sticky ${shown ? 'is-shown' : ''}`} aria-hidden={!shown}>
            <span class="cta-sticky__label">
                MapWizard for {os}
                <span class="cta-sticky__sub">{version} · free</span>
            </span>
            <a
                class="btn btn--primary btn--sm"
                href="#download"
                tabIndex={shown ? 0 : -1}
                onClick={(e) => {
                    e.preventDefault();
                    scrollToHash('#download', { offset: 76, updateHash: true });
                }}
            >
                <Download size={14} strokeWidth={2} aria-hidden="true" />
                Download
            </a>
        </aside>
    );
}
