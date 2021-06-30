import { render } from "@testing-library/react";
import DotPlot from "../components/DotPlot.js";
import Highcharts from "highcharts";
import _ from "lodash";

const testSeries = [
  {
    name: "test",
    data: _.range(10).map((num) => ({x: num, y: num, id: num}))
  }
];

describe("DotPlot tests", () => {
  test("dot plot has correct series", () => {
    render(<DotPlot series={testSeries} title={"testTitle"}/>);
    expect(Highcharts.charts).toHaveLength(testSeries.length);
    const chartData = Highcharts.charts[0].series[0].data.map((point) => ({x: point.x, y: point.y})).sort();
    const testData = testSeries[0].data.map((point) => ({x: point.x, y: point.y})).sort();
    expect(chartData).toEqual(testData);
  })
});
