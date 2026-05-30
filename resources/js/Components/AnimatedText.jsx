import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';

export function AnimatedText({
  text,
  className = '',
  staggerDelay = 0.02,
  onComplete = null,
  triggerInView = false,
  scrollProgress = null,
  isScrollDriven = false
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!isScrollDriven || !scrollProgress) return;

    const unsubscribe = scrollProgress.on('change', setProgress);
    return () => unsubscribe();
  }, [isScrollDriven, scrollProgress]);

  useEffect(() => {
    if (isScrollDriven) return;

    if (!triggerInView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [triggerInView, isScrollDriven]);

  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
        onComplete: onComplete,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // For scroll-driven animation: calculate which letters should be visible
  const getLetterOpacity = (letterIndex) => {
    if (!isScrollDriven) return 1;

    // Dynamically calculate stagger based on number of letters
    const totalLetters = letters.length;
    const letterDuration = 1 / (totalLetters * 1.5); // Each letter duration
    const letterStart = letterIndex * letterDuration;
    const letterEnd = letterStart + letterDuration;

    if (progress < letterStart) return 0;
    if (progress > letterEnd) return 1;
    return (progress - letterStart) / (letterEnd - letterStart);
  };

  if (isScrollDriven) {
    return (
      <div ref={ref} className={className}>
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
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
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
  );
}
