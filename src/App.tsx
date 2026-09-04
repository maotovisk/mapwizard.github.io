import { useEffect } from 'preact/hooks';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import ToolMarquee from '@/sections/ToolMarquee';
import Features from '@/sections/Features';
import About from '@/sections/About';
import Download from '@/sections/Download';
import Footer from '@/sections/Footer';
import StickyCta from '@/sections/StickyCta';
import { useReveal } from '@/lib/reveal';

export default function App() {
    useReveal();

    /* Share page progress with the navbar, rAF-throttled to avoid re-renders. */
    useEffect(() => {
        const root = document.documentElement;
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const max = root.scrollHeight - window.innerHeight;
                const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
                root.style.setProperty('--scroll-progress', progress.toFixed(4));
                ticking = false;
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <Navigation />
            <main class="page">
                <Hero />
                <ToolMarquee />
                <Features />
                <About />
                <Download />
            </main>
            <Footer />
            <StickyCta />
        </>
    );
}
