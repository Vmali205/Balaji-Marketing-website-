import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SHIPPING_CONFIG } from '../../utils/constants';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getSubtotal, getShipping, getCartTotal, getCartCount } = useCart();
  const drawerRef = useRef(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getCartTotal();
  const count = getCartCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            ref={drawerRef}
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <ShoppingBag size={20} />
                <h2>Your Cart</h2>
                {count > 0 && <span className={styles.countBadge}>{count}</span>}
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <ShoppingBag size={48} strokeWidth={1} />
                </div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items yet.</p>
                <Link to="/catalogue" className="btn btn-primary" onClick={onClose}>
                  Browse Products
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.itemsList}>
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => {
                      const key = `${item.product.id}-${item.selectedSize || 'default'}`;
                      return (
                        <motion.div
                          key={key}
                          className={styles.cartItem}
                          layout
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className={styles.itemImage}>
                            {item.product.image ? (
                              <img src={item.product.image} alt={item.product.name} />
                            ) : (
                              <ShoppingBag size={24} strokeWidth={1} />
                            )}
                          </div>

                          <div className={styles.itemDetails}>
                            <Link
                              to={`/product/${item.product.id}`}
                              className={styles.itemName}
                              onClick={onClose}
                            >
                              {item.product.name}
                            </Link>
                            {item.selectedSize && (
                              <span className={styles.itemSize}>Size: {item.selectedSize}</span>
                            )}
                            <span className={styles.itemPrice}>
                              {SHIPPING_CONFIG.currency}{item.product.price?.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className={styles.itemControls}>
                            <div className={styles.quantityControl}>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                                className={styles.qtyBtn}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className={styles.qtyValue}>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                                className={styles.qtyBtn}
                                aria-label="Increase quantity"
                                disabled={item.quantity >= 99}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className={styles.removeBtn}
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Summary */}
                <div className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>{SHIPPING_CONFIG.currency}{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className={styles.freeShipping}>FREE</span>
                      ) : (
                        `${SHIPPING_CONFIG.currency}${shipping}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className={styles.shippingNote}>
                      Free shipping on orders above {SHIPPING_CONFIG.currency}{SHIPPING_CONFIG.freeAbove}
                    </p>
                  )}
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>{SHIPPING_CONFIG.currency}{total.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Payment method preview */}
                  <div className={styles.paymentPreview}>
                    <span className={styles.paymentPreviewLabel}>Pay via:</span>
                    {['UPI', 'Cards', 'COD', 'EMI'].map((m) => (
                      <span key={m} className={styles.paymentBadge}>{m}</span>
                    ))}
                  </div>

                  <Link
                    to="/checkout"
                    className={`btn btn-primary btn-lg ${styles.checkoutBtn}`}
                    onClick={onClose}
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </Link>
                  <button className={styles.continueBtn} onClick={onClose}>
                    Continue Shopping
                  </button>

                  {/* Secure badge */}
                  <div className={styles.secureBadge}>
                    <Shield size={13} />
                    <span>Secure &amp; Encrypted Checkout</span>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
