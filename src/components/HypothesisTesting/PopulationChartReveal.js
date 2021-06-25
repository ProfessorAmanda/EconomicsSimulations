import { Container, Row, Alert } from "reactstrap";
import DotPlot from "../DotPlot.js";
import PropTypes from "prop-types";
import { dataObjectArrayType } from "../../lib/types.js";
import { populationMean } from "../../lib/stats-utils.js";

export default function PopulationChartReveal({ popArr, pVal, alpha }) {
  return (
    <Container>
      <Row className="Center">
        <Container fluid>
          <Row>
            <Alert color="secondary" className="Center">
              <p>
                We queried the monthly Milk Production of {popArr.length} cows and plotted the results on the following chart.
              </p>
              <p>
                The population mean is {(popArr.length > 0) && populationMean(popArr).toFixed(2)}.
              </p>
            </Alert>
          </Row>
          <Row>
            <DotPlot
              series={[{name: 'Population', data: popArr}]}
              title="Milk Production"
              xMin={55}
              xMax={81}
              yMax={40}
              xLabel="Gallons"
            />
          </Row>
        </Container>
      </Row>
      <Row className="Center">
        <p>Our hypothesis test conclusion was therefore {(pVal < alpha) ? "correct" : "incorrect"}.</p>
      </Row>
    </Container>
  )
}

PopulationChartReveal.propTypes = {
  popArr: dataObjectArrayType.isRequired,
  pVal: PropTypes.number.isRequired,
  alpha: PropTypes.number.isRequired
}
