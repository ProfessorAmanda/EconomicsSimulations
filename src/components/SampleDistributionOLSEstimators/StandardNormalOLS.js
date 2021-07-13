/*eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import BellCurve from 'highcharts/modules/histogram-bellcurve';
import { distributionType, hypothesisTestingSampleArrayType } from '../../lib/types';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { dataFromDistribution } from '../../lib/stats-utils';
import { sqrt } from 'mathjs';

BellCurve(Highcharts);

export default function StandardNormalOLS({ samples, sampleSize}) {
  const [population] = useState(
    dataFromDistribution('Normal', 2000, { mean: 0, standardDev: 1 })
  );
  const [chart, setChart] = useState({
    chart: {
      zoomType: 'xy'
    },
    plotOptions: {
      series: {
        animation: {
          duration: 100,
          easing: 'easeOutBounce'
        },
      }
    },
    title: {
      text: 'Sample Slopes'
    },
    xAxis: {
      title: {
        text: 'Normal Curve',
      },
      startOnTick: true,
      endOnTick: true
    },
    yAxis: {
      startOnTick: true,
      endOnTick: true,
      title: false
    },
  });

  useEffect(() => {
    const meanCounts = {};
    samples.forEach(({id,size,slope,intercept}) => {
      meanCounts[slope] = _.defaultTo(meanCounts[slope] + 1, 1);

      const meanObject = {
        x: slope,
        //get  SD of betas and mean. Then (original point - mean) / sd
        y: 0, //formu
        intercept,
      }
    });

    const newChart = {
      series: [
        {
          name: 'Normal Distribution',
          type: 'bellcurve',
          baseSeries: 1,
          zIndex: -1,
          enableMouseTracking: false,
          label: false,
          showInLegend: false
        },
        {
          name: 'Data',
          type: 'scatter',
          data: population.map(({ x }) => x),
          visible: false,
          showInLegend: false
        }
      ]
    }

    setChart(newChart);
  }, [samples, population, sampleSize]);

  return <HighchartsReact highcharts={Highcharts} options={chart}/>
}

StandardNormalOLS.propTypes = {
  sampleSize: PropTypes.number.isRequired,
  distType: distributionType.isRequired,
  samples: PropTypes.array.isRequired
}