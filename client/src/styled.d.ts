import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundInput: string;
      backgroundSecond: string;
      text: string;
      textBlack: string;
      primary: string;
      secondary: string;
      border: string;
      svg: string;
    };
  }
}
