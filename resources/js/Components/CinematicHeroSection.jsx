import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

export function CinematicHeroSection() {
  const sectionRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress based on section position in viewport
      // Progress goes from 0 (section below viewport) to 1 (section fully scrolled past)
      const progress = Math.max(0, Math.min(1, 1 - (sectionTop + sectionHeight / 2) / windowHeight));

      setScrollProgress(progress);

      // Zoom effect: 1 to 1.3
      setScale(1 + progress * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainText = "Basés à Douala, opérationnels dans toute la CEMAC";
  const letters = mainText.split('');

  // Calculate letter opacity based on scroll progress
  const getLetterOpacity = (index) => {
    const letterDuration = 1 / (letters.length * 1.5);
    const letterStart = index * letterDuration;
    const letterEnd = letterStart + letterDuration;

    if (scrollProgress < letterStart) return 0;
    if (scrollProgress > letterEnd) return 1;

    // Slower disappearance: use different curve for decreasing progress
    const normalizedProgress = (scrollProgress - letterStart) / (letterEnd - letterStart);
    return Math.pow(normalizedProgress, 0.6); // Power curve makes disappearance slower
  };

  // Subtitle and button appear after 50% of text reveal
  const contentOpacity = Math.max(0, (scrollProgress - 0.5) * 2);

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Zoom */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/aeroport.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: scale,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-begros-darkblue/70 to-black/60" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Main Heading - Scroll-driven letter by letter reveal */}
        <div className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              style={{
                display: 'inline-block',
                whiteSpace: letter === ' ' ? 'pre' : 'normal',
                opacity: getLetterOpacity(i),
                transform: `translateY(${(1 - getLetterOpacity(i)) * 10}px)`,
              }}
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${(1 - contentOpacity) * 20}px)`,
          }}
        >
          Avec nos bureaux stratégiquement situés à Douala et nos opérations couvrant l'ensemble
          de la région CEMAC, nous sommes prêts à servir vos opérations aériennes.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          style={{
            opacity: contentOpacity,
            transform: `translateY(${(1 - contentOpacity) * 20}px)`,
          }}
        >
          <MagneticButton distance={0.5}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 107, 0, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-begros-orange hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition duration-300 shadow-lg"
            >
              Explorer nos régions
            </motion.button>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none shadow-inner" style={{
        boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.3)',
      }} />
    </motion.section>
  );
}
