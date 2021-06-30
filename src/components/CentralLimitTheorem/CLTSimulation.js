/*

  Displays one of the CLT simulations

*/
import { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ChartContainer from "../ChartContainer.js";
import SampleMeanChart from "./SampleMeanChart.js"
import SampleMeansSimulator from "./SampleMeansSimulator.js"
import { Alert, Button, Col, Row } from "reactstrap";
import { populationMean, dataFromDistribution, populationStandardDev } from "../../lib/stats-utils.js";
import SampleSizeInput from "../SampleSizeInput.js";
import SampleMeansTable from "./SampleMeansTable.js";
import _ from "lodash";
import PropTypes from "prop-types";
import { popShapeType } from "../../lib/types.js";

export default function CLTSimulation({ popShape, mainSampleSize }) {
  const [sampleMeans, setSampleMeans] = useState([]);
  const [sampled, setSampled] = useState([]);
  const [normalized, setNormalized] = useState(false);
  const [stage, setStage] = useState(1);
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);

  useEffect(() => {
    setStage(1);
    setPopArray([]);
    setSampled([]);
    setSampleMeans([]);
  }, [popShape]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      const newPop = dataFromDistribution(popShape, mainSampleSize);
      setPopArray(newPop);
      const newMean = populationMean(newPop);
      setPopMean(newMean);
    }
  }, [popArray, popShape, mainSampleSize]);

  const addSampleMeans = (means) => {
    if (!means) {  // calling addSampleMeans with no arguments clears the data
      setSampleMeans([])
    } else {
      const newSampleMeans = [...sampleMeans, ...means];
      setSampleMeans(newSampleMeans);
    }
  }

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    const newMeans = [...sampleMeans, {size: size, mean: populationMean(sample)}];
    setSampleMeans(newMeans);
  }

  return (
    <Collapsable>
      <div>
        <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} popShape={popShape}/>
        <Button color="success" onClick={() => setStage(2)}>Continue</Button>
        {(stage >= 2) &&
          <div>
            <Row>
              <p style={{margin: 15}}>Try drawing some samples and calculating means</p>
              <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
            </Row>
            <Row>
              <Col lg="8">
                <Button
                  outline
                  color="primary"
                  active={normalized}
                  onClick={() => setNormalized(!normalized)}>
                    Convert to Std. Normal
                </Button>
                <SampleMeanChart
                  sampleMeans={sampleMeans}
                  normalized={normalized}
                  popMean={popMean}
                  sd={populationStandardDev(popArray)}
                  popShape={popShape}
                />
              </Col>
              <Col lg="4">
                <SampleMeansTable sampleMeans={sampleMeans}/>
              </Col>
            </Row>
            <Row>
              <div>
                <Alert color="primary" style={{width: "50%", margin: "auto"}}>
                  Simulate drawing many many samples
                </Alert>
                <br/>
                <SampleMeansSimulator
                  population={popArray}
                  addSamples={addSampleMeans}
                />
              </div>
            </Row>
          </div>
        }

      </div>
    </Collapsable>
  );
}

CLTSimulation.propTypes = {
  popShape: popShapeType.isRequired,
  mainSampleSize: PropTypes.number.isRequired,
}
