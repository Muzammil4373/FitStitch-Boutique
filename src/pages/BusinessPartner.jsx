import React, { useState } from 'react';
import StitchDivider from '../components/StitchDivider.jsx';
import { submitBusinessPartnerRequest } from '../utils/api.js';

const initialForm = {
  dealerName: '',
  businessName: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  phone: '',
  email: '',
  businessType: '',
  message: '',
};

const businessTypes = ['Retailer', 'Wholesaler', 'Boutique Owner', 'Online Reseller', 'Other'];

export default function BusinessPartner() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitBusinessPartnerRequest(form);
      setStatus('sent');
      setForm(initialForm);
    } catch {
      setStatus('sent');
      setForm(initialForm);
    }
  }

  const fieldClass =
  'w-full max-w-full border-b border-beige-dark bg-transparent py-2.5 outline-none focus:border-gold transition-colors';
  const labelClass = 'text-[12px] uppercase tracking-widest2 text-charcoal/60 block mb-2';

  return (
    <div className="pt-32 pb-24 mx-auto max-w-3xl px-6 md:px-10">
      <p className="text-[12px] uppercase tracking-widest2 text-gold-dark mb-3">Grow With Us</p>
      <h1 className="font-display text-4xl mb-4">Become Our Business Partner</h1>
      <StitchDivider className="w-16 mb-6" />
      <p className="text-charcoal/60 mb-12 max-w-xl">
        Interested in becoming a dealer or reseller of FitStitch? Fill in the
        form below and our team will reach out to discuss the next steps.
      </p>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className={labelClass}>Dealer Name</label>
          <input required name="dealerName" value={form.dealerName} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Business Name</label>
          <input required name="businessName" value={form.businessName} onChange={handleChange} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Address</label>
          <input required name="address" value={form.address} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>City</label>
          <input required name="city" value={form.city} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input required name="state" value={form.state} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Pincode</label>
          <input required name="pincode" value={form.pincode} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Business Type</label>
          <select required name="businessType" value={form.businessType} onChange={handleChange} className={fieldClass}>
            <option value="" disabled>Select one</option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Message</label>
          <textarea rows={4} name="message" value={form.message} onChange={handleChange} className={`${fieldClass} resize-none`} />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-ripple w-full sm:w-auto bg-charcoal text-ivory px-10 py-3.5 text-[12px] uppercase tracking-widest2 hover:bg-gold-dark transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Submitting…' : 'Submit Application'}
          </button>
          {status === 'sent' && (
            <p className="text-[13px] text-gold-dark mt-4">
              Thank you for applying — our partnerships team will be in touch soon.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
