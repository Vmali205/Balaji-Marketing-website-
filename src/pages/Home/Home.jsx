import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Award, Truck, Shield, Users, MessageCircle,
  Star, Package, ChevronRight, CheckCircle, Zap, Tag,
  ChevronLeft
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

/* ===== HERO SLIDESHOW DATA ===== */
const HERO_SLIDES = [
  {
    id: 0,
    tag: 'Premium Tri-Ply Quality',
    title: 'Stainless Steel\nCook Pots',
    subtitle: 'Professional-grade tri-ply construction for even heat distribution. Built to last a lifetime.',
    cta: 'Know More',
    link: '/products/cook-pots',
    image: '/images/products/cook-pots-hero.png',
    accentColor: '#C62828',
  },
  {
    id: 1,
    tag: 'Durable & Versatile',
    title: 'Heavy Duty\nKadai Series',
    subtitle: 'Deep kadais with perfect heat retention — ideal for restaurants, hotels, and bulk kitchens.',
    cta: 'Know More',
    link: '/products/kadai',
    image: '/images/products/kadai-hero.png',
    accentColor: '#C62828',
  },
  {
    id: 2,
    tag: 'Non-stick Excellence',
    title: 'Premium\nFry Pans',
    subtitle: 'Induction compatible fry pans with mirror-finish steel — designed for effortless cooking.',
    cta: 'Know More',
    link: '/products/fry-pan',
    image: '/images/products/fry-pan-hero.png',
    accentColor: '#C62828',
  },
  {
    id: 3,
    tag: 'Insulated & Stylish',
    title: 'Vacuum\nInsulated Bottles',
    subtitle: 'Keep beverages hot or cold for 24 hours. Premium stainless steel construction.',
    cta: 'Know More',
    link: '/products/bottles',
    image: '/images/products/bottle-flasks-hero.png',
    accentColor: '#C62828',
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
  const { products, loading: productsLoading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  /* ===== SLIDESHOW STATE ===== */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const goToSlide = useCallback((index, dir) => {
    setDirection(dir);
    setCurrentSlide(index);
  }, []);

  const goNext = useCallback(() => {
    const next = (currentSlide + 1) % HERO_SLIDES.length;
    goToSlide(next, 1);
  }, [currentSlide, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = (currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToSlide(prev, -1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(goNext, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [goNext, isPaused]);

  useEffect(() => {
    document.title = 'Balaji Marketing Vasai | Premium Tri-Ply Cookware Wholesale';
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  /* Slide animation variants */
  const textVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.35 } }),
  };

  const imageVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.92 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.95, transition: { duration: 0.35 } }),
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ===== HERO SLIDESHOW ===== */}
      <section
        className={styles.hero}
        id="hero-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle decorative bg */}
        <div className={styles.heroBg}>
          <div className={styles.heroDotGrid} />
          <div className={styles.heroAccentBlob1} />
        </div>

        <div className={styles.heroSliderWrap}>
          {/* LEFT ARROW */}
          <button
            className={`${styles.slideArrow} ${styles.slideArrowLeft}`}
            onClick={goPrev}
            aria-label="Previous slide"
            id="hero-prev-btn"
          >
            <ChevronLeft size={22} />
          </button>

          {/* SLIDE CONTENT */}
          <div className={styles.heroContent}>
            {/* LEFT: Text column */}
            <div className={styles.heroTextCol}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`text-${currentSlide}`}
                  className={styles.heroTextInner}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className={styles.heroTag}>
                    {slide.tag}
                  </div>

                  <h1 className={styles.heroTitle}>
                    {slide.title.split('\n').map((line, i) => (
                      <span key={i}>{line}{i < slide.title.split('\n').length - 1 && <br />}</span>
                    ))}
                  </h1>

                  <p className={styles.heroSubtitle}>{slide.subtitle}</p>

                  <div className={styles.heroChecks}>
                    {['ISI Certified', 'Induction Ready', 'Bulk Pricing'].map((item) => (
                      <div key={item} className={styles.heroCheck}>
                        <CheckCircle size={13} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.heroActions}>
                    <Link
                      to={slide.link}
                      className={styles.heroKnowMoreBtn}
                      id={`hero-cta-${currentSlide}`}
                    >
                      {slide.cta}
                      <ArrowRight size={15} />
                    </Link>
                    <Link to="/catalogue" className={styles.heroCatalogueBtn} id="hero-catalogue-btn">
                      View Catalogue
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Stats strip */}
              <div className={styles.heroStats}>
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
              </div>
            </div>

            {/* RIGHT: Image column */}
            <div className={styles.heroImageCol}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`img-${currentSlide}`}
                  className={styles.heroImageFrame}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className={styles.heroImageBg} />
                  <img
                    src={slide.image}
                    alt={slide.title.replace('\n', ' ')}
                    className={styles.heroImg}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            className={`${styles.slideArrow} ${styles.slideArrowRight}`}
            onClick={goNext}
            aria-label="Next slide"
            id="hero-next-btn"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* DOT INDICATORS */}
        <div className={styles.slideDots}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.slideDot} ${i === currentSlide ? styles.slideDotActive : ''}`}
              onClick={() => goToSlide(i, i > currentSlide ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              id={`hero-dot-${i}`}
            />
          ))}
        </div>

        {/* PROGRESS BAR */}
        {!isPaused && (
          <div className={styles.slideProgress}>
            <motion.div
              key={currentSlide}
              className={styles.slideProgressBar}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        )}
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
                <AnimatedSection 
                  key={product.id} 
                  variant="slideUp" 
                  delay={index * 0.09} 
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
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
