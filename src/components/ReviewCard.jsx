import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewCard({ review }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 w-[78vw] sm:w-[340px] bg-ivory border border-beige-dark rounded-sm p-6 shadow-card"
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < review.rating ? '#C7A567' : 'transparent'}
            color="#C7A567"
          />
        ))}
      </div>
      <p className="text-charcoal/75 text-[14.5px] leading-relaxed mb-6 line-clamp-5">
        “{review.review}”
      </p>
      <div className="flex items-center gap-3">
        <img
          src={review.image}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-display text-[15px]">{review.name}</span>
      </div>
    </motion.div>
  );
}
