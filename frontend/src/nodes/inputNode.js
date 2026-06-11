import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  const [currName,  setCurrName]  = useState(data?.inputName  || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType  || 'Text');

  const handles = [
    { id: `${id}-value`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} nodeType="customInput" title="Input" icon="⬇" selected={selected} minWidth={210} handles={handles}>
      <div className="node-field">
        <label className="node-label">Name</label>
        <input className="node-input" type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
      </div>
      <div className="node-field">
        <label className="node-label">Type</label>
        <select className="node-select" value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};