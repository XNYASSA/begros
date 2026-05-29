import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

const slides = [
    {
        image: '/images/hero1.jpeg',
        title: 'Votre partenaire de confiance',
        subtitle: 'pour l\'assistance au Cameroun et en Afrique Centrale',
    },
    {
        image: '/images/hero2.jpeg',
        title: 'Excellence opérationnelle',
        subtitle: 'Service de classe mondiale en Afrique',
    },
    {
        image: '/images/avion-jet.jpg',
        title: 'Fiabilité garantie',
        subtitle: 'Support 24/7 pour vos opérations aériennes',
    },
];

const SLIDE_DURATION = 4000; // 4 secondes par slide
const TRANSITION_DURATION = 0.4; // Durée de transition réduite

function ProgressBar({ duration }) {
    return (
        <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-begros-orange to-begros-lightblue"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: duration / 1000, ease: 'linear' }}
        />
    );
}

function AnimatedText({ text, delay }) {
    const words = text.split(' ');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: delay + index * 0.08,
                        duration: 0.6,
                        ease: 'easeOut',
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}

export default function PremiumHeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        if (!autoplay) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => clearInterval(timer);
    }, [autoplay]);

    const slideVariants = {
        enter: (dir) => ({
            opacity: 0,
            scale: 1.05,
        }),
        center: {
            opacity: 1,
            scale: 1,
        },
        exit: (dir) => ({
            opacity: 0,
            scale: 0.95,
        }),
    };

    const imageVariants = {
        enter: {
            opacity: 0,
            scale: 1.1,
        },
        center: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: SLIDE_DURATION / 1000 - 0.3,
                ease: 'easeInOut',
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: TRANSITION_DURATION,
                ease: 'easeInOut',
            },
        },
    };

    const overlayVariants = {
        enter: { opacity: 0 },
        center: {
            opacity: 1,
            transition: {
                duration: TRANSITION_DURATION,
                ease: 'easeInOut',
            },
        },
        exit: { opacity: 0 },
    };

    const contentVariants = {
        enter: { opacity: 0, y: 30 },
        center: {
            opacity: 1,
            y: 0,
            transition: {
                duration: TRANSITION_DURATION + 0.1,
                ease: 'easeOut',
                staggerChildren: 0.08,
            },
        },
        exit: {
            opacity: 0,
            y: -30,
            transition: { duration: TRANSITION_DURATION },
        },
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white">
            {/* Preload images */}
            {slides.map((slide) => (
                <link key={slide.image} rel="preload" as="image" href={slide.image} />
            ))}

            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: TRANSITION_DURATION,
                        ease: 'easeInOut',
                    }}
                    className="absolute inset-0"
                    onMouseEnter={() => setAutoplay(false)}
                    onMouseLeave={() => setAutoplay(true)}
                >
                    {/* Image avec Ken Burns Effect */}
                    <motion.div
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${slides[currentSlide].image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Overlay gradient */}
                    <motion.div
                        variants={overlayVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"
                    />

                    {/* Content */}
                    <motion.div
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8">
                            {/* Title */}
                            <div className="mb-6">
                                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
                                    <AnimatedText text={slides[currentSlide].title} delay={0.1} />
                                </h1>
                            </div>

                            {/* Subtitle */}
                            <div className="mb-8">
                                <p className="text-lg md:text-2xl text-begros-lightblue font-light">
                                    <AnimatedText text={slides[currentSlide].subtitle} delay={0.4} />
                                </p>
                            </div>

                            {/* Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            >
                                <MagneticButton distance={0.5}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-begros-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition duration-300 text-lg shadow-lg hover:shadow-xl"
                                    >
                                        Commencer
                                    </motion.button>
                                </MagneticButton>
                                <MagneticButton distance={0.5}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="border-2 border-white hover:bg-white hover:text-begros-darkblue text-white px-8 py-4 rounded-full font-semibold transition duration-300 backdrop-blur-sm"
                                    >
                                        En savoir plus
                                    </motion.button>
                                </MagneticButton>
                            </motion.div>
                        </div>
                    </motion.div>

                </motion.div>
            </AnimatePresence>

            {/* Indicators (Dots) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3"
            >
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentSlide ? 1 : -1);
                            setCurrentSlide(index);
                            setAutoplay(false);
                            setTimeout(() => setAutoplay(true), SLIDE_DURATION);
                        }}
                        className={`rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-begros-orange w-8 h-3'
                                : 'bg-white/40 hover:bg-white/60 w-3 h-3'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </motion.div>

            {/* Navigation Arrows */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => {
                    setDirection(-1);
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
                    setAutoplay(false);
                    setTimeout(() => setAutoplay(true), SLIDE_DURATION);
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Slide précédent"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </motion.button>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => {
                    setDirection(1);
                    setCurrentSlide((prev) => (prev + 1) % slides.length);
                    setAutoplay(false);
                    setTimeout(() => setAutoplay(true), SLIDE_DURATION);
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Slide suivant"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </motion.button>

        </div>
    );
}
