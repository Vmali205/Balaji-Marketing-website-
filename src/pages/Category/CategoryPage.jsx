import { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShoppingBag, ExternalLink } from 'lucide-react';
import useProducts from '../../hooks/useProducts';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import { CATEGORIES, WHATSAPP_LINK } from '../../utils/constants';
import styles from './CategoryPage.module.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { products, loading } = useProducts();

  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId),
    [categoryId]
  );

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === categoryId),
    [products, categoryId]
  );

  // Get adjacent categories for navigation
  const catIndex = CATEGORIES.findIndex((c) => c.id === categoryId);
  const prevCat = catIndex > 0 ? CATEGORIES[catIndex - 1] : null;
  const nextCat = catIndex < CATEGORIES.length - 1 ? CATEGORIES[catIndex + 1] : null;

  useEffect(() => {
    if (category) {
      document.title = `${category.name} | Balaji Marketing Vasai`;
    }
    window.scrollTo(0, 0);
  }, [category]);

  if (!category) {
    return <Navigate to="/catalogue" replace />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <img
            src={category.heroImage}
            alt={category.name}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <AnimatedSection variant="slideUp">
            <Link to="/catalogue" className={styles.backLink}>
              <ArrowLeft size={18} />
              <span>All Categories</span>
            </Link>

            <h1 className={styles.heroTitle}>
              {category.name}
            </h1>
            <p className={styles.heroDescription}>
              {category.description}
            </p>

            <div className={styles.heroActions}>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Hi, I'm interested in your ${category.name} collection. Please share pricing details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <MessageCircle size={18} />
                Get Wholesale Quote
              </a>
              <Link to="/catalogue" className="btn btn-outline btn-lg">
                <ShoppingBag size={18} />
                Full Catalogue
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className={styles.featuresStrip}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {category.features.map((feature, i) => (
              <AnimatedSection key={i} variant="slideUp" delay={i * 0.1}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <Check size={18} />
                  </div>
                  <span>{feature}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AVAILABLE SIZES ===== */}
      <section className={`section ${styles.sizesSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">
              Available <span className="accent-text">Sizes</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              Choose from a range of sizes to suit your needs — from compact to commercial.
            </p>
          </AnimatedSection>

          <div className={styles.sizesGrid}>
            {category.sizes.map((size, i) => (
              <AnimatedSection key={i} variant="scale" delay={i * 0.08}>
                <div className={styles.sizeCard}>
                  <span className={styles.sizeValue}>{size}</span>
                  <span className={styles.sizeLabel}>Diameter</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS IN THIS CATEGORY ===== */}
      <section className={`section ${styles.productsSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">
              {category.name} <span className="accent-text">Collection</span>
            </h2>
            <div className="red-line" />
            <p className="section-subtitle">
              Browse our {category.name.toLowerCase()} range — each piece crafted with precision tri-ply technology.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="page-loader">
              <div className="spinner" />
            </div>
          ) : categoryProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              <AnimatePresence mode="popLayout">
                {categoryProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{ height: '100%' }}
                  >
                    <CategoryProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <AnimatedSection variant="fadeIn">
              <div className={styles.emptyState}>
                <ShoppingBag size={48} strokeWidth={1} />
                <h3>Products Coming Soon</h3>
                <p>
                  We're currently updating our {category.name.toLowerCase()} collection.
                  Contact us for the latest availability.
                </p>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Hi, I'm looking for ${category.name} products. What do you have available?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <MessageCircle size={16} />
                  Ask About Availability
                </a>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ===== CATEGORY NAVIGATION ===== */}
      <section className={styles.catNav}>
        <div className="container">
          <div className={styles.catNavInner}>
            {prevCat ? (
              <Link to={`/products/${prevCat.id}`} className={styles.catNavLink}>
                <ArrowLeft size={20} />
                <div>
                  <span className={styles.catNavLabel}>Previous</span>
                  <span className={styles.catNavName}>{prevCat.name}</span>
                </div>
              </Link>
            ) : <div />}

            <Link to="/catalogue" className={styles.catNavCenter}>
              View All Categories
            </Link>

            {nextCat ? (
              <Link to={`/products/${nextCat.id}`} className={`${styles.catNavLink} ${styles.catNavRight}`}>
                <div>
                  <span className={styles.catNavLabel}>Next</span>
                  <span className={styles.catNavName}>{nextCat.name}</span>
                </div>
                <ArrowRight size={20} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection variant="scale">
            <div className={styles.ctaCard}>
              <h2>Interested in {category.name}?</h2>
              <p>Get the best wholesale pricing and bulk order discounts for your business.</p>
              <div className={styles.ctaActions}>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Hi, I want to place a bulk order for ${category.name}. Please share pricing.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
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

/* ===== PRODUCT CARD FOR CATEGORY PAGE ===== */
const CategoryProductCard = ({ product }) => {
  const { name, image, sizes, description, amazonLink } = product;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in "${name}" from your catalogue. Please share pricing and availability details.`
  );

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrap}>
        {image ? (
          <img src={image} alt={name} className={styles.productImage} loading="lazy" />
        ) : (
          <div className={styles.productPlaceholder}>
            <ShoppingBag size={40} strokeWidth={1} />
          </div>
        )}
      </div>

      <div className={styles.productContent}>
        <h3 className={styles.productName}>{name}</h3>
        {description && <p className={styles.productDesc}>{description}</p>}

        {sizes && sizes.length > 0 && (
          <div className={styles.productSizes}>
            {sizes.map((size, i) => (
              <span key={i} className={styles.productSizeChip}>{size}</span>
            ))}
          </div>
        )}

        <div className={styles.productActions}>
          {amazonLink ? (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-amazon ${styles.productBtn}`}
            >
              <ExternalLink size={14} />
              View on Amazon
            </a>
          ) : (
            <a
              href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.productBtn}`}
            >
              <MessageCircle size={14} />
              Get Quote
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
