import { Box, Grid, Pagination } from "@mui/material";
import { FC, useState } from "react";

import "../UserData.css";
import { useGetUserRepositeriesQuery } from "../../store/services/github";
import Repository from "./Repository";

interface RepositeriesListProps {
  user: string;
}

const itemsPerPage = 10;

const RepositeriesList: FC<RepositeriesListProps> = ({ user }) => {
  const {
    data: repositeries,
    error: repositeriesError,
    isLoading: repositeriesIsLoading,
  } = useGetUserRepositeriesQuery(user);

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
    setCurrentPage(newPage);
  };

  const paginatedRepositeries = calculatePaginatedRepositeries();

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
