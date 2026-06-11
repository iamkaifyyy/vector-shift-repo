// toolbar.js  (updated — add new nodes here in one line each)

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {/* Original 4 */}
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm'         label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text'        label='Text' />

        {/* 5 new nodes */}
        <DraggableNode type='note'      label='Note' />
        <DraggableNode type='api'       label='API Call' />
        <DraggableNode type='filter'    label='Filter' />
        <DraggableNode type='timer'     label='Timer' />
        <DraggableNode type='transform' label='Transform' />
      </div>
    </div>
  );
};