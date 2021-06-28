import { render, screen, fireEvent } from "@testing-library/react";
import PopBar from "../components/PopBar.js";

describe("PopBar tests", () => {
  const options = ["Normal", "Uniform", "Exponential", "Chi-Squared", "Mystery"];
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
});
