// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GitHubUser,
  UserGithubRepositeries,
  UserGitHubOrganizations,
} from "../types/githubTypes";

// Define a service using a base URL and expected endpoints
export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/users" }),
  endpoints: (builder) => ({
    getUserRepositeries: builder.query<UserGithubRepositeries, string>({
      query: (name) => `${name}/repos`,
    }),
    getUser: builder.query<GitHubUser, string>({
      query: (name) => `${name}`,
    }),
    getUserOrganizations: builder.query<UserGitHubOrganizations, string>({
      query: (name) => `${name}/orgs`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserOrganizationsQuery,
  useGetUserQuery,
  useGetUserRepositeriesQuery,
} = githubApi;
