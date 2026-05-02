import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Logo from '../Logo/Logo';
import { CATEGORIES, COMPANY_INFO, WHATSAPP_LINK } from '../../utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Brand */}
        <div className={styles.footerBrand}>
          <Logo size="default" variant="light" />
          <p>
            Your trusted wholesale partner for premium tri-ply stainless steel cookware. 
            Quality craftsmanship, competitive pricing, and pan-India delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.footerHeading}>Quick Links</h4>
          <div className={styles.footerLinks}>
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/about" className={styles.footerLink}>About Us</Link>
            <Link to="/products" className={styles.footerLink}>Products</Link>
            <Link to="/catalogue" className={styles.footerLink}>Catalogue</Link>
            <Link to="/contact" className={styles.footerLink}>Contact</Link>
            <a href="/catalogue.pdf" download="Balaji_Marketing_Catalogue.pdf" className={styles.footerLink}>Download Catalogue</a>
          </div>
        </div>

        {/* Categories - now linking to sub-pages */}
        <div>
          <h4 className={styles.footerHeading}>Products</h4>
          <div className={styles.footerLinks}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/${cat.id}`}
                className={styles.footerLink}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className={styles.footerHeading}>Contact</h4>
          <div className={styles.contactItem}>
            <Phone size={16} />
            <span>{COMPANY_INFO.phone}</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} />
            <span>{COMPANY_INFO.email}</span>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={16} />
            <span>{COMPANY_INFO.address}</span>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            style={{ marginTop: '0.5rem' }}
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
