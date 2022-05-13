module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'sans': ['montserrat', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        storm: {
          lightest: '#F0F0ED',
          light: '#B0B0AE',
          DEFAULT: '#636362',
          dark: '#4A4A49',
          darkest: '#424242'
        },
        heart: {
          light: '#ED90A6',
          DEFAULT: '#e40045',
          dark: '#A30031'
        },
        water: {
          light: '#8BB9C3',
          DEFAULT: '#5689a0',
          dark: '#466F82'
        },
        nature: {
          light: '#A0CF21',
          DEFAULT: '#95c11e',
          dark: '#658215'
        }
      },
      animation: {
        blob: "blob 7s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(15px, -30px) scale(1.15)"
          },
          "66%": {
            transform: "translate(-10px, 20px) scale(0.85)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          },
        }
      }
    },
  
  },
  plugins: []
};
