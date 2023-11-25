import "@testing-library/jest-dom";
import { render } from '../../tests/test-utils';
import { MemoryRouter } from "react-router-dom";
import { screen, fireEvent } from '@testing-library/react';

import Form from "./Form";

describe('Form component', () => {
  it("renders Form correctly", () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Form />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle error message", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Form />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', {  name: /submit/i}));
    expect(screen.getByText(/please enter github username./i)).toBeVisible();
    
    fireEvent.change(screen.getByRole('textbox', {  name: /enter username/i}), { target: { value: 'willbailey' } });
    fireEvent.click(screen.getByRole('button', {  name: /submit/i}));
    expect(screen.queryByText(/please enter github username./i)).not.toBeInTheDocument();
  });
});
