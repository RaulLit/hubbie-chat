import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { ChatRoom } from "./components/ChatRoom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Temp } from "./pages/Temp";
import { Layout } from "./components/Layout";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
