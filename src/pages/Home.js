import { Box, Container, Typography } from "@mui/material";
import { auth } from "../config/firebase";
import { CreateRoom } from "../components/CreateRoom";
import { JoinRoom } from "../components/JoinRoom";
import { Rooms } from "../components/Rooms";

const sxFlexColumn = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

const sxFlex = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

export const Home = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", m: 4 }}>
        <Typography variant="h4">
          Welcome back {auth.currentUser?.displayName}!!
        </Typography>
      </Box>

      <Box sx={sxFlex}>
        <Box sx={sxFlexColumn}>
          <CreateRoom />
          <JoinRoom />
        </Box>

        <Rooms />
      </Box>
    </Container>
  );
};
