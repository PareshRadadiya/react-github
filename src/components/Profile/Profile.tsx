import { FC } from "react";
import { Box, Typography, CardMedia, Card, Avatar, Link } from "@mui/material";
import { useTranslation } from 'react-i18next';


import {
  useGetUserQuery,
  useGetUserOrganizationsQuery,
} from "../../store/services/github";

import "./Profile.scss";

interface UserInfoProps {
  userName: string;
}

const Profile: FC<UserInfoProps> = ({ userName }) => {
  const { data: user } = useGetUserQuery(userName);
  const { data: organizations, error: organizationsError, isLoading: organizationsIsLoading } = useGetUserOrganizationsQuery(userName);
  const { t } = useTranslation();
  console.log("this is translation.", user);
  return (
    <Box className="user-profile">
      <Box className="user-profile-wrapper">
        <Card className="profile-image-card">
          <CardMedia
            className="profile-image"
            component="img"
            alt={user?.name + " Avatar"}
            height="140"
            image={user?.avatar_url || 'https://avatars.githubusercontent.com/u/102299323'}
          />
        </Card>
        <Box className="profile-user-detail ">
          <Typography className="profile-user-name">
            {user?.name}
          </Typography>
          <Typography className="profile-user-login">
            {user?.login}
          </Typography>
        </Box>
      </Box>
      <Box className="profile-follow">
        <Box className="profile-follow-item">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
          >
            <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
          </svg>
          <span className="follow-count">{user?.followers || 0}</span>
          {t('PROFILE.FOLLOWERS')}
        </Box>
        ·
        <Box className="profile-follow-item">
          <span className="follow-count">{user?.following || 0}</span>
          {t('PROFILE.FOLLOWING')}
        </Box>
      </Box>
      {user?.company && (
        <Box className="profile-organization">
          <svg
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"></path>
          </svg>
          <Link className="profile-organization-name profile-detail" href={`https://github.com/${user?.company.substring(1)}`}>
            {user?.company}
          </Link>
        </Box>
      )}
      {user?.location && (
        <Box className="profile-organization" sx={{ marginTop: "10px" }}>
          <svg
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
          </svg>
          <Typography
            className="profile-location profile-detail"
            sx={{ marginLeft: "7px" }}
          >
            {user?.location}
          </Typography>
        </Box>
      )}
      {user?.blog && (<Box className="profile-organization" sx={{ marginTop: "10px" }}>
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
        >
          <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
        </svg>
        <Link
          className="profile-link profile-detail"
          sx={{ marginLeft: "7px" }}
          href={user?.blog}
        >
          {user?.blog}
        </Link>
      </Box>)}
      {user?.twitter_username && (<Box className="profile-organization" sx={{ marginTop: "10px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 273.5 222.3"
          role="img"
          aria-labelledby="a649vtp7ztgwm0uc794hv7xjfhsr9rzv"
          width="16"
          height="16"
        >
          <title id="a649vtp7ztgwm0uc794hv7xjfhsr9rzv">Twitter</title>
          <path d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"></path>
        </svg>
        <Link
          className="profile-twitter profile-detail"
          sx={{ marginLeft: "7px" }}
          href={`https://twitter.com/${user?.twitter_username.substring(1)}`}
        >
          @{user?.twitter_username}
        </Link>
      </Box>)}

      {!organizationsError && !organizationsIsLoading && (organizations?.length !== 0) && (
        <Box className="profile-organizations">
          <Typography variant="h6" className="organization">
            {t('PROFILE.ORGANIZATIONS')}
          </Typography>
          <Box className="profile-organization-list" data-testid="organization-list">
            {organizations?.map((org: any) => (
              <Link key={org.id} href={`https://github.com/${org.login}`}>
                <Avatar
                  alt="Organization Avatar"
                  src={org.avatar_url}
                  className="repoImg"
                />
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
