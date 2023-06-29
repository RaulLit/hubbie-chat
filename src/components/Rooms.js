import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthContext);

  // Get user rooms
  const getUserRooms = () => {
    const colRef = collection(db, "rooms");
    const q = query(colRef, where("members", "array-contains", user.uid));
    getDocs(q)
      .then((res) => setRooms(res.docs.map((room) => ({ ...room.data(), id: room.id }))))
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Typography variant="h5">Your Rooms</Typography>
      {user && getUserRooms()}
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
      >
        {rooms && rooms.map((room) => <Button key={room.id}>{room.roomName}</Button>)}
      </ButtonGroup>
    </Box>
  );
};
