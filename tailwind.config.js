/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-med': 'float 5s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'rocket': 'rocket 1.2s ease-out forwards',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        twinkle: { '0%,100%': { opacity: 0.2 }, '50%': { opacity: 1 } },
        orbit: { '0%': { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' }, '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' } },
        rocket: { '0%': { transform: 'translateY(0) rotate(-45deg)', opacity: 1 }, '100%': { transform: 'translateY(-120vh) rotate(-45deg)', opacity: 0 } },
        glowPulse: { '0%,100%': { filter: 'drop-shadow(0 0 8px currentColor)' }, '50%': { filter: 'drop-shadow(0 0 24px currentColor)' } },
      },
    },
  },
  plugins: [],
};
