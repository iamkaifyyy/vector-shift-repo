import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName,   setCurrName]   = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = [
    { id: `${id}-value`, type: 'target', position: Position.Left },
  ];

  return (
    <BaseNode id={id} nodeType="customOutput" title="Output" icon="⬆" selected={selected} minWidth={210} handles={handles}>
      <div className="node-field">
        <label className="node-label">Name</label>
        <input className="node-input" type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </div>
      <div className="node-field">
        <label className="node-label">Type</label>
        <select className="node-select" value={outputType} onChange={(e) => setOutputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};