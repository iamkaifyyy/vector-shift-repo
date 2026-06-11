// Custom Nodes file - JS File 

// nodes/customNodes.js
// ─────────────────────────────────────────────────────────────
// Five new nodes built with BaseNode — each created in minutes,
// zero boilerplate, proving the abstraction works.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// ── 1. Note Node ─────────────────────────────────────────────
// A sticky-note style node for adding comments to a pipeline.
// No handles — purely informational.
export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode id={id} title="📝 Note" color="#ca8a04" handles={[]}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        style={{ width: '100%', resize: 'vertical', fontSize: 12, border: '1px solid #ddd', borderRadius: 4, padding: 4 }}
      />
    </BaseNode>
  );
};

// ── 2. API Node ───────────────────────────────────────────────
// Calls an external REST endpoint. Takes a URL input, emits response.
export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    { id: `${id}-body`,     type: 'target', position: Position.Left,  style: { top: '33%' }, label: 'body' },
    { id: `${id}-headers`,  type: 'target', position: Position.Left,  style: { top: '67%' }, label: 'headers' },
    { id: `${id}-response`, type: 'source', position: Position.Right, label: 'response' },
  ];

  return (
    <BaseNode id={id} title="🌐 API Call" color="#0891b2" handles={handles}>
      <label style={{ display: 'block', marginBottom: 6 }}>
        URL:
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginLeft: 6, width: 120, fontSize: 11 }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ marginLeft: 6 }}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};

// ── 3. Filter Node ────────────────────────────────────────────
// Filters data based on a condition. Data in → filtered data out.
export const FilterNode = ({ id, data }) => {
  const [field, setField]       = useState(data?.field || 'status');
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue]       = useState(data?.value || 'active');

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left },
    { id: `${id}-pass`,   type: 'source', position: Position.Right, style: { top: '33%' }, label: 'pass' },
    { id: `${id}-fail`,   type: 'source', position: Position.Right, style: { top: '67%' }, label: 'fail' },
  ];

  return (
    <BaseNode id={id} title="🔍 Filter" color="#dc2626" handles={handles}>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="field"
          style={{ width: 55, fontSize: 11 }}
        />
        <select value={operator} onChange={(e) => setOperator(e.target.value)} style={{ fontSize: 11 }}>
          <option>==</option>
          <option>!=</option>
          <option>&gt;</option>
          <option>&lt;</option>
        </select>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="value"
          style={{ width: 55, fontSize: 11 }}
        />
      </div>
    </BaseNode>
  );
};

// ── 4. Timer / Delay Node ─────────────────────────────────────
// Introduces a configurable delay before passing data forward.
export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit]   = useState(data?.unit || 'ms');

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} title="⏱ Timer" color="#9333ea" handles={handles}>
      <label style={{ display: 'block' }}>
        Delay:
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          style={{ marginLeft: 6, width: 70 }}
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{ marginLeft: 4 }}>
          <option>ms</option>
          <option>s</option>
          <option>min</option>
        </select>
      </label>
    </BaseNode>
  );
};

// ── 5. Transform Node ─────────────────────────────────────────
// Applies a data transformation (e.g. JSON parse, stringify, uppercase).
export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'JSON.parse');

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode id={id} title="⚙️ Transform" color="#0f766e" handles={handles}>
      <label style={{ display: 'block' }}>
        Fn:
        <select
          value={transform}
          onChange={(e) => setTransform(e.target.value)}
          style={{ marginLeft: 6 }}
        >
          <option>JSON.parse</option>
          <option>JSON.stringify</option>
          <option>toUpperCase</option>
          <option>toLowerCase</option>
          <option>trim</option>
        </select>
      </label>
    </BaseNode>
  );
};   