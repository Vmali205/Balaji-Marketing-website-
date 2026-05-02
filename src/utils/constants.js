export const WHATSAPP_NUMBER = '918754408847';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_DEFAULT_MESSAGE = 'Hi, I am interested in your tri-ply cookware products. Please share more details.';

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
  email: 'info@balajimarketingvasai.com',
  address: 'Vasai, Maharashtra, India',
  whatsapp: WHATSAPP_NUMBER,
};

// API base URL - adjust for production
export const API_BASE = '/api';
