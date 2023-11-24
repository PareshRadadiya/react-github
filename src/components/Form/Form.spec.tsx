import "@testing-library/jest-dom";
import { render } from '../../tests/test-utils';

import Form from "./Form";

describe('Form component', () => {
  it("renders Form correctly", () => {
    const { asFragment } = render(<Form />);
    expect(asFragment()).toMatchSnapshot();
  });
});

