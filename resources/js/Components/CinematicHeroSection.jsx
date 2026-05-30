import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from './AnimatedText';
import { MagneticButton } from './MagneticButton';

export function CinematicHeroSection() {
  const containerRef = useRef(null);
  const [textComplete, setTextComplete] = useState(false);

  const { scrollY } = useScroll();

  // Cinematic zoom effect - subtle and smooth
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);

  // Pan effect - subtle horizontal movement
  const panX = useTransform(scrollY, [0, 600], [0, 20]);
  const panY = useTransform(scrollY, [0, 600], [0, 10]);

  // Overlay opacity effect
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.75, 0.85]);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Cinematic Pan & Zoom */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/aeroport.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: scale,
          x: panX,
          y: panY,
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-begros-darkblue/70 to-black/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Main Heading - Animated Letter by Letter */}
        <div className="mb-8">
          <AnimatedText
            text="Basés à Douala, opérationnels dans toute la CEMAC"
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            staggerDelay={0.02}
            triggerInView={false}
            onComplete={() => setTextComplete(true)}
          />
        </div>

        {/* Subtitle - Fade in after text completes */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={textComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          Avec nos bureaux stratégiquement situés à Douala et nos opérations couvrant l'ensemble
          de la région CEMAC, nous sommes prêts à servir vos opérations aériennes.
        </motion.p>

        {/* CTA Button - Animated entrance */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={textComplete ? 'visible' : 'hidden'}
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
