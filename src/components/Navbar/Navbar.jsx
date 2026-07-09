import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ShoppingCart, Search, User, Heart, X, Phone } from 'lucide-react';
import Logo from '../Logo/Logo';
import CartDrawer from '../CartDrawer/CartDrawer';
import { useCart } from '../../context/CartContext';
import { CATEGORIES, COMPANY_INFO } from '../../utils/constants';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/catalogue', label: 'Catalogue' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isProductPage = location.pathname.startsWith('/products/');

  return (
    <>
      {/* ===== ANNOUNCEMENT BAR ===== */}
      {announcementVisible && (
        <div className={styles.announcementBar} id="announcement-bar">
          <div className={styles.announcementInner}>
            <span className={styles.announcementText}>
              🔥 <strong>Summer Sale</strong> — Up to 20% OFF on Tri-Ply Cookware &nbsp;|&nbsp; Use Code: <span className={styles.announcementCode}>BALAJI24</span>
              &nbsp;|&nbsp; Free Shipping above ₹999
            </span>
            <a href="tel:+918754408847" className={styles.announcementPhone}>
              <Phone size={12} />
              {COMPANY_INFO.phone}
            </a>
          </div>
          <button
            className={styles.announcementClose}
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Dismiss announcement"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ===== MAIN NAVBAR ===== */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="main-navbar">
        <div className={styles.navInner}>

          {/* Logo */}
          <Link to="/" aria-label="Balaji Marketing Home" className={styles.logoLink}>
            <Logo size="default" variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.navLinks}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Products Dropdown */}
            <li className={styles.dropdownContainer} ref={dropdownRef}>
              <div className={styles.dropdownTriggerWrapper}>
                <Link
                  to="/products"
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${isProductPage || location.pathname === '/products' ? styles.active : ''}`}
                  onMouseEnter={() => setProductsOpen(true)}
                >
                  Products
                </Link>
                <button
                  className={styles.chevronBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    setProductsOpen(!productsOpen);
                  }}
                  onMouseEnter={() => setProductsOpen(true)}
                >
                  <ChevronDown size={13} className={`${styles.chevron} ${productsOpen ? styles.chevronOpen : ''}`} />
                </button>
              </div>

              <div
                className={`${styles.dropdown} ${productsOpen ? styles.dropdownOpen : ''}`}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <div className={styles.dropdownHeader}>
                  <span>Shop by Category</span>
                  <Link to="/products" className={styles.dropdownViewAll}>View All →</Link>
                </div>
                <div className={styles.dropdownGrid}>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.id}`}
                      className={`${styles.dropdownItem} ${location.pathname === `/products/${cat.id}` ? styles.dropdownItemActive : ''}`}
                    >
                      <div className={styles.dropdownImgWrap}>
                        <img src={cat.image} alt={cat.name} className={styles.dropdownImg} />
                      </div>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* Right Actions */}
          <div className={styles.navActions}>
            <button className={styles.iconBtn} aria-label="Search">
              <Search size={18} />
            </button>
            <button className={styles.iconBtn} aria-label="Account">
              <User size={18} />
            </button>
            <button className={styles.iconBtn} aria-label="Wishlist">
              <Heart size={18} />
            </button>
            <button
              className={`${styles.iconBtn} ${styles.cartBtn}`}
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart with ${cartCount} items`}
              id="cart-button"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className={styles.cartBadge} key={cartCount}>
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/contact" className={styles.navCta} id="nav-quote-btn">
              Get Quote
            </Link>
          </div>

          {/* Mobile Cart + Toggle */}
          <div className={styles.mobileActions}>
            <button
              className={`${styles.iconBtn} ${styles.cartBtn}`}
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className={styles.cartBadge} key={cartCount}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className={`${styles.menuToggle} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`} id="mobile-menu">
        <button
          className={styles.mobileClose}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <div className={styles.mobileMenuInner}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <button
            className={styles.mobileNavLink}
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            Products
            <ChevronDown
              size={18}
              style={{
                marginLeft: 'auto',
                transition: 'transform 0.3s',
                transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0)',
              }}
            />
          </button>

          {mobileProductsOpen && (
            <div className={styles.mobileProductsList}>
              <Link
                to="/products"
                className={styles.mobileProductItem}
                onClick={() => setMobileOpen(false)}
              >
                All Products
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.id}`}
                  className={styles.mobileProductItem}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <div className={styles.mobileDivider} />

          <Link to="/contact" className="btn btn-primary" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
            Get a Quote
          </Link>

          <div className={styles.mobileContact}>
            <a href={`tel:${COMPANY_INFO.phone}`}>
              <Phone size={14} />
              {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div className={styles.mobileBackdrop} onClick={() => setMobileOpen(false)} />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
