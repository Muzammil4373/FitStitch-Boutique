import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import StitchDivider from '../components/StitchDivider.jsx';
import { WHATSAPP_NUMBER_DISPLAY, CALL_NUMBER_2_DISPLAY } from '../data/products.js';
import { buildWhatsAppGeneralLink } from '../utils/whatsapp.js';
import { submitContactEnquiry } from '../utils/api.js';

const initialForm = { name: '', phone: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitContactEnquiry(form);
      setStatus('sent');
      setForm(initialForm);
    } catch {
      setStatus('sent');
      setForm(initialForm);
    }
  }

  const inputClass =
    'w-full max-w-full box-border border-b border-beige-dark bg-transparent py-2.5 outline-none focus:border-gold transition-colors text-[15px]';

  return (
    <div className="pt-28 md:pt-32 pb-24 w-full max-w-6xl mx-auto px-4 md:px-10 box-border overflow-x-hidden">
      <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">Get in Touch</p>
      <h1 className="font-display text-3xl md:text-4xl mb-4">Contact FitStitch</h1>
      <StitchDivider className="w-16 mb-10 md:mb-14" />

      <div className="grid md:grid-cols-2 gap-10 md:gap-14">
        {/* Left — contact info + map */}
        <div className="min-w-0">
          <div className="space-y-5 mb-8">
            <a href="tel:+919769089349" className="flex items-center gap-3 group">
              <span className="w-11 h-11 shrink-0 rounded-full bg-beige-light flex items-center justify-center">
                <Phone size={16} />
              </span>
              <span className="group-hover:text-gold-dark transition-colors text-sm md:text-base break-all">
                {WHATSAPP_NUMBER_DISPLAY}
              </span>
            </a>
            <a href="tel:+918369409393" className="flex items-center gap-3 group">
              <span className="w-11 h-11 shrink-0 rounded-full bg-beige-light flex items-center justify-center">
                <Phone size={16} />
              </span>
              <span className="group-hover:text-gold-dark transition-colors text-sm md:text-base break-all">
                {CALL_NUMBER_2_DISPLAY}
              </span>
            </a>
            <a
              href={buildWhatsAppGeneralLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="w-11 h-11 shrink-0 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle size={16} className="text-[#25D366]" />
              </span>
              <span className="group-hover:text-gold-dark transition-colors text-sm md:text-base">
                Chat on WhatsApp
              </span>
            </a>
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 shrink-0 rounded-full bg-beige-light flex items-center justify-center">
                <MapPin size={16} />
              </span>
              <span className="text-charcoal/60 leading-relaxed text-sm md:text-base">
                Shop No. 2, Blue Diamond, Spring Leaf Tower Building No. 5,
                Near Shakti Nagar, Sudhindra Nagar, Dahisar East, Mumbai,
                Maharashtra 400068
              </span>
            </div>
          </div>

          {/* Map — fixed height, 100% width, no overflow */}
          <div
            className="w-full rounded-sm overflow-hidden"
            style={{ height: '260px' }}
          >
            <iframe
              title="FitStitch Boutique Location"
              src="https://www.google.com/maps?q=Blue+Diamond+Spring+Leaf+Tower+Dahisar+East+Mumbai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Right — contact form */}
        <form onSubmit={handleSubmit} className="space-y-5 min-w-0">
          <div>
            <label className="text-[12px] uppercase tracking-widest2 text-charcoal/60 block mb-2">
              Name
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[12px] uppercase tracking-widest2 text-charcoal/60 block mb-2">
              Phone
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[12px] uppercase tracking-widest2 text-charcoal/60 block mb-2">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[12px] uppercase tracking-widest2 text-charcoal/60 block mb-2">
              Message
            </label>
            <textarea
              required
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-ripple w-full bg-charcoal text-ivory py-3.5 text-[12px] uppercase tracking-widest2 hover:bg-gold-dark transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <p className="text-[13px] text-gold-dark">
              Thank you — we'll get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
