import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Globe, Link2, Send, ChevronRight, Award, Truck, Shield, RotateCcw, Share2 } from 'lucide-react';
import Logo from '../Logo/Logo';
import { CATEGORIES, COMPANY_INFO, WHATSAPP_LINK } from '../../utils/constants';
import styles from './Footer.module.css';

const TRUST_ITEMS = [
  { icon: <Award size={18} />, label: 'Premium Quality' },
  { icon: <Truck size={18} />, label: 'Pan-India Delivery' },
  { icon: <Shield size={18} />, label: 'ISI Certified' },
  { icon: <RotateCcw size={18} />, label: 'Easy Returns' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      {/* ===== TRUST STRIP ===== */}
      <div className={styles.trustStrip}>
        <div className={styles.trustStripInner}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className={styles.trustItem}>
              <div className={styles.trustItemIcon}>{item.icon}</div>
              <span className={styles.trustItemLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== NEWSLETTER ===== */}
      <div className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div className={styles.newsletterText}>
            <h3>Stay Updated with Our Latest Offers</h3>
            <p>Get exclusive deals, new arrivals, and wholesale pricing updates directly in your inbox.</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe} id="newsletter-form">
            {subscribed ? (
              <div className={styles.subscribedMsg}>
                ✅ Thank you! You're now subscribed.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Enter your email address"
                  className={styles.newsletterInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" className={styles.newsletterBtn} id="newsletter-submit">
                  <Send size={16} />
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* ===== MAIN FOOTER GRID ===== */}
      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <Logo size="default" variant="light" />
            <p className={styles.footerBrandDesc}>
              Your trusted wholesale partner for premium tri-ply stainless steel cookware. 
              Quality craftsmanship, competitive pricing, and pan-India delivery since 2015.
            </p>
            <div className={styles.socialLinks}>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
                id="footer-instagram"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
                id="footer-facebook"
              >
                <Globe size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
                id="footer-youtube"
              >
                <Link2 size={16} />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
                id="footer-whatsapp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <nav className={styles.footerLinks} aria-label="Quick links">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/products', label: 'All Products' },
                { to: '/catalogue', label: 'Catalogue' },
                { to: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <Link key={link.to} to={link.to} className={styles.footerLink}>
                  <ChevronRight size={13} />
                  {link.label}
                </Link>
              ))}
              <a href="/catalogue.pdf" download="Balaji_Marketing_Catalogue.pdf" className={styles.footerLink}>
                <ChevronRight size={13} />
                Download Catalogue
              </a>
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4 className={styles.footerHeading}>Products</h4>
            <nav className={styles.footerLinks} aria-label="Products">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.id}`}
                  className={styles.footerLink}
                >
                  <ChevronRight size={13} />
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={styles.footerHeading}>Contact Us</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><Phone size={14} /></div>
                <div>
                  <div className={styles.contactLabel}>Phone / WhatsApp</div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className={styles.contactValue}>
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><Mail size={14} /></div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className={styles.contactValue}>
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}><MapPin size={14} /></div>
                <div>
                  <div className={styles.contactLabel}>Address</div>
                  <span className={styles.contactValue}>{COMPANY_INFO.address}</span>
                </div>
              </div>
            </div>
            <a
              href={`${WHATSAPP_LINK}?text=Hi, I want to inquire about your cookware products.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
              id="footer-whatsapp-btn"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ===== FOOTER BOTTOM ===== */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
          <div className={styles.paymentBadges}>
            <span className={styles.paymentLabel}>We Accept:</span>
            {['UPI', 'Cards', 'Net Banking', 'COD', 'EMI'].map((method) => (
              <span key={method} className={styles.paymentBadge}>{method}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
