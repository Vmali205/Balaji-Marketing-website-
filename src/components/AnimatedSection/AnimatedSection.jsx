import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  blurReveal: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  clipReveal: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
  },
};

const AnimatedSection = ({
  children,
  variant = 'slideUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className = '',
  once = true,
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant] || variants.slideUp}
      transition={{
        duration: duration + 0.2,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium cubic-bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
