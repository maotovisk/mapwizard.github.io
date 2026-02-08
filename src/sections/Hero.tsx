import { useEffect, useState } from 'preact/hooks';
import { Button } from '@/components/ui/Button';
import { ArrowDown, Download, Sparkles } from 'lucide-preact';
import { cn } from '@/lib/utils';
import { scrollToHash } from '@/lib/scroll';

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const scrollToFeatures = () => {
        scrollToHash('#features', { offset: 80, updateHash: true });
    };

    const scrollToDownload = () => {
        scrollToHash('#download', { offset: 80, updateHash: true });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 perspective-1000">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left z-10">
                        {/* Badge */}
                        <div
                            className={cn(
                                "inline-flex items-center gap-2 mb-6 transition-all duration-700 transform",
                                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            <span className="px-3 py-1 rounded-full bg-wizard-purple/20 border border-wizard-purple/40 text-wizard-purple-light text-sm font-medium flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Now available for Windows, macOS & Linux
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 overflow-hidden">
                            <span
                                className={cn(
                                    "block transition-all duration-1000 delay-100 transform",
                                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                                )}
                            >
                                Powerful tools for
                            </span>
                            <span
                                className={cn(
                                    "block text-gradient transition-all duration-1000 delay-200 transform",
                                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                                )}
                            >
                                osu! mappers
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p
                            className={cn(
                                "text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 transition-all duration-1000 delay-300 transform",
                                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                            )}
                        >
                            MapWizard provides utilities like Hitsound Copier, Combo Colour Studio,
                            Metadata Manager, and more to streamline your osu! mapping workflow.
                        </p>

                        {/* Buttons */}
                        <div
                            className={cn(
                                "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 transform",
                                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
                            )}
                        >
                            <Button
                                size="lg"
                                className="bg-wizard-purple hover:bg-wizard-purple-accent text-white px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-glow group magnetic-button"
                                onClick={scrollToDownload}
                            >
                                <Download className="w-5 h-5 mr-2 transition-transform duration-300 ease-out group-hover:translate-y-[-2px] group-hover:scale-110" />
                                Download Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-6 text-lg font-medium transition-all duration-300"
                                onClick={scrollToFeatures}
                            >
                                Explore Features
                                <ArrowDown className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* App Image */}
                    <div
                        className={cn(
                            "relative lg:pl-8 transition-all duration-1000 delay-300 perspective-1000",
                            isLoaded ? "opacity-100 translate-x-0 rotate-y-0" : "opacity-0 translate-x-20 rotate-y-12"
                        )}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group animate-float">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-wizard-purple to-wizard-purple-light rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                            {/* Image */}
                            <img
                                src="/img/screenshot1.png"
                                alt="MapWizard Application"
                                className="relative w-full rounded-2xl"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-wizard-dark/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-wizard-purple/20 rounded-full blur-xl animate-pulse" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-wizard-purple-light/20 rounded-full blur-2xl animate-pulse delay-500" />
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-wizard-dark to-transparent" />
        </section>
    );
}
