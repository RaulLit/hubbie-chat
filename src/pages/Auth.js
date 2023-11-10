import { Container, Divider } from "@mui/material";
import { SignUpForm } from "../components/auth/SignUpForm";
import { LoginForm } from "../components/auth/LoginForm";

export const Auth = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: (theme) => theme.spacing(10),
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <LoginForm />
      <Divider orientation="vertical" variant="middle" flexItem color="black" />
      <SignUpForm />
    </Container>
  );
};
