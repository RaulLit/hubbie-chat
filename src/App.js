import { useMemo } from "react";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { blue, deepOrange, blueGrey } from "@mui/material/colors";
import { Router } from "./Router";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Comfortaa",
          fontWeightLight: 400,
          fontWeightRegular: 500,
          fontWeightMedium: 600,
          fontWeightBold: 700,
        },
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            ...deepOrange,
            ...(prefersDarkMode && {
              main: deepOrange[300],
            }),
          },
          secondary: {
            ...blue,
            ...(prefersDarkMode && {
              main: blue[300],
            }),
          },
          ...(prefersDarkMode && {
            background: {
              default: blueGrey[900],
              paper: blueGrey[800],
            },
          }),
          text: {
            ...(!prefersDarkMode
              ? {
                  primary: blueGrey[900],
                  secondary: blueGrey[800],
                }
              : {
                  primary: "#fff",
                  secondary: blueGrey[500],
                }),
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
