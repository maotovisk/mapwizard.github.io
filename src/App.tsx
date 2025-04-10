import { useState, useEffect } from 'preact/hooks';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import Features from './components/Features';
import About from './components/About';
import Download from './components/Download';
import Footer from './components/Footer';
import { ReleaseData } from './types';
import Button from './components/ui/Button';
import { DownloadIcon } from './components/ui/Icons';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

export default function App() {
    const [darkMode, setDarkMode] = useState(true);
    const [release, setRelease] = useState<ReleaseData | null>(null);
    const [os, setOs] = useState('unknown');

    useEffect(() => {
        // Set OS based on user agent
        setOs(navigator.userAgent);

        // Fetch latest release
        fetch('https://api.github.com/repos/maotovisk/mapwizard/releases/latest')
            .then(res => res.json())
            .then(data => {
                setRelease(data);
            });
    }, []);

    const handleDarkModeToggle = () => {
        console.log('Dark mode toggled');
        setDarkMode(darkMode => !darkMode);
        localStorage.theme = darkMode ? 'light' : 'dark';
    };

    useEffect(() => {
        if (localStorage.theme === null)
            localStorage.theme = darkMode ? 'dark' : 'light';
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    }, [darkMode]);

    const images = ['./img/screenshot1.png', './img/screenshot2.png', './img/screenshot3.png'];

    return (
        <LanguageProvider>
            <AppContent
                darkMode={darkMode}
                toggleDarkMode={handleDarkModeToggle}
                release={release}
                os={os}
                images={images}
            />
        </LanguageProvider>
    );
}

function AppContent({ darkMode, toggleDarkMode, release, os, images }: any) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100">
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <main className="max-w-6xl px-4 mx-auto mt-10">
                <section className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold">{t('start.title')}</h2>
                    <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                        {t('start.description')}
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button href="#download">
                            <DownloadIcon />
                            <span>{t('start.gettingStarted')}</span>
                        </Button>
                    </div>
                </section>

                <ImageSlider images={images} />
                <Features />
                <About />
                <Download release={release} os={os} />
            </main>

            <Footer />
        </div>
    );
}
