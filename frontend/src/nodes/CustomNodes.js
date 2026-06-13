// nodes/customNodes.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';


export const NoteNode = ({ id, data, selected }) => {
  const [note, setNote] = useState(data?.note || 'Add a note...');

  return (
    <BaseNode
      id={id}
      nodeType="note"
      title="Note"
      icon="✎"
      selected={selected}
      minWidth={200}
      handles={[]}
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Add a note…"
        style={{
          width: '100%',
          resize: 'vertical',
          fontSize: 12,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          color: '#e2e8f0',
          padding: '6px 8px',
          fontFamily: 'inherit',
          lineHeight: 1.5,
          outline: 'none',
          boxSizing: 'border-box',
          minHeight: 70,
        }}
      />
    </BaseNode>
  );
};

/* ── 2. API Call Node ────────────────────────────────────────── */
// Calls a REST endpoint — body + headers in, response out
export const APINode = ({ id, data, selected }) => {
  const [url,    setUrl]    = useState(data?.url    || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    { id: `${id}-body`,     type: 'target', position: Position.Left,  style: { top: '33%' }, label: 'body'     },
    { id: `${id}-headers`,  type: 'target', position: Position.Left,  style: { top: '67%' }, label: 'headers'  },
    { id: `${id}-response`, type: 'source', position: Position.Right,                         label: 'response' },
  ];

  return (
    <BaseNode
      id={id}
      nodeType="api"
      title="API Call"
      icon="⟳"
      selected={selected}
      minWidth={240}
      handles={handles}
    >
      {/* URL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
        <label style={labelStyle}>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          style={inputStyle}
        />
      </div>

      {/* Method */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={labelStyle}>Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)} style={inputStyle}>
          {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};

/* ── 3. Filter Node ──────────────────────────────────────────── */
// Filters data on a condition — pass / fail outputs
export const FilterNode = ({ id, data, selected }) => {
  const [field,    setField]    = useState(data?.field    || 'status');
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value,    setValue]    = useState(data?.value    || 'active');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left                                        },
    { id: `${id}-pass`,  type: 'source', position: Position.Right, style: { top: '33%' }, label: 'pass' },
    { id: `${id}-fail`,  type: 'source', position: Position.Right, style: { top: '67%' }, label: 'fail' },
  ];

  return (
    <BaseNode
      id={id}
      nodeType="filter"
      title="Filter"
      icon="⧖"
      selected={selected}
      minWidth={230}
      handles={handles}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 5, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <label style={labelStyle}>Field</label>
          <input value={field} onChange={(e) => setField(e.target.value)} style={inputStyle} />
        </div>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={{ ...inputStyle, width: 52, padding: '5px 4px' }}
        >
          {['==', '!=', '>', '<', '>=', '<='].map((o) => <option key={o}>{o}</option>)}
        </select>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <label style={labelStyle}>Value</label>
          <input value={value} onChange={(e) => setValue(e.target.value)} style={inputStyle} />
        </div>
      </div>
    </BaseNode>
  );
};

/* ── 4. Timer Node ───────────────────────────────────────────── */
// Introduces a configurable delay before passing data forward
export const TimerNode = ({ id, data, selected }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit,  setUnit]  = useState(data?.unit  || 'ms');

  const handles = [
    { id: `${id}-trigger`, type: 'target', position: Position.Left,  label: 'trigger' },
    { id: `${id}-done`,    type: 'source', position: Position.Right, label: 'done'    },
  ];

  return (
    <BaseNode
      id={id}
      nodeType="timer"
      title="Timer"
      icon="◷"
      selected={selected}
      minWidth={210}
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={labelStyle}>Delay</label>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{ ...inputStyle, width: 62 }}
          >
            {['ms', 's', 'min'].map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

/* ── 5. Transform Node ───────────────────────────────────────── */
// Applies a data transformation function
export const TransformNode = ({ id, data, selected }) => {
  const [fn, setFn] = useState(data?.fn || 'JSON.parse');

  const FNS = ['JSON.parse', 'JSON.stringify', 'toLowerCase', 'toUpperCase', 'trim', 'parseInt', 'parseFloat'];

  const handles = [
    { id: `${id}-input`,  type: 'target', position: Position.Left  },
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      nodeType="transform"
      title="Transform"
      icon="⇄"
      selected={selected}
      minWidth={210}
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={labelStyle}>Function</label>
        <select value={fn} onChange={(e) => setFn(e.target.value)} style={inputStyle}>
          {FNS.map((f) => <option key={f}>{f}</option>)}
        </select>
      </div>
    </BaseNode>
  );
};

/* ── Shared micro-styles ─────────────────────────────────────── */
const labelStyle = {
  fontSize: '10px',
  fontWeight: 600,
  color: '#64748b',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
};

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 6,
  color: '#e2e8f0',
  fontSize: 12,
  padding: '5px 8px',
  fontFamily: 'inherit',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};