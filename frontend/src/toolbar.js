import { DraggableNode } from './draggableNode';

const NODE_GROUPS = [
  {
    label: 'Core',
    nodes: [
      { type: 'customInput',  label: 'Input'     },
      { type: 'llm',          label: 'LLM'       },
      { type: 'customOutput', label: 'Output'    },
      { type: 'text',         label: 'Text'      },
    ],
  },
  {
    label: 'Utilities',
    nodes: [
      { type: 'note',      label: 'Note'      },
      { type: 'api',       label: 'API Call'  },
      { type: 'filter',    label: 'Filter'    },
      { type: 'timer',     label: 'Timer'     },
      { type: 'transform', label: 'Transform' },
    ],
  },
];

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="3"  cy="8"  r="2" fill="white" fillOpacity="0.9"/>
          <circle cx="13" cy="3"  r="2" fill="white" fillOpacity="0.9"/>
          <circle cx="13" cy="13" r="2" fill="white" fillOpacity="0.9"/>
          <line x1="5" y1="7.5" x2="11" y2="4"  stroke="white" strokeOpacity="0.6" strokeWidth="1.2"/>
          <line x1="5" y1="8.5" x2="11" y2="12" stroke="white" strokeOpacity="0.6" strokeWidth="1.2"/>
        </svg>
      </div>
      <div style={{ lineHeight: 1.15 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          VectorShift
        </div>
        <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Pipeline Studio
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      width: 1, height: 20,
      background: 'rgba(255,255,255,0.08)',
      flexShrink: 0,
    }} />
  );
}

function GroupLabel({ children }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 600, color: '#334155',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      flexShrink: 0, userSelect: 'none',
    }}>
      {children}
    </span>
  );
}

function StatusBadge() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 999,
      background: 'rgba(34,197,94,0.08)',
      border: '1px solid rgba(34,197,94,0.18)',
      flexShrink: 0,
    }}>
      <div style={{
        width: 5, height: 5, borderRadius: '50%',
        background: '#22c55e', boxShadow: '0 0 5px #22c55e',
      }} />
      <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 500 }}>Ready</span>
    </div>
  );
}

export const PipelineToolbar = () => {
  return (
    <header style={{
      height: 52,
      background: '#08080d',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 18px',
      flexShrink: 0,
      position: 'relative',
      zIndex: 100,
    }}>
      <Logo />
      <Divider />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, overflow: 'hidden' }}>
        {NODE_GROUPS.map((group, gi) => (
          <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <GroupLabel>{group.label}</GroupLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {group.nodes.map((n) => (
                <DraggableNode key={n.type} type={n.type} label={n.label} />
              ))}
            </div>
            {gi < NODE_GROUPS.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      <StatusBadge />
    </header>
  );
};