import { Table } from "reactstrap";
import PropTypes from "prop-types";
import { dataObjectArrayType } from "../lib/types";
import { VALUES } from "../lib/constants.js";

export default function PopTable({ popArray, sampleIDs, popShape }) {
  const rows = popArray.map(({ x, id }) => {
    return (
      <tr key={id} style={{ backgroundColor: sampleIDs.includes(id) ? "#747EF2" : undefined }}>
        <td>{popArray.length - id}</td>
        <td>{x}</td>
      </tr>
    )}
  );

  return (
    <Table striped className="pop-table">
      <thead>
        <tr>
          <th>{VALUES[popShape].tableCol}</th>
          <th>{VALUES[popShape].xLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
}

PopTable.propTypes = {
  popArray: dataObjectArrayType.isRequired,
  sampleIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
  popShape: PropTypes.string.isRequired
}
