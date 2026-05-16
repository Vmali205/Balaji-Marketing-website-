import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, MessageCircle, Check, ChevronRight, Package } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import useProducts from '../../hooks/useProducts';
import { CATEGORIES, WHATSAPP_LINK } from '../../utils/constants';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, loading } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  const category = useMemo(
    () => product ? CATEGORIES.find((c) => c.id === product.category) : null,
    [product]
  );

  // Get related products from same category
  const relatedProducts = useMemo(
    () => product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : [],
    [products, product]
  );

  // Build image gallery (main image + category hero image as variants)
  const imageGallery = useMemo(() => {
    if (!product) return [];
    const images = [];
    if (product.image) images.push(product.image);
    if (category?.heroImage && category.heroImage !== product.image) images.push(category.heroImage);
    if (category?.image && category.image !== product.image) images.push(category.image);
    // If still not enough, add some category images for visual
    if (images.length < 3) {
      const extra = CATEGORIES
        .filter(c => c.id !== product.category)
        .slice(0, 3 - images.length)
        .map(c => c.image);
      images.push(...extra);
    }
    return images;
  }, [product, category]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Balaji Marketing Vasai`;
      window.scrollTo(0, 0);
    }
  }, [product]);

  useEffect(() => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in "${product.name}"${selectedSize ? ` (Size: ${selectedSize})` : ''} — Qty: ${quantity}. Please share pricing and availability.`
  );

  const handleQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.page}
    >
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <div className={styles.breadcrumbInner}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/products" className={styles.breadcrumbLink}>Products</Link>
            <ChevronRight size={14} />
            {category && (
              <>
                <Link to={`/products/${category.id}`} className={styles.breadcrumbLink}>{category.name}</Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className={styles.productSection}>
        <div className="container">
          <div className={styles.productGrid}>
            {/* Left — Image Gallery */}
            <AnimatedSection variant="slideRight" className={styles.galleryCol}>
              <div className={styles.gallery}>
                <div className={styles.thumbnailList}>
                  {imageGallery.map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumbnailBtn} ${selectedImage === i ? styles.thumbnailActive : ''}`}
                      onClick={() => setSelectedImage(i)}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} />
                    </button>
                  ))}
                </div>
                <div className={styles.mainImage}>
                  <div className={styles.mainImageInner}>
                    {imageGallery[selectedImage] ? (
                      <img
                        src={imageGallery[selectedImage]}
                        alt={product.name}
                        className={styles.heroImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <Package size={80} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Product Info */}
            <AnimatedSection variant="slideLeft" delay={0.15} className={styles.infoCol}>
              <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>{product.name}</h1>

                <p className={styles.sku}>SKU: BM-{product.id.toString().padStart(4, '0')}</p>

                <div className={styles.stockBadge}>
                  <Check size={16} />
                  <span>In Stock</span>
                </div>

                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Contact for Wholesale Price</span>
                </div>

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className={styles.sizeSection}>
                    <p className={styles.sizeLabel}>Size:</p>
                    <div className={styles.sizeOptions}>
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className={styles.quantitySection}>
                  <p className={styles.quantityLabel}>Quantity:</p>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => handleQuantity(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => handleQuantity(1)}
                      disabled={quantity >= 99}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                  <a
                    href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.addToCartBtn}
                  >
                    <ShoppingCart size={20} />
                    <span>Get Quote</span>
                  </a>
                  <a
                    href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buyNowBtn}
                  >
                    <MessageCircle size={20} />
                    <span>BUY NOW</span>
                    <ChevronRight size={18} />
                  </a>
                </div>

                {product.amazonLink && (
                  <a
                    href={product.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.amazonBtn}
                  >
                    View on Amazon
                  </a>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className={styles.descriptionSection}>
        <div className="container">
          <AnimatedSection variant="slideUp">
            <div className={styles.descriptionCard}>
              <h2 className={styles.descriptionTitle}>Description</h2>
              <div className={styles.descriptionDivider} />
              <p className={styles.descriptionText}>
                {product.description}
              </p>
              {category && (
                <div className={styles.featuresList}>
                  <h3>Key Features</h3>
                  <ul>
                    {category.features.map((f, i) => (
                      <li key={i}>
                        <Check size={16} className={styles.featureCheck} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={`section ${styles.relatedSection}`}>
          <div className="container">
            <AnimatedSection>
              <h2 className="section-title">
                You May Also <span className="accent-text">Like</span>
              </h2>
              <div className="red-line" />
            </AnimatedSection>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((rp, i) => (
                <AnimatedSection key={rp.id} variant="slideUp" delay={i * 0.1}>
                  <Link to={`/product/${rp.id}`} className={styles.relatedCard}>
                    <div className={styles.relatedImageWrap}>
                      {rp.image ? (
                        <img src={rp.image} alt={rp.name} />
                      ) : (
                        <div className={styles.relatedPlaceholder}>
                          <Package size={36} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className={styles.relatedInfo}>
                      <h4>{rp.name}</h4>
                      <span className={styles.relatedCta}>View Details →</span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className={styles.backSection}>
        <div className="container">
          <Link to={category ? `/products/${category.id}` : '/products'} className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Back to {category ? category.name : 'Products'}</span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
};

export default ProductDetail;
