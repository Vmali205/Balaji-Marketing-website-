import { useEffect, useRef } from 'react';
import styles from './HeroCanvas.module.css';

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 80;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * (isMobile ? 1 : window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (isMobile ? 1 : window.devicePixelRatio || 1);
    };
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 200 + 100;
        this.age = 0;
        // Brand color variants — Light & Professional
        const colors = [
          '211, 47, 47',    // Primary Red
          '43, 43, 43',     // Dark Gray
          '200, 200, 200',  // Light Gray
          '255, 255, 255',  // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Mouse influence
        const dx = (mouseRef.current.x * canvas.width) - this.x;
        const dy = (mouseRef.current.y * canvas.height) - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.speedX += dx * 0.00003;
          this.speedY += dy * 0.00003;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.age++;

        // Fade in/out based on life
        const lifeRatio = this.age / this.life;
        if (lifeRatio < 0.1) {
          this.currentOpacity = this.opacity * (lifeRatio / 0.1);
        } else if (lifeRatio > 0.9) {
          this.currentOpacity = this.opacity * ((1 - lifeRatio) / 0.1);
        } else {
          this.currentOpacity = this.opacity;
        }

        if (this.age >= this.life || this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
          this.reset();
        }
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.currentOpacity || this.opacity})`;
        ctx.fill();

        // Glow effect for larger particles
        if (this.size > 1.5) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${(this.currentOpacity || this.opacity) * 0.1})`;
          ctx.fill();
        }
      }
    }

    particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(211, 47, 47, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const handleResize = () => resize();

    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.heroCanvas} />;
};

export default HeroCanvas;
