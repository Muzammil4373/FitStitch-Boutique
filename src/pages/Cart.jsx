import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { buildWhatsAppOrderLink } from '../utils/whatsapp.js';
import StitchDivider from '../components/StitchDivider.jsx';

function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-32 text-center px-6">
        <p className="font-display text-3xl mb-4">Your cart is empty</p>
        <p className="text-charcoal/50 mb-8">Discover pieces made for effortless movement.</p>
        <Link
          to="/shop"
          className="btn-ripple inline-block bg-charcoal text-ivory px-8 py-3.5 text-[12px] uppercase tracking-widest2 hover:bg-gold-dark transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  function handleCheckout() {
    const link = buildWhatsAppOrderLink({ items: cart });
    window.open(link, '_blank');
  }

  return (
    <div className="pt-32 pb-24 mx-auto max-w-5xl px-6 md:px-10">
      <h1 className="font-display text-4xl mb-4">Shopping Cart</h1>
      <StitchDivider className="w-16 mb-10" />

      <div className="divide-y divide-beige-dark">
        {cart.map((item) => {
          const unitPrice = item.price - (item.price * item.discount) / 100;
          return (
            <div key={`${item.id}-${item.size}`} className="flex gap-5 py-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-sm shrink-0"
              />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg">{item.title}</h3>
                  <p className="text-charcoal/50 text-sm mt-1">Size: {item.size}</p>
                  <p className="text-charcoal/80 text-sm mt-1">{formatINR(unitPrice)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 border border-beige-dark rounded-full px-2 py-1">
                    <button onClick={() => updateQuantity(item.id, item.size, -1)} aria-label="Decrease">
                      <Minus size={13} />
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, 1)} aria-label="Increase">
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    aria-label="Remove"
                    className="text-charcoal/40 hover:text-rose transition-colors"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-end gap-6">
        <div className="flex items-center gap-4 text-lg">
          <span className="text-charcoal/60 text-sm uppercase tracking-widest2">Subtotal</span>
          <span className="font-display text-2xl">{formatINR(subtotal)}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/shop"
            className="text-center border border-charcoal px-8 py-3.5 text-[12px] uppercase tracking-widest2 hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Continue Shopping
          </Link>
          <button
            onClick={handleCheckout}
            className="btn-ripple flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3.5 text-[12px] uppercase tracking-widest2 hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={15} /> Checkout via WhatsApp
          </button>
        </div>
        <p className="text-[12px] text-charcoal/40 max-w-sm text-right">
          No online payment — your order is confirmed personally by our team over WhatsApp.
        </p>
      </div>
    </div>
  );
}
