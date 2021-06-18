import React from "react";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import InputSlider from "../InputSlider.js";

export default function ConfidenceInputs({ testType, setTestType, confLevel, changeConfLevel }) {

  const confidenceBar = [90, 95, 99].map((level) =>
    <Button
      style={{ backgroundColor: (+confLevel === level) ? '#4CAF50' : '#555555' }}
      onClick={() => changeConfLevel(level)}
      key={level}
    >
      {level}%
    </Button>
  );

  return (
    <div>
      <Row className="Center">
        <div>
          1) Do you want to assume that you know σ? If yes, choose Z. If no, choose T: {" "}
          <ButtonGroup>
            <Button style={{ backgroundColor: (testType === "z") ? '#4CAF50':'#555555' }} onClick={() => setTestType("z")}>Z</Button>
            <Button style={{ backgroundColor: (testType === "t") ? '#4CAF50':'#555555' }} onClick={() => setTestType("t")}>T</Button>
          </ButtonGroup>
        </div>
      </Row>
      <br/>
      <Row className="Center">
        <div>
          2) Confidence Level: {" "}
          <ButtonGroup>{confidenceBar}</ButtonGroup>
        </div>
      </Row>
      <br/>
      <Row className="Center">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <div>
            More Levels:
            <InputSlider value={confLevel} min={1} max={99} step={1} onChange={changeConfLevel}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}
