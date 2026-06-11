// nodes/textNode.js  (refactored with BaseNode)
 
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
 
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
 
  const handles = [
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];
 
  return (
    <BaseNode id={id} title="Text" color="#d97706" handles={handles}>
      <label style={{ display: 'block' }}>
        Text:
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{ marginLeft: 6, width: 130 }}
        />
      </label>
    </BaseNode>
  );
};
 