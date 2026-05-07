import { iceThemeGenerator } from './ice-theme-generator/dist/index.esm.js';

iceThemeGenerator(
  {
    projectName: 'yandex-vasuki-tz',
    destination: './src/scss/theme/',
    fileName: 'theme',
  },
  {
    breakPoints: {
      sm: {
        width: '576px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '992px',
      },
      xl: {
        width: '1366px',
      },
    },
    gridSettings: {
      container: {
        container: '1366px',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1366px',
      },
      fields: {
        fields: '20px',
        lg: '40px',
        xl: '72px',
      },
      gap: {
        gap: '20px',
        xl: '20px',
      },
    },
    themes: {
      default: {},
    },
    utilities: {
      fonts: {
        family: {
          golos: {
            golos: 'Golos Text, Arial, Helvetica, sans-serif',
          },
          merriweather: {
            merriweather: 'Merriweather, serif',
          },
        },
      },
    },
    helpers: {
      textStyle: true,
      columnOffset: true,
    },
  },
);
