// nodes/textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode, StyledHandle } from './BaseNode';

/* ── Variable extractor ──────────────────────────────────────── */
const VAR_REGEX = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  let m;
  const regex = new RegExp(VAR_REGEX.source, 'g');
  while ((m = regex.exec(text)) !== null) {
    if (!vars.includes(m[1])) vars.push(m[1]);
  }
  return vars;
}

/* ── TextNode ────────────────────────────────────────────────── */
export const TextNode = ({ id, data, selected }) => {
  const [text, setText]           = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef               = useRef(null);

  // Extract {{variable}} handles from text
  useEffect(() => {
    setVariables(extractVariables(text));
  }, [text]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(60, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  const nodeWidth = Math.max(200, Math.min(400, 180 + text.length * 1.5));

  // Static output handle via handles array (actual file pattern)
  const handles = [
    { id: `${id}-output`, type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      nodeType="text"
      title="Text"
      icon="¶"
      selected={selected}
      minWidth={nodeWidth}
      handles={handles}
      style={{ transition: 'min-width 0.2s ease' }}
    >
      {/* Dynamic variable input handles — rendered manually so we can position them */}
      {variables.map((varName, i) => {
        const total = variables.length;
        const top   = total === 1 ? '50%' : `${((i + 1) / (total + 1)) * 100}%`;
        return (
          <div key={varName}>
            <StyledHandle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              accentColor="#f59e0b"
              style={{ top, transform: 'translateY(-50%)' }}
            />
            {/* Variable label next to handle */}
            <div style={{
              position: 'absolute',
              left: 14,
              top,
              transform: 'translateY(-50%)',
              fontSize: '9.5px',
              color: '#f59e0b',
              fontWeight: 500,
              pointerEvents: 'none',
              background: '#1e293b',
              padding: '1px 4px',
              borderRadius: 3,
              border: '1px solid rgba(245,158,11,0.25)',
            }}>
              {varName}
            </div>
          </div>
        );
      })}

      {/* Text field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Text
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text… use {{variable}} to create handles"
          style={{
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6,
            color: '#e2e8f0',
            fontSize: 12,
            padding: '6px 8px',
            fontFamily: 'inherit',
            lineHeight: 1.5,
            outline: 'none',
            boxSizing: 'border-box',
            minHeight: 60,
          }}
        />
      </div>

      {/* Variable pills */}
      {variables.length > 0 && (
        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {variables.map((v) => (
            <span key={v} style={{
              fontSize: '10px',
              color: '#f59e0b',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 4,
              padding: '1px 6px',
            }}>
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};