import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import StitchDivider from '../components/StitchDivider.jsx';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { buildWhatsAppOrderLink } from '../utils/whatsapp.js';

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [quickView, setQuickView] = useState(null);
  const [zoom, setZoom] = useState(false);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="font-display text-3xl mb-4">Product not found</p>
        <Link to="/shop" className="underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
  const isWishlisted = wishlist.includes(product.id);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  function handleWhatsAppBuy() {
    if (!size) return;
    const link = buildWhatsAppOrderLink({
      items: [{ title: product.title, size, quantity: qty }],
    });
    window.open(link, '_blank');
  }

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div>
          <div
            className="relative aspect-[3/4] overflow-hidden bg-beige-light rounded-sm cursor-zoom-in"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.title}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1, scale: zoom ? 1.15 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 aspect-[3/4] overflow-hidden rounded-sm border-2 transition-colors ${
                  activeImage === i ? 'border-gold' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">
            Co-Ord Set
          </p>
          <h1 className="font-display text-4xl mb-4">{product.title}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-xl">{formatINR(discountedPrice)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-charcoal/40 line-through">
                  {formatINR(product.price)}
                </span>
                <span className="text-rose text-sm">-{product.discount}%</span>
              </>
            )}
          </div>
          <p className="text-charcoal/60 leading-relaxed mb-8">{product.description}</p>

          <StitchDivider className="w-full mb-8" animate={false} />

          <p className="text-[12px] uppercase tracking-widest2 text-charcoal/60 mb-3">
            Size
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-10 h-10 text-[13px] border rounded-full transition-colors ${
                  size === s
                    ? 'bg-charcoal text-ivory border-charcoal'
                    : 'border-beige-dark hover:border-charcoal'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-[12px] text-charcoal/45 mb-8">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <p className="text-[12px] uppercase tracking-widest2 text-charcoal/60 mb-3">
            Quantity
          </p>
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 border border-beige-dark rounded-full flex items-center justify-center"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 border border-beige-dark rounded-full flex items-center justify-center"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              disabled={!size}
              onClick={() => addToCart(product, size, qty)}
              className="btn-ripple flex-1 border border-charcoal text-charcoal text-[12px] uppercase tracking-widest2 py-3.5 hover:bg-charcoal hover:text-ivory transition-colors disabled:opacity-40"
            >
              Add to Cart
            </button>
            <button
              disabled={!size}
              onClick={handleWhatsAppBuy}
              className="btn-ripple flex-1 bg-[#25D366] text-white text-[12px] uppercase tracking-widest2 py-3.5 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <MessageCircle size={15} /> Buy via WhatsApp
            </button>
          </div>
          {!size && (
            <p className="text-[12px] text-rose mb-4">Please select a size to continue.</p>
          )}
          <button
            onClick={() => toggleWishlist(product)}
            className="flex items-center gap-2 text-[12px] uppercase tracking-widest2 text-charcoal/60 hover:text-charcoal"
          >
            <Heart size={15} fill={isWishlisted ? '#C7A567' : 'transparent'} color={isWishlisted ? '#C7A567' : 'currentColor'} />
            {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-6 md:px-10 mt-28">
          <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">
            You May Also Like
          </p>
          <h2 className="font-display text-3xl mb-10">Related Pieces</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        </div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
