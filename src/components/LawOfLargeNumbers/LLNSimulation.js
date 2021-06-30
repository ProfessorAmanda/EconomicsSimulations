/*

  Displays one of the LLN simulations

*/
import { useEffect, useState } from 'react';
import Collapsable from '../Collapsable.js';
import ChartContainer from '../ChartContainer.js';
import SampleSizeInput from '../SampleSizeInput.js';
import SimulateSamples from './SimulateSamples.js';
import { Alert } from 'reactstrap';
import { populationMean, dataFromDistribution } from "../../lib/stats-utils.js";
import _ from "lodash";
import PropTypes from 'prop-types';
import { popShapeType } from '../../lib/types.js';

export default function LLNSimulation({ popShape, sampleSize }) {
  const [sampled, setSampled] = useState([]);
  const [stage, setStage] = useState(1);
  const [sampleMean, setSampleMean] = useState();
  const [popArray, setPopArray] = useState([]);
  const [popMean, setPopMean] = useState(0);

  useEffect(() => {
    setStage(1);
    setPopArray([]);
    setSampled([]);
    setSampleMean();
  }, [popShape]);

  // Highcharts rendering is buggy - this second useEffect takes a second but allows the data to be reset completely before being generated again
  useEffect(() => {
    if (popArray.length === 0) {
      const newPop = dataFromDistribution(popShape, sampleSize);
      setPopArray(newPop);
      const newMean = populationMean(newPop);
      setPopMean(newMean);
    }
  }, [popArray, popShape, sampleSize]);

  const handleClick = (size) => {
    const sample = _.sampleSize(popArray, size);
    setSampled(sample);
    setSampleMean(_.round(populationMean(sample), 2));
    setStage(2);
  }

  return (
    <Collapsable>
      <div>
        <ChartContainer popArray={popArray} popMean={popMean} sampled={sampled} sampleMean={sampleMean} popShape={popShape}/>
        <p>Try a few different sample sizes and compare sample mean to population mean</p>
        <SampleSizeInput maxSize={popArray.length} handleClick={handleClick}/>
        {(stage >= 2) &&
          <div>
            <Alert color="success">
              Sample Mean: {_.round(sampleMean, 2) || ''}
              <br/>
              Difference of Means: {_.round(popMean - sampleMean, 2)}
            </Alert>
            <Alert color="info">
              According to the law, the average of the results obtained from a large enough sample should be close to the total average of the population, and will tend to become closer the larger the sample is. Make sure to pick several samples, or see below for a simulation to see the law in action.
            </Alert>
            <SimulateSamples type={popShape} popArray={popArray} popMean={_.round(popMean, 2)}/>
          </div>
        }
      </div>
    </Collapsable>
  );
}

LLNSimulation.propTypes =  {
  popShape: popShapeType.isRequired,
  sampleSize: PropTypes.number.isRequired,
}
