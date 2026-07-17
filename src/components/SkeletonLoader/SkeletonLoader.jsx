import styles from './SkeletonLoader.module.css';

const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const renderSkeleton = (index) => {
    switch (type) {
      case 'product-card':
        return (
          <div key={index} className={`${styles.skeletonCard} ${className}`}>
            <div className={`${styles.shimmer} ${styles.imageArea}`} />
            <div className={styles.contentArea}>
              <div className={`${styles.shimmer} ${styles.titleLine}`} />
              <div className={`${styles.shimmer} ${styles.subtitleLine}`} />
              <div className={`${styles.shimmer} ${styles.priceLine}`} />
            </div>
          </div>
        );
      case 'text':
        return <div key={index} className={`${styles.shimmer} ${styles.textLine} ${className}`} />;
      case 'image':
        return <div key={index} className={`${styles.shimmer} ${styles.imageArea} ${className}`} />;
      default:
        return <div key={index} className={`${styles.shimmer} ${styles.skeletonCard} ${className}`} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </>
  );
};

export default SkeletonLoader;
