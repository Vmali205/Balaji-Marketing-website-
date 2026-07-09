import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Award, Truck, Shield, Users, MessageCircle,
  Star, Package, ChevronRight, CheckCircle, Zap, Tag
} from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import Marquee from '../../components/Marquee/Marquee';
import ProductCard from '../../components/ProductCard/ProductCard';
import useProducts from '../../hooks/useProducts';
import { CATEGORIES, WHATSAPP_LINK, TESTIMONIALS } from '../../utils/constants';
import styles from './Home.module.css';

const MARQUEE_ITEMS = [
  'Premium Tri-Ply Cookware',
  'Wholesale Pricing',
  'Pan-India Delivery',
  'Trusted Since 2015',
  'B2B Partners Welcome',
  'Professional Grade',
  'ISI Certified',
  'Induction Compatible',
];

const WHY_ITEMS = [
  {
    icon: <Award size={22} />,
    title: 'Premium Quality',
    desc: 'Tri-ply stainless steel for superior heat distribution and durability.',
  },
  {
    icon: <Users size={22} />,
    title: 'Wholesale Pricing',
    desc: 'Best bulk pricing for retailers, distributors, and businesses.',
  },
  {
    icon: <Truck size={22} />,
    title: 'Pan-India Delivery',
    desc: 'Reliable shipping across India with secure packaging.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Trusted Since 2015',
    desc: 'Over a decade of experience with 500+ satisfied B2B clients.',
  },
];

const PROMO_BANNERS = [
  {
    id: 'new-arrivals',
    label: 'New In Collection',
    title: 'Tri-Ply Kadai',
    subtitle: 'Professional Series',
    cta: 'Shop Now',
    link: '/products/kadai',
    image: '/images/products/kadai-hero.png',
    bg: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
    accent: '#C62828',
  },
  {
    id: 'sale',
    label: 'Up to 20% OFF',
    title: 'Cooking Made Easy',
    subtitle: 'Fry Pans & Woks',
    cta: 'Explore Deals',
    link: '/products/fry-pan',
    image: '/images/products/fry-pan-hero.png',
    bg: 'linear-gradient(135deg, #8B0000 0%, #C62828 100%)',
    accent: '#FFE082',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Home = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { products, loading: productsLoading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    document.title = 'Balaji Marketing Vasai | Premium Tri-Ply Cookware Wholesale';
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero} ref={heroRef} id="hero-section">
        {/* Subtle background pattern */}
        <div className={styles.heroBg}>
          <div className={styles.heroDotGrid} />
          <div className={styles.heroAccentBlob1} />
          <div className={styles.heroAccentBlob2} />
          <div className={styles.heroAccentBlob3} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            {/* LEFT: Text column */}
            <motion.div
              className={styles.heroTextCol}
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <motion.div variants={childVariants} className={styles.heroPill}>
                <Zap size={12} fill="currentColor" />
                <span>Trusted Wholesale Partner Since 2015</span>
              </motion.div>

              <motion.h1 variants={childVariants} className={styles.heroTitle}>
                Premium <span className={styles.heroTitleAccent}>Tri-Ply</span><br />
                Cookware for<br />
                <span className={styles.heroTitleAccent}>Your Business</span>
              </motion.h1>

              <motion.p variants={childVariants} className={styles.heroSubtitle}>
                Professional-grade stainless steel cookware built for performance, 
                designed for durability — at competitive wholesale prices.
              </motion.p>

              <motion.div variants={childVariants} className={styles.heroChecks}>
                {['ISI Certified Quality', 'Induction Compatible', 'Pan-India Delivery'].map((item) => (
                  <div key={item} className={styles.heroCheck}>
                    <CheckCircle size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={childVariants} className={styles.heroActions}>
                <Link to="/products" className="btn btn-primary btn-lg" id="hero-shop-btn">
                  Shop Collection
                  <ArrowRight size={16} />
                </Link>
                <Link to="/catalogue" className={`btn btn-outline btn-lg ${styles.heroOutlineBtn}`} id="hero-catalogue-btn">
                  View Catalogue
                </Link>
              </motion.div>

              <motion.div variants={childVariants} className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}><AnimatedCounter target={50} suffix="+" /></span>
                  <span className={styles.statLabel}>Product SKUs</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <span className={styles.statNum}><AnimatedCounter target={500} suffix="+" duration={2500} /></span>
                  <span className={styles.statLabel}>B2B Partners</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <span className={styles.statNum}><AnimatedCounter target={10} suffix="+" duration={1500} /></span>
                  <span className={styles.statLabel}>Years Exp.</span>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Image column */}
            <motion.div
              className={styles.heroImageCol}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className={styles.heroImageFrame}>
                <div className={styles.heroImageBg} />
                <img
                  src="/images/hero/hero-pot-cinematic.png"
                  alt="Premium Balaji Tri-Ply Cookware"
                  className={styles.heroImg}
                />
                {/* Floating stat cards */}
                <motion.div
                  className={`${styles.floatCard} ${styles.floatCard1}`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className={styles.floatCardIcon}><Star size={14} fill="currentColor" /></div>
                  <div>
                    <div className={styles.floatCardVal}>4.9/5</div>
                    <div className={styles.floatCardLbl}>Avg Rating</div>
                  </div>
                </motion.div>
                <motion.div
                  className={`${styles.floatCard} ${styles.floatCard2}`}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <div className={styles.floatCardIcon}><Shield size={14} /></div>
                  <div>
                    <div className={styles.floatCardVal}>3-Layer</div>
                    <div className={styles.floatCardLbl}>Tri-Ply Steel</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TRUST MARQUEE ===== */}
      <Marquee items={MARQUEE_ITEMS} speed={30} separator="✦" />

      {/* ===== CATEGORIES SECTION ===== */}
      <section className={`section ${styles.categories}`} id="categories-section">
        <div className="container">
          <AnimatedSection variant="blurReveal" className="text-center">
            <p className="section-label">Our Collection</p>
            <h2 className="section-title">
              Shop by <span className="accent-text">Category</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              Professional-grade tri-ply cookware in every style — from everyday kadais to restaurant-grade woks.
            </p>
          </AnimatedSection>

          <div className={styles.catGrid}>
            {CATEGORIES.map((cat, index) => (
              <AnimatedSection key={cat.id} variant="slideUp" delay={index * 0.07}>
                <Link to={`/products/${cat.id}`} className={styles.catCard} id={`cat-${cat.id}`}>
                  <div className={styles.catImageWrap}>
                    <img src={cat.image} alt={cat.name} className={styles.catImage} loading="lazy" />
                    <div className={styles.catOverlay} />
                  </div>
                  <div className={styles.catFooter}>
                    <span className={styles.catName}>{cat.name}</span>
                    <div className={styles.catArrow}>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className={styles.catHoverOverlay}>
                    <span>Shop Now</span>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNERS ===== */}
      <section className={`section ${styles.promoBanners}`} id="promo-banners">
        <div className="container">
          <div className={styles.promoBannerGrid}>
            {PROMO_BANNERS.map((banner, index) => (
              <AnimatedSection key={banner.id} variant={index === 0 ? 'slideRight' : 'slideLeft'}>
                <Link to={banner.link} className={styles.promoBannerCard} id={`promo-${banner.id}`}>
                  <div className={styles.promoBannerBg} style={{ background: banner.bg }} />
                  <div className={styles.promoBannerContent}>
                    <span className={styles.promoBannerLabel} style={{ color: banner.accent }}>
                      {banner.label}
                    </span>
                    <h3 className={styles.promoBannerTitle}>{banner.title}</h3>
                    <p className={styles.promoBannerSubtitle}>{banner.subtitle}</p>
                    <div className={styles.promoBannerCta}>
                      <span>{banner.cta}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className={styles.promoBannerImgWrap}>
                    <img src={banner.image} alt={banner.title} className={styles.promoBannerImg} loading="lazy" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className={`section ${styles.featuredProducts}`} id="featured-products">
        <div className="container">
          <AnimatedSection variant="blurReveal" className="text-center">
            <p className="section-label">Best Sellers</p>
            <h2 className="section-title">
              Featured <span className="accent-text">Products</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              Our most popular tri-ply cookware items, trusted by restaurants, hotels, and homes across India.
            </p>
          </AnimatedSection>

          {productsLoading ? (
            <div className="page-loader" style={{ height: '220px' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div className={styles.featuredGrid}>
              {featuredProducts.map((product, index) => (
                <AnimatedSection key={product.id} variant="slideUp" delay={index * 0.09} style={{ height: '100%' }}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection variant="fadeIn" className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/products" className="btn btn-outline btn-lg" id="view-all-products-btn">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className={`section ${styles.whyUs}`} id="why-us-section">
        <div className="container">
          <AnimatedSection variant="blurReveal" className="text-center">
            <p className="section-label">Why Us</p>
            <h2 className="section-title">
              Why Choose <span className="accent-text">Balaji Marketing</span>
            </h2>
            <div className="red-line" />
          </AnimatedSection>

          <div className={styles.whyGrid}>
            {WHY_ITEMS.map((item, index) => (
              <AnimatedSection key={index} variant="slideUp" delay={index * 0.08}>
                <div className={styles.whyCard} id={`why-card-${index}`}>
                  <div className={styles.whyIconWrap}>
                    {item.icon}
                  </div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className={`section ${styles.testimonials}`} id="testimonials-section">
        <div className="container">
          <AnimatedSection variant="blurReveal" className="text-center">
            <p className="section-label">Reviews</p>
            <h2 className="section-title">
              What Our <span className="accent-text">Clients Say</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              Trusted by restaurants, hotels, and retail partners across India.
            </p>
          </AnimatedSection>

          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} variant="slideUp" delay={index * 0.12}>
                <div className={styles.testimonialCard} id={`testimonial-${testimonial.id}`}>
                  <div className={styles.testimonialStars}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className={styles.testimonialName}>{testimonial.name}</div>
                      <div className={styles.testimonialRole}>{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={styles.ctaBanner} id="cta-banner">
        <div className={styles.ctaBannerBg}>
          <div className={styles.ctaBannerGlow1} />
          <div className={styles.ctaBannerGlow2} />
          <div className={styles.ctaBannerDots} />
        </div>
        <div className="container">
          <AnimatedSection variant="scale">
            <div className={styles.ctaContent}>
              <div className={styles.ctaTag}>
                <Tag size={12} />
                <span>Wholesale & Bulk Orders</span>
              </div>
              <h2 className={styles.ctaTitle}>
                Ready to Stock Premium<br />Cookware?
              </h2>
              <p className={styles.ctaSubtitle}>
                Get in touch for wholesale pricing, bulk order discounts, and custom requirements.
              </p>
              <div className={styles.ctaBtns}>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hi, I want to inquire about wholesale cookware pricing.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-primary btn-lg ${styles.ctaBtn}`}
                  id="cta-whatsapp-btn"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
                <Link to="/contact" className={`btn btn-lg ${styles.ctaOutlineBtn}`} id="cta-contact-btn">
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* ===== PAYMENT TRUST STRIP ===== */}
      <section className={styles.paymentStrip}>
        <div className="container">
          <div className={styles.paymentStripInner}>
            <span className={styles.paymentStripLabel}>We Accept:</span>
            {['UPI', 'Visa', 'MasterCard', 'RuPay', 'Net Banking', 'EMI', 'Cash on Delivery'].map((m) => (
              <span key={m} className={styles.paymentChip}>{m}</span>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
