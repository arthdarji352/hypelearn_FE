import { createTheme } from '@mui/material/styles';
import WorkSansFont from  '../assets/Fonts/WorkSans-VariableFont_wght.ttf'

const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#258461',
      },
      white: {
        main: '#ffffff',
      },
      chipColor1: {
        main: '#B3D4FF'
      },
      chipColor2: {
        main: '#C0B6F2'
      },
      chipColor3: {
        main: '#79F2C0'
      },
      danger: {
        main: '#FD5D5C',
      },
    },
    shape: {
      borderRadius: 6,
    },
    typography: {
      fontFamily: 'Work Sans, Arial',
      button: {
        textTransform: 'none'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Work Sans';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Raleway'), local('Work Sans'), url(${WorkSansFont}) format('woff2');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          },
        `,
      },
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            borderRadius: '10px'
          },
        },
      },
    },
  });

  export default theme