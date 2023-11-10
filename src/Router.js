import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
// Pages
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { ChatRoom } from "./components/ChatRoom";
import { Intro } from "./pages/Intro";
import { NotFound } from "./pages/NotFound";

export const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={!user ? <Intro /> : <Navigate to="/home" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/home" />} />
          <Route
            path="/chatroom"
            element={user ? <ChatRoom /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
