import { WHATSAPP_NUMBER } from '../data/products.js';

/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled order message.
 * Used both for single "Buy via WhatsApp" actions and full cart checkout.
 */
export function buildWhatsAppOrderLink({ items, color = '—' }) {
  const lines = ['Hello FitStitch,', '', 'I would like to order:', ''];

  items.forEach((item, idx) => {
    lines.push(
      `${items.length > 1 ? `${idx + 1}. ` : ''}Product Name: ${item.title}`
    );
    lines.push(`Color: ${item.color || color}`);
    lines.push(`Size: ${item.size}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push('');
  });

  lines.push('Please confirm availability.');

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function buildWhatsAppGeneralLink(prefilledText = 'Hello FitStitch, I have a question about your collection.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText)}`;
}
