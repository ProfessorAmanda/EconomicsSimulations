import React from "react";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import InputSlider from "../InputSlider.js";

export default function ConfidenceInputs({ testType, setTestType, confLevel, setConfLevel }) {
  const confidenceBar = [90, 95, 99].map((pct) =>
    <Button
      style={{ backgroundColor: (+confLevel === pct) ? '#4CAF50' : '#555555' }}
      onClick={() => setConfLevel(pct)}
    >
      {pct}%
    </Button>
  );

  return (
    <div>
      <Row className="Center">
        <p>
          1) Do you want to assume that you know σ? If yes, choose Z. If no, choose T: {" "}
          <ButtonGroup>
            <Button style={{ backgroundColor: (testType === "z") ? '#4CAF50':'#555555' }} onClick={() => setTestType("z")}>Z</Button>
            <Button style={{ backgroundColor: (testType === "t") ? '#4CAF50':'#555555' }} onClick={() => setTestType("t")}>T</Button>
          </ButtonGroup>
        </p>
      </Row>
      <br/>
      <Row className="Center">
        <p>
          2) Confidence Level: {" "}
          <ButtonGroup>{confidenceBar}</ButtonGroup>
        </p>
      </Row>
      <br/>
      <Row className="Center">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <p>
            More Levels:
            <InputSlider value={confLevel} min={1} max={99} step={1} onChange={setConfLevel}/>
          </p>
        </Col>
      </Row>
    </div>
  );
}
