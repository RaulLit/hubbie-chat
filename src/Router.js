import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { ChatRoom } from "./components/ChatRoom";
import { Intro } from "./pages/Intro";
import { Layout } from "./components/Layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
