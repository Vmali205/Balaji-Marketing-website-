export const WHATSAPP_NUMBER = '918754408847';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DEFAULT_MESSAGE = 'Hi, I am interested in your tri-ply cookware products. Please share more details.';

// Purchase modes for products
export const PURCHASE_MODES = {
  ONLINE: 'online',       // Add to Cart + Buy Now
  AMAZON: 'amazon',       // Buy on Amazon redirect
  WHOLESALE: 'wholesale', // Get Quote via WhatsApp/Contact
  BOTH: 'both',           // Online + Amazon link available
};

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment methods
export const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  COD: 'cod',
};

// Shipping configuration
export const SHIPPING_CONFIG = {
  flatRate: 99,
  freeAbove: 999,
  currency: '₹',
};

export const CATEGORIES = [
  {
    id: 'kadai',
    name: 'Kadai',
    image: '/images/categories/kadai.png',
    heroImage: '/images/products/kadai-hero.png',
    description: 'Our premium tri-ply Kadai collection delivers perfect deep-frying and curry preparation. Crafted with three precision-bonded layers for even heat distribution, these kadais feature ergonomic riveted handles and a heavy-gauge build that withstands commercial kitchen demands.',
    features: ['Even Heat Distribution', 'Ergonomic Handles', 'Induction Compatible', 'Dishwasher Safe'],
    sizes: ['20cm', '22cm', '24cm', '26cm', '28cm'],
  },
  {
    id: 'fry-pan',
    name: 'Fry Pan',
    image: '/images/categories/fry-pan.png',
    heroImage: '/images/products/fry-pan-hero.png',
    description: 'Professional-grade tri-ply fry pans engineered for searing, sautéing, and everyday cooking excellence. The aluminum core ensures rapid, even heating while the stainless steel interior provides a non-reactive, food-safe surface.',
    features: ['Non-Reactive Surface', 'Rapid Heat Response', 'Oven Safe', 'Long Handle Design'],
    sizes: ['22cm', '24cm', '26cm', '28cm'],
  },
  {
    id: 'sauce-pan',
    name: 'Sauce Pan',
    image: '/images/categories/sauce-pan.png',
    heroImage: '/images/products/sauce-pan-hero.png',
    description: 'Versatile tri-ply sauce pans ideal for sauces, soups, boiling, and reheating. The tapered pour spout and comfortable cool-touch handle make these perfect for precise pouring and everyday use.',
    features: ['Pour Spout Design', 'Cool-Touch Handle', 'Tight-Fit Lid', 'Multi-Purpose'],
    sizes: ['14cm', '16cm', '18cm', '20cm'],
  },
  {
    id: 'cook-pots',
    name: 'Cook Pots',
    image: '/images/categories/cook-pots.png',
    heroImage: '/images/products/cook-pots-hero.png',
    description: 'Large-capacity tri-ply cook pots for stews, biryanis, stocks, and bulk cooking. Heavy-duty construction with a fully clad body ensures consistent results, whether on gas, electric, or induction cooktops.',
    features: ['Large Capacity', 'Fully Clad Body', 'All Cooktop Compatible', 'Heavy-Duty Build'],
    sizes: ['22cm', '24cm', '26cm', '28cm', '30cm'],
  },
  {
    id: 'wok',
    name: 'Wok',
    image: '/images/categories/wok.png',
    heroImage: '/images/products/wok-hero.png',
    description: 'Restaurant-quality tri-ply woks with deep sides and flat bottoms, designed for high-heat stir-frying, tossing, and steaming. The wide cooking surface and curved walls allow maximum ingredient movement.',
    features: ['High-Heat Performance', 'Flat Bottom Stability', 'Deep Curved Walls', 'Professional Grade'],
    sizes: ['28cm', '30cm', '32cm', '36cm'],
  },
  {
    id: 'lids',
    name: 'Lids',
    image: '/images/categories/lids.png',
    heroImage: '/images/products/lids-hero.png',
    description: 'Premium tempered glass lids with stainless steel rims, designed to fit multiple cookware sizes. The steam vent prevents boil-overs while the see-through design lets you monitor cooking without lifting.',
    features: ['Tempered Glass', 'Steam Vent', 'Universal Fit', 'Heat-Resistant Knob'],
    sizes: ['20cm', '22cm', '24cm', '26cm', '28cm'],
  },
  {
    id: 'mini-series',
    name: 'Mini Series',
    image: '/images/categories/mini-series.png',
    heroImage: '/images/products/mini-series-hero.png',
    description: 'Compact tri-ply cookware in mini sizes, perfect for tempering spices, melting butter, single servings, and small preparations. Premium build quality in a space-saving form factor.',
    features: ['Space-Saving', 'Perfect for Tadka', 'Single Serving Size', 'Premium Build'],
    sizes: ['10cm', '12cm', '14cm'],
  },
  {
    id: 'bottle-flasks',
    name: 'Bottles & Flasks',
    image: '/images/categories/bottle-flasks.png',
    heroImage: '/images/products/bottle-flasks-hero.png',
    description: 'High-quality stainless steel insulated bottles and flasks to keep your beverages hot or cold for hours. Designed for durability and style, perfect for everyday use or outdoor adventures.',
    features: ['Double-Wall Insulation', 'Leak-Proof Design', 'Food-Grade Stainless Steel', 'Keeps Hot/Cold for 12-24 Hours'],
    sizes: ['500ml', '750ml', '1000ml', '1500ml'],
  },
];

export const COMPANY_INFO = {
  name: 'Balaji Marketing Vasai',
  tagline: 'Premium Tri-Ply Cookware',
  phone: '+91 8754408847',
  email: 'balajimarketing.mumbai@gmail.com',
  address: 'Ground Floor, Gala No. 1 & 4, Rashmi Industrial Estate, Navghar Manikpur, Samarth Krupa Nagar, Vasai East, Vasai-Virar, Maharashtra 401202',
  whatsapp: WHATSAPP_NUMBER,
  instagram: 'https://instagram.com/balajimarketingvasai',
};

// Testimonials data
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Restaurant Owner, Mumbai',
    rating: 5,
    text: 'We switched to Balaji Marketing\'s tri-ply cookware for our entire kitchen. The heat distribution is unmatched and they\'ve lasted over 3 years without any issues. Best wholesale partner we\'ve worked with.',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Retail Store Owner, Pune',
    rating: 5,
    text: 'Exceptional quality at wholesale prices. Our customers love the tri-ply range. The team at Balaji Marketing is always responsive and delivers on time. Highly recommended for retailers.',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Hotel Chain Manager, Gujarat',
    rating: 5,
    text: 'We\'ve been sourcing cookware from Balaji Marketing for our hotel chain. The consistency in quality across large bulk orders is impressive. Their kadai and wok range is restaurant-grade.',
  },
  {
    id: 4,
    name: 'Sunita Desai',
    role: 'Home Chef & Food Blogger',
    rating: 5,
    text: 'As a food blogger, I need reliable cookware for my shoots and cooking sessions. The tri-ply pans from Balaji Marketing heat evenly and look beautiful on camera. Worth every rupee!',
  },
];

// API base URL - adjust for production
export const API_BASE = '/api';
