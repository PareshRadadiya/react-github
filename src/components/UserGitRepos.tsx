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
import "./UserData.css";
import gitAvatar from "../assets/github.png";

const UserGitRepos = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    console.log("userName", userName);
    if (!userName.length) {
      setError('"User Name" is not allowed to be empty');
    } else {
      console.log("Navigate", "Navigate");
      navigate(`/repos`, { state: { user: userName } });
    }
  };

  return (
    <>
      <Box className="logoContainer">
        <Avatar alt="Github Avatar" src={gitAvatar} className="gitLogo" />
        <Typography variant="h5" className="userName">
          Sign in to GitHub
        </Typography>
      </Box>
      <Box className="userInputContainer">
        <Paper className="boxContainer">
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
          {error && (
            <div data-testId="error" className="error">
              {error}
            </div>
          )}
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

export default UserGitRepos;
