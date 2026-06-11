// nodes/inputNode.js  (refactored with BaseNode)
 
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
 
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
 
  const handles = [
    { id: `${id}-value`, type: 'source', position: Position.Right },
  ];
 
  return (
    <BaseNode id={id} title="Input" color="#2563eb" handles={handles}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={{ marginLeft: 6, width: 110 }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Type:
        <select value={inputType} onChange={(e) => setInputType(e.target.value)} style={{ marginLeft: 6 }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};