import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import { buildWhatsAppGeneralLink } from '../utils/whatsapp.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Collections' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function submitSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxe ${
        scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M6 15C6 9 10 5 15 5C20 5 24 9 24 15C24 21 20 25 15 25"
                stroke="#C7A567"
                strokeWidth="1.6"
                strokeDasharray="2.2 3"
                strokeLinecap="round"
              />
              <circle cx="15" cy="15" r="2.2" fill="#1C1712" />
            </svg>
            <span className="font-display text-2xl tracking-wide text-charcoal">
              FitStitch
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className="text-[13px] uppercase tracking-widest2 text-charcoal/80 hover:text-gold-dark transition-colors duration-300"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2 hover:text-gold-dark transition-colors"
            >
              <Search size={19} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 hover:text-gold-dark transition-colors hidden sm:block"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-[10px] text-charcoal w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative p-2 hover:text-gold-dark transition-colors"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-charcoal text-[10px] text-ivory w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <a
              href={buildWhatsAppGeneralLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="p-2 text-[#3FA047] hover:opacity-75 transition-opacity hidden sm:block"
            >
              <MessageCircle size={19} />
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="p-2 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={submitSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4 border-b border-beige-dark">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search co-ord sets, collections..."
                  className="w-full bg-transparent outline-none font-display text-lg placeholder:text-charcoal/40"
                />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-charcoal/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-[82%] max-w-sm bg-ivory z-50 shadow-soft p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <button onClick={() => setOpen(false)} className="mb-10 block ml-auto">
                <X size={22} />
              </button>
              <nav className="flex flex-col gap-6">
                {links.map((l) => (
                  <NavLink
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl text-charcoal"
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
