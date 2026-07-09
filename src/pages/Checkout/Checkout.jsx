import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, MapPin, User, CreditCard, ShoppingBag,
  Check, Truck, Shield, Zap, Package, Lock
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/Toast/Toast';
import { SHIPPING_CONFIG, PAYMENT_METHODS } from '../../utils/constants';
import styles from './Checkout.module.css';

const STEPS = [
  { id: 1, label: 'Details', icon: User },
  { id: 2, label: 'Shipping', icon: MapPin },
  { id: 3, label: 'Payment', icon: CreditCard },
];

const TRUST_ITEMS = [
  { icon: <Lock size={14} />, text: '256-bit SSL Encryption' },
  { icon: <Shield size={14} />, text: 'Secure Payment Gateway' },
  { icon: <Package size={14} />, text: 'Easy Returns & Refunds' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getShipping, getCartTotal, clearCart, getCartCount } = useCart();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.COD);

  useEffect(() => {
    document.title = 'Checkout | Balaji Marketing Vasai';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (items.length === 0 && !processing) {
      navigate('/catalogue');
    }
  }, [items, navigate, processing]);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getCartTotal();

  const handleCustomerChange = (e) => {
    setCustomerDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressChange = (e) => {
    setShippingAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!customerDetails.name || !customerDetails.phone) {
        addToast('Please fill in your name and phone number', 'error');
        return false;
      }
      if (customerDetails.phone.length < 10) {
        addToast('Please enter a valid phone number', 'error');
        return false;
      }
    }
    if (step === 2) {
      if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
        addToast('Please fill in all address fields', 'error');
        return false;
      }
      if (shippingAddress.pincode.length !== 6) {
        addToast('Please enter a valid 6-digit pincode', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setProcessing(true);

    try {
      if (paymentMethod === PAYMENT_METHODS.RAZORPAY) {
        // Razorpay payment flow
        const options = {
          key: 'rzp_test_placeholder', // Replace with actual key
          amount: total * 100, // Amount in paise
          currency: 'INR',
          name: 'Balaji Marketing Vasai',
          description: `Order of ${getCartCount()} items`,
          handler: function (response) {
            const order = {
              id: 'ORD-' + Date.now(),
              items: items.map((i) => ({
                productId: i.product.id,
                name: i.product.name,
                price: i.product.price,
                quantity: i.quantity,
                size: i.selectedSize,
              })),
              customer: customerDetails,
              shipping: shippingAddress,
              paymentMethod: 'razorpay',
              paymentId: response.razorpay_payment_id,
              subtotal,
              shippingCost: shipping,
              total,
              status: 'confirmed',
              createdAt: new Date().toISOString(),
            };
            localStorage.setItem('balaji_last_order', JSON.stringify(order));
            clearCart();
            navigate('/order-confirmation');
          },
          prefill: {
            name: customerDetails.name,
            email: customerDetails.email,
            contact: customerDetails.phone,
          },
          theme: {
            color: '#D32F2F',
          },
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          addToast('Razorpay not loaded. Placing order as COD.', 'info');
          placeAsCOD();
        }
      } else {
        placeAsCOD();
      }
    } catch (err) {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const placeAsCOD = () => {
    const order = {
      id: 'ORD-' + Date.now(),
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        size: i.selectedSize,
      })),
      customer: customerDetails,
      shipping: shippingAddress,
      paymentMethod: 'cod',
      subtotal,
      shippingCost: shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('balaji_last_order', JSON.stringify(order));
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.checkoutPage}
    >
      <div className="container">
        {/* Back Link */}
        <Link to="/catalogue" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </Link>

        <h1 className={styles.pageTitle}>Checkout</h1>
        <p className={styles.pageSubtitle}>Complete your order in {3 - step + 1} easy step{3 - step + 1 !== 1 ? 's' : ''}</p>

        {/* Step Indicator */}
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`${styles.step} ${step >= s.id ? styles.stepActive : ''} ${step === s.id ? styles.stepCurrent : ''}`}
            >
              <div className={styles.stepIcon}>
                {step > s.id ? <Check size={17} /> : <s.icon size={17} />}
              </div>
              <span className={styles.stepLabel}>{s.label}</span>
              {i < STEPS.length - 1 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        <div className={styles.checkoutGrid}>
          {/* Form Area */}
          <div className={styles.formArea}>
            {/* STEP 1: Customer Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.formSection}
              >
                <h2 className={styles.sectionTitle}>
                  <User size={18} />
                  Customer Details
                </h2>
                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                      value={customerDetails.name}
                      onChange={handleCustomerChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={customerDetails.phone}
                      onChange={handleCustomerChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span></label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={customerDetails.email}
                    onChange={handleCustomerChange}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Shipping Address */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.formSection}
              >
                <h2 className={styles.sectionTitle}>
                  <MapPin size={18} />
                  Shipping Address
                </h2>
                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <textarea
                    name="address"
                    required
                    className="form-textarea"
                    placeholder="House/Flat No., Building, Street, Area"
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                    style={{ minHeight: '90px' }}
                  />
                </div>
                <div className={styles.formGrid}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="form-input"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      className="form-input"
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ maxWidth: '200px' }}>
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    className="form-input"
                    placeholder="400001"
                    value={shippingAddress.pincode}
                    onChange={handleAddressChange}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.formSection}
              >
                <h2 className={styles.sectionTitle}>
                  <CreditCard size={18} />
                  Payment Method
                </h2>

                <div className={styles.paymentOptions}>
                  {/* Razorpay Option */}
                  <label
                    className={`${styles.paymentOption} ${paymentMethod === PAYMENT_METHODS.RAZORPAY ? styles.paymentSelected : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={PAYMENT_METHODS.RAZORPAY}
                      checked={paymentMethod === PAYMENT_METHODS.RAZORPAY}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className={`${styles.paymentIconBox} ${styles.online}`}>
                      <CreditCard size={22} />
                    </div>
                    <div className={styles.paymentContent}>
                      <div className={styles.paymentTextGroup}>
                        <span className={styles.paymentTitle}>Pay Online</span>
                        <span className={styles.paymentDesc}>Powered by Razorpay — secure &amp; instant</span>
                        <div className={styles.paymentMethodIcons}>
                          {['UPI', 'Visa', 'MasterCard', 'NetBanking', 'Wallet'].map((m) => (
                            <span key={m} className={styles.paymentMethodChip}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={styles.paymentRadio} />
                  </label>

                  {/* COD Option */}
                  <label
                    className={`${styles.paymentOption} ${paymentMethod === PAYMENT_METHODS.COD ? styles.paymentSelected : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={PAYMENT_METHODS.COD}
                      checked={paymentMethod === PAYMENT_METHODS.COD}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className={`${styles.paymentIconBox} ${styles.cod}`}>
                      <Truck size={22} />
                    </div>
                    <div className={styles.paymentContent}>
                      <div className={styles.paymentTextGroup}>
                        <span className={styles.paymentTitle}>Cash on Delivery</span>
                        <span className={styles.paymentDesc}>Pay when you receive your order</span>
                        <div className={styles.paymentMethodIcons}>
                          {['Cash', 'No Online Payment'].map((m) => (
                            <span key={m} className={styles.paymentMethodChip}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={styles.paymentRadio} />
                  </label>
                </div>

                {/* Order Review */}
                <div className={styles.orderReview}>
                  <h3>Order Review</h3>
                  <div className={styles.reviewDetails}>
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewItemIcon}><User size={14} /></div>
                      <div className={styles.reviewItemContent}>
                        <strong>{customerDetails.name}</strong>
                        <p>{customerDetails.phone}{customerDetails.email && ` · ${customerDetails.email}`}</p>
                      </div>
                    </div>
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewItemIcon}><MapPin size={14} /></div>
                      <div className={styles.reviewItemContent}>
                        <strong>Delivery Address</strong>
                        <p>{shippingAddress.address}<br />{shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pincode}</p>
                      </div>
                    </div>
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewItemIcon}><CreditCard size={14} /></div>
                      <div className={styles.reviewItemContent}>
                        <strong>Payment</strong>
                        <p>{paymentMethod === PAYMENT_METHODS.RAZORPAY ? 'Online (Razorpay)' : 'Cash on Delivery'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className={styles.navButtons}>
              {step > 1 && (
                <button className="btn btn-outline" onClick={handlePrevStep}>
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button className="btn btn-primary btn-lg" onClick={handleNextStep} style={{ marginLeft: 'auto' }}>
                  Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  style={{ marginLeft: 'auto' }}
                >
                  {processing ? (
                    <span className="spinner" style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <>
                      {paymentMethod === PAYMENT_METHODS.RAZORPAY ? <Zap size={18} /> : <ShoppingBag size={18} />}
                      {paymentMethod === PAYMENT_METHODS.RAZORPAY ? 'Pay Now' : 'Place Order'} — {SHIPPING_CONFIG.currency}{total.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>
                <ShoppingBag size={18} />
                Order Summary
              </h3>

              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className={styles.summaryItem}>
                    <div className={styles.summaryItemImage}>
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.name} />
                      ) : (
                        <ShoppingBag size={16} />
                      )}
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <span className={styles.summaryItemName}>{item.product.name}</span>
                      {item.selectedSize && <span className={styles.summaryItemMeta}>Size: {item.selectedSize}</span>}
                      <span className={styles.summaryItemMeta}>Qty: {item.quantity}</span>
                    </div>
                    <span className={styles.summaryItemPrice}>
                      {SHIPPING_CONFIG.currency}{((item.product.price || 0) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{SHIPPING_CONFIG.currency}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className={styles.free}>FREE</span> : `${SHIPPING_CONFIG.currency}${shipping}`}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>{SHIPPING_CONFIG.currency}{total.toLocaleString('en-IN')}</span>
              </div>

              {shipping > 0 && (
                <p className={styles.shippingHint}>
                  Add {SHIPPING_CONFIG.currency}{(SHIPPING_CONFIG.freeAbove - subtotal).toLocaleString('en-IN')} more for free shipping
                </p>
              )}

              {/* Trust section */}
              <div className={styles.summaryDivider} />
              <div className={styles.trustSection}>
                {TRUST_ITEMS.map((t, i) => (
                  <div key={i} className={styles.trustItem}>
                    {t.icon}
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Checkout;
