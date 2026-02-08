import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import About from '@/sections/About';
import Download from '@/sections/Download';
import Footer from '@/sections/Footer';

export default function App() {
    return (
        <div className="relative min-h-screen bg-wizard-dark text-foreground font-body selection:bg-wizard-purple/30 selection:text-white">
            {/* Background gradient mesh */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-wizard-purple/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-wizard-purple-light/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-wizard-purple-accent/5 rounded-full blur-[200px]" />
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="relative z-10">
                <Hero />
                <Features />
                <About />
                <Download />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
