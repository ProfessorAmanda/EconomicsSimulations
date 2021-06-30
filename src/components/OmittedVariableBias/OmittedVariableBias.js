import { Alert, Row } from "reactstrap";
import OVBSimulation from "./OVBSimulation";

export default function OmittedVariableBias() {
  return (
    <div className="module-container">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
        Omitted Variable Bias
      </Alert>
      <br/>
      <Row>
        <p>We are studying the relationship between test score and study hours:</p>
        <p>Test Score = β₀ + β₁Study Hoursᵢ + 𝛿Sleep Hoursᵢ + uᵢ</p>
      </Row>
      <br/>
      <OVBSimulation/>
      <br/>
    </div>
  );
}
