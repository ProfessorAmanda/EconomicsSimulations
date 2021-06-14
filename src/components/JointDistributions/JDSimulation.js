/*

  Displays the Joint Distributions simulation

  props:
    none

*/
import React, { useEffect, useState } from 'react';
import MultivariateNormal from 'multivariate-normal';
import { Container, Row, Col, InputGroupText, Button } from 'reactstrap';
import MeanSDInput from './MeanSDInput';
import JDCharts from './JDCharts';
import _ from "lodash";
import InputSlider from '../InputSlider';

const meanVector = [70, 70];

export default function JDSimulation() {
  const [parentMean, setParentMean] = useState(70);
  const [childMean, setChildMean] = useState(70);
  const [parentSD, setParentSD] = useState(1);
  const [childSD, setChildSD] = useState(1);
  const [correlation, setCorrelation] = useState(0);
  const [covariance, setCovariance] = useState(0);
  const [stage, setStage] = useState(1);
  const [allData, setAllData] = useState({parent: [], child: [], joint: []});

  useEffect(() => {
    if ((allData.parent.length > 0) && (allData.child.length > 0) && (allData.joint.length > 0)) {
      setStage(2)
    }
  }, [allData]);

  const changeParentSD = (value) => {
    setParentSD(value);
    setCovariance(correlation * value * childSD);
  }

  const changeChildSD = (value) => {
    setChildSD(value);
    setCovariance(correlation * value * parentSD);
  }

  const changeSlider = (value) => {
    const newCorrelation = (value === 1) ? 0.999999 : value;
    setCorrelation(value);
    setCovariance(newCorrelation * parentSD * childSD);
  }

  // generate datapoints for parent height and child height in a normal distribution
  const generate = () => {
    const temp = [[Math.pow(parentSD, 2), covariance], [covariance, Math.pow(childSD, 2)]];
    const distribution = MultivariateNormal(meanVector, temp);

    const jointSeries = [];
    for (let i = 0; i < 1000; i++) {
      const [parentHeight, childHeight] = distribution.sample();
      jointSeries.push({x: _.round(parentHeight, 2), y: _.round(childHeight, 2)});
    }

    const parentCounts = {};
    const parentSeries = [];
    const childCounts = {};
    const childSeries = [];

    jointSeries.forEach(({x, y}) => {
      if (parentCounts[x]) {
        parentCounts[x]++
      } else {
        parentCounts[x] = 1
      }
      parentSeries.push({x: x, y: parentCounts[x]});
      if (childCounts[y]) {
        childCounts[y]++
      } else {
        childCounts[y] = 1
      }
      childSeries.push({x: y, y: childCounts[y]});
    });

    const data = {parent: parentSeries, child: childSeries, joint: jointSeries}
    console.log(data)
    setAllData(data);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <MeanSDInput title="Parent" mean={parentMean} setMean={setParentMean} sd={parentSD} setSD={changeParentSD}/>
        </Col>
        <Col>
          <MeanSDInput title="Child" mean={childMean} setMean={setChildMean} sd={childSD} setSD={changeChildSD}/>
        </Col>
        <Col>
          <p>Set the Correlation</p>
          <InputSlider value={correlation} min={-1} max={1} step={0.1} onChange={(value) => changeSlider(value)}/>
          <p style={{ margin: "15px" }}>Covariance</p>
          <InputGroupText>{covariance.toFixed(2)}</InputGroupText>
        </Col>
      </Row>
      <Row className='Center'>
        <Button
          outline
          color='primary'
          style={{margin:"3vh", width: "fit-content"}}
          disabled={!parentMean || !parentSD || !childMean || !childSD}
          onClick={() => generate()}
        >
          Generate!
        </Button>
      </Row>
      {(stage === 2) && <JDCharts parentData={allData.parent} childData={allData.child} jointData={allData.joint}/>}
    </Container>
  );
}
