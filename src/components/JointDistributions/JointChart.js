/*

  Displays a Nivo scatterplot for the joint distribution data

  props:
    jointData     - array[Object{x, y}]
    sharedOptions - object

*/
import React from 'react';
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";
import { Col } from 'reactstrap';

export default function JointChart({ jointData, sharedOptions, nodeId }) {

  const data = [{id: "data", data: jointData}];

  return (
    <Col style={{ padding:"5px 0px 5px 0px", marginLeft:"-40px", marginRight:"0px", width: "fit-content"}}>
    <div style={{ height: 358, width: 358, position:"inline-block", float:"right", marginLeft:"0px",}}>
      <ResponsiveScatterPlotCanvas
        {...sharedOptions}
        colors={(node) => (nodeId && (node.id === nodeId)) ? "#003866" : "#008cff"}
        data={data}
        yScale={{ type: 'linear', min: 40, max: 100 }}
        yFormat={(e) => e + " in."}
        tooltip={({node}) =>
          <div>
            Parent Height: <strong>{node.data.formattedX}</strong>
            <br/>
            Child Height: <strong>{node.data.formattedY}</strong>
          </div>
        }
        axisBottom={{
          tickSize: 10,
          legendPosition: 'middle',
          legendOffset: 46,
          legend: 'Parent Height (inches)'
        }}
        axisLeft={{
          tickSize: 10,
          legendPosition: 'middle',
          legendOffset: -38,
          legend: 'Child Height (inches)'
        }}
      />
    </div>
    </Col>
  );
}