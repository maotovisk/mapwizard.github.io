import { useEffect, useRef, useState } from 'preact/hooks';
import { Monitor, Code2, Heart, Zap, Globe } from 'lucide-preact';
import { cn } from '@/lib/utils';

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const rafRef = useRef<number | null>(null);
    const currentPosRef = useRef({ x: 50, y: 50 });
    const targetPosRef = useRef({ x: 50, y: 50 });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.2 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const setPosition = (x: number, y: number) => {
            section.style.setProperty('--about-gradient-x', `${x}%`);
            section.style.setProperty('--about-gradient-y', `${y}%`);
            section.style.setProperty('--about-gradient-tilt', `${((x - 50) + (y - 50)) * 0.08}deg`);
        };

        const animateToTarget = () => {
            const current = currentPosRef.current;
            const target = targetPosRef.current;

            current.x += (target.x - current.x) * 0.14;
            current.y += (target.y - current.y) * 0.14;
            setPosition(current.x, current.y);

            const settled =
                Math.abs(target.x - current.x) < 0.05 &&
                Math.abs(target.y - current.y) < 0.05;

            if (settled) {
                currentPosRef.current = { ...target };
                setPosition(target.x, target.y);
                rafRef.current = null;
                return;
            }

            rafRef.current = requestAnimationFrame(animateToTarget);
        };

        const beginAnimation = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(animateToTarget);
            }
        };

        setPosition(50, 50);

        const handleMove = (clientX: number, clientY: number) => {
            const rect = section.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width) * 100;
            const y = ((clientY - rect.top) / rect.height) * 100;
            const clampedX = Math.max(0, Math.min(100, x));
            const clampedY = Math.max(0, Math.min(100, y));
            targetPosRef.current = { x: clampedX, y: clampedY };
            beginAnimation();
        };

        const handlePointerMove = (event: PointerEvent) => {
            handleMove(event.clientX, event.clientY);
        };

        const handleMouseMove = (event: MouseEvent) => {
            handleMove(event.clientX, event.clientY);
        };

        const handleLeave = () => {
            targetPosRef.current = { x: 50, y: 50 };
            beginAnimation();
        };

        section.addEventListener('pointermove', handlePointerMove);
        section.addEventListener('mousemove', handleMouseMove);
        section.addEventListener('pointerleave', handleLeave);
        section.addEventListener('mouseleave', handleLeave);

        return () => {
            section.removeEventListener('pointermove', handlePointerMove);
            section.removeEventListener('mousemove', handleMouseMove);
            section.removeEventListener('pointerleave', handleLeave);
            section.removeEventListener('mouseleave', handleLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const stats = [
        { icon: Globe, label: 'Cross-Platform', value: 'Windows, macOS, Linux' },
        { icon: Code2, label: 'Open Source', value: 'MIT License' },
        { icon: Zap, label: 'Built With', value: '.NET 10 + Avalonia' },
        { icon: Heart, label: 'Community', value: 'Active Development' },
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 lg:py-32 overflow-hidden scroll-mt-20"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-100 transition-opacity duration-500"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(10, 10, 15, 0.82) 0%, rgba(18, 18, 26, 0.9) 48%, rgba(10, 10, 15, 0.86) 100%), radial-gradient(36rem circle at var(--about-gradient-x, 50%) var(--about-gradient-y, 50%), rgba(95, 102, 144, 0.56) 0%, rgba(95, 102, 144, 0.28) 32%, transparent 62%), radial-gradient(24rem circle at calc(var(--about-gradient-x, 50%) - 18%) calc(var(--about-gradient-y, 50%) + 10%), rgba(67, 67, 107, 0.34) 0%, rgba(67, 67, 107, 0.18) 40%, transparent 72%), linear-gradient(calc(150deg + var(--about-gradient-tilt, 0deg)), rgba(80, 83, 124, 0.16) 0%, transparent 54%)',
                    }}
                />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-wizard-purple/5 rounded-full blur-[150px] -translate-y-1/2" />
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-wizard-purple-light/5 rounded-full blur-[120px]" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-wizard-dark/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-wizard-dark/85 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className={cn("transition-all duration-1000 transform", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20")}>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Monitor className="w-5 h-5 text-wizard-purple-light" />
                            <span className="text-wizard-purple-light text-sm font-medium uppercase tracking-wider">
                                About the Project
                            </span>
                        </div>

                        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                            Built by mappers,
                            <br />
                            <span className="text-gradient">for mappers</span>
                        </h2>

                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            MapWizard is a cross-platform open-source project aimed at providing
                            osu! mappers with powerful tools to enhance their workflow. It was
                            developed initially as a necessity for mapping tools on Linux, but
                            quickly grew into a comprehensive toolkit for all platforms.
                        </p>

                        <p className="text-white/60 leading-relaxed mb-8">
                            Our goal is to make mapping easier and more efficient for everyone.
                            Whether you&apos;re copying hitsounds, standardizing metadata
                            in your mapset to make it consistent for the Ranked Section or just mapping for fun, MapWizard has you covered.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-white/60">
                                And even more to come!
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className={cn(
                                        "group relative transition-all duration-700 transform",
                                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                                    )}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className="relative p-6 rounded-2xl bg-wizard-darker border border-white/5 transition-all duration-500 hover:border-wizard-purple/30 hover:bg-wizard-purple/5">
                                        <div className="w-12 h-12 rounded-xl bg-wizard-purple/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-wizard-purple/30">
                                            <Icon className="w-6 h-6 text-wizard-purple-light" />
                                        </div>
                                        <h3 className="font-heading font-semibold text-white mb-1">
                                            {stat.label}
                                        </h3>
                                        <p className="text-white/60 text-sm">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
