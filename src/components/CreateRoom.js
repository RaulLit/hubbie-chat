import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenerateRoomCode } from "../util/common";

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomSize, setRoomSize] = useState(5);
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const colRef = collection(db, "rooms");
    addDoc(colRef, {
      roomName,
      roomSize,
      members: [auth.currentUser.uid],
      roomCode: GenerateRoomCode(),
    })
      .then((res) => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(docRef, {
          rooms: arrayUnion(res.id),
        })
          .then(() => {
            navigate("/chatroom");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box m={2}>
      <Typography>Create Room</Typography>
      <form
        noValidate
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleCreateRoom}
      >
        <TextField
          margin="normal"
          label="Room Name"
          variant="outlined"
          color="secondary"
          required
          onChange={(e) => setRoomName(e.target.value)}
        />
        <FormControl>
          <FormLabel>Room Size</FormLabel>
          <RadioGroup value={roomSize} onChange={(e) => setRoomSize(e.target.value)}>
            <FormControlLabel value={5} control={<Radio />} label="5 members" />
            <FormControlLabel value={10} control={<Radio />} label="10 members" />
            <FormControlLabel value={15} control={<Radio />} label="15 members" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" color="secondary" variant="contained" endIcon={<Add />}>
          Create Room
        </Button>
      </form>
    </Box>
  );
};
