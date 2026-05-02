import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import HeroCanvas from '../../components/HeroCanvas/HeroCanvas';
import { CATEGORIES, WHATSAPP_LINK } from '../../utils/constants';
import styles from './Products.module.css';

const Products = () => {
  useEffect(() => {
    document.title = 'Our Products | Balaji Marketing Vasai';
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.productsPage}
    >
      {/* Hero Section */}
      <section className={styles.hero}>
        <HeroCanvas />
        <div className="container">
          <AnimatedSection variant="slideUp">
            <h1 className={styles.title}>Our <span className="accent-text">Cookware</span> Range</h1>
            <div className="red-line" />
            <p className={styles.subtitle}>
              Discover our complete collection of professional tri-ply stainless steel cookware. 
              Engineered for precision, performance, and durability.
            </p>
            <div className={styles.heroActions}>
              <Link to="/catalogue" className="btn btn-primary btn-lg">
                View All Products
                <ShoppingBag size={18} />
              </Link>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hi, I want to inquire about your complete cookware range and wholesale prices.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
              >
                <MessageCircle size={18} />
                Get Wholesale Quote
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories Grid */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Explore by <span className="accent-text">Category</span></h2>
            <p className="section-subtitle">
              Click on a category to view our specific collection and available sizes.
            </p>
          </AnimatedSection>

          <div className={styles.catGrid}>
            {CATEGORIES.map((cat, index) => (
              <AnimatedSection key={cat.id} variant="slideUp" delay={index * 0.1}>
                <Link to={`/products/${cat.id}`} className={styles.catCard}>
                  <div className={styles.catImageWrap}>
                    <img src={cat.image} alt={cat.name} className={styles.catImage} />
                    <div className={styles.catOverlay}>
                      <span className={styles.viewLabel}>View Collection</span>
                    </div>
                  </div>
                  <div className={styles.catContent}>
                    <h3>{cat.name}</h3>
                    <p>{cat.description.substring(0, 80)}...</p>
                    <div className={styles.catFooter}>
                      <span className={styles.catLink}>
                        Explore {cat.name}
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.featuresInner}>
            <AnimatedSection variant="slideRight">
              <div className={styles.featuresText}>
                <h2>Why Choose Our <span className="accent-text">Tri-Ply Technology?</span></h2>
                <div className="red-line" style={{ margin: '1rem 0' }} />
                <p>
                  Our cookware is crafted using an advanced tri-ply construction that bonds three layers of metal from base to rim.
                </p>
                <ul className={styles.featureList}>
                  <li>
                    <strong>Superior Heat Control:</strong> The aluminum core provides rapid and even heating, eliminating hot spots.
                  </li>
                  <li>
                    <strong>Induction Ready:</strong> Compatible with all cooktops, including gas, electric, and induction.
                  </li>
                  <li>
                    <strong>Durability:</strong> High-quality stainless steel ensures your cookware lasts for decades.
                  </li>
                  <li>
                    <strong>Food Safe:</strong> Non-reactive 18/10 stainless steel interior preserves the flavor and nutritional value of food.
                  </li>
                </ul>
                <Link to="/about" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                  Learn More About Tri-Ply
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="slideLeft" className={styles.featuresImageCol}>
              <div className={styles.imageStack}>
                <div className={styles.mainImgWrap}>
                  <img src="/images/categories/kadai.png" alt="Cookware quality" />
                </div>
                <div className={styles.accentImgWrap}>
                  <img src="/images/categories/fry-pan.png" alt="Cookware detail" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection variant="scale">
            <div className={styles.ctaCard}>
              <h2>Ready to upgrade your kitchen?</h2>
              <p>Contact us today for wholesale inquiries, bulk orders, or custom requirements.</p>
              <div className={styles.ctaActions}>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hi, I am interested in your products. Please share more details.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us Now
                </a>
                <Link to="/contact" className="btn btn-outline btn-lg">
                  Contact Form
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.main>
  );
};

export default Products;
