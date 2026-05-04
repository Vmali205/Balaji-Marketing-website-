import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Truck, Shield, Users, MessageCircle, Sparkles, Package, Camera } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import HeroCanvas from '../../components/HeroCanvas/HeroCanvas';
import Hero3D from '../../components/Hero/Hero3D';
import { CATEGORIES, WHATSAPP_LINK } from '../../utils/constants';
import styles from './Home.module.css';

const Home = () => {
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
      <section className={styles.hero}>
        <HeroCanvas />
        <div className={styles.heroBackground}>
          <div className={styles.heroBgGlow1} />
          <div className={styles.heroBgGlow2} />
          <div className={styles.heroGrid} />
        </div>

        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroTextCol}>
              <AnimatedSection variant="fadeIn" delay={0.1}>
                <div className={styles.badge}>
                  <Sparkles size={14} />
                  <span className={styles.badgeText}>Trusted Wholesale Partner Since 2015</span>
                </div>
              </AnimatedSection>

              <AnimatedSection variant="blurReveal" delay={0.2}>
                <h1 className={styles.heroTitle}>
                  Premium <span>Cookware</span> <br />
                  for Your Business
                </h1>
              </AnimatedSection>

              <AnimatedSection variant="blurReveal" delay={0.4}>
                <p className={styles.heroSubtitle}>
                  Elevate your culinary offerings with our professional-grade stainless steel cookware. 
                  Built for performance, designed for durability — available at competitive wholesale prices.
                </p>
              </AnimatedSection>
              <div className={styles.heroActions}>
                <Link to="/catalogue" className="btn btn-primary btn-lg">
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
              </div>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <h3>50+</h3>
                  <p>Product SKU's</p>
                </div>
                <div className={styles.stat}>
                  <h3>500+</h3>
                  <p>B2B Partners</p>
                </div>
              </div>
            </div>

            <AnimatedSection variant="blurReveal" delay={0.6} className={styles.heroImageCol}>
              <div className={styles.heroImageWrapper}>
                <div className={styles.heroImageGlow} />
                <img 
                  src="/images/hero/hero-pot-cinematic.png" 
                  alt="Premium Aurum Cookware Cinematic" 
                  className={styles.heroImg} 
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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
                </Link>
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
              <AnimatedSection key={index} variant="slideUp" delay={index * 0.1}>
                <div className={`glass-card ${styles.whyCard}`}>
                  <div className={styles.whyIcon}>{item.icon}</div>
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
        <AnimatedSection variant="scale">
          <h2>Ready to Stock Premium Cookware?</h2>
          <p>Get in touch for wholesale pricing and bulk order inquiries.</p>
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
