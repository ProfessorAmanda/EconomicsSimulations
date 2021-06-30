/*

  Displays a menu with all the simulations and allows the user to click to start them

*/
import SimBarOption from './SimBarOption';
import PropTypes from 'prop-types'
import { MODULES } from '../lib/constants';

export default function SimBar({ setSection }) {

  const sections = MODULES.map((section) =>
    <li key={section.name}>
      <SimBarOption section={section} setSection={setSection}/>
    </li>
  );

  return (
    <div className="menu" data-testid="menu">
      <div className="mini-logo"/>
      <ul className="sim-bar-option-list">{sections}</ul>
    </div>
  );
}

SimBar.propTypes = {
  setSection: PropTypes.func.isRequired,
}
