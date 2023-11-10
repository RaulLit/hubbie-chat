import { Box, Button, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const Intro = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  if (auth?.currentUser !== null) navigate("/home");
  return (
    <Container sx={{ height: "100%", width: "100%", marginTop: 5, background: "gray" }}>
      <Box
        sx={{
          height: "60vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3">Text with your friends anytime you want!!</Typography>
        <Typography variant="h4" sx={{ margin: "1rem 0" }}>
          Register to start now!
        </Typography>
      </Box>

      <Button onClick={() => navigate("/auth")}>Get Started</Button>
    </Container>
  );
};
