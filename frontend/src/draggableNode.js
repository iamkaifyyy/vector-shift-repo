const NODE_ICONS = {
  customInput:  '⬇',
  llm:          '✦',
  customOutput: '⬆',
  text:         '¶',
  note:         '✎',
  api:          '⟳',
  filter:       '⧖',
  timer:        '◷',
  transform:    '⇄',
};

const NODE_COLORS = {
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

export const DraggableNode = ({ type, label }) => {
  const accent = NODE_COLORS[type] || '#888';
  const icon   = NODE_ICONS[type]  || '◈';

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.7';
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => (e.target.style.opacity = '1')}
      style={{
        cursor:       'grab',
        display:      'flex',
        alignItems:   'center',
        gap:           6,
        padding:      '5px 11px',
        borderRadius:  7,
        background:   'rgba(255,255,255,0.04)',
        border:       `1px solid ${accent}30`,
        transition:   'background 0.15s, border-color 0.15s, transform 0.1s',
        userSelect:   'none',
        flexShrink:    0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background  = `${accent}18`;
        e.currentTarget.style.borderColor = `${accent}60`;
        e.currentTarget.style.transform   = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background  = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = `${accent}30`;
        e.currentTarget.style.transform   = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '12px', color: accent, lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontSize:      '12px',
        fontWeight:    500,
        color:         '#cbd5e1',
        whiteSpace:    'nowrap',
        letterSpacing: '0.01em',
      }}>
        {label}
      </span>
    </div>
  );
};