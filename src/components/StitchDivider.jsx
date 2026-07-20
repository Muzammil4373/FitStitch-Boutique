import React from 'react';
import { motion } from 'framer-motion';

/**
 * The signature element for FitStitch: a running-stitch line that
 * animates in on scroll, echoing needle-and-thread — the brand's namesake.
 */
export default function StitchDivider({ className = '', dark = false, animate = true }) {
  return (
    <motion.div
      className={`stitch-line ${dark ? 'stitch-line-charcoal' : ''} ${className}`}
      initial={animate ? { scaleX: 0, opacity: 0 } : false}
      whileInView={animate ? { scaleX: 1, opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left center' }}
    />
  );
}
