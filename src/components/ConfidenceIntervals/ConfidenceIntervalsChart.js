import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Alert } from "reactstrap";
import _ from "lodash";
import More from "highcharts/highcharts-more";
import { max } from "mathjs";
import PropTypes from 'prop-types';
import { confidenceIntervalsSampleType, popShapeType } from "../../lib/types.js";
import { VALUES_ALT } from "../../lib/constants.js";

More(Highcharts);

export default function ConfidenceIntervalsChart({ confidenceLevel, samples, popShape, popMean, selected, setSelected }) {
  const [chart, setChart] = useState({});

  useEffect(() => {
    const { xmaxval, xminval, title, xLabel } = VALUES_ALT[popShape];

    const sampleMeans = [];
    const containsMean = [];
    const doesntContainMean = [];

    samples.forEach((sampleObject) => {
      sampleMeans.push({
        ...sampleObject,
        x: sampleObject.id,
        y: sampleObject.mean
      });
      if (sampleObject.label) {
        containsMean.push({
          ...sampleObject,
          low: sampleObject.lowerConf,
          high: sampleObject.upperConf,
          x: sampleObject.id
        })
      } else {
        doesntContainMean.push({
          ...sampleObject,
          low: sampleObject.lowerConf,
          high: sampleObject.upperConf,
          x: sampleObject.id
        })
      }
    });

    const tooltipFormat = {
      headerFormat: "",
      pointFormat: "Sample Size: <b>{point.size}</b><br/>Sample Mean: <b>{point.mean}</b><br/>Lower Bound of CI: <b>{point.lowerConf}</b><br/>Upper Bound of CI: <b>{point.upperConf}</b><br/>Confidence Level: <b>{point.confidenceLevel}%</b><br/>Distribution: <b>{point.distribution}</b><br/>",
      outside: true,
      borderColor: "gray",
    }

    const newChart = {
      chart: {
        type: 'columnrange',
        inverted: true,
        animation: false,
        zoomType: "xy",
        events: {
          // hack to allow zoom
          selection: (event) => {
            event.target.series.forEach((series) => {
              series.data.forEach((point) => {
                point.select(false, false)
              })
            })
          }
        }
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click() {
                setSelected(this);
                this.select(false, false);
              }
            }
          },
          animation: {
            duration: 0
          },
          cursor: "pointer"
        }
      },
      title: {
        text: title
      },
      xAxis: {
        reversed: false,
        min: 1,
        max: max(samples.length, 10),
        startOnTick: true,
        title: {
          text: "Sample Number"
        },
        tickPixelInterval: 1,
        tickInterval: 1
      },
      yAxis: {
        min: xminval,
        max: xmaxval,
        startOnTick: true,
        endOnTick: true,
        title: {
          text: xLabel
        }
      },
      series: [
        {
          name: "Confidence Interval",
          data: containsMean,
          color: "rgba(0, 170, 0, 0.5)",
          centerInCategory: true,
          showInLegend: false,
          tooltip: tooltipFormat,
          allowPointSelect: true,
          animation: {
            duration: 0
          },
          states: {
            hover: {
              color: "rgba(0, 170, 0, 1)"
            },
            inactive: {
              color: "rgba(0, 170, 0, 0.5)"
            },
            select: {
              enabled: false,
              color: "rgba(0, 170, 0, 0.5)"
            }
          }
        },
        {
          name: "Confidence Interval",
          data: doesntContainMean,
          color: "rgba(255, 0, 0, 0.5)",
          centerInCategory: true,
          showInLegend: false,
          tooltip: tooltipFormat,
          allowPointSelect: true,
          animation: {
            duration: 0
          },
          states: {
            hover: {
              color: "rgba(255, 0, 0, 1)"
            },
            inactive: {
              color: "rgba(255, 0, 0, 0.5)"
            },
            select: {
              enabled: false,
              color: "rgba(255, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "Sample Means",
          type: "scatter",
          data: sampleMeans,
          color: "#616161",
          marker: {
            enabled: true,
            symbol: "diamond",
            radius: 1
          },
          allowPointSelect: true,
          animation: {
            duration: 0
          },
          states: {
            hover: {
              enabled: false
            },
            select: {
              enabled: false,
            }
          },
          tooltip: tooltipFormat,
        },
        {
          type: "line",
          name: "Population Mean",
          data: [[0, popMean], [samples.length, popMean]],
          color: "gray",
          enableMouseTracking: false,
          showInLegend: false,
          label: {
            enabled: false
          },
          marker: {
            enabled: false
          },
          zIndex: -5
        }
      ]
    }
    setChart(newChart);
  }, [confidenceLevel, samples, popShape, popMean, setSelected]);

  return (
    <div>
      {
        selected ? (
          <Alert color={selected.label ? "success" : "danger"}>
            Sample number {selected.id} has a mean of {selected.mean.toFixed(2)}, with {confidenceLevel}% CI ({_.round(selected.lowerConf, 2)}, {_.round(selected.upperConf, 2)}). CI contains the population mean? {selected.label.toString()}
          </Alert>
        ) : <div style={{height: 80}}/>
      }
      <HighchartsReact highcharts={Highcharts} options={chart}/>
    </div>
  );
}

ConfidenceIntervalsChart.propTypes = {
  confidenceLevel: PropTypes.number.isRequired,
  samples: PropTypes.arrayOf(confidenceIntervalsSampleType).isRequired,
  popShape: popShapeType.isRequired,
  popMean: PropTypes.number.isRequired,
  selected: confidenceIntervalsSampleType,
  setSelected: PropTypes.func.isRequired,
}
