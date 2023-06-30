import { Box, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/auth"))
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      {user && (
        <Button sx={{ position: "absolute", top: 0, right: 10 }} onClick={handleSignOut}>
          Sign Out
        </Button>
      )}
      {children}
    </Box>
  );
};
