import { ExternalLink, MessageCircle, Package } from 'lucide-react';
import { WHATSAPP_LINK, CATEGORIES } from '../../utils/constants';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { name, category, image, sizes, description, amazonLink } = product;

  const categoryData = CATEGORIES.find((c) => c.id === category);
  const categoryLabel = categoryData ? categoryData.name : category;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in "${name}" from your catalogue. Please share pricing and availability details.`
  );

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>
            <Package size={48} strokeWidth={1} />
          </div>
        )}
        <span className={styles.categoryBadge}>{categoryLabel}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}

        {sizes && sizes.length > 0 && (
          <div className={styles.sizes}>
            {sizes.map((size, i) => (
              <span key={i} className={styles.sizeChip}>{size}</span>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          {amazonLink ? (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-amazon ${styles.btn}`}
            >
              <ExternalLink size={14} />
              View on Amazon
            </a>
          ) : (
            <a
              href={`${WHATSAPP_LINK}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.btn}`}
            >
              <MessageCircle size={14} />
              Get Quote
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
