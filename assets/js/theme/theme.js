import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#e2001A"
    },
    common: {
      white: "white"
    },
    secondary: {
      main: "#e8E8E8"
    }
  },
  spacing: 10
});

export default theme;
