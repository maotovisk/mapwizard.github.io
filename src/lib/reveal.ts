import { useEffect, useState } from 'preact/hooks';

/**
 * One-shot scroll reveal. Adds `.is-in` to every `.reveal` element when it
 * enters the viewport. Never re-fires. With reduced motion, CSS renders
 * everything visible immediately — this hook is a no-op there.
 */
export function useReveal() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document
                .querySelectorAll<HTMLElement>('.reveal')
                .forEach((el) => el.classList.add('is-in'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        observer.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
        );

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

/**
 * Scroll-linked morph progress 0 → 1. Writes `--morph` on <html> directly
 * (no re-render): 0 = topbar, 1 = fully docked. Binary when the user
 * prefers reduced motion, so the header snaps instead of gliding.
 */
export function useMorph() {
    useEffect(() => {
        const root = document.documentElement;
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;
        let current = 0;
        let target = 0;
        const range = () => window.innerHeight * 0.7;
        const animate = () => {
            current += (target - current) * 0.13;
            if (Math.abs(target - current) < 0.0008) current = target;
            root.style.setProperty('--morph', (still ? Math.round(target) : current).toFixed(4));
            if (current !== target) frame = requestAnimationFrame(animate);
            else frame = 0;
        };
        const update = () => {
            const distance = range();
            target = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 1;
            if (!frame) frame = requestAnimationFrame(animate);
        };
        const onScroll = () => update();
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);
}

/**
 * Tracks the active section among the given ids and reports scroll state.
 * `scrolled` → header frost.
 */
export function useScrollState(ids: string[]) {
    const [active, setActive] = useState<string>(ids[0] ?? 'top');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id || 'top');
                }
            },
            { rootMargin: '-35% 0px -55% 0px' },
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, []);

    return { active, scrolled };
}
