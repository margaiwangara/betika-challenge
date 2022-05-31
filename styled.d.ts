import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      white: string;
      gray: string;
      black: string;
      yellow: string;
    };
    breakpoints: {
      sm: string;
      md: string;
    };
  }
}
