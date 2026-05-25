import styles from './Marquee.module.css';

const Marquee = ({ items = [], speed = 30, separator = '✦' }) => {
  const animationDuration = `${items.length * speed / 4}s`;

  // Duplicate the items enough to create a seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeTrack} style={{ animationDuration }}>
        {repeatedItems.map((item, index) => (
          <span key={index} className={styles.marqueeItem}>
            <span className={styles.marqueeText}>{item}</span>
            <span className={styles.marqueeSep}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
