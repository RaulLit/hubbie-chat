import { Box, Button, Typography } from "@mui/material";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // Get user rooms id
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef)
      .then(
        (data) => {
          console.log(data.data().rooms);
          data.data().rooms.forEach((room) => {
            // get room info
            getRoomInfo(room);
          });
        }
        // setRooms([...rooms, data.docs.map((data) => ({ ...data.data(), id: data.id }))])
      )
      .catch((err) => console.log(err));

    // Get room info
    const getRoomInfo = (id) => {
      const docRef = doc(db, "rooms", id);
      getDoc(docRef).then((res) => {
        console.log(res.data(), "id", res.id);
        setRooms([...rooms, { id, ...res.data() }]);
      });
    };
  }, []);
  return (
    <Box>
      <Typography variant="h5">Your Rooms</Typography>
      {rooms && rooms.map((room) => <Button key={room.id}>{room.roomName}</Button>)}
    </Box>
  );
};
