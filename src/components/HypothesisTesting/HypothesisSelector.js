import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DropdownItem, DropdownToggle, DropdownMenu, Input, InputGroup, InputGroupButtonDropdown, InputGroupText } from "reactstrap";
import { HYPOTHESIS_OPTIONS } from "../../lib/constants";
import { stringOrNumberType } from "../../lib/types";

export default function HypothesisSelector({ testType, setHypothesis, mue0, setMue0 }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(HYPOTHESIS_OPTIONS[testType][0].hypoText)
    setHypothesis(HYPOTHESIS_OPTIONS[testType][0])
  }, [testType, setHypothesis])

  const selectOption = (option) => {
    setHypothesis(option);
    setSelected(option.hypoText)
  }

  const menuOptions = HYPOTHESIS_OPTIONS[testType].map((obj) =>
    <DropdownItem onClick={() => selectOption(obj)} key={obj.hypoText}>{obj.hypoText}</DropdownItem>
  );

  return (
    <InputGroup>
      <InputGroupButtonDropdown isOpen={open} toggle={() => setOpen(!open)} addonType="prepend">
        <DropdownToggle caret>
          {selected}
        </DropdownToggle>
        <DropdownMenu>
          {menuOptions}
        </DropdownMenu>
      </InputGroupButtonDropdown>
      {(testType === "oneSample") && (
        <>
          <Input
            type="number"
            value={mue0}
            step={1}
            min={1}
            max={1000}
            onChange={(event) => setMue0(event.target.value)}
          />
          <InputGroupText>gallons of milk per day.</InputGroupText>
        </>
      )}
    </InputGroup>
  )
}

HypothesisSelector.propTypes = {
  testType: PropTypes.string.isRequired,
  setHypothesis: PropTypes.func.isRequired,
  mue0: stringOrNumberType.isRequired,
  setMue0: PropTypes.func.isRequired
}
