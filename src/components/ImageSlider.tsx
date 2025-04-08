import { useState, useEffect } from 'preact/hooks';
import { ImageSliderProps } from '../types';
import Button from './ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from './ui/Icons';

export default function ImageSlider({ images }: ImageSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % images.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentSlide, isPaused]);

    return (
        <section
            className="mb-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/30 dark:border-gray-500/20 backdrop-blur aspect-[1440/756] w-full">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Screenshot ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
                <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                    <Button
                        onClick={prevSlide}
                        className="!bg-black/40 !text-white hover:!bg-black/60 !px-2 !py-1 !rounded-full"
                        variant="secondary"
                    >
                        <ChevronLeftIcon />
                    </Button>
                    <Button
                        onClick={nextSlide}
                        className="!bg-black/40 !text-white hover:!bg-black/60 !px-2 !py-1 !rounded-full"
                        variant="secondary"
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </section>
    );
}
