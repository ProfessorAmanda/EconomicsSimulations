import { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ConfidenceInputs from "./ConfidenceInputs.js";
import SampleSizeInput from "../SampleSizeInput.js";
import ConfidenceIntervalsChart from "./ConfidenceIntervalsChart.js";
import ManySamplesInput from "./ManySamplesInput.js";
import SamplesTable from "./SamplesTable.js";
import { dataFromDistribution, populationMean, populationStandardDev } from "../../lib/stats-utils.js";
import { Row, Col, Alert } from "reactstrap";
import PopulationChart from "./PopulationChart.js";
import _ from "lodash";
import { jStat } from "jstat";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import { popShapeType } from "../../lib/types.js";

export default function CISimulation({ popShape, populationSize }) {
  const [distType, setDistType] = useState("Z");  // can be "Z" or "T"
  const [confLevel, setConfLevel] = useState(95);
  const [popArray, setPopArray] = useState([]);
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setPopArray([]);
    setSamples([]);
    setSelected();
  }, [popShape]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      // adjust params for uniform distribution to fit example
      const newPop = dataFromDistribution(popShape, populationSize, {low: 55, hi: 75});
      setPopArray(newPop);
    }
  }, [popArray, popShape, populationSize]);

  // this is a hack to get around what I believe is a bug in highcharts
  // where a point will sometimes turn gray when selected
  const unselect = () => {
    Highcharts.charts.forEach((chart) => {
      if (chart) {
        chart.series.forEach((series) => {
          series.data.forEach((point) => {
            point.select(false, false)
          })
        })
      }
    });
  }

  const generateSamples = (size, replications=1) => {
    unselect();
    if (!size) {  // calling generateSamples with no arguments clears the data
      setSamples([]);
      setSelected();
    } else {
      const sampleObjects = [];
      for (let i = 0; i < replications; i++) {
        const sample = _.sampleSize(popArray, size);
        const mean = _.round(populationMean(sample), 2);
        const popMean = _.round(populationMean(popArray), 2);
        const standardDev = populationStandardDev((distType === "Z") ? popArray : sample);
        const ciFunction = (distType === "Z") ? jStat.normalci : jStat.tci;
        const [lowerConf, upperConf] = ciFunction(mean, 1 - (confLevel / 100), standardDev, size);
        const sampleObject = {
          data: sample,
          size: +size,
          mean: mean,
          lowerConf: _.round(lowerConf, 2),
          upperConf: _.round(upperConf, 2),
          confidenceLevel: confLevel,
          distribution: distType,
          label: (popMean >= _.round(lowerConf, 2)) && (popMean <= _.round(upperConf, 2)),
        }
        sampleObjects.push(sampleObject);
      }
      const newSamples = [...samples, ...sampleObjects];
      const indexedSamples = newSamples.map((sample, index) => ({...sample, id: index + 1}))
      setSamples(indexedSamples);
      setSelected(indexedSamples[indexedSamples.length - 1]);
    }
  }

  const selectPoint = (point) => {
    setSelected(point);
    unselect();
  }

  return (
    <Collapsable>
      <div>
        <Row>
          <ConfidenceInputs
            distType={distType}
            setDistType={setDistType}
            confLevel={confLevel}
            setConfLevel={setConfLevel}
          />
        </Row>
        <br/>
        <Row md={1} lg={2}>
          <Col>
            <PopulationChart
              popArray={popArray}
              popMean={populationMean(popArray)}
              sampled={selected ? selected.data : []}  // most recent sample data
              popShape={popShape}
            />
            <p>Try drawing some samples and calculating means</p>
            <SampleSizeInput maxSize={popArray.length} handleClick={generateSamples}/>
          </Col>
          <Col>
            <ConfidenceIntervalsChart
              confidenceLevel={confLevel}
              samples={samples}
              popShape={popShape}
              popMean={_.round(populationMean(popArray), 2)}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12} xl={5}>
            <ManySamplesInput
              populationSize={popArray.length}
              addSamples={generateSamples}
            />
          </Col>
          <Col lg={12} xl={7}>
            <SamplesTable samples={samples} setSelected={selectPoint}/>
          </Col>
        </Row>
        <br/>
        <Row>
          {(samples.length > 0) && (
            <Alert color="info" style={{margin:"auto"}}>
              {samples.filter(({ label }) => !label).length} intervals did not contain the population mean.
              <br/>
              {samples.filter(({ label }) => label).length} did ({_.round(100 * samples.filter(({ label }) => label).length / samples.length, 2)}%).
            </Alert>
          )}
        </Row>
      </div>
    </Collapsable>
  );
}

CISimulation.propTypes = {
  popShape: popShapeType.isRequired,
  populationSize: PropTypes.number.isRequired,
}
