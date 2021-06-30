/*

  Displays an input and a button for the user to enter a sample size

  Used by Law of Large Numbers and Central Limit Theorem

*/
import { useState } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types'

export default function SampleSizeInput({ maxSize, handleClick }) {
  const [sampleSize, setSampleSize] = useState("");

  return (
    <InputGroup className="sample-size-input">
      <Input
        align="right"
        type="number"
        placeholder="Sample Size:"
        min={1}
        value={sampleSize}
        max={maxSize}
        onChange={(event) => setSampleSize(event.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Button disabled={!sampleSize || sampleSize > maxSize || sampleSize < 1} onClick={()=> handleClick(+sampleSize)}>
          Sample
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}

SampleSizeInput.propTypes = {
  maxSize: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}
