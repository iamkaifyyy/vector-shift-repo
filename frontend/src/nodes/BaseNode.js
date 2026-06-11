// nodes/BaseNode.js
// ─────────────────────────────────────────────────────────────
// Central abstraction for ALL nodes in the pipeline canvas.
// Every node passes a config object; BaseNode handles the shell,
// title, fields, handles, and delete button — nothing is duplicated.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

/**
 * BaseNode
 *
 * @param {string}    id       - Node id from ReactFlow
 * @param {string}    title    - Label shown in the node header e.g. "LLM"
 * @param {string}    [color]  - Optional accent color for the header strip
 * @param {Array}     handles  - Array of handle config objects (see below)
 * @param {ReactNode} children - The body content (fields, labels, selects…)
 *
 * Handle config shape:
 * {
 *   type:      'source' | 'target'
 *   position:  Position.Left | Position.Right | Position.Top | Position.Bottom
 *   id:        string   — unique handle id
 *   style:     object   — optional inline style overrides (e.g. { top: '33%' })
 *   label:     string   — optional small label rendered next to the handle
 * }
 */
export const BaseNode = ({ id, title, color = '#1a192b', handles = [], children }) => {
  const [hovered, setHovered] = useState(false);
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 200,
        minHeight: 80,
        border: `1px solid ${color}`,
        borderRadius: 8,
        background: '#fff',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
        fontSize: 13,
        position: 'relative',
        boxShadow: hovered ? `0 4px 16px ${color}40` : '0 2px 6px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      {/* ── Header strip ── */}
      <div style={{
        background: color,
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '7px 7px 0 0',
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: '0.03em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{title}</span>

        {/* ── Delete button — appears on hover ── */}
        {hovered && (
          <span
            onClick={handleDelete}
            title="Delete node"
            style={{
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
              padding: '0 3px',
              opacity: 0.85,
              borderRadius: 4,
              transition: 'opacity 0.15s',
            }}
          >
            ×
          </span>
        )}
      </div>

      {/* ── Body content supplied by each node ── */}
      <div style={{ padding: '10px 12px' }}>
        {children}
      </div>

      {/* ── Handles rendered from config ── */}
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style || {}}
        >
          {h.label && (
            <span style={{
              position: 'absolute',
              fontSize: 10,
              color: '#555',
              whiteSpace: 'nowrap',
              left: h.position === Position.Right ? 'auto' : 8,
              right: h.position === Position.Right ? 8 : 'auto',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}>
              {h.label}
            </span>
          )}
        </Handle>
      ))}
    </div>
  );
};