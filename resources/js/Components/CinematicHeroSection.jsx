import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticText } from './MagneticText';
import { MagneticButton } from './MagneticButton';

export function CinematicHeroSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(1);

  // Detect when section is visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle scroll zoom effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, 1 - rect.top / window.innerHeight);

      // Zoom from 1 to 1.3 based on scroll
      setScale(1 + scrollProgress * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainText = "Basés à Douala, opérationnels dans toute la CEMAC";
  const letters = mainText.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

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
        {/* Main Heading - Letter by letter reveal */}
        <motion.div
          className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{ display: 'inline-block', whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
            >
              {letter === ' ' ? ' ' : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Avec nos bureaux stratégiquement situés à Douala et nos opérations couvrant l'ensemble
          de la région CEMAC, nous sommes prêts à servir vos opérations aériennes.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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
