import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Send } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";

export const SignIn = () => {
  const navigate = useNavigate();
  if (auth.currentUser) {
    navigate("/");
  }

  // Schema
  const schema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required!"),
    password: yup.string().min(4).required("Password is required"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(data);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Typography variant="h4">Log in</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          margin="normal"
          label="Password"
          variant="outlined"
          color="secondary"
          type="password"
          required
          fullWidth
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<Send />}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
