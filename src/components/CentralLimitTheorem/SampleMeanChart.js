import PropTypes from 'prop-types';
import DotPlot from '../DotPlot';
import { VALUES } from '../../lib/constants';
import { max, min, sqrt } from 'mathjs';
import { popShapeType } from '../../lib/types';
import _ from "lodash";

export default function SampleMeanChart({ sampleMeans, normalized, popMean, sd, popShape }) {
  const newSampleMeans = normalized ? sampleMeans.map(({ size, mean }) => ((mean - popMean) / (sd / sqrt(size)))) : sampleMeans.map(({ mean }) => mean);

  const meanCounts = _.countBy(newSampleMeans.map((mean) => _.round(mean, 2)));
  const sampleMeansPoints = [];
  _.entries(meanCounts).forEach(([amt, count]) => {
    for (let i = 1; i <= count; i++) {
      sampleMeansPoints.push({x: +amt, y: i})
    }
  });

  const onlyValues = sampleMeansPoints.map((obj) => obj.x);
  const onlyCounts = sampleMeansPoints.map((obj) => obj.y);

  return (
    <DotPlot
      series={[{name: "Sample Means", data : sampleMeansPoints}]}
      title="Sample Mean Distribution"
      xMin={normalized ? min(-3, ...onlyValues) : VALUES[popShape].xminval}
      xMax={normalized ? max(3, ...onlyValues) : VALUES[popShape].xmaxval}
      yMax={normalized ? max(8, ...onlyCounts) : max([30, ...onlyCounts])}
      xLabel={normalized ? "Standard Deviations" : VALUES[popShape].xLabel}
      yLabel="Observations of Sample Mean"
    />
  )
}

SampleMeanChart.propTypes = {
  sampleMeans: PropTypes.arrayOf(PropTypes.number).isRequired,
  popMean: PropTypes.number,
  sd: PropTypes.number,
  normalized: PropTypes.bool.isRequired,
  popShape: popShapeType.isRequired
}
