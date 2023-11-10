import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { ChatRoom } from "./components/ChatRoom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Temp } from "./pages/Temp";
import { Layout } from "./components/Layout";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";

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
        },
      }),
    [prefersDarkMode]
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Temp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/chatroom" element={<ChatRoom />} />
              </Routes>
            </Layout>
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
