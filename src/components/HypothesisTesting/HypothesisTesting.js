import React from "react";
import { Alert } from "reactstrap";
import HTSimulation from "./HTSimulation.js";

export default function HypothesisTesting() {

  return (
    <div className="MainContainer">
      <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
        Hypothesis Testing
      </Alert>
      <Alert style={{ width: "90%", margin: 'auto' }} color="primary">
        When we conduct a test of hypotheses, we use the information provided by a sample to make a conclusion about population parameters that we cannot directly observe. We are able to make a connection between the sample and the population by using the rules that govern probability distributions. Due to the central limit theorem, we can make a variety of assertions about the probable location of points in a distribution, which allows us to make assertions about where population parameters might be located relative to the data we have collected from a sample. This allows us to test hypotheses.
      </Alert>
      <br/>
      <HTSimulation/>
    </div>
  )
}
