import "@testing-library/jest-dom";
import { render } from '../../tests/test-utils';
import { screen, waitFor } from '@testing-library/react'

import Repositories from "./Repositories";
import { MemoryRouter } from "react-router-dom";

const renderRepositoriesComponent = () => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/repositories', state: { user: 'willbailey' } }]}>
      <Repositories />
    </MemoryRouter>
  );
};

describe('Repositories component', () => {
  it("renders Repositories correctly", async () => {
    const { asFragment } =renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
    expect(asFragment()).toMatchSnapshot();
  });
});
