import { Box, Grid, Pagination, Typography, CircularProgress } from "@mui/material";
import { FC, useState } from "react";

import "../UserData.css";
import { useGetUserRepositoriesQuery } from "../../store/services/github";
import Repository from "./Repository";

interface RepositoriesListProps {
  userName: string;
}

const itemsPerPage = 10;

const RepositoriesList: FC<RepositoriesListProps> = ({ userName }) => {
  const { data: repositories, error, isLoading  } = useGetUserRepositoriesQuery(userName);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(repositories?.length / itemsPerPage);

  // Function to calculate paginated items based on the current page
  const calculatePaginatedRepositories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return repositories?.slice(startIndex, endIndex);
  };

  // Function to handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    event.preventDefault();
    setCurrentPage(newPage);
  };

  const paginatedRepositories = calculatePaginatedRepositories();

  if (!isLoading && (!repositories || repositories?.length < 1))   {
    return (
      <Box className="user-repositories-list">
        <Typography variant="h5" className="user-repositories-empty">
          {userName} doesn’t have any public repositories yet.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className="user-repositories-loading">
        <CircularProgress />
      </Box>
    );
  }

  return (
      <Box className="user-repositories-list">
        {paginatedRepositories?.map((repo: any) => (
          <Grid item key={repo.id} xs={12}>
            <Repository repoData={repo} />
          </Grid>
        ))}
        {repositories?.length > itemsPerPage && (
          <Box className="paginate-container">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              className="pagination"
              color="primary"
            />
          </Box>
        )}
      </Box>
  );
};

export default RepositoriesList;
