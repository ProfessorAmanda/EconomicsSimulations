import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import PropTypes from 'prop-types';
import { stringOrNumberType } from "../lib/types";

export default function InputSlider({ value, min, max, step, onChange }) {
  return (
    <InputGroup className="input-slider-group">
      <Input
        type="range"
        className="custom-range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Input
          type="number"
          className="input-group-append"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(event.target.value)}
        />
      </InputGroupAddon>
    </InputGroup>
  );
}

InputSlider.propTypes = {
  value: stringOrNumberType.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
