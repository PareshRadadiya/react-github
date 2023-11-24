import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  Card,
  Avatar,
  Pagination,
} from "@mui/material";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchOrganizationData,
  fetchUserName,
} from "../Actions/userRepositaryDataActions";
import CardComponent from "./CardComponent";
import "./UserData.css";
import { useLocation } from "react-router-dom";
import company from "../assets/company.png";
import location from "../assets/location.png";

const UserData = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const userRepositaryData = useSelector(
    (state: any) => state.userRepositary.userRepositaryData
  );
  const userOrganization = useSelector(
    (state: any) => state.userRepositary.userOrganizationData
  );
  const userNameData = useSelector(
    (state: any) => state.userRepositary.userNameData
  );
  const Test = useSelector((state) => state);
  console.log("TEST-2", Test);
  const { state } = useLocation();
  const userName = state?.user;
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserData(userName));
    dispatch(fetchOrganizationData(userName));
    dispatch(fetchUserName(userName));
  }, []);

  const handlePageChange = (_event: any, value: any) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = userRepositaryData ? currentPage * itemsPerPage : 0;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userRepositaryData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = userRepositaryData
    ? Math.ceil(userRepositaryData.length / itemsPerPage)
    : 0;

  console.log("userNameData", userNameData);

  return (
    <>
      <Box className="repoTitle">
        <Typography variant="h4">Repositories</Typography>
      </Box>

      {currentItems?.length > 0 ? (
        <>
          <Box className="userBoxContainer">
            <Box className="companyName">
              <Card className="imageCard">
                <CardMedia
                  className="imageMedia"
                  component="img"
                  alt="Your Image Alt Text"
                  height="140"
                  image={userRepositaryData[0]?.owner.avatar_url}
                />
              </Card>
              <Box className="userDetail">
                <Typography className="userNameData">
                  {userNameData?.name}
                </Typography>
                <Typography className="userLogin">
                  {userNameData?.login}
                </Typography>
              </Box>
              <Box className="companyDetails">
                <Avatar alt="Company" src={company} className="companyLogo" />
                <Typography className="companyNameDetails">
                  {userNameData?.company}
                </Typography>
              </Box>
              <Box className="companyDetails" sx={{ marginTop: "10px" }}>
                <Avatar alt="Company" src={location} className="companyLogo" />
                <Typography
                  className="locationDetails"
                  sx={{ marginLeft: "7px" }}
                >
                  {userNameData?.location}
                </Typography>
              </Box>

              <Typography variant="h6" className="organization">
                Organizations
              </Typography>
              <Typography className="organizationImg">
                {userOrganization?.map((org: any) => (
                  <Box key={org.id}>
                    <Avatar
                      alt="Organization Avatar"
                      src={org.avatar_url}
                      className="repoImg"
                    />
                  </Box>
                ))}
              </Typography>
            </Box>

            <Box className="userData">
              {currentItems?.map((repo: any) => (
                <Grid item key={repo.id} xs={12}>
                  <CardComponent repoData={repo} />
                </Grid>
              ))}
            </Box>
          </Box>
          <Box className="paginationBlock">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              className="pagination"
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Box>
          <Typography variant="h6" className="noData">
            No Data Found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default UserData;
