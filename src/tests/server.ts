// src/mocks/server.js
import { setupServer } from 'msw/node'
import {
  getOrgs,
  getRepos,
  getUser,
} from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(
  getUser,
  getOrgs,
  getRepos,
);
