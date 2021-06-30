/*

  Displays the description for the CLT simulation, a menu bar to choose the different variations, and the simulation component itself

*/
import { useState } from 'react';
import PopBar from '../PopBar.js';
import { Alert } from 'reactstrap';
import CLTSimulation from "./CLTSimulation.js";

const SAMPLE_SIZE = 2000;

export default function CentralLimitTheorem() {
  const [popShape, setPopType] = useState("");

  return (
    <div className="module-container">
      <Alert className="sim-description" color="primary">Central Limit Theorem</Alert>
      <Alert className="sim-description" color="primary">
        This simulation demonstrates the shape of the sampling distribution of the sample mean. Suppose I draw a large number of samples, each of size 𝑛, from some population. For each sample, I calculate a sample mean 𝑥̅. I now plot a histogram of those sample means. For a sufficiently large sample size, the shape of that histogram will look like a beautiful bell-shaped curve, no matter what shape the underlying population had.
      </Alert>
      <PopBar options={["Normal", "Uniform", "Exponential", "Chi-Squared", "Mystery"]} setPop={setPopType}/>
      {popShape && <CLTSimulation popShape={popShape} mainSampleSize={SAMPLE_SIZE}/>}
    </div>
  );
}
