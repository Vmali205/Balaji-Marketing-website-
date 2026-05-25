import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Award, Truck, Shield, Users, MessageCircle, Sparkles, Package, Camera, Star } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import AnimatedCounter from '../../components/AnimatedCounter/AnimatedCounter';
import HeroCanvas from '../../components/HeroCanvas/HeroCanvas';
import Marquee from '../../components/Marquee/Marquee';
import { CATEGORIES, WHATSAPP_LINK } from '../../utils/constants';
import styles from './Home.module.css';

const SHOP_VIDEOS = [
  {
    id: 'kadai',
    title: 'Tri-Ply Kadai',
    thumbnail: '/images/products/kadai-hero.png',
    video: '/videos/kadai.mp4',
    link: '/product/1',
  },
  {
    id: 'fry-pan',
    title: 'Premium Fry Pan',
    thumbnail: '/images/products/fry-pan-hero.png',
    video: '/videos/fry-pan.mp4',
    link: '/product/2',
  },
  {
    id: 'sauce-pan',
    title: 'Sauce Pan Set',
    thumbnail: '/images/products/sauce-pan-hero.png',
    video: '/videos/sauce-pan.mp4',
    link: '/product/3',
  },
  {
    id: 'cook-pots',
    title: 'Cook Pots',
    thumbnail: '/images/products/cook-pots-hero.png',
    video: '/videos/cook-pots.mp4',
    link: '/product/4',
  },
  {
    id: 'wok',
    title: 'Professional Wok',
    thumbnail: '/images/products/wok-hero.png',
    video: '/videos/wok.mp4',
    link: '/product/5',
  },
];

const MARQUEE_ITEMS = [
  'Premium Cookware',
  'Tri-Ply Stainless Steel',
  'Wholesale Pricing',
  'Pan-India Delivery',
  'Trusted Since 2015',
  'B2B Partners',
  'Professional Grade',
  'Built to Last',
];

// Stagger animation variants for children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const floatVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Parallax section wrapper
const ParallaxSection = ({ children, className, offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const Home = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, -80]);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    document.title = 'Balaji Marketing Vasai | Premium Tri-Ply Cookware Wholesale';
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ===== HERO ===== */}
      <section className={styles.hero} ref={heroRef}>
        <HeroCanvas />
        <div className={styles.heroBackground}>
          <div className={styles.heroBgGlow1} />
          <div className={styles.heroBgGlow2} />
          <div className={styles.heroGrid} />
          {/* Animated floating orbs */}
          <div className={styles.floatingOrb1} />
          <div className={styles.floatingOrb2} />
          <div className={styles.floatingOrb3} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroTextCol}
              style={{ y: heroTextY, opacity: heroOpacity }}
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <motion.div variants={childVariants}>
                <div className={styles.badge}>
                  <Sparkles size={14} />
                  <span className={styles.badgeText}>Trusted Wholesale Partner Since 2015</span>
                  <span className={styles.badgeShimmer} />
                </div>
              </motion.div>

              <motion.h1 variants={childVariants} className={styles.heroTitle}>
                Premium <span>Cookware</span> <br />
                for Your Business
              </motion.h1>

              <motion.p variants={childVariants} className={styles.heroSubtitle}>
                Elevate your culinary offerings with our professional-grade stainless steel cookware. 
                Built for performance, designed for durability — available at competitive wholesale prices.
              </motion.p>

              <motion.div variants={childVariants} className={styles.heroActions}>
                <Link to="/catalogue" className="btn btn-primary btn-lg">
                  <span className={styles.btnShine} />
                  Browse Collection
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hi, I want to inquire about wholesale cookware pricing.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <MessageCircle size={18} />
                  Get Quote
                </a>
              </motion.div>

              <motion.div variants={childVariants} className={styles.heroStats}>
                <div className={styles.stat}>
                  <h3>
                    <AnimatedCounter target={50} suffix="+" />
                  </h3>
                  <p>Product SKU's</p>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <h3>
                    <AnimatedCounter target={500} suffix="+" duration={2500} />
                  </h3>
                  <p>B2B Partners</p>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <h3>
                    <AnimatedCounter target={10} suffix="+" duration={1500} />
                  </h3>
                  <p>Years Exp.</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.heroImageCol}
              style={{ y: heroImageY }}
              variants={floatVariants}
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <div className={styles.heroImageWrapper}>
                <div className={styles.heroImageGlow} />
                <div className={styles.heroImageRing} />
                <img 
                  src="/images/hero/hero-pot-cinematic.png" 
                  alt="Premium Aurum Cookware Cinematic" 
                  className={styles.heroImg} 
                />
                {/* Floating mini badges around the image */}
                <motion.div
                  className={`${styles.floatingBadge} ${styles.floatingBadge1}`}
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Star size={14} />
                  <span>Premium</span>
                </motion.div>
                <motion.div
                  className={`${styles.floatingBadge} ${styles.floatingBadge2}`}
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                >
                  <Shield size={14} />
                  <span>Tri-Ply</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ===== MARQUEE DIVIDER ===== */}
      <Marquee items={MARQUEE_ITEMS} speed={30} separator="✦" />

      {/* ===== CATEGORIES ===== */}
      <section className={`section ${styles.categories}`}>
        <div className="container">
          <AnimatedSection variant="blurReveal" className="text-center">
            <div className={styles.badge} style={{ margin: '0 auto 1.5rem' }}>
              <Package size={14} />
              <span className={styles.badgeText}>Premium Collection</span>
            </div>
            <h2 className="section-title">
              Explore Our <span className="accent-text">Categories</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              Professional-grade tri-ply cookware designed for performance and built to last.
            </p>
          </AnimatedSection>

          <div className={styles.catGrid}>
            {CATEGORIES.map((cat, index) => (
              <AnimatedSection key={cat.id} variant="slideUp" delay={index * 0.08}>
                <Link to={`/products/${cat.id}`} className={styles.catCard}>
                  <div className={styles.catImageWrapper}>
                    <img src={cat.image} alt={cat.name} className={styles.catImage} />
                    <div className={styles.catOverlay} />
                  </div>
                  <div className={styles.catContent}>
                    <span className={styles.catName}>{cat.name}</span>
                    <div className={styles.catArrowWrap}>
                      <ArrowRight size={16} className={styles.catArrow} />
                    </div>
                  </div>
                  <div className={styles.catGlowBorder} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOP BY VIDEOS ===== */}
      <section className={`section ${styles.shopByVideos}`}>
        <div className="container">
          <AnimatedSection variant="blurReveal" className="text-center">
            <h2 className={styles.shopVideosTitle}>
              SHOP BY VIDEO
            </h2>
            <div className={styles.shopVideosTitleLine} />
          </AnimatedSection>

          <div className={styles.videoGrid}>
            {SHOP_VIDEOS.map((video, index) => (
              <AnimatedSection key={video.id} variant="slideUp" delay={index * 0.1}>
                <div className={styles.videoCard}>
                  <Link to={video.link} className={styles.videoThumbnail}>
                    {video.video ? (
                      <video
                        src={video.video}
                        poster={video.thumbnail}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className={styles.videoElement}
                      />
                    ) : (
                      <img src={video.thumbnail} alt={video.title} />
                    )}
                    <div className={styles.videoOverlay} />
                    <div className={styles.videoLabel}>
                      <span>BALAJI</span>
                    </div>
                  </Link>
                  <Link to={video.link} className={styles.shopNowBtn}>
                    Shop by Video
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className={`section ${styles.whyUs}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">
              Why Choose <span className="accent-text">Balaji Marketing</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              We combine quality craftsmanship with competitive pricing to deliver
              cookware that exceeds expectations.
            </p>
          </AnimatedSection>

          <div className={styles.whyGrid}>
            {[
              {
                icon: <Award size={28} />,
                title: 'Premium Quality',
                desc: 'Every piece is crafted with precision using tri-ply stainless steel for superior heat distribution and durability.',
              },
              {
                icon: <Users size={28} />,
                title: 'Wholesale Pricing',
                desc: 'Competitive bulk pricing for retailers, distributors, and businesses. The best value without compromising quality.',
              },
              {
                icon: <Truck size={28} />,
                title: 'Pan-India Delivery',
                desc: 'Reliable shipping across India with secure packaging. Your orders delivered safely and on time.',
              },
              {
                icon: <Shield size={28} />,
                title: 'Trusted Brand',
                desc: 'Over a decade of experience serving satisfied clients. Quality you can trust, service you can rely on.',
              },
            ].map((item, index) => (
              <AnimatedSection key={index} variant="slideUp" delay={index * 0.1} className={styles.whyWrapper}>
                <div className={`glass-card ${styles.whyCard}`}>
                  <div className={styles.whyIconWrapper}>
                    <div className={styles.whyIcon}>{item.icon}</div>
                    <div className={styles.whyIconPulse} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaParticles}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.ctaParticle} style={{
              '--delay': `${i * 0.8}s`,
              '--x': `${20 + Math.random() * 60}%`,
              '--size': `${4 + Math.random() * 8}px`,
            }} />
          ))}
        </div>
        <AnimatedSection variant="scale">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Ready to Stock Premium Cookware?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Get in touch for wholesale pricing and bulk order inquiries.
          </motion.p>
          <div className={styles.ctaBtns}>
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hi, I want to inquire about wholesale cookware pricing.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaIconBtn}
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaIconBtn}
              aria-label="Instagram"
            >
              <Camera size={24} />
              <span>Instagram</span>
            </a>
          </div>
        </AnimatedSection>
      </section>
    </motion.main>
  );
};

export default Home;
