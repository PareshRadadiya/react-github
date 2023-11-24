import { configure } from '@testing-library/react';
import 'cross-fetch/polyfill';
// import replaceAllInserter from 'string.prototype.replaceall';
// import atInserter from 'array.prototype.at';
import { server } from './server';

// replaceAllInserter.shim();
// atInserter.shim();

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

configure({ asyncUtilTimeout: 10000 });
