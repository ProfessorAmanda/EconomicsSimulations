import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "../App.js";

describe("top-level integration tests", () => {

  const clickIntoModule = (moduleName) => {
    fireEvent.click(screen.getByRole("button", { name: "Start!" }));
    fireEvent.click(screen.getByRole("button", { name: moduleName }));
  }

  beforeEach(async () => {
    jest.useFakeTimers();
    render(<App/>);
    await act(async () => jest.runAllTimers());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Displays StartHere text after intro animation", () => {
    expect(screen.getByText("This website is an interactive educational application developed to simulate and visualize various statistical concepts.")).toBeInTheDocument();
  });

  test("clicking StartHere button renders SimBar", () => {
    fireEvent.click(screen.getByRole("button", { name: "Start!" }));
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  test("clicking module brings up SimulationContainer", () => {
    clickIntoModule("Law of Large Numbers");
    expect(screen.getByTestId("sim-container")).toBeInTheDocument();
  });

  test("clicking menu button brings up menu", () => {
    clickIntoModule("Law of Large Numbers");
    fireEvent.click(screen.getByRole("button", { name: "MENU" }));
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });
});
