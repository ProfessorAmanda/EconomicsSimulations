/*
  Allows the user to select simulation variations

  Used by Law of Large Numbers and Central Limit Theorem
*/
import { useState } from 'react';
import PropTypes from 'prop-types';
import SelectorButtonGroup from './SelectorButtonGroup';
import { popShapeType } from '../lib/types';


export default function PopBar({ options, setPop }) {
  const [selected, setSelected] = useState();

  const onClick = (mode) => {
    setPop(mode);
    setSelected(mode);
  }

  return (
    <div className="button-group">
      <p>Pick a Population Distribution: </p>
      <SelectorButtonGroup options={options} select={onClick} selected={selected}/>
    </div>
  );
}

PopBar.propTypes = {
  options: PropTypes.arrayOf(popShapeType).isRequired,
  setPop: PropTypes.func.isRequired,
}
