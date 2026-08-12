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

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxe ${
          scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-card' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 relative z-50">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
                <path
                  d="M6 15C6 9 10 5 15 5C20 5 24 9 24 15C24 21 20 25 15 25"
                  stroke="#C7A567"
                  strokeWidth="1.6"
                  strokeDasharray="2.2 3"
                  strokeLinecap="round"
                />
                <circle cx="15" cy="15" r="2.2" fill="#1C1712" />
              </svg>
              <span className={`font-display text-xl md:text-2xl tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-charcoal' : 'text-ivory'
              }`}>
                FitStitch
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[13px] uppercase tracking-widest2 transition-colors duration-300 ${
                      isActive ? 'text-gold' : scrolled ? 'text-charcoal/80 hover:text-gold-dark' : 'text-ivory/90 hover:text-gold'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen((s) => !s)}
                className={`p-2 transition-colors ${scrolled ? 'text-charcoal hover:text-gold-dark' : 'text-ivory hover:text-gold'}`}
              >
                <Search size={19} />
              </button>
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className={`relative p-2 transition-colors hidden sm:block ${scrolled ? 'text-charcoal hover:text-gold-dark' : 'text-ivory hover:text-gold'}`}
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
                className={`relative p-2 transition-colors ${scrolled ? 'text-charcoal hover:text-gold-dark' : 'text-ivory hover:text-gold'}`}
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
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className={`p-2 lg:hidden transition-colors ${scrolled ? 'text-charcoal' : 'text-ivory'}`}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Search bar dropdown */}
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
      </header>

      {/* Mobile drawer — rendered outside header so it can cover full screen */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-charcoal/50 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-ivory z-[70] shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-beige-dark">
                <span className="font-display text-lg text-charcoal">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -mr-2 text-charcoal hover:text-gold-dark transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1 overflow-y-auto">
                {links.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block font-display text-2xl py-3 border-b border-beige-dark/60 transition-colors ${
                          isActive ? 'text-gold-dark' : 'text-charcoal hover:text-gold-dark'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-6 border-t border-beige-dark">
                <a
                  href={buildWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#25D366] font-medium text-sm"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
