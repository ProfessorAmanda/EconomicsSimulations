import { render, screen, fireEvent } from "@testing-library/react";
import SampleSizeInput from "../components/SampleSizeInput.js";

describe("SampleSizeInput tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<SampleSizeInput maxSize={5} handleClick={handler}/>);
  });

  test("Button is disabled initally", () => {
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("Button is disabled when value exceeds maxSize", () => {
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 6 }});
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("Button is disabled when value less than 1", () => {
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 0 }});
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("Button not disabled when 1 <= value <= maxSize", () => {
    [1, 2, 3, 4, 5].forEach((num) => {
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: num }});
      expect(screen.getByRole("button")).not.toBeDisabled();
    });
  });

});
