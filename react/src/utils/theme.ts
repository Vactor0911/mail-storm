import { alpha, createTheme } from "@mui/material";
import { red, lightGreen, grey } from "@mui/material/colors";

export const color = {
  primary: "#24292e",
  gray: grey[400],
  green: lightGreen[800],
  red: red[500],
};

// 테마 색상
declare module "@mui/material/styles" {
  interface Palette {
    modern: Palette["primary"];
  }

  interface PaletteOptions {
    modern?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    modern: true;
  }
}

createTheme({
  palette: {
    modern: {
      main: color.primary,
      light: alpha(color.primary, 0.5),
      dark: alpha(color.primary, 0.9),
    },
  },
});
