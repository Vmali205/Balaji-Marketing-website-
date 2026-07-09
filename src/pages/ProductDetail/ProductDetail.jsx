import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, MessageCircle, Check, ChevronRight, Package, ExternalLink, Truck, Shield, Star } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/Toast/Toast';
import useProducts from '../../hooks/useProducts';
import { CATEGORIES, WHATSAPP_LINK, SHIPPING_CONFIG, PURCHASE_MODES } from '../../utils/constants';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToast } = useToast();
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

  // Build image gallery
  const imageGallery = useMemo(() => {
    if (!product) return [];
    // Use product.images array if available
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    const images = [];
    if (product.image) images.push(product.image);
    if (category?.heroImage && category.heroImage !== product.image) images.push(category.heroImage);
    if (category?.image && category.image !== product.image) images.push(category.image);
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

  const canBuyOnline = product.isOnlinePurchase || product.purchaseMode === PURCHASE_MODES.ONLINE || product.purchaseMode === PURCHASE_MODES.BOTH;
  const hasAmazon = !!product.amazonLink;
  const isWholesale = product.isWholesaleOnly || product.purchaseMode === PURCHASE_MODES.WHOLESALE;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in "${product.name}"${selectedSize ? ` (Size: ${selectedSize})` : ''} — Qty: ${quantity}. Please share pricing and availability.`
  );

  const handleQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    addToast(`${product.name} added to cart`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    window.location.href = '/checkout';
  };

  // Product features (from product data or category data)
  const productFeatures = product.features || category?.features || [];

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
                    {/* Discount Badge */}
                    {product.mrp && product.price && product.mrp > product.price && (
                      <span className={styles.discountBadge}>
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — Product Info */}
            <AnimatedSection variant="slideLeft" delay={0.15} className={styles.infoCol}>
              <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>{product.name}</h1>

                {product.sku && (
                  <p className={styles.sku}>SKU: {product.sku}</p>
                )}

                <div className={styles.stockBadge}>
                  <Check size={16} />
                  <span>{product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'In Stock'}</span>
                </div>

                {/* Price Block */}
                <div className={styles.priceBlock}>
                  {product.price ? (
                    <>
                      <span className={styles.currentPrice}>
                        {SHIPPING_CONFIG.currency}{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <span className={styles.originalPrice}>
                          {SHIPPING_CONFIG.currency}{product.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                      {product.mrp && product.mrp > product.price && (
                        <span className={styles.savingsBadge}>
                          Save {SHIPPING_CONFIG.currency}{(product.mrp - product.price).toLocaleString('en-IN')}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className={styles.priceLabel}>Contact for Wholesale Price</span>
                  )}
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
                {canBuyOnline && (
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
                )}

                {/* Smart Action Buttons */}
                <div className={styles.actionButtons}>
                  {canBuyOnline && (
                    <>
                      <button onClick={handleAddToCart} className={styles.addToCartBtn}>
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </button>
                      <button onClick={handleBuyNow} className={styles.buyNowBtn}>
                        <span>BUY NOW</span>
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {isWholesale && !canBuyOnline && (
                    <a
                      href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.addToCartBtn}
                    >
                      <MessageCircle size={20} />
                      <span>Get Wholesale Quote</span>
                    </a>
                  )}

                  {!canBuyOnline && !isWholesale && (
                    <a
                      href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.addToCartBtn}
                    >
                      <MessageCircle size={20} />
                      <span>Get Quote</span>
                    </a>
                  )}
                </div>

                {hasAmazon && (
                  <a
                    href={product.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.amazonBtn}
                  >
                    <ExternalLink size={16} />
                    Buy on Amazon
                  </a>
                )}

                {/* Trust Badges */}
                <div className={styles.trustBadges}>
                  <div className={styles.trustItem}>
                    <Truck size={16} />
                    <span>Pan-India Delivery</span>
                  </div>
                  <div className={styles.trustItem}>
                    <Shield size={16} />
                    <span>Quality Guaranteed</span>
                  </div>
                  <div className={styles.trustItem}>
                    <Star size={16} />
                    <span>Premium Tri-Ply</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <section className={styles.descriptionSection}>
        <div className="container">
          <AnimatedSection variant="slideUp">
            <div className={styles.descriptionCard}>
              <h2 className={styles.descriptionTitle}>Description</h2>
              <div className={styles.descriptionDivider} />
              <p className={styles.descriptionText}>
                {product.description}
              </p>
              {productFeatures.length > 0 && (
                <div className={styles.featuresList}>
                  <h3>Key Features</h3>
                  <ul>
                    {productFeatures.map((f, i) => (
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
                      {rp.price && (
                        <span className={styles.relatedPrice}>
                          {SHIPPING_CONFIG.currency}{rp.price.toLocaleString('en-IN')}
                        </span>
                      )}
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
