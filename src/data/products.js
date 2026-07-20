// Placeholder catalog data.
// Once the backend (Products API) is live, replace these arrays with
// axios calls in src/utils/api.js — component code will not need to change
// as long as the shape (id, title, price, images, sizes...) stays the same.

export const categories = [
  { id: 'coord-sets', name: 'Co-Ord Sets' },
  { id: 'new-arrivals', name: 'New Arrivals' },
  { id: 'festive-edit', name: 'Festive Edit' },
  { id: 'everyday-luxe', name: 'Everyday Luxe' },
];

export const products = [
  {
    id: 'fs-001',
    title: 'Champagne Silk Co-Ord',
    slug: 'champagne-silk-coord',
    category: 'coord-sets',
    collection: 'new-arrivals',
    price: 4999,
    discount: 15,
    description:
      'A fluid silk-blend blazer and tailored trouser set finished with mother-of-pearl buttons. Cut for an easy, elongated silhouette.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 8,
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    images: [
      'https://picsum.photos/seed/fs001a/900/1200',
      'https://picsum.photos/seed/fs001b/900/1200',
    ],
  },
  {
    id: 'fs-002',
    title: 'Ivory Linen Co-Ord',
    slug: 'ivory-linen-coord',
    category: 'coord-sets',
    collection: 'everyday-luxe',
    price: 3799,
    discount: 0,
    description:
      'Breathable linen crop shirt paired with a relaxed wide-leg trouser. Understated, warm-weather elegance.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 14,
    isFeatured: true,
    isTrending: false,
    isNewArrival: true,
    images: [
      'https://picsum.photos/seed/fs002a/900/1200',
      'https://picsum.photos/seed/fs002b/900/1200',
    ],
  },
  {
    id: 'fs-003',
    title: 'Noir Draped Co-Ord',
    slug: 'noir-draped-coord',
    category: 'coord-sets',
    collection: 'festive-edit',
    price: 5499,
    discount: 10,
    description:
      'A draped halter top and high-waist palazzo set in fluid black crepe. Statement dressing for evening occasions.',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 5,
    isFeatured: true,
    isTrending: true,
    isNewArrival: false,
    images: [
      'https://picsum.photos/seed/fs003a/900/1200',
      'https://picsum.photos/seed/fs003b/900/1200',
    ],
  },
  {
    id: 'fs-004',
    title: 'Beige Tailored Co-Ord',
    slug: 'beige-tailored-coord',
    category: 'coord-sets',
    collection: 'everyday-luxe',
    price: 4299,
    discount: 0,
    description:
      'Structured double-breasted jacket with matching cigarette pants in soft beige twill. Boardroom-ready polish.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 11,
    isFeatured: false,
    isTrending: true,
    isNewArrival: false,
    images: [
      'https://picsum.photos/seed/fs004a/900/1200',
      'https://picsum.photos/seed/fs004b/900/1200',
    ],
  },
  {
    id: 'fs-005',
    title: 'Gold Thread Festive Co-Ord',
    slug: 'gold-thread-festive-coord',
    category: 'coord-sets',
    collection: 'festive-edit',
    price: 6999,
    discount: 20,
    description:
      'Hand-embroidered gold thread detailing on a fitted kurta-inspired top and flared pant. Made for celebration.',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 6,
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    images: [
      'https://picsum.photos/seed/fs005a/900/1200',
      'https://picsum.photos/seed/fs005b/900/1200',
    ],
  },
  {
    id: 'fs-006',
    title: 'Sage Relaxed Co-Ord',
    slug: 'sage-relaxed-coord',
    category: 'coord-sets',
    collection: 'everyday-luxe',
    price: 3499,
    discount: 0,
    description:
      'Oversized shirt jacket and straight-leg pant in brushed sage cotton. Off-duty luxury for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 17,
    isFeatured: false,
    isTrending: false,
    isNewArrival: true,
    images: [
      'https://picsum.photos/seed/fs006a/900/1200',
      'https://picsum.photos/seed/fs006b/900/1200',
    ],
  },
];

export const reviews = [
  {
    id: 'r1',
    name: 'Ananya R.',
    rating: 5,
    review:
      'The Champagne Silk Co-Ord fits like it was tailored for me. The fabric feels genuinely premium — worth every rupee.',
    image: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 'r2',
    name: 'Meher K.',
    rating: 5,
    review:
      'Ordering over WhatsApp was so easy, and the team was quick to confirm sizing before shipping. Loved the packaging too.',
    image: 'https://i.pravatar.cc/120?img=45',
  },
  {
    id: 'r3',
    name: 'Divya S.',
    rating: 4,
    review:
      'Beautiful festive set — got so many compliments at a wedding. Delivery took a couple of days longer than expected.',
    image: 'https://i.pravatar.cc/120?img=47',
  },
  {
    id: 'r4',
    name: 'Priya M.',
    rating: 5,
    review:
      'My second FitStitch order. Consistent quality, elegant fits, and the co-ord sets photograph beautifully too.',
    image: 'https://i.pravatar.cc/120?img=24',
  },
  {
    id: 'r5',
    name: 'Kavya N.',
    rating: 5,
    review:
      'The Ivory Linen set is now my go-to for summer brunches. Lightweight, breathable, and doesn\u2019t crease easily.',
    image: 'https://i.pravatar.cc/120?img=19',
  },
];

export const heroSlides = [
  {
    id: 'h1',
    image: 'https://picsum.photos/seed/fshero1/1600/900',
    heading: 'The Co-Ord Edit',
    description: 'Considered pairings, cut for effortless movement.',
    cta: 'Shop New Arrivals',
    link: '/shop?collection=new-arrivals',
  },
  {
    id: 'h2',
    image: 'https://picsum.photos/seed/fshero2/1600/900',
    heading: 'Festive, Reimagined',
    description: 'Hand-finished detailing for occasions that matter.',
    cta: 'Shop Festive Edit',
    link: '/shop?collection=festive-edit',
  },
  {
    id: 'h3',
    image: 'https://picsum.photos/seed/fshero3/1600/900',
    heading: 'Everyday Luxe',
    description: 'Quiet luxury for the days in between.',
    cta: 'Shop Everyday Luxe',
    link: '/shop?collection=everyday-luxe',
  },
];

export const WHATSAPP_NUMBER = '919769089349';
export const WHATSAPP_NUMBER_DISPLAY = '+91 97690 89349';
export const CALL_NUMBER_2_DISPLAY = '+91 83694 09393';
