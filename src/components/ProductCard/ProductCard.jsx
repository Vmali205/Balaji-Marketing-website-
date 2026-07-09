import { ExternalLink, MessageCircle, Package, ArrowRight, ShoppingCart, Eye, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../Toast/Toast';
import { WHATSAPP_LINK, CATEGORIES, SHIPPING_CONFIG, PURCHASE_MODES } from '../../utils/constants';
import styles from './ProductCard.module.css';

// Static star rating for UI — shows 4-5 stars based on category
const StarRating = ({ count = 5 }) => (
  <div className={styles.starRow}>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < count ? '#F59E0B' : 'transparent'}
        color={i < count ? '#F59E0B' : '#D1D5DB'}
        strokeWidth={i < count ? 0 : 1.5}
      />
    ))}
    <span className={styles.starCount}>({(Math.floor(Math.random() * 80) + 20)})</span>
  </div>
);

const ProductCard = ({ product }) => {
  const { name, category, image, sizes, description, amazonLink, price, mrp, purchaseMode, isOnlinePurchase, isWholesaleOnly } = product;
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const navigate = useNavigate();
  const categoryData = CATEGORIES.find((c) => c.id === category);
  const categoryLabel = categoryData ? categoryData.name : category;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in "${name}" from your catalogue. Please share pricing and availability details.`
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = sizes && sizes.length > 0 ? sizes[0] : null;
    addToCart(product, 1, defaultSize);
    addToast(`${name} added to cart`, 'success');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = sizes && sizes.length > 0 ? sizes[0] : null;
    addToCart(product, 1, defaultSize);
    navigate('/checkout');
  };


  const canBuyOnline = isOnlinePurchase || purchaseMode === PURCHASE_MODES.ONLINE || purchaseMode === PURCHASE_MODES.BOTH;
  const hasAmazon = !!amazonLink;
  const isWholesale = isWholesaleOnly || purchaseMode === PURCHASE_MODES.WHOLESALE;
  const hasDiscount = mrp && price && mrp > price;
  const discountPct = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

  // Use a deterministic star count based on product ID
  const starCount = product.id ? (((product.id * 3) % 2) === 0 ? 5 : 4) : 5;

  return (
    <div className={styles.card} id={`product-card-${product.id}`}>
      {/* ===== IMAGE AREA ===== */}
      <Link to={`/product/${product.id}`} className={styles.imageWrap}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>
            <Package size={44} strokeWidth={1} />
          </div>
        )}

        {/* Badges */}
        <div className={styles.badgesTop}>
          <span className={styles.categoryBadge}>{categoryLabel}</span>
        </div>

        {hasDiscount && (
          <span className={styles.discountBadge}>-{discountPct}%</span>
        )}

        {/* Hover quick action overlay */}
        <div className={styles.quickActions}>
          <button
            className={styles.quickBtn}
            onClick={handleAddToCart}
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingCart size={15} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className={styles.quickBtn}
            title="Quick View"
            aria-label="Quick view"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye size={15} />
          </Link>
        </div>
      </Link>

      {/* ===== CONTENT AREA ===== */}
      <div className={styles.content}>
        {/* Star Rating */}
        <div className={styles.starRow}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < starCount ? '#F59E0B' : 'transparent'}
              color={i < starCount ? '#F59E0B' : '#D1D5DB'}
              strokeWidth={i < starCount ? 0 : 1.5}
            />
          ))}
          <span className={styles.starCount}>({20 + (product.id % 80)})</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className={styles.name}>{name}</h3>
        </Link>

        {/* Price Display */}
        {price ? (
          <div className={styles.priceRow}>
            <span className={styles.price}>{SHIPPING_CONFIG.currency}{price.toLocaleString('en-IN')}</span>
            {hasDiscount && (
              <span className={styles.mrp}>{SHIPPING_CONFIG.currency}{mrp.toLocaleString('en-IN')}</span>
            )}
            {hasDiscount && (
              <span className={styles.savingsLabel}>Save {discountPct}%</span>
            )}
          </div>
        ) : (
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Contact for Price</span>
          </div>
        )}

        {/* Size chips */}
        {sizes && sizes.length > 0 && (
          <div className={styles.sizes}>
            {sizes.slice(0, 4).map((size, i) => (
              <span key={i} className={styles.sizeChip}>{size}</span>
            ))}
            {sizes.length > 4 && <span className={styles.sizeChip}>+{sizes.length - 4}</span>}
          </div>
        )}

        {/* CTA Buttons */}
        <div className={styles.actions}>
          {canBuyOnline && (
            <>
              <button
                onClick={handleAddToCart}
                className={`btn btn-outline ${styles.btn}`}
                id={`add-to-cart-${product.id}`}
              >
                <ShoppingCart size={13} />
                Cart
              </button>
              <button
                onClick={handleBuyNow}
                className={`btn btn-primary ${styles.btn}`}
                id={`buy-now-${product.id}`}
              >
                Buy Now
              </button>
            </>
          )}

          {hasAmazon && (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-amazon ${styles.btn}`}
              id={`amazon-btn-${product.id}`}
            >
              <ExternalLink size={13} />
              Amazon
            </a>
          )}

          {isWholesale && !canBuyOnline && (
            <a
              href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.btn}`}
              id={`wholesale-btn-${product.id}`}
            >
              <MessageCircle size={13} />
              Get Quote
            </a>
          )}

          {!canBuyOnline && !isWholesale && !hasAmazon && (
            <a
              href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.btn}`}
              id={`enquiry-btn-${product.id}`}
            >
              <MessageCircle size={13} />
              Get Quote
              <ArrowRight size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
