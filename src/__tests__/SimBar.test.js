import { render, screen, fireEvent } from "@testing-library/react";
import SimBar from "../components/SimBar.js";
import { MODULES } from "../lib/constants.js";

describe("SimBar tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<SimBar setSection={handler}/>);
  });

  MODULES.forEach(({ name }) => {
    test(`${name} module displayed`, () => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  MODULES.forEach(({ name }) => {
    test(`${name} module calls correct handler`, () => {
      fireEvent.click(screen.getByText(name));
      expect(handler).toHaveBeenCalledWith(name);
    });
  });
});
