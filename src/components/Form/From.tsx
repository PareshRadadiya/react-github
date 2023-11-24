import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import "../UserData.css";
import gitAvatar from "../../assets/github.png";

export default () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = () => {
    navigate(`/repositeries`, { state: { user: userName } });
  };

  return (
    <>
      <Box className="user-form-container ">
        <Avatar alt="Github Avatar" src={gitAvatar} className="gitLogo" />
        <Typography variant="h5" className="userName">
          Sign in to GitHub
        </Typography>
      </Box>
      <Box className="username-input">
        <Paper className="uername-input-box">
          <TextField
            data-testid="user-name"
            fullWidth
            id="outlined-basic"
            label="Enter Username"
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={(e: any) => {
              setUserName(e.target.value);
            }}
          />
          <Button
            variant="contained"
            className="submitButton"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </>
  );
};