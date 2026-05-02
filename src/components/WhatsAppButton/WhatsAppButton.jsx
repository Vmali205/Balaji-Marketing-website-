import { MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK, WHATSAPP_DEFAULT_MESSAGE } from '../../utils/constants';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const href = `${WHATSAPP_LINK}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappBtn}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
      <span className={styles.tooltip}>Chat with us!</span>
    </a>
  );
};

export default WhatsAppButton;
