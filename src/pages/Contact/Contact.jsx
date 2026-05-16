import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { COMPANY_INFO, WHATSAPP_NUMBER } from '../../utils/constants';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Format WhatsApp message
    const waMessage = `*New Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after some time
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 5000);
  };

  const contactItems = [
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      value: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'WhatsApp',
      value: 'Chat with us',
      link: `https://wa.me/${WHATSAPP_NUMBER}`
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      value: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`
    },
    {
      icon: <MapPin size={24} />,
      title: 'Our Location',
      value: COMPANY_INFO.address,
      link: 'https://www.google.com/maps/search/Rashmi+Industrial+Estate+Gala+No+1+and+4+Ground+Floor+Vasai+Palghar+401202'
    }
  ];

  return (
    <main className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <AnimatedSection animation="fadeIn">
            <h1 className={styles.title}>Contact <span className="accent-text">Us</span></h1>
            <p className={styles.subtitle}>
              Have questions about our products or need a bulk quote? We're here to help you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Info */}
            <div className={styles.infoCol}>
              <AnimatedSection animation="slideRight">
                <div className={styles.infoCards}>
                  {contactItems.map((item, index) => (
                    <a 
                      key={index} 
                      href={item.link} 
                      target={item.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className={styles.infoCard}
                    >
                      <div className={styles.iconWrapper}>{item.icon}</div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className={styles.businessHours}>
                  <div className={styles.hoursHeader}>
                    <Clock size={20} className="accent-text" />
                    <h3>Business Hours</h3>
                  </div>
                  <ul className={styles.hoursList}>
                    <li><span>Monday - Saturday:</span> <span>10:00 AM - 7:00 PM</span></li>
                    <li><span>Sunday:</span> <span className="accent-text">Closed</span></li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className={styles.formCol}>
              <AnimatedSection animation="slideLeft">
                <div className={styles.formWrapper}>
                  {isSubmitted ? (
                    <div className={styles.successState}>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={styles.successIcon}
                      >
                        <CheckCircle2 size={64} />
                      </motion.div>
                      <h2>Message Sent!</h2>
                      <p>Thank you for reaching out. We have redirected you to WhatsApp to complete your inquiry.</p>
                      <button 
                        className="btn btn-outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                      <div className={styles.formHeader}>
                        <h2>Send us a <span className="accent-text">Message</span></h2>
                        <p>Fill out the form below and we'll get back to you shortly.</p>
                      </div>

                      <div className={styles.formGrid}>
                        <div className="form-group">
                          <label className="form-label">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            className="form-input" 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone Number</label>
                          <input 
                            type="tel" 
                            name="phone"
                            required
                            className="form-input" 
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          className="form-input" 
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <select 
                          name="subject"
                          className="form-select"
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Bulk Order Quote">Bulk Order Quote</option>
                          <option value="Product Information">Product Information</option>
                          <option value="Distribution/Partnership">Distribution/Partnership</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Your Message</label>
                        <textarea 
                          name="message"
                          required
                          className="form-textarea" 
                          placeholder="Tell us about your requirements..."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`btn btn-primary ${styles.submitBtn}`}
                      >
                        {isSubmitting ? (
                          <span className="spinner" style={{ width: '20px', height: '20px' }} />
                        ) : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapWrapper}>
             <iframe 
               title="Balaji Marketing Vasai - Google Maps"
               src="https://maps.google.com/maps?q=Rashmi+Industrial+Estate,+Gala+No+1+and+4,+Vasai,+Palghar+401202&t=&z=15&ie=UTF8&iwloc=&output=embed" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>

          <div className={styles.contactDetailsRow}>
            <div className={styles.reachUsCol}>
              <h3 className={styles.columnTitle}>REACH US THROUGH</h3>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={24} className={styles.listIcon} />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li>
                  <Phone size={24} className={styles.listIcon} />
                  <span>{COMPANY_INFO.phone}</span>
                </li>
                <li>
                  <Mail size={24} className={styles.listIcon} />
                  <span>{COMPANY_INFO.email}</span>
                </li>
              </ul>
            </div>
            
            <div className={styles.socialCol}>
              <h3 className={styles.columnTitle}>SOCIAL NETWORKS</h3>
              <ul className={styles.contactList}>
                <li>
                  <a href="#" target="_blank" rel="noreferrer" className={styles.socialLink}>
                    <Camera size={24} className={styles.listIcon} />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
