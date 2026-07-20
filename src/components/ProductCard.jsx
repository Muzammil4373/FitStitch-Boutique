import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const isWishlisted = wishlist.includes(product.id);
  const discountedPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  function handleAddToCart(e) {
    e.preventDefault();
    if (!selectedSize) {
      onQuickView?.(product);
      return;
    }
    addToCart(product, selectedSize, 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-beige-light rounded-sm aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-110"
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-luxe"
            />
          )}

          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-charcoal text-ivory text-[11px] uppercase tracking-wider px-2.5 py-1">
              -{product.discount}%
            </span>
          )}

          <button
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute top-3 right-3 bg-ivory/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart
              size={16}
              fill={isWishlisted ? '#C7A567' : 'transparent'}
              color={isWishlisted ? '#C7A567' : '#1C1712'}
            />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView?.(product);
            }}
            className="absolute bottom-0 left-0 right-0 bg-charcoal/85 text-ivory text-[12px] uppercase tracking-widest2 py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxe"
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </Link>

      <div className="pt-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-lg text-charcoal leading-snug">
            {product.title}
          </h3>
        </Link>
        <p className="text-charcoal/50 text-[13px] mt-1 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-medium">{formatINR(discountedPrice)}</span>
          {product.discount > 0 && (
            <span className="text-charcoal/40 text-sm line-through">
              {formatINR(product.price)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSize(size);
              }}
              className={`text-[11px] w-7 h-7 border rounded-full transition-colors duration-200 ${
                selectedSize === size
                  ? 'bg-charcoal text-ivory border-charcoal'
                  : 'border-beige-dark text-charcoal/70 hover:border-charcoal'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-ripple mt-4 w-full border border-charcoal text-charcoal text-[12px] uppercase tracking-widest2 py-2.5 hover:bg-charcoal hover:text-ivory transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
