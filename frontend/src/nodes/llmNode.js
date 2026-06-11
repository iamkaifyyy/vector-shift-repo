// nodes/llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { id: `${id}-system`,   type: 'target', position: Position.Left,  style: { top: '33%' }, label: 'system' },
    { id: `${id}-prompt`,   type: 'target', position: Position.Left,  style: { top: '67%' }, label: 'prompt' },
    { id: `${id}-response`, type: 'source', position: Position.Right, label: 'response' },
  ];

  return (
    <BaseNode id={id} title="LLM" color="#7c3aed" handles={handles}>
      <span style={{ color: '#666', fontSize: 12 }}>
        This is a LLM.
      </span>
    </BaseNode>
  );
};