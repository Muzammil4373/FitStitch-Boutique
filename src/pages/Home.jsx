import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import HeroSlider from '../components/HeroSlider.jsx';
import ProductCard from '../components/ProductCard.jsx';
import QuickViewModal from '../components/QuickViewModal.jsx';
import StitchDivider from '../components/StitchDivider.jsx';
import { products, categories } from '../data/products.js';

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        <StitchDivider className="w-16 mt-4" />
      </div>
      {action}
    </div>
  );
}

export default function Home() {
  const [quickView, setQuickView] = useState(null);

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);

  return (
    <div>
      <HeroSlider />

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <SectionHeading
          eyebrow="Just In"
          title="New Arrivals"
          action={
            <Link
              to="/shop?collection=new-arrivals"
              className="hidden sm:inline text-[12px] uppercase tracking-widest2 border-b border-charcoal pb-1"
            >
              View All
            </Link>
          }
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      {/* Premium Co-Ord Sets (replaces Featured Collection) */}
      <section className="bg-beige-light py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <SectionHeading eyebrow="Curated" title="Premium Co-Ord Sets" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <SectionHeading eyebrow="Right Now" title="Trending Collection" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-20">
        <SectionHeading eyebrow="Explore" title="Shop by Category" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                to={`/shop?collection=${cat.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-charcoal"
              >
                <img
                  src={`https://picsum.photos/seed/cat-${cat.id}/700/900`}
                  alt={cat.name}
                  className="h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-luxe"
                />
                <div className="absolute inset-0 flex items-end p-4 md:p-6">
                  <span className="font-display text-lg md:text-xl text-ivory">
                    {cat.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Business Partner CTA */}
      <section className="bg-beige-light py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">
            Grow With Us
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-5">
            Become Our Business Partner
          </h2>
          <p className="text-charcoal/60 max-w-xl mx-auto mb-8">
            Interested in becoming a dealer or reseller of FitStitch? We'd
            love to hear from you.
          </p>
          <Link
            to="/business-partner"
            className="btn-ripple inline-block bg-charcoal text-ivory px-8 py-3.5 text-[12px] uppercase tracking-widest2 hover:bg-gold-dark transition-colors"
          >
            Apply as a Partner
          </Link>
        </div>
      </section>

      {/* Store Location */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-20">
        <SectionHeading eyebrow="Visit Us" title="Our Store" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Map — full width, contained, no overflow */}
          <div className="w-full rounded-sm overflow-hidden" style={{ height: '340px' }}>
            <iframe
              title="FitStitch Boutique Store Location"
              src="https://www.google.com/maps?q=Blue+Diamond+Spring+Leaf+Tower+Dahisar+East+Mumbai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="bg-beige-light rounded-sm p-6 md:p-10 flex flex-col justify-center">
            <MapPin className="text-gold-dark mb-4" size={22} />
            <h3 className="font-display text-2xl mb-3">FitStitch Boutique</h3>
            <p className="text-charcoal/60 leading-relaxed mb-8">
              Shop No. 2, Blue Diamond, Spring Leaf Tower Building No. 5,
              Near Shakti Nagar, Sudhindra Nagar, Dahisar East, Mumbai,
              Maharashtra 400068
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://maps.app.goo.gl/C1oS1mPivj38pGBL7"
                target="_blank"
                rel="noreferrer"
                className="btn-ripple inline-flex items-center gap-2 bg-charcoal text-ivory px-6 py-3 text-[12px] uppercase tracking-widest2 hover:bg-gold-dark transition-colors"
              >
                <Navigation size={14} /> Open in Maps
              </a>
              <a
                href="tel:+919769089349"
                className="inline-flex items-center gap-2 border border-charcoal px-6 py-3 text-[12px] uppercase tracking-widest2 hover:bg-charcoal hover:text-ivory transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
