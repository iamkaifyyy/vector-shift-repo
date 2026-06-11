import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }     from './nodes/inputNode';
import { LLMNode }       from './nodes/llmNode';
import { OutputNode }    from './nodes/outputNode';
import { TextNode }      from './nodes/textNode';
import { NoteNode, APINode, FilterNode, TimerNode, TransformNode } from './nodes/CustomNodes';

import 'reactflow/dist/style.css';

const gridSize   = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  note:         NoteNode,
  api:          APINode,
  filter:       FilterNode,
  timer:        TimerNode,
  transform:    TransformNode,
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

const minimapColor = (node) => {
  const map = {
    customInput:  '#3b82f6',
    llm:          '#a855f7',
    customOutput: '#22c55e',
    text:         '#f59e0b',
    note:         '#facc15',
    api:          '#06b6d4',
    filter:       '#f97316',
    timer:        '#ec4899',
    transform:    '#8b5cf6',
  };
  return map[node.type] || '#888';
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!reactFlowInstance) return;

      const raw = event.dataTransfer.getData('application/reactflow');
      if (!raw) return;

      let type;
      try {
        const parsed = JSON.parse(raw);
        type = parsed?.nodeType;
      } catch {
        type = raw;
      }

      if (!type) return;

      const bounds   = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID  = getNodeID(type);
      const newNode = {
        id:       nodeID,
        type,
        position,
        data:     getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%', background: '#08080d' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
        deleteKeyCode="Backspace"
        style={{ background: 'transparent' }}
        defaultEdgeOptions={{
          style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1.5 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="rgba(255,255,255,0.06)"
        />

        <Controls
          style={{ bottom: 80, left: 16 }}
        />

        <MiniMap
          nodeColor={minimapColor}
          style={{ bottom: 16, right: 16, width: 160, height: 100 }}
          maskColor="rgba(8,8,13,0.75)"
        />

        {nodes.length === 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            gap: 12,
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              border: '1px dashed rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}>
              ✦
            </div>
            <p style={{
              color: '#475569',
              fontSize: 13,
              textAlign: 'center',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Drag nodes from the toolbar above<br />to start building your pipeline
            </p>
          </div>
        )}
      </ReactFlow>
    </div>
  );
};