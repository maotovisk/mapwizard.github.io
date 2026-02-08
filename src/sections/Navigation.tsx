import { useState, useEffect } from 'preact/hooks';
import { Menu, X, Github } from 'lucide-preact';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { scrollToHash } from '@/lib/scroll';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (event: MouseEvent, href: string) => {
        event.preventDefault();
        if (!scrollToHash(href, { offset: 80, updateHash: true })) return;
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
        { label: 'Download', href: '#download' },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "bg-wizard-dark/80 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <img src="/img/app-icon.png" alt="mw! logo" className="w-10 h-10" />
                        <span className="font-heading font-bold text-xl text-white">MapWizard</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/70 hover:text-white transition-colors duration-300 relative group"
                                onClick={(event) => scrollToSection(event, link.href)}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wizard-purple-light transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                            onClick={() => window.open('https://github.com/maotovisk/MapWizard', '_blank')}
                        >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu - Custom implementation without Radix */}
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="py-4 border-t border-white/10 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-left text-white/70 hover:text-white transition-colors duration-300 py-2 block"
                                onClick={(event) => scrollToSection(event, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10 w-full mt-2"
                            onClick={() => window.open('https://github.com/maotovisk/MapWizard', '_blank')}
                        >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
