import { Send } from "@mui/icons-material";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

export const SignUpForm = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.newPassword;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            setDoc(docRef, { name, rooms: [] })
              .then(() => {
                navigate("/");
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/email-already-in-use).")
          setError("Email already in use :(");
      });
  };

  //   Validation
  const schema = yup.object().shape({
    name: yup.string().required("Your display name is required!"),
    email: yup.string().email("Invalid Email!").required("Email is required!"),
    newPassword: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Password don't match!")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container
      sx={{
        flexGrow: 1,
        m: 3,
      }}
    >
      <Typography variant="h4">Sign up</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSignUp)}>
        <TextField
          margin="normal"
          label="Display Name"
          variant="outlined"
          color="secondary"
          required
          fullWidth
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          {...register("name")}
        />
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          margin="normal"
          label="New Password"
          variant="outlined"
          color="secondary"
          type="password"
          fullWidth
          required
          error={errors.newPassword ? true : false}
          helperText={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <TextField
          margin="normal"
          label="Confirm Password"
          variant="outlined"
          color="secondary"
          type="password"
          fullWidth
          required
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
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
      {error && (
        <Typography mt={2} color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
};
