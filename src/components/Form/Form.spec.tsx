import "@testing-library/jest-dom";
import { render } from '../../tests/test-utils';
import { MemoryRouter } from "react-router-dom";

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
});
