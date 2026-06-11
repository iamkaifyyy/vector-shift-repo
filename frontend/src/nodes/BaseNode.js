import { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const NODE_COLORS = {
  customInput:  { accent: '#3b82f6', glow: 'rgba(59,130,246,0.28)'  },
  llm:          { accent: '#a855f7', glow: 'rgba(168,85,247,0.28)'  },
  customOutput: { accent: '#22c55e', glow: 'rgba(34,197,94,0.28)'   },
  text:         { accent: '#f59e0b', glow: 'rgba(245,158,11,0.28)'  },
  note:         { accent: '#facc15', glow: 'rgba(250,204,21,0.28)'  },
  api:          { accent: '#06b6d4', glow: 'rgba(6,182,212,0.28)'   },
  filter:       { accent: '#f97316', glow: 'rgba(249,115,22,0.28)'  },
  timer:        { accent: '#ec4899', glow: 'rgba(236,72,153,0.28)'  },
  transform:    { accent: '#8b5cf6', glow: 'rgba(139,92,246,0.28)'  },
};

export function StyledHandle({ type, position, id, accentColor, label, style = {} }) {
  const isRight = position === Position.Right;
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      style={{
        width: 10, height: 10, borderRadius: '50%',
        background: accentColor,
        border: '2px solid #0a0a0f',
        boxShadow: `0 0 0 1px ${accentColor}50`,
        transition: 'box-shadow 0.15s ease',
        ...style,
      }}
    >
      {label && (
        <span style={{
          position: 'absolute',
          fontSize: 9, fontWeight: 500,
          color: '#64748b',
          whiteSpace: 'nowrap',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          left:  isRight ? 'auto' : 14,
          right: isRight ? 14    : 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          {label}
        </span>
      )}
    </Handle>
  );
}

export const BaseNode = ({
  id, nodeType, title, icon, selected,
  minWidth = 210, children, handles = [], style = {},
}) => {
  const [hovered, setHovered] = useState(false);
  const { deleteElements } = useReactFlow();

  const { accent, glow } = NODE_COLORS[nodeType] || { accent: '#888', glow: 'rgba(136,136,136,0.25)' };

  const elevation = selected
    ? `0 0 0 1.5px ${accent}, 0 0 20px 4px ${glow}, 0 8px 32px rgba(0,0,0,0.6)`
    : hovered
    ? `0 0 0 1px ${accent}50, 0 6px 24px rgba(0,0,0,0.5), 0 0 12px 1px ${glow}`
    : '0 2px 12px rgba(0,0,0,0.4)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth,
        background:   '#0e0e13',
        border:       `1px solid ${selected ? accent+'70' : hovered ? accent+'35' : 'rgba(255,255,255,0.07)'}`,
        borderRadius:  10,
        boxShadow:     elevation,
        transition:   'box-shadow 0.18s ease, border-color 0.18s ease',
        overflow:     'hidden',
        position:     'relative',
        fontFamily:   "'Inter', sans-serif",
        fontSize:      13,
        boxSizing:    'border-box',
        ...style,
      }}
    >
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${accent} 0%, ${accent}55 100%)`,
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 6, padding: '7px 10px 6px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: `linear-gradient(135deg, ${accent}14 0%, transparent 80%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {icon && <span style={{ fontSize: 12, color: accent, lineHeight: 1 }}>{icon}</span>}
          <span style={{ fontSize: 11, fontWeight: 600, color: accent, letterSpacing: '0.03em', lineHeight: 1 }}>
            {title}
          </span>
        </div>

        {hovered && (
          <span
            onClick={() => deleteElements({ nodes: [{ id }] })}
            title="Delete node"
            style={{ cursor: 'pointer', fontSize: 16, lineHeight: 1, color: '#475569', padding: '0 3px', borderRadius: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
          >
            ×
          </span>
        )}
      </div>

      <div style={{ padding: '10px 12px' }}>
        {children}
      </div>

      {handles.map((h) => (
        <StyledHandle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          accentColor={accent}
          label={h.label}
          style={h.style}
        />
      ))}
    </div>
  );
};