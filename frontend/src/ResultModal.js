// src/ResultModal.js

import { useEffect } from 'react';

export const ResultModal = ({ data, onClose }) => {
  if (!data) return null;

  // close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const { num_nodes, num_edges, is_dag } = data;

  return (
    // ── Backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Modal card — stop click from closing */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0e0e13',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '28px 32px',
          minWidth: 340,
          boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          animation: 'modalIn 0.2s ease',
        }}
      >
        {/* ── Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15,
            }}>
              ✦
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f2f8', letterSpacing: '-0.01em' }}>
                Pipeline Analysis
              </div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>
                Results from backend
              </div>
            </div>
          </div>
          <span
            onClick={onClose}
            style={{ cursor: 'pointer', fontSize: 20, color: '#475569', lineHeight: 1, padding: '0 4px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
          >
            ×
          </span>
        </div>

        {/* ── Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StatCard label="Nodes" value={num_nodes} accent="#3b82f6" icon="◈" />
          <StatCard label="Edges" value={num_edges} accent="#a855f7" icon="⟶" />
        </div>

        {/* ── DAG status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          borderRadius: 10,
          background: is_dag ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
          border: `1px solid ${is_dag ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9, flexShrink: 0,
            background: is_dag ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>
            {is_dag ? '✓' : '✗'}
          </div>
          <div>
            <div style={{
              fontSize: 13, fontWeight: 600,
              color: is_dag ? '#22c55e' : '#ef4444',
            }}>
              {is_dag ? 'Valid DAG' : 'Contains a Cycle'}
            </div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
              {is_dag
                ? 'Pipeline can be executed safely'
                : 'Fix circular dependencies before running'}
            </div>
          </div>
        </div>

        {/* ── Close button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px 0',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: '#94a3b8',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = '#f0f2f8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          Dismiss
        </button>
      </div>

      {/* ── Animation keyframe */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
};

// ── Small stat card
const StatCard = ({ label, value, accent, icon }) => (
  <div style={{
    padding: '14px 16px',
    borderRadius: 10,
    background: `${accent}0d`,
    border: `1px solid ${accent}25`,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  }}>
    <div style={{ fontSize: 11, color: '#475569', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ color: accent }}>{icon}</span>
      {label}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: accent, lineHeight: 1 }}>
      {value}
    </div>
  </div>
);
