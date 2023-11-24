import { useState, FC } from "react";
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

const Form: FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!userName) {
      setError(true);
      return;
    }

    navigate(`/repositories`, { state: { userName } });
  };

  return (
    <>
      <Box className="user-form-container">
        <Avatar alt="Github Avatar" src={gitAvatar} className="gitLogo" />
        <Typography variant="h5" className="userName">
          Get Github Repositories
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
              if (error && e.target.value) {
                setError(false);
              }
              setUserName(e.target.value);
            }}
            error={error}
            required
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

export default Form;