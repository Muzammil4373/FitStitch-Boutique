import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import StitchDivider from '../components/StitchDivider.jsx';
import { products, categories } from '../data/products.js';

const SORT_LABELS = {
  featured: 'Featured',
  newest: 'Newest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickView, setQuickView] = useState(null);
  const [sort, setSort] = useState('featured');

  const collection = searchParams.get('collection') || '';
  const query = searchParams.get('q') || '';
  const filter = searchParams.get('filter') || '';

  const filtered = useMemo(() => {
    let list = [...products];
    if (collection) list = list.filter((p) => p.collection === collection || p.category === collection);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (filter === 'best-sellers') list = list.reverse();
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'newest') list = list.filter((p) => p.isNewArrival).concat(list.filter((p) => !p.isNewArrival));
    return list;
  }, [collection, query, filter, sort]);

  return (
    <div className="pt-28 md:pt-32 pb-24 mx-auto max-w-7xl px-4 md:px-10 overflow-x-hidden">
      <div className="mb-10">
        <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">
          {query ? `Results for "${query}"` : 'The Collection'}
        </p>
        <h1 className="font-display text-3xl md:text-5xl">
          {collection
            ? categories.find((c) => c.id === collection)?.name || 'Co-Ord Sets'
            : 'All Co-Ord Sets'}
        </h1>
        <StitchDivider className="w-16 mt-4" />
      </div>

      {/* Filter + Sort bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSearchParams({})}
            className={`text-[11px] uppercase tracking-widest2 px-3 py-1.5 border rounded-full transition-colors whitespace-nowrap ${
              !collection ? 'bg-charcoal text-ivory border-charcoal' : 'border-beige-dark text-charcoal'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSearchParams({ collection: c.id })}
              className={`text-[11px] uppercase tracking-widest2 px-3 py-1.5 border rounded-full transition-colors whitespace-nowrap ${
                collection === c.id
                  ? 'bg-charcoal text-ivory border-charcoal'
                  : 'border-beige-dark text-charcoal'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Sort — native select replaced with a custom button row on mobile */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={14} className="text-charcoal/50 shrink-0" />
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-ivory border border-beige-dark rounded-full text-[12px] text-charcoal pl-3 pr-8 py-1.5 outline-none focus:border-gold cursor-pointer w-[170px] truncate"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            {/* Custom dropdown arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/50 text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-2xl mb-2">No pieces found</p>
          <p className="text-charcoal/50">Try a different search or browse all collections.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </motion.div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
