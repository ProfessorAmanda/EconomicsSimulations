import React, { useState, useEffect } from "react";
import Collapsable from "../Collapsable.js";
import ConfidenceInputs from "./ConfidenceInputs.js";
import SampleSizeInput from "../SampleSizeInput.js";
import ConfidenceIntervalsChart from "./ConfidenceIntervalsChart.js";
import { dataFromDistribution, populationMean } from "../../lib/stats-utils.js";
import { Row, Col } from "reactstrap";
import PopulationChart from "./PopulationChart.js";
import _ from "lodash";
import ZTable from './ZTable.js';
import { std, sqrt } from "mathjs";
import { jStat } from "jstat";


export default function CISimulation({ distType, populationSize }) {
  const [stage, setStage] = useState(0);
  const [testType, setTestType] = useState("z");  // can be 'z' or 't'
  const [confLevel, setConfLevel] = useState(95);
  const [zScore, setZScore] = useState(0);
  const [dOf, setDOf] = useState(1);
  const [popArray, setPopArray] = useState([]);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    setStage(0);
    setPopArray([]);
    setSamples([]);
  }, [distType]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      // adjust params for uniform distribution to fit example
      const newPop = dataFromDistribution(distType, populationSize, {low: 54, hi: 74});
      setPopArray(newPop);
    }
  }, [popArray, distType, populationSize]);

  const changeTestType = (type) => {
    setSamples([]);
    setTestType(type);
    setZScore(ZTable['0.' + confLevel]);
  }

  const changeConfidenceLevel = (level, score) => {
    setSamples([]);
    setConfLevel(level);
    setZScore(score);
  }

  const generateSample = (size) => {
    const sample = _.sampleSize(popArray, size);
    const mean = _.round(populationMean(sample), 2);
    const standardDev = std(sample.map((s) => s[0]));
    // console.log(jStat.normalci(64, 0.95, 3, 2000), jStat.tci(64, 0.95, 3, 2000))
    // const zscore = jStat.zscore(confLevel, mean, 3)
    // console.log(jStat.zscore(95, mean, standardDev))
    const lowerConf = mean - (zScore * standardDev) / sqrt(size);
    const upperConf = mean + (zScore * standardDev) / sqrt(size);
    // const [lowerConf, upperConf] = jStat.normalci(mean, confLevel, 3, 2000)
    // console.log(lowerConf, upperConf, zScore, zscore)
    const sampleObject = {
      data: sample,
      size: +size,
      mean: mean,
      lowerConf: _.round(lowerConf, 2),
      upperConf: _.round(upperConf, 2),
      label: (mean >= lowerConf) && (mean <= upperConf)
    }
    const newSamples = [...samples, sampleObject];
    setSamples(newSamples);
  }

  return (
    <Collapsable>
      <Row>
        <ConfidenceInputs
          testType={testType}
          setTestType={changeTestType}
          confLevel={confLevel}
          changeConfLevel={changeConfidenceLevel}
          dOf={dOf}
        />
      </Row>
      <br/>
      <Row>
        <Col>
          <PopulationChart
            popArray={popArray}
            popMean={populationMean(popArray)}
            sampled={(samples.length > 0) ? samples[samples.length - 1].data : []}  // most recent sample data
            distType={distType}
          />
          <p>Try drawing some samples and calculating means</p>
          <SampleSizeInput maxSize={popArray.length} handleClick={generateSample}/>
        </Col>
        <Col>
          <ConfidenceIntervalsChart
            confidenceLevel={confLevel}
            samples={samples}
            distType={distType}
          />
        </Col>
      </Row>
    </Collapsable>
  );
}