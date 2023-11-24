import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import UserGitRepos from './Form/From';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe('UserGitRepos', () => {
  let store: any;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      userRepositary: {
        userRepositaryData: [],
      },
      userCompanyData: [], 
    });
  });

  test('handles form submission with valid input', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
           <UserGitRepos />
        </MemoryRouter>
      </Provider>
    );

    // Fill in the user name input
    fireEvent.change(screen.getByLabelText('Enter Username'), { target: { value: 'testUser' } });
    const inputValue = screen.getByLabelText('Enter Username').getAttribute('value');

    // Assert that the value attribute is equal to 'testUser'
    expect(inputValue).toEqual('testUser');

// Fill in the user name input
  fireEvent.change(screen.getByLabelText('Enter Username'), { target: { value: '' } });
 
    // // Click the submit button
    fireEvent.click(screen.getByText('Submit'));
  await waitFor (()=>{
    screen.debug()
      expect(screen.getByTestId('error')).toBeInTheDocument();
    })

  });
});
// / expect(screen.getByTestId('error')).toBeInTheDocument()