import { Box, Grid, Button, Typography, CircularProgress } from "@mui/material";
import { FC, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import "../UserData.css";
import { useGetUserRepositoriesQuery } from "../../store/services/github";
import Repository from "./Repository";

interface RepositoriesListProps {
  userName: string;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const RepositoriesList: FC<RepositoriesListProps> = ({ userName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: repositories, isLoading } = useGetUserRepositoriesQuery({ name: userName, page: currentPage });
  const totalRepos = repositories?.length || 0;
  const disableNext = totalRepos < 30;
  const disablePrevious = currentPage === 1;
  const disablePagination = disableNext && disablePrevious;

  const handleNext = () => {
    scrollToTop();
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    scrollToTop();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  if (isLoading) {
    return (
      <Box className="user-repositories-loading">
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoading && (!repositories || repositories?.length < 1)) {
    return (
      <Box className="user-repositories-list">
        <Typography variant="h5" className="user-repositories-empty">
          {userName} doesn’t have any public repositories yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="user-repositories-list">
      <Box data-testid="repositories-list">
        {repositories?.map((repo: any) => (
          <Grid item key={repo.id} xs={12}>
            <Repository repoData={repo} />
          </Grid>
        ))}
      </Box>
      {!disablePagination && (
        <Box className="paginate-container">
          <Button startIcon={<ArrowBackIosIcon />} onClick={handlePrevious} disabled={disablePrevious}>Previous</Button>
          <Button endIcon={<ArrowForwardIosIcon />} onClick={handleNext} disabled={disableNext}>Next</Button>
        </Box>
      )}
    </Box>
  );
};

export default RepositoriesList;
