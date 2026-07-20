import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/products.js';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function HeroSlider() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-charcoal">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.heading}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

              <div className="relative h-full mx-auto max-w-7xl px-6 md:px-10 flex items-end pb-24 md:pb-32">
                <div className="max-w-xl">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gold text-[12px] uppercase tracking-widest2 mb-4"
                  >
                    FitStitch Boutique
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-5xl md:text-7xl text-ivory leading-[1.02] mb-5"
                  >
                    {slide.heading}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-ivory/80 text-base md:text-lg mb-8 font-light"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={slide.link}
                      className="btn-ripple inline-flex items-center gap-3 bg-gold text-charcoal px-7 py-3.5 text-[13px] uppercase tracking-widest2 hover:bg-ivory transition-colors duration-400"
                    >
                      {slide.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
