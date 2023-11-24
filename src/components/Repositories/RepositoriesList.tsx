import { Box, Grid, Pagination, Typography } from "@mui/material";
import { FC, useState } from "react";

import "../UserData.css";
import { useGetUserRepositeriesQuery } from "../../store/services/github";
import Repository from "./Repository";

interface RepositeriesListProps {
  user: string;
}

const itemsPerPage = 10;

const RepositeriesList: FC<RepositeriesListProps> = ({ user }) => {
  const { data: repositeries } = useGetUserRepositeriesQuery(user);

  const [currentPage, setCurrentPage] = useState(1);

  // Function to calculate paginated items based on the current page
  const calculatePaginatedRepositeries = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return repositeries?.slice(startIndex, endIndex);
  };

  // Function to handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    event.preventDefault();
    setCurrentPage(newPage);
  };

  const paginatedRepositeries = calculatePaginatedRepositeries();

  if (!repositeries || repositeries?.length < 1) {
    return (
      <Box className="user-repositories-list">
        <Typography variant="h5" className="user-repositories-empty">
          gfhfghfg doesn’t have any public repositories yet.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className="user-repositories-list">
        {paginatedRepositeries?.map((repo: any) => (
          <Grid item key={repo.id} xs={12}>
            <Repository repoData={repo} />
          </Grid>
        ))}
        <Box className="paginate-container">
          <Pagination
            count={repositeries?.length}
            page={currentPage}
            onChange={handlePageChange}
            className="pagination"
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default RepositeriesList;
