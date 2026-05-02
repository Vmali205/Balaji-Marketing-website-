const Logo = ({ size = 'default', showText = true, variant = 'dark' }) => {
  const heights = { small: 32, default: 40, large: 52 };
  const h = heights[size] || heights.default;

  const isLight = variant === 'light';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <svg
        width={h}
        height={h}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2B2B2B" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>
          <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>
          <linearGradient id="logoCopper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C87533" />
            <stop offset="100%" stopColor="#D4956B" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="60" cy="60" r="56" stroke="url(#logoAccent)" strokeWidth="2.5" fill="none" />
        <circle cx="60" cy="60" r="50" fill={isLight ? "transparent" : "url(#logoPrimary)"} />
        
        {/* Stylized cookware/pot silhouette */}
        <ellipse cx="60" cy="68" rx="28" ry="12" fill="none" stroke="url(#logoAccent)" strokeWidth="2.5" />
        <path d="M32 68 Q32 45 60 40 Q88 45 88 68" fill="none" stroke="url(#logoAccent)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Lid handle — copper accent */}
        <ellipse cx="60" cy="40" rx="8" ry="3" fill="none" stroke="url(#logoCopper)" strokeWidth="2" />
        
        {/* Steam lines */}
        <path d="M48 32 Q46 26 48 20" stroke="url(#logoAccent)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M60 30 Q58 24 60 18" stroke="url(#logoAccent)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M72 32 Q70 26 72 20" stroke="url(#logoAccent)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        
        {/* Handles — copper */}
        <path d="M28 62 Q18 62 18 68 Q18 74 28 74" fill="none" stroke="url(#logoCopper)" strokeWidth="2" strokeLinecap="round" />
        <path d="M92 62 Q102 62 102 68 Q102 74 92 74" fill="none" stroke="url(#logoCopper)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: size === 'large' ? '1.5rem' : size === 'small' ? '0.9rem' : '1.2rem',
              color: isLight ? '#F5F5F5' : '#2B2B2B',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            BALAJI
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: size === 'large' ? '0.65rem' : size === 'small' ? '0.45rem' : '0.55rem',
              color: '#D32F2F',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Marketing Vasai
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
