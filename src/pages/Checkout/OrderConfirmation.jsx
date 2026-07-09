import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Truck } from 'lucide-react';
import { SHIPPING_CONFIG } from '../../utils/constants';
import styles from './Checkout.module.css';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    document.title = 'Order Confirmed | Balaji Marketing Vasai';
    window.scrollTo(0, 0);
    try {
      const saved = localStorage.getItem('balaji_last_order');
      if (saved) setOrder(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.checkoutPage}
    >
      <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(46, 125, 50, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <CheckCircle2 size={56} color="var(--color-success)" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: 'var(--font-size-h2)', marginBottom: '1rem' }}
        >
          Order Placed Successfully!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}
        >
          Thank you for your order. We'll process it shortly and keep you updated.
        </motion.p>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={styles.summaryCard}
            style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto 2rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                <Package size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Order #{order.id}
              </h3>
              <span style={{
                padding: '0.3rem 0.8rem',
                background: order.paymentMethod === 'cod' ? 'rgba(245, 124, 0, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                color: order.paymentMethod === 'cod' ? 'var(--color-warning)' : 'var(--color-success)',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}>
                {order.paymentMethod === 'cod' ? 'COD' : 'Paid'}
              </span>
            </div>

            <div className={styles.summaryItems}>
              {order.items.map((item, i) => (
                <div key={i} className={styles.summaryItem}>
                  <div className={styles.summaryItemInfo}>
                    <span className={styles.summaryItemName}>{item.name}</span>
                    <span className={styles.summaryItemMeta}>
                      {item.size && `Size: ${item.size} · `}Qty: {item.quantity}
                    </span>
                  </div>
                  <span className={styles.summaryItemPrice}>
                    {SHIPPING_CONFIG.currency}{((item.price || 0) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summaryDivider} />

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{SHIPPING_CONFIG.currency}{order.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? <span className={styles.free}>FREE</span> : `${SHIPPING_CONFIG.currency}${order.shippingCost}`}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{SHIPPING_CONFIG.currency}{order.total?.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                <Truck size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Shipping to: {order.shipping?.address}, {order.shipping?.city}, {order.shipping?.state} — {order.shipping?.pincode}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/catalogue" className="btn btn-primary btn-lg">
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
          <Link to="/" className="btn btn-outline btn-lg">
            Back to Home
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default OrderConfirmation;
