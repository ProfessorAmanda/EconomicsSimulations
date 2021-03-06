/*

  A container component that holds the description and simulation for Joint Distribution

*/
import { Alert } from 'react-bootstrap';
import JDSimulation from './JDSimulation.js';

export default function JointWrapper() {
  return (
    <div className="module-container">
      <Alert style={{ width: '50%', margin: 'auto' }} variant="primary">
        Joint Distributions
      </Alert>
      <br/>
      <JDSimulation/>
    </div>
  );
}
