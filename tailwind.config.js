/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6E3',
        forest: '#2D5016',
        burnt: '#D2691E',
        gold: '#DAA520',
        mutedBlue: '#6B7280',
        warmGray: '#F5F5F4',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'wobble': 'wobble 0.6s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'page-flip': 'pageFlip 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        wobble: {
          '0%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-5deg)' },
          '30%': { transform: 'rotate(3deg)' },
          '45%': { transform: 'rotate(-3deg)' },
          '60%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(210, 105, 30, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(210, 105, 30, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pageFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
      },
      backgroundImage: {
        'fairy-lights': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 20\"%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"2\" fill=\"%23DAA520\" opacity=\"0.6\"/%3E%3Ccircle cx=\"30\" cy=\"8\" r=\"1.5\" fill=\"%23DAA520\" opacity=\"0.4\"/%3E%3Ccircle cx=\"50\" cy=\"12\" r=\"2.5\" fill=\"%23DAA520\" opacity=\"0.7\"/%3E%3Ccircle cx=\"70\" cy=\"6\" r=\"1\" fill=\"%23DAA520\" opacity=\"0.5\"/%3E%3Ccircle cx=\"90\" cy=\"10\" r=\"2\" fill=\"%23DAA520\" opacity=\"0.6\"/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
