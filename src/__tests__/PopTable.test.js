import { render, screen } from "@testing-library/react";
import PopTable from "../components/PopTable.js";
import _ from "lodash";
import { VALUES } from "../lib/constants.js";

const testPopulation = _.range(100).map((num) => ({x: num, y: num, id: num}));
const testSampleIDs = [2, 5, 12, 34, 75]
const popShape = "Normal"

describe("PopTable tests", () => {
  beforeEach(() => {
    render(<PopTable popArray={testPopulation} sampleIDs={testSampleIDs} popShape={popShape}/>);
  })

  test("table contains all objects in pop", () => {
    expect(screen.getAllByRole("row")).toHaveLength(testPopulation.length + 1);
  });

  test("samples highlighted", () => {
    const rows = screen.getAllByRole("row");
    rows.forEach((row) => {
      expect(row).toHaveStyle({backgroundColor: (testSampleIDs.includes(row.key) ? "#747EF2" : undefined)})
    })
  });

  test("correct header text displayed", () => {
    expect(screen.getByRole("columnheader", { name: VALUES[popShape].tableCol })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: VALUES[popShape].xLabel })).toBeInTheDocument();
  });
});
