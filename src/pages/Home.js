import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

export const Home = () => {
  const navigate = useNavigate();
  const dummy = useRef();
  const [messages, setMessages] = useState(null);

  if (!auth.currentUser) {
    navigate("/signin");
  }

  // Schema
  const schema = yup.object().shape({
    message: yup.string().required("Write a message"),
  });

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const colRef = collection(db, "messages");

  const sendMessage = (data) => {
    addDoc(colRef, {
      ...data,
    })
      .then((res) => {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => console.log(err));
  };

  const getMessages = async () => {
    getDocs(colRef)
      .then((data) =>
        setMessages(data.docs.map((data) => ({ ...data.data(), id: data.id })))
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <Container>
      <Box>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(sendMessage)}>
        <TextField
          margin="normal"
          label="Your Message"
          variant="outlined"
          color="secondary"
          type="text"
          required
          fullWidth
          error={errors.message ? true : false}
          helperText={errors.message?.message}
          {...register("message")}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<Send />}
          sx={{ ml: 1 }}
        >
          Send
        </Button>
      </form>
    </Container>
  );
};
