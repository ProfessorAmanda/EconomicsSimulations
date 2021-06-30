/*

  Displays a table of values and a corresponding HighCharts plot

  Used by Law of Large Numbers and Central Limit Theorem

*/
import '../styles/dark-unica.css';
import DotPlot from './DotPlot';
import { Alert, Container, Col, Row } from 'reactstrap';
import PopTable from './PopTable.js'
import _ from "lodash";
import PropTypes from 'prop-types';
import { dataObjectArrayType, popShapeType } from '../lib/types';
import { TEXTS, VALUES } from '../lib/constants';

export default function ChartContainer({ popArray, popMean, sampled, sampleMean, popShape }) {
  const { xmaxval, xminval, ymaxval, title, xLabel } = VALUES[popShape];

  const series = [
    {
      name: 'Population Observations',
      data: popArray
    },
    {
      name: 'Sampled Observations',
      data: sampled
    },
    {
      type: 'line',
      name: 'Sample Mean',
      data: [{x: sampleMean || 0, y: 0}, {x: sampleMean || 0, y: ymaxval}],
      color: 'red',
      enableMouseTracking: false,
      showInLegend: false,
      visible: (sampleMean !== undefined) && (sampled.length > 0),
      label: {
        format: `<div>Sample Mean: ${sampleMean}</div>`
      }
    }
  ];

  return (
    <div>
      <Container fluid>
        <Row>
          <Alert color="secondary">
            {(popShape !== "Uniform") ? (
              <p>
                We queried the {TEXTS[popShape][0]} of {popArray.length} {TEXTS[popShape][1]} and plotted the results on the following chart.
              </p>
            ) : (
              <p>
                Behavioral economists studying loss aversion design a lottery among 2000 participants where each amount between -10 and +10 is equally likely.  We plotted the winnings and losses below.
              </p>
            )}
          </Alert>
        </Row>
        <Row>
          <Col lg={2} md={12}>
            <PopTable
              popArray={popArray}
              sampleIDs={sampled.map((obj) => obj.id)}
              popShape={popShape}
            />
          </Col>
          <Col lg={10}>
            <DotPlot
              series={series}
              title={`${title} <br /> Population Mean: ${_.round(popMean, 2)}`}
              xMin={xminval}
              xMax={xmaxval}
              yMax={ymaxval}
              xLabel={xLabel}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

ChartContainer.propTypes = {
  popArray: dataObjectArrayType.isRequired,
  popMean: PropTypes.number.isRequired,
  sampled: dataObjectArrayType.isRequired,
  sampleMean: PropTypes.number,
  popShape: popShapeType.isRequired,
}
