/*

  Displays the Joint Distributions simulation

*/
import { useEffect, useState } from 'react';
import MultivariateNormal from 'multivariate-normal';
import { Container, Row, Col, InputGroupText, Button } from 'reactstrap';
import MeanSDInput from './MeanSDInput';
import JDCharts from './JDCharts';
import _ from "lodash";
import InputSlider from '../InputSlider';
import { abs } from 'mathjs';

export default function JDSimulation() {
  const [parentMean, setParentMean] = useState(70);
  const [childMean, setChildMean] = useState(70);
  const [parentSD, setParentSD] = useState(1);
  const [childSD, setChildSD] = useState(1);
  const [correlation, setCorrelation] = useState(0);
  const [stage, setStage] = useState(1);
  const [allData, setAllData] = useState({parent: [], child: [], joint: []});

  useEffect(() => {
    if ((allData.parent.length > 0) && (allData.child.length > 0) && (allData.joint.length > 0)) {
      setStage(2)
    }
  }, [allData]);

  // generate datapoints for parent height and child height in a normal distribution
  const generate = () => {
    const newCorrelation = ((abs(+correlation) === 1) ? (0.999999 * correlation) : correlation);
    const covariance = newCorrelation * parentSD * childSD;
    const covMatrix = [[parentSD ** 2, covariance], [covariance, childSD ** 2]];
    const distribution = MultivariateNormal([+parentMean, +childMean], covMatrix);

    const jointSeries = [];
    for (let i = 0; i < 500; i++) {
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
    setAllData(data);
  }

  return (
    <Container fluid>
      <Row>
        <Col xl={4} md={6} xs={12} style={{padding: 10}}>
          <MeanSDInput title="Parent" mean={parentMean} setMean={setParentMean} sd={parentSD} setSD={setParentSD}/>
        </Col>
        <Col xl={4} md={6} xs={12} style={{padding: 10}}>
          <MeanSDInput title="Child" mean={childMean} setMean={setChildMean} sd={childSD} setSD={setChildSD}/>
        </Col>
        <Col xl={4} md={12} style={{padding: 10}}>
          <p>Set the Correlation</p>
          <InputSlider value={correlation} min={-1} max={1} step={0.1} onChange={(value) => setCorrelation(value)}/>
          <p style={{ margin: "15px" }}>Covariance</p>
          <InputGroupText>{(correlation * parentSD * childSD).toFixed(2)}</InputGroupText>
        </Col>
      </Row>
      <Row>
        <Button
          outline
          color='primary'
          style={{width: "fit-content", margin: "auto"}}
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
