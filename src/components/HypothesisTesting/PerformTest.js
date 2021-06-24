import React, { useEffect, useState } from "react";
import { sqrt } from "mathjs";
import { Button, Container, Row } from "reactstrap";
import { dataFromDistribution, populationMean, populationStandardDev } from "../../lib/stats-utils.js";
import PropTypes from "prop-types";
import PopulationChartReveal from "./PopulationChartReveal.js";
import _ from "lodash";
import { jStat } from "jstat";
import DataDisplay from "./DataDisplay.js";
import SampleSizeAlphaInputs from "./SampleSizeAlphaInput.js";
import { popShapeType } from "../../lib/types.js";

export default function PerformTest({ shape, tails, mue0 }) {
  const [popArr, setPopArr] = useState([]);
  const [sample, setSample] = useState([]);
  const [sampleSize, setSampleSize] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [sim, setSim] = useState(0);

  useEffect(() => {
    setPopArr(dataFromDistribution(shape, 2000, { mean: 69, low: 59, hi: 79 }))
  }, [shape]);

  const takeSample = () => {
    setSample(_.sampleSize(popArr, sampleSize));
    if (sim === 0) {
      setSim(1);
    }
  }

  const getTestStatistic = (mean, sd) => {
    // TODO: use different function if T distribution
    return jStat.zscore(mean, mue0, sd / sqrt(sampleSize))
  }

  const getPValue = (mean, sd) => {
    // TODO: use different function if T distribution
    return jStat.ztest(mean, mue0, sd / sqrt(sampleSize), tails)
  }

  const sampleMean = populationMean(sample);
  const sampleSD = populationStandardDev(sample);  // TODO: use this when pop sd is unknown
  const testStatistic = getTestStatistic(sampleMean, 3);
  const pValue = getPValue(sampleMean, 3);

  return (
    <Container fluid>
      <p>Let’s test your assertion by taking a sample and setting our tolerance for making a type-one error α!</p>
      <SampleSizeAlphaInputs
        sampleSize={sampleSize}
        setSampleSize={setSampleSize}
        alpha={alpha}
        setAlpha={setAlpha}
        popSize={popArr.length}
      />
      <br/>
      <Button
        color="primary"
        disabled={(sampleSize <= 0) || (sampleSize > popArr.length)}
        onClick={() => takeSample()}
      >
        Sample
      </Button>
      <br/>
      <br/>
      {(sim >= 1) && (
        <Container>
          <DataDisplay
            mean={sampleMean}
            standardDev={sampleSD}
            testStatistic={testStatistic}
            pValue={pValue}
            alpha={+alpha}
          />
          <br/>
          <Row className="Center">
            <p>
              Press here to reveal the true population distribution and mean.&nbsp;
              <Button color="primary" onClick={() => setSim(2)}>Reveal</Button>
            </p>
          </Row>
        </Container>
      )}
      <br/>
      {(sim === 2) && <PopulationChartReveal popArr={popArr} pVal={pValue} alpha={+alpha}/>}
    </Container>
  )
}

PerformTest.propTypes = {
  shape: popShapeType.isRequired,
  tails: PropTypes.number.isRequired,
  mue0: PropTypes.number.isRequired,
}
