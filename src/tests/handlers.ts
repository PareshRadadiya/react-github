// src/mocks/handlers.js
import { rest } from 'msw'
import * as user from './moke/user.json';
import * as orgs from './moke/orgs.json';
import * as repos from './moke/repos';
import { UserGithubRepositories } from '../store/types/githubTypes';

const getUser = rest.get('https://api.github.com/users/willbailey', (_req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.json(user)
  );
});

const getOrgs = rest.get('https://api.github.com/users/willbailey/orgs', (_req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.json(orgs)
  );
});

const getEmptyOrgs = rest.get('https://api.github.com/users/willbailey/orgs', (_req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.json([])
  );
});

const getRepos = rest.get('https://api.github.com/users/willbailey/repos', (req, res, ctx) => {
  const queryParams = req.url.searchParams;

  // Access query parameters
  const page = queryParams.get('page');
  const pageNumber = page || '1';
  const pagedRepos = repos[`reposPage_${pageNumber}` as keyof typeof repos] as UserGithubRepositories;

  return res(
    ctx.delay(500),
    ctx.json(pagedRepos)
    );
});

const getLimitedRepos = rest.get('https://api.github.com/users/willbailey/repos', (_req, res, ctx) => {
  const pagedRepos = repos[`reposPage_1` as keyof typeof repos] as UserGithubRepositories;
  const limitedRepos = pagedRepos.slice(0, 10);
  return res(
    ctx.delay(500),
    ctx.json(limitedRepos)
    );
});

const getEmptyRepos = rest.get('https://api.github.com/users/willbailey/repos', (_req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.json([])
    );
});


export {
  getUser,
  getOrgs,
  getEmptyOrgs,
  getRepos,
  getLimitedRepos,
  getEmptyRepos,
};
