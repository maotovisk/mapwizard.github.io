import { useEffect, useState } from 'preact/hooks';
import { Volume2, FileText, Palette, Sparkles } from 'lucide-preact';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export default function Features() {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index') || '-1');
                    if (index !== -1 && !visibleCards.includes(index)) {
                        setVisibleCards(prev => [...prev, index]);
                    }
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.feature-card-item');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            title: 'Hitsound Copier',
            description: 'Copy hitsounds from one map to another with ease. Save time by transferring your carefully crafted hitsound setups across multiple difficulties.',
            image: '/img/screenshot2.png',
            icon: Volume2,
            badge: null,
            badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
            offset: 0,
        },
        {
            title: 'Metadata Manager',
            description: 'Quickly edit and standardize map metadata across multiple difficulties. Keep your beatmapset information consistent and professional.',
            image: '/img/screenshot3.png',
            icon: FileText,
            badge: null,
            badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
            offset: 80,
        },
        {
            title: 'Combo Colour Studio',
            description: 'Craft the perfect combo colours for your maps. Generate harmonious color schemes from background images or create custom palettes.',
            image: '/img/screenshot4.png',
            icon: Palette,
            badge: 'NEW',
            badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            offset: 40,
        },
    ];

    return (
        <section
            id="features"
            className="relative py-24 lg:py-32 scroll-mt-20 overflow-hidden"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700"
                style={{
                    background:
                        'radial-gradient(600px circle at 50% 50%, rgba(95, 102, 144, 0.28), transparent 60%)',
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-wizard-purple-light" />
                        <span className="text-wizard-purple-light text-sm font-medium uppercase tracking-wider">
                            Powerful Tools
                        </span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                        Features
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Everything you need to streamline your osu! mapping workflow,
                        from hitsound management to metadata editing.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isVisible = visibleCards.includes(index);

                        return (
                            <div
                                key={feature.title}
                                data-index={index}
                                className={cn(
                                    "feature-card-item group relative transition-all duration-700 transform",
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                                )}
                                style={{
                                    transitionDelay: `${index * 150}ms`,
                                    // Simple offset mimicry for desktop
                                    marginTop: index === 1 ? '4rem' : index === 2 ? '2rem' : '0'
                                }}
                            >
                                <div className="relative h-full rounded-2xl overflow-hidden bg-wizard-darker border border-white/5 transition-all duration-500 hover:border-wizard-purple/50 hover:shadow-glow">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-wizard-darker via-transparent to-transparent" />

                                        {/* Badge */}
                                        {feature.badge && (
                                            <Badge
                                                className={cn("absolute top-4 right-4 border animate-pulse", feature.badgeColor)}
                                            >
                                                {feature.badge}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-wizard-purple/20 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-wizard-purple-light" />
                                            </div>
                                            <h3 className="font-heading font-semibold text-xl text-white">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-br from-wizard-purple/10 via-transparent to-wizard-purple-light/10" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
