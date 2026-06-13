// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { ResultModal } from './ResultModal'; // ✅ CHANGED: import modal

export const SubmitButton = () => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // ✅ CHANGED: store result for modal

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      };

      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();
      setResult(data); // ✅ CHANGED: set result to show modal instead of alert()
    } catch (err) {
      alert(`Could not reach backend.\n\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ CHANGED: render modal when result exists */}
      {result && <ResultModal data={result} onClose={() => setResult(null)} />}

      <button
        onClick={handleSubmit}
        disabled={loading}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 28px',
          borderRadius: 999,
          border: '1px solid rgba(59,130,246,0.5)',
          background: hovered
            ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
            : 'linear-gradient(135deg, #2563eb, #4f46e5)',
          color: '#fff',
          fontSize: 13,
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: loading ? 'wait' : 'pointer',
          boxShadow: hovered
            ? '0 0 24px rgba(59,130,246,0.55), 0 4px 16px rgba(0,0,0,0.4)'
            : '0 0 12px rgba(59,130,246,0.25), 0 2px 8px rgba(0,0,0,0.4)',
          transition: 'all 0.2s ease',
          letterSpacing: '0.01em',
          opacity: loading ? 0.7 : 1,
          transform: hovered && !loading ? 'translateY(-1px)' : 'translateY(0)',
          outline: 'none',
        }}
      >
        {loading ? (
          <>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>◌</span>
            Analyzing…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Run Pipeline
          </>
        )}
      </button>
    </>
  );
};