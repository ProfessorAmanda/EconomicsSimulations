/*

  A container component that holds the description and simulation for Joint Distribution

*/
import { Alert } from 'reactstrap';
import JDSimulation from './JDSimulation.js';

export default function JointWrapper() {
  return(
    <div className="module-container">
      <Alert style={{ width: "50%", margin: 'auto' }} color="primary">
          Joint Distributions
      </Alert>
      <br/>
      <JDSimulation/>
    </div>
  );
}
