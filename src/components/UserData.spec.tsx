import { render } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import UserData from './UserData';
import * as userRepositaryDataActions from '../Actions/userRepositaryDataActions';
import { MemoryRouter } from 'react-router-dom';
import { dummyOrganizationData, dummyUserData, dummyUserNameData } from '../mockData/mockData';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // If you are using redux-thunk for async actions

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

// const mockDispatch = jest.fn();
// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(), // Mock the useDispatch hook
    useSelector: jest.fn(),
  }));
  
  // Mock the entire userRepositaryDataActions module
  jest.mock('../Actions/userRepositaryDataActions', () => ({
    ...jest.requireActual('../Actions/userRepositaryDataActions'),
    fetchUserData: jest.fn(),
    fetchOrganizationData: jest.fn(),
    fetchUserName: jest.fn(),
  }));
  


const middlewares = [thunk]; // Add middleware as needed
const mockStore = configureMockStore(middlewares);

  describe('UserData', () => {
    let store: any;
    let dispatch: jest.Mock;
  
    beforeEach(() => {
      // Create a mock for the dispatch function
      dispatch = jest.fn();
  
      const initialState = {
        userRepositary: {
          userRepositaryData: dummyUserData, // Mock data for userRepositaryData
          userOrganizationData: dummyOrganizationData, // Mock data for userOrganizationData
          userNameData: dummyUserNameData, // Mock data for userNameData
        },
        // Add other slices of the state as needed
      };
    
       store = mockStore(initialState); // Create an instance of the mock store
    
  
      // Mock the useDispatch hook to return the mock dispatch function
      (useDispatch as jest.Mock).mockReturnValue(dispatch);
    });
  
    test('renders UserData component with data', async () => {
        // Mock the asynchronous actions to return resolved Promises
        (userRepositaryDataActions.fetchUserData as jest.Mock).mockImplementation(() => {
            return async (dispatch: any) => {
              await Promise.resolve();
              dispatch({ type: 'USER_REPOSITARY_DATA', payload: dummyUserData });
            };
          });
        
          (userRepositaryDataActions.fetchOrganizationData as jest.Mock).mockImplementation(() => {
            return async (dispatch: any) => {
              await Promise.resolve();
              dispatch({ type: 'USER_ORGANIZATION', payload: dummyOrganizationData });
            };
          });
        
          (userRepositaryDataActions.fetchUserName as jest.Mock).mockImplementation(() => {
            return async (dispatch: any) => {
              await Promise.resolve();
              dispatch({ type: 'GET_USERNAME', payload: dummyUserNameData });
            };
          });
        render(
          <Provider store={store}>
            <MemoryRouter>
              <UserData />
            </MemoryRouter>
          </Provider>
        );
      
        // Wait for the asynchronous actions to complete using act
        await act(async () => {
          await flushPromises(); // Ensure all promises are resolved
        });
     
        // Assert that the fetchUserData, fetchOrganizationData, and fetchUserName actions were called
        expect(userRepositaryDataActions.fetchUserData).toHaveBeenCalled();
        expect(userRepositaryDataActions.fetchOrganizationData).toHaveBeenCalled();
        expect(userRepositaryDataActions.fetchUserName).toHaveBeenCalled();
      });
  });
  