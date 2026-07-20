import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import StitchDivider from './StitchDivider.jsx';
import { WHATSAPP_NUMBER_DISPLAY, CALL_NUMBER_2_DISPLAY } from '../data/products.js';
import { buildWhatsAppGeneralLink } from '../utils/whatsapp.js';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-8 mt-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="font-display text-2xl">FitStitch</span>
            <p className="text-ivory/50 text-sm mt-4 leading-relaxed max-w-xs">
              Premium women's co-ord sets, thoughtfully designed and finished
              by hand. Orders confirmed personally over WhatsApp.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a
                href={buildWhatsAppGeneralLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="hover:text-gold transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-widest2 text-gold mb-5">
              Collections
            </p>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li><Link to="/shop?collection=new-arrivals" className="hover:text-ivory">New Arrivals</Link></li>
              <li><Link to="/shop?collection=festive-edit" className="hover:text-ivory">Festive Edit</Link></li>
              <li><Link to="/shop?collection=everyday-luxe" className="hover:text-ivory">Everyday Luxe</Link></li>
              <li><Link to="/shop?filter=best-sellers" className="hover:text-ivory">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-widest2 text-gold mb-5">
              Customer Support
            </p>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li><Link to="/contact" className="hover:text-ivory">Contact Us</Link></li>
              <li><Link to="/business-partner" className="hover:text-ivory">Become a Partner</Link></li>
              <li><Link to="/faqs" className="hover:text-ivory">FAQs</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-ivory">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-ivory">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-ivory">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-ivory">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-widest2 text-gold mb-5">
              Get in Touch
            </p>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li className="flex items-center gap-2">
                <Phone size={13} /> {WHATSAPP_NUMBER_DISPLAY}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} /> {CALL_NUMBER_2_DISPLAY}
              </li>
              <li className="pt-2 text-ivory/50 leading-relaxed">
                Shop No. 2, Blue Diamond, Spring Leaf Tower, Near Shakti
                Nagar, Sudhindra Nagar, Dahisar East, Mumbai, Maharashtra 400068
              </li>
            </ul>
          </div>
        </div>

        <StitchDivider animate={false} className="mb-6 opacity-40" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-ivory/40 text-[12px]">
          <p>© {new Date().getFullYear()} FitStitch Boutique. All rights reserved.</p>
          <p>Designed with care, in Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}
