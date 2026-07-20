import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import StitchDivider from '../components/StitchDivider.jsx';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function Wishlist() {
  const { wishlist } = useCart();
  const [quickView, setQuickView] = useState(null);
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 md:px-10">
      <h1 className="font-display text-4xl mb-4">Your Wishlist</h1>
      <StitchDivider className="w-16 mb-10" />

      {items.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-charcoal/50 mb-8">Nothing saved yet — tap the heart on any piece to keep it here.</p>
          <Link
            to="/shop"
            className="btn-ripple inline-block bg-charcoal text-ivory px-8 py-3.5 text-[12px] uppercase tracking-widest2 hover:bg-gold-dark transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
