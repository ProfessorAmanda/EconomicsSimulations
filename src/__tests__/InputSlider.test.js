import { render, screen, fireEvent } from "@testing-library/react";
import InputSlider from "../components/InputSlider.js";

describe("InputSlider tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
    render(<InputSlider value={1} min={0} max={10} step={1} onChange={handler}/>);
  });

  test("changing slider calls handler with correct argument", () => {
    fireEvent.change(screen.getByRole("slider"), { target: { value: 5 }});
    expect(handler).toHaveBeenCalledWith("5");
  });

  test("changing number input calls handler with correct argument", () => {
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 5 }});
    expect(handler).toHaveBeenCalledWith("5");
  });
});
