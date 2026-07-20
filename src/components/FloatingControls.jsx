import React, { useEffect, useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext.jsx';
import { buildWhatsAppGeneralLink } from '../utils/whatsapp.js';

export default function FloatingControls() {
  const { toast } = useCart();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-full bg-charcoal text-ivory flex items-center justify-center shadow-card"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href={buildWhatsAppGeneralLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-soft hover:scale-105 transition-transform duration-300"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-ivory text-[13px] px-5 py-3 rounded-full shadow-soft"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
