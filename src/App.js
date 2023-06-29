import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { ChatRoom } from "./components/ChatRoom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chatroom" element={<ChatRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
