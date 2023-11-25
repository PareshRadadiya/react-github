import "@testing-library/jest-dom";
import { render } from '../../tests/test-utils';
import { screen, waitFor, fireEvent } from '@testing-library/react'

import Repositories from "./Repositories";
import { MemoryRouter } from "react-router-dom";
import { server } from "../../tests/server";
import { getEmptyOrgs, getLimitedRepos } from "../../tests/handlers";

const renderRepositoriesComponent = () => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/repositories' }]}>
      <Repositories />
    </MemoryRouter>
  );
};

describe('Repositories component', () => {

  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => 'willbailey');
  });


  // it("renders Repositories correctly", async () => {
  //   const { asFragment } = renderRepositoriesComponent();
  //   await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
  //   expect(asFragment()).toMatchSnapshot();
  // });

  it("renders 30 repositories by default", async () => {
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
    const repositories = screen.getByTestId('repositories-list');
    const items = repositories.children;
    expect(items.length).toBe(30);
  });

  it("should go to the previous and next pages", async () => {
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    let repositories = screen.getByTestId('repositories-list');
    let items = repositories.children;
    expect(items.length).toBe(30);

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    repositories = screen.getByTestId('repositories-list');
    items = repositories.children;
    expect(items.length).toBe(30);
  });

  it("should have previous button disabled", async () => {
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
    const previousButton = screen.getByRole('button', { name: /previous/i });

    // Assert that the button is disabled
    expect(previousButton).toBeDisabled();
  });

  it("should have next button disabled", async () => {
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());

    // Go to page 2
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    // Go to page 3
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });
  });

  it("should not have a pagination", async () => {
    server.use(getLimitedRepos);
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());

    const repositories = screen.getByTestId('repositories-list');
    const items = repositories.children;
    expect(items.length).toBe(10);

    // Query for the button
    const previousButton = screen.queryByRole('button', { name: /previous/i });
    const nextButton = screen.queryByRole('button', { name: /next/i });

    // Assert that the button is not in the document
    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("should render organization", async () => {
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
    const repositories = screen.getByTestId('organization-list');
    const items = repositories.children;
    expect(items.length).toBe(7);
  });

  it("should not render organization", async () => {
    server.use(getEmptyOrgs);
    renderRepositoriesComponent();
    await waitFor(async () => expect(await screen.findByText(/will bailey/i)).toBeVisible());
    const organizationList = screen.queryByTestId('organization-list');
    expect(organizationList).not.toBeInTheDocument();
  });
});
