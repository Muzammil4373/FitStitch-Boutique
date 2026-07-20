import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        width="56"
        height="56"
        viewBox="0 0 30 30"
        fill="none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.path
          d="M6 15C6 9 10 5 15 5C20 5 24 9 24 15C24 21 20 25 15 25"
          stroke="#C7A567"
          strokeWidth="1.6"
          strokeDasharray="2.2 3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-display text-ivory text-2xl mt-4 tracking-wide"
      >
        FitStitch
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-ivory/40 text-[11px] uppercase tracking-widest2 mt-2"
      >
        Premium Co-Ord Sets
      </motion.p>
    </motion.div>
  );
}
