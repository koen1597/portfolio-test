import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  delay = 0
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.99 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08, margin: "-40px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  const getOffset = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up': return { x: 0, y: 24 };
      case 'down': return { x: 0, y: -24 };
      case 'left': return { x: 24, y: 0 };
      case 'right': return { x: -24, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.08, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion 
          ? { opacity: 0 } 
          : { opacity: 0, y: 20, scale: 0.98 },
        visible: shouldReduceMotion
          ? { opacity: 1 }
          : { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1]
              }
            }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
