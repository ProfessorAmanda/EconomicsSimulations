import { render, screen, fireEvent } from "@testing-library/react";
import PopBar from "../components/PopBar.js";

describe("PopBar tests", () => {
  const options = ["Normal", "Uniform", "Exponential"];
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<PopBar options={options} setPop={handler}/>);
  });

  options.forEach((option) => {
    test(`${option} button rendered`, () => {
      expect(screen.getByRole("button", { name: option })).toBeInTheDocument()
    });
  });

  options.forEach((option) => {
    test(`selecting ${option} updates style`, () => {
      options.forEach((opt) => {
        expect(screen.getByRole("button", { name: opt })).toHaveStyle({backgroundColor: "#555555"})
      });
      fireEvent.click(screen.getByRole("button", { name: option }));
      options.forEach((opt) => {
        expect(screen.getByRole("button", { name: opt })).toHaveStyle({backgroundColor: (opt === option) ? "#4CAF50" : "#555555"})
      });
    });
  });
});
