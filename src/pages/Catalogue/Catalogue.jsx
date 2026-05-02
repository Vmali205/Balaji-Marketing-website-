import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, FilterX, ArrowRight } from 'lucide-react';
import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import { CATEGORIES } from '../../utils/constants';
import styles from './Catalogue.module.css';

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.cataloguePage}>
      {/* Header Section */}
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection animation="fadeIn">
            <h1 className={styles.title}>Our <span className="accent-text">Catalogue</span></h1>
            <p className={styles.subtitle}>
              Explore our premium range of tri-ply cookware designed for professional performance and lifelong durability.
            </p>
            <div className={styles.heroActions}>
              <a 
                href="/catalogue.pdf" 
                download="Balaji_Marketing_Catalogue.pdf"
                className="btn btn-outline"
                style={{ borderColor: 'white', color: 'white' }}
              >
                Download PDF Catalogue
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className={styles.categoryCardsSection}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Browse by <span className="accent-text">Category</span></h2>
            <div className="red-line" />
          </AnimatedSection>
          <div className={styles.categoryCards}>
            {CATEGORIES.map((cat, i) => (
              <AnimatedSection key={cat.id} variant="slideUp" delay={i * 0.07}>
                <Link to={`/products/${cat.id}`} className={styles.categoryCard}>
                  <div className={styles.categoryCardImgWrap}>
                    <img src={cat.image} alt={cat.name} className={styles.categoryCardImg} />
                  </div>
                  <div className={styles.categoryCardInfo}>
                    <h3>{cat.name}</h3>
                    <ArrowRight size={16} className={styles.categoryCardArrow} />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className={styles.controlsSection}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">All <span className="accent-text">Products</span></h2>
            <div className="red-line" />
          </AnimatedSection>
          <div className={styles.controlsWrapper}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className="container">
          {loading ? (
            <div className="page-loader">
              <div className="spinner" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className={styles.productsGrid}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '100%' }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <AnimatedSection animation="fadeIn">
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>
                  <FilterX size={48} />
                </div>
                <h3>No products found</h3>
                <p>Try adjusting your search or category filter to find what you're looking for.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('all');
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Bulk Order CTA */}
      <section className={styles.bulkCta}>
        <div className="container">
          <div className={styles.bulkCard}>
            <div className={styles.bulkContent}>
              <h2>Looking for <span className="accent-text">Wholesale</span> or Bulk Orders?</h2>
              <p>We offer special pricing for distributors, retailers, and hospitality businesses across India.</p>
            </div>
            <div className={styles.bulkAction}>
              <a href="/contact" className="btn btn-primary btn-lg">
                <ShoppingBag size={20} />
                Inquire for Bulk Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Catalogue;
