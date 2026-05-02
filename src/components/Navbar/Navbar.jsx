import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Logo from '../Logo/Logo';
import { CATEGORIES } from '../../utils/constants';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/catalogue', label: 'Catalogue' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
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

  // Close dropdown on outside click
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
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        <Link to="/" aria-label="Balaji Marketing Home">
          <Logo size="default" variant="dark" />
        </Link>

        {/* Desktop Nav */}
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
                <ChevronDown size={14} className={`${styles.chevron} ${productsOpen ? styles.chevronOpen : ''}`} />
              </button>
            </div>

            <div
              className={`${styles.dropdown} ${productsOpen ? styles.dropdownOpen : ''}`}
              onMouseLeave={() => setProductsOpen(false)}
            >
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

          <li>
            <Link
              to="/contact"
              className={`${styles.navLink} ${location.pathname === '/contact' ? styles.active : ''}`}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link to="/contact" className={styles.navCta}>
              Get Quote
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
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

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
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

        {/* Mobile Products Accordion */}
        <button
          className={styles.mobileNavLink}
          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
        >
          Products
          <ChevronDown
            size={18}
            style={{
              marginLeft: '0.5rem',
              transition: 'transform 0.3s',
              transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        </button>

        {mobileProductsOpen && (
          <div className={styles.mobileProductsList}>
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

        <Link
          to="/contact"
          className={`${styles.mobileNavLink} ${location.pathname === '/contact' ? styles.active : ''}`}
          onClick={() => setMobileOpen(false)}
        >
          Contact
        </Link>

        <Link to="/contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
          Get Quote
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
