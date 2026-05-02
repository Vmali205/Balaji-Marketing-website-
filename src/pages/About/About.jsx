import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Sparkles, Flame, Star } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection/AnimatedSection';
import Hero3D from '../../components/Hero/Hero3D';
import styles from './About.module.css';

const About = () => {
  useEffect(() => {
    document.title = 'About Us | Balaji Marketing Vasai';
  }, []);

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className={styles.aboutHero}>
        <div className="container">
          <AnimatedSection variant="slideUp">
            <h1>About <span className="accent-text">Balaji Marketing</span></h1>
            <div className="red-line" />
            <p>A legacy of quality craftsmanship and trusted wholesale partnerships in premium tri-ply cookware.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className={`section ${styles.story}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <AnimatedSection variant="slideRight">
              <div className={styles.storyText}>
                <h2>Our <span className="accent-text">Story</span></h2>
                <p>Founded in Vasai, Maharashtra, Balaji Marketing began with a simple vision — to make premium-quality tri-ply cookware accessible to businesses at competitive prices.</p>
                <p>Over the years, we have built strong relationships with manufacturers and retailers across India, earning a reputation for reliability, quality, and exceptional service.</p>
                <p>Today, we continue to grow our network of trusted partners while maintaining the same commitment to quality that has defined us since day one.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="slideLeft">
              <div className={styles.storyImage}>
                <img src="/images/about-story-clean.png" alt="Our Story" className={styles.storyImg} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Our <span className="accent-text">Purpose</span></h2>
            <div className="red-line" />
          </AnimatedSection>
          <div className={styles.mvGrid}>
            <AnimatedSection variant="slideRight" delay={0.1}>
              <div className={`glass-card ${styles.mvCard}`}>
                <Target size={32} className="accent-text" />
                <h3>Mission</h3>
                <p>To be India's most trusted wholesale partner for premium tri-ply cookware, delivering exceptional quality at competitive prices.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="slideLeft" delay={0.2}>
              <div className={`glass-card ${styles.mvCard}`}>
                <Eye size={32} className="accent-text" />
                <h3>Vision</h3>
                <p>To empower every kitchen with cookware that combines cutting-edge tri-ply technology, beautiful design, and unmatched durability.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Tri-Ply */}
      <section className={`section ${styles.triPly}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Why <span className="accent-text">Tri-Ply?</span></h2>
            <div className="red-line" />
            <p className="section-subtitle">Three precision-bonded layers work together for superior cooking performance.</p>
          </AnimatedSection>
          <div className={styles.triPlyContent}>
            <div className={styles.triPlyGrid}>
              <AnimatedSection variant="slideRight" delay={0.2} className={styles.triPlyModel}>
                <div className={styles.modelContainer}>
                  <Hero3D height="100%" />
                </div>
              </AnimatedSection>
              
              <div className={styles.layersWrapper}>
                {[
                  { cls: 'outer', letter: 'S', title: 'Stainless Steel (Outer)', desc: 'Magnetic layer for induction compatibility, extreme durability, and a premium finish.' },
                  { cls: 'core', letter: 'A', title: 'Aluminum Core', desc: 'The hidden hero — rapid, even heat distribution from base to rim. No hot spots.' },
                  { cls: 'inner', letter: 'S', title: 'Stainless Steel (Inner)', desc: 'Premium food-safe surface. Non-reactive with acidic foods and incredibly easy to clean.' },
                ].map((l, i) => (
                  <AnimatedSection key={i} variant="slideLeft" delay={i * 0.15}>
                    <div className={`glass-card ${styles.layerHorizontal}`}>
                      <div className={`${styles.layerCircle} ${styles[l.cls]}`}>{l.letter}</div>
                      <div className={styles.layerContent}>
                        <h4>{l.title}</h4>
                        <p>{l.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.values}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Our <span className="accent-text">Values</span></h2>
            <div className="red-line" />
          </AnimatedSection>
          <div className={styles.valuesGrid}>
            {[
              { icon: <Star size={24} />, title: 'Quality First', desc: 'Never compromising on product quality.' },
              { icon: <Heart size={24} />, title: 'Customer Focus', desc: 'Your satisfaction drives every decision.' },
              { icon: <Sparkles size={24} />, title: 'Innovation', desc: 'Constantly evolving our catalogue.' },
              { icon: <Flame size={24} />, title: 'Passion', desc: 'Genuine passion for cooking excellence.' },
            ].map((val, i) => (
              <AnimatedSection key={i} variant="slideUp" delay={i * 0.1}>
                <div className={`glass-card ${styles.valueItem}`}>
                  <div className={styles.valueIcon}>{val.icon}</div>
                  <h4>{val.title}</h4>
                  <p>{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default About;
