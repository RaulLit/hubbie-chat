import { Login } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const JoinRoom = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(null);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    setError("");

    if (roomCode.length !== 6) return setError("Invalid code");

    const colRef = collection(db, "rooms");
    const q = query(colRef, where("roomCode", "==", roomCode));
    getDocs(q)
      .then((res) => {
        if (res.size > 1) return setError("Multiple Rooms with same code exist");
        if (res.size < 1) return setError("No such room found");
        res.forEach((document) => {
          document.data().members.forEach((member) => {
            if (member === user.uid) {
              return setError("You have already joined the room");
            }
          });
          const docRef = doc(db, "rooms", document.id);
          updateDoc(docRef, {
            members: arrayUnion(user.uid),
          })
            .then((res) => navigate("/home"))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => setError(err));
  };
  return (
    <Box m={2}>
      <Typography>Join Room</Typography>
      <form
        noValidate
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onSubmit={handleJoinRoom}
      >
        <TextField
          margin="normal"
          sx={{ mr: 2 }}
          label="Enter Room Code"
          variant="outlined"
          color="secondary"
          required
          onChange={(e) => setRoomCode(e.target.value)}
          error={error ? true : false}
          helperText={error}
        />
        <Button type="submit" color="secondary" variant="contained" endIcon={<Login />}>
          Join
        </Button>
      </form>
    </Box>
  );
};
