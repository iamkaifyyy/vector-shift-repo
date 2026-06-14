// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName,  setCurrName]  = useState(data?.inputName  || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType  || 'Text');

  const handles = [
    { id: `${id}-value`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} nodeType="customInput" title="Input" icon="⬇" selected={selected} minWidth={210} handles={handles}>
      <div className="node-field">
        <label className="node-label">Name</label>
        <input className="node-input" type="text" value={currName} onChange={(e) => {
          setCurrName(e.target.value);
          updateNodeField(id, 'inputName', e.target.value);
        }} />
      </div>
      <div className="node-field">
        <label className="node-label">Type</label>
        <select className="node-select" value={inputType} onChange={(e) => {
          setInputType(e.target.value);
          updateNodeField(id, 'inputType', e.target.value);
        }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};