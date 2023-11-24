// src/mocks/handlers.js
import { rest } from 'msw'
import * as user from './moke/user.json';
import * as orgs from './moke/orgs.json';
import * as repos from './moke/repos.json';

const getUser = rest.get('https://api.github.com/users/willbailey', (_req, res, ctx) => {
  console.log('getUser')
  return res(
    ctx.delay(500),
    ctx.json(user)
  );
});

const getOrgs = rest.get('https://api.github.com/users/willbailey/orgs', (_req, res, ctx) => {
  console.log('getOrgs')
  return res(
    ctx.delay(500),
    ctx.json(orgs)
  );
});

const getRepos = rest.get('https://api.github.com/users/willbailey/repos', (_req, res, ctx) => {
  console.log('getRepos')
  return res(
    ctx.delay(500),
    ctx.json(repos)
  );
});


export {
  getUser,
  getOrgs,
  getRepos,
};
