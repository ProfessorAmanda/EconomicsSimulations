/*

  A container component for the various simulations

*/
import LawOfLargeNumbers from './LawOfLargeNumbers/LawOfLargeNumbers.js';
import CentralLimitTheorem from './CentralLimitTheorem/CentralLimitTheorem.js';
import JointDistributions from './JointDistributions/JointDistributions.js';
import OmittedVariableBias from "./OmittedVariableBias/OmittedVariableBias.js";
import ConfidenceIntervals from './ConfidenceIntervals/ConfidenceIntervals.js';
import HypothesisTesting from './HypothesisTesting/HypothesisTesting.js';
import { Button } from 'reactstrap';
import LeastSquares from './LeastSquares/LeastSquares.js';
import PropTypes from 'prop-types';

export default function SimulationContainer({ mode, setMode }) {
  return (
    <div data-testid="sim-container">
      <Button className="home-button" outline color='danger' id="Menu" onClick={() => setMode("Home")}>MENU</Button>
      <div className="mini-logo"/>
      {mode === 'Law of Large Numbers' && <LawOfLargeNumbers/>}
      {mode === 'Central Limit Theorem' && <CentralLimitTheorem/>}
      {mode === 'Joint Distributions' && <JointDistributions/>}
      {mode === 'Least Squares' && <LeastSquares/>}
      {mode === 'Omitted Variable Bias' && <OmittedVariableBias/>}
      {mode === 'Confidence Intervals' && <ConfidenceIntervals/>}
      {mode === 'Hypothesis Testing' && <HypothesisTesting/>}
    </div>
  )
}

SimulationContainer.propTypes = {
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([
    'Home',
    'Law of Large Numbers',
    'Central Limit Theorem',
    'Joint Distributions',
    'Least Squares',
    'Omitted Variable Bias',
    'Confidence Intervals',
    'Hypothesis Testing'
  ]).isRequired,
}
