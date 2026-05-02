import { CATEGORIES } from '../../utils/constants';
import styles from './CategoryFilter.module.css';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className={styles.filterBar} role="tablist" aria-label="Filter by category">
      <button
        className={`${styles.pill} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => onCategoryChange('all')}
        role="tab"
        aria-selected={activeCategory === 'all'}
      >
        <div className={styles.pillImgWrapper}>
          <span className={styles.allIcon}>✦</span>
        </div>
        <span>All</span>
      </button>

      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.pill} ${activeCategory === cat.id ? styles.active : ''}`}
          onClick={() => onCategoryChange(cat.id)}
          role="tab"
          aria-selected={activeCategory === cat.id}
        >
          <div className={styles.pillImgWrapper}>
            <img src={cat.image} alt={cat.name} className={styles.pillImg} />
          </div>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
