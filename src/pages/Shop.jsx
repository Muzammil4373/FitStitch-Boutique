import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import StitchDivider from '../components/StitchDivider.jsx';
import { products, categories } from '../data/products.js';

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
    <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 md:px-10">
      <div className="mb-12">
        <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">
          {query ? `Results for "${query}"` : 'The Collection'}
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          {collection
            ? categories.find((c) => c.id === collection)?.name || 'Co-Ord Sets'
            : 'All Co-Ord Sets'}
        </h1>
        <StitchDivider className="w-16 mt-4" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSearchParams({})}
            className={`text-[12px] uppercase tracking-widest2 px-4 py-2 border rounded-full transition-colors ${
              !collection ? 'bg-charcoal text-ivory border-charcoal' : 'border-beige-dark'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSearchParams({ collection: c.id })}
              className={`text-[12px] uppercase tracking-widest2 px-4 py-2 border rounded-full transition-colors ${
                collection === c.id
                  ? 'bg-charcoal text-ivory border-charcoal'
                  : 'border-beige-dark'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-charcoal/50" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-[13px] outline-none border-b border-beige-dark py-1"
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
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
