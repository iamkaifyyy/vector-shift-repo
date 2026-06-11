import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  const handles = [
    { id: `${id}-system`,   type: 'target', position: Position.Left,  style: { top: '33%' }, label: 'system'   },
    { id: `${id}-prompt`,   type: 'target', position: Position.Left,  style: { top: '67%' }, label: 'prompt'   },
    { id: `${id}-response`, type: 'source', position: Position.Right,                         label: 'response' },
  ];

  return (
    <BaseNode id={id} nodeType="llm" title="LLM" icon="✦" selected={selected} minWidth={280} handles={handles}>
      <p style={{
        margin: '0 52px',
        fontSize: 11,
        color: '#334155',
        lineHeight: 1.6,
        textAlign: 'center',
      }}>
        Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
};