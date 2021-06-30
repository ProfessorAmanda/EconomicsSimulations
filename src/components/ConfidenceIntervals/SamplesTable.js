import { Table } from "reactstrap";
import PropTypes from 'prop-types';
import { confidenceIntervalsSampleType } from "../../lib/types.js";

export default function SamplesTable({ samples, setSelected }) {

  const samplesTable = samples.map((sampleObject) =>
    <tr
      style={{ backgroundColor: sampleObject.label ? "rgba(23, 161, 80, 0.233)" : "rgba(161, 23, 23, 0.233)", cursor: "pointer" }}
      key={sampleObject.id}
      onClick={() => setSelected(sampleObject)}
    >
      <td>{sampleObject.id}</td>
      <td>{sampleObject.size}</td>
      <td>{sampleObject.mean}</td>
      <td>{sampleObject.lowerConf}</td>
      <td>{sampleObject.upperConf}</td>
      <td>{sampleObject.confidenceLevel}</td>
      <td>{sampleObject.distribution.toUpperCase()}</td>
    </tr>
  );

  samplesTable.reverse()

  return (
    <div style={{ height: 500, overflow: "auto", marginTop: -50 }}>
      <Table hover className="ci-table">
        <thead>
          <tr>
            <th>Sample</th>
            <th>Size</th>
            <th>Mean</th>
            <th>Lower Bound for CI</th>
            <th>Upper Bound for CI</th>
            <th>Confidence Level</th>
            <th>Distribution</th>
          </tr>
        </thead>
        <tbody>
          {samplesTable}
        </tbody>
      </Table>
    </div>
  )
}

SamplesTable.propTypes = {
  samples: PropTypes.arrayOf(confidenceIntervalsSampleType).isRequired,
  setSelected: PropTypes.func.isRequired,
}
