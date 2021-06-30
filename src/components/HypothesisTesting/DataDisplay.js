import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

export default function DataDisplay({ mean, standardDev, testStatistic, pValue, alpha }) {
  return (
    <Alert color="secondary" >
      <p>This sample yields the following data:</p>
      <p>Sample Mean: {_.round(mean, 2)}</p>
      <p>Sample Standard Deviation: {_.round(standardDev, 2)} </p>
      <p>The test statistic is {_.round(testStatistic, 2)}</p>
      <p>This test statistic yields a p-value of P(Z &gt; teststat) = {_.round(pValue, 4)}. </p>
      <p>Therefore we {(pValue < alpha) ? "reject" : "fail to reject"} the null hypothesis. </p>
    </Alert>
  )
}

DataDisplay.propTypes = {
  mean: PropTypes.number.isRequired,
  standardDev: PropTypes.number.isRequired,
  testStatistic: PropTypes.number.isRequired,
  pValue: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired
}
