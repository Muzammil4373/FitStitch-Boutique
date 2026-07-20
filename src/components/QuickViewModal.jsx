import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-charcoal/50 z-[60] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-ivory max-w-3xl w-full grid md:grid-cols-2 gap-0 max-h-[88vh] overflow-y-auto rounded-sm shadow-soft"
        >
          <div className="aspect-[3/4] md:aspect-auto">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-7 md:p-9 relative">
            <button onClick={onClose} className="absolute top-5 right-5" aria-label="Close">
              <X size={20} />
            </button>
            <h2 className="font-display text-3xl mb-2 pr-8">{product.title}</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-lg">{formatINR(discountedPrice)}</span>
              {product.discount > 0 && (
                <span className="text-charcoal/40 line-through text-sm">
                  {formatINR(product.price)}
                </span>
              )}
            </div>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <p className="text-[12px] uppercase tracking-widest2 text-charcoal/60 mb-2">
              Size
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-9 h-9 text-[12px] border rounded-full transition-colors ${
                    size === s
                      ? 'bg-charcoal text-ivory border-charcoal'
                      : 'border-beige-dark hover:border-charcoal'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-[12px] uppercase tracking-widest2 text-charcoal/60 mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border border-beige-dark rounded-full flex items-center justify-center"
              >
                <Minus size={13} />
              </button>
              <span className="w-6 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-8 h-8 border border-beige-dark rounded-full flex items-center justify-center"
              >
                <Plus size={13} />
              </button>
            </div>

            <button
              disabled={!size}
              onClick={() => {
                addToCart(product, size, qty);
                onClose();
              }}
              className="btn-ripple w-full bg-charcoal text-ivory text-[12px] uppercase tracking-widest2 py-3.5 mb-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold-dark transition-colors"
            >
              {size ? 'Add to Cart' : 'Select a size'}
            </button>
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-[12px] uppercase tracking-widest2 text-charcoal/60 hover:text-charcoal py-2"
            >
              View Full Details
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
