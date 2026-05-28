import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/images/hero1.jpeg',
            title: 'Votre partenaire de confiance pour l\'assistance au sol',
            subtitle: 'Cameroun & Afrique Centrale',
        },
        {
            image: '/images/hero2.jpeg',
            title: 'Votre partenaire de confiance pour l\'assistance au sol',
            subtitle: 'Cameroun & Afrique Centrale',
        },
        {
            image: '/images/avion-jet.jpg',
            title: 'Votre partenaire de confiance pour l\'assistance au sol',
            subtitle: 'Cameroun & Afrique Centrale',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 29, 77, 0.5), rgba(0, 29, 77, 0.5)), url("${slide.image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-3xl px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {slides[currentSlide].title}
                </h1>
                <p className="text-xl md:text-2xl text-begros-lightblue font-semibold mb-8">
                    {slides[currentSlide].subtitle}
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <button className="bg-begros-orange hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300 text-lg">
                        Commencer
                    </button>
                    <button className="border-2 border-white hover:bg-white hover:text-begros-darkblue text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                        En savoir plus
                    </button>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition duration-300"
                aria-label="Slide précédent"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition duration-300"
                aria-label="Slide suivant"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full transition duration-300 ${
                            index === currentSlide
                                ? 'bg-begros-orange w-8'
                                : 'bg-white/50 hover:bg-white w-3'
                        }`}
                        aria-label={`Aller au slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
