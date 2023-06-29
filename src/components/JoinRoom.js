import { Login } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
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
      >
        <TextField
          margin="normal"
          sx={{ mr: 2 }}
          label="Enter Room Code"
          variant="outlined"
          color="secondary"
          required
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <Button type="submit" color="secondary" variant="contained" endIcon={<Login />}>
          Join
        </Button>
      </form>
    </Box>
  );
};
