import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedText({
  text,
  className = '',
  staggerDelay = 0.02,
  onComplete = null,
  triggerInView = false
}) {
  const [isVisible, setIsVisible] = useState(!triggerInView);
  const ref = useRef(null);

  useEffect(() => {
    if (!triggerInView) return;

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
  }, [triggerInView]);

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
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
