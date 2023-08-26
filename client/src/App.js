/**
 *    © 2022 Abraham Mitiku
 *    Open Source MERN Dashboard Template
 *
 */
// -----------------------------------------------------------------
import React from "react";
import { useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import routes from "./routes/routes";
import { defaultTheme } from "./constants/theme";

const theme = createTheme({
  palette: {
    primary: {
      main: defaultTheme.PRIMARY.MAIN,
      dark: defaultTheme.PRIMARY.DARK,
      light: defaultTheme.PRIMARY.LIGHT,
    },
    secondary: {
      main: defaultTheme.SECONDARY.MAIN,
      dark: defaultTheme.SECONDARY.DARK,
      light: defaultTheme.SECONDARY.LIGHT,
    },
  },
});

const App = () => {
  let elements = useRoutes(routes);

  return <ThemeProvider theme={theme}>{elements}</ThemeProvider>;
};

export default App;
