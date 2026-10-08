/**
 * ZenithDistrict Motion System
 * Architectural, restrained, structural feedback.
 * Single cubic-bezier curve: [0.22, 1, 0.36, 1]
 */

export const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const;

export const motionVariants = {
  // Line-by-line or section reveals
  fadeInUp: {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: TRANSITION_EASE,
      },
    },
  },

  // Subtle opacity fade for structural elements
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: TRANSITION_EASE,
      },
    },
  },

  // Masked slide for hero typography
  heroLine: {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: TRANSITION_EASE,
      },
    },
  },

  // Container staggering
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },

  // Fast micro-interaction for cards/plots
  plotHover: {
    rest: { y: 0, transition: { duration: 0.25, ease: TRANSITION_EASE } },
    hover: { y: -3, transition: { duration: 0.25, ease: TRANSITION_EASE } },
  },
};
