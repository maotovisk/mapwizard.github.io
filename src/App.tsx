import { useEffect, useLayoutEffect, useState } from 'preact/hooks';
import Wiki from './Wiki';
import { scrollToElement, scrollToTopInstant } from '@/lib/scroll';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import About from '@/sections/About';
import Download from '@/sections/Download';
import Footer from '@/sections/Footer';
import StickyCta from '@/sections/StickyCta';
import { useReveal } from '@/lib/reveal';

function Landing() {
    useReveal();

    return (
        <>
            <Navigation />
            <main class="page">
                <Hero />
                <Features />
                <About />
                <Download />
            </main>
            <Footer />
            <StickyCta />
        </>
    );
}

export default function App() {
    useLayoutEffect(() => {
        const previous = history.scrollRestoration;
        history.scrollRestoration = 'manual';
        return () => { history.scrollRestoration = previous; };
    }, []);
    const [route, setRoute] = useState(window.location.hash);
    useEffect(() => {
        const update = () => setRoute(window.location.hash);
        window.addEventListener('hashchange', update);
        window.addEventListener('popstate', update);
        return () => {
            window.removeEventListener('hashchange', update);
            window.removeEventListener('popstate', update);
        };
    }, []);
    const isWiki = route === '#/wiki' || route.startsWith('#/wiki/');
    useEffect(() => {
        if (isWiki) {
            scrollToTopInstant();
            return;
        }
        const frame = requestAnimationFrame(() => {
            const id = route.slice(1) || 'top';
            const element = document.getElementById(id);
            if (element) scrollToElement(element, { immediate: true });
        });
        return () => cancelAnimationFrame(frame);
    }, [route, isWiki]);
    return isWiki ? <Wiki route={route} /> : <Landing />;
}
