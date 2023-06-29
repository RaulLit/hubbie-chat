import { useContext, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export const Temp = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

///////////////////////////////////

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <input
        type="text"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    auth.currentUser && (
      <button className="sign-out" onClick={handleSignOut}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const [messages, setMessages] = useState(null);
  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  const unsub = onSnapshot(q, (docs) => {
    const messagesData = [];
    docs.forEach((doc) => {
      messagesData.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messagesData);
  });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { user } = useContext(AuthContext);
  const { text, uid } = props.message;

  const messageClass = uid === user?.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass} ${uid}`}>
        <Avatar />
        <p>{text}</p>
      </div>
    </>
  );
}
