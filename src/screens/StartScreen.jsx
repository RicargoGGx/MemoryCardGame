export default function StartScreen({ onStart }) {
  return (
    <div className="screen" style={{ gap: '2.5rem' }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1rem',
      }}>
        <img
          src="/logo.svg"
          alt="Memory Card Game logo"
          style={{ width: 'min(180px, 45vw)' }}
        />
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
          letterSpacing: 2, margin: 0,
        }}>
          Memory Card Game
        </h1>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          Can you find all the pairs?
        </p>
      </div>

      <button
        className="btn btn-bounce"
        onClick={onStart}
        style={{
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          border: 'none', color: '#fff',
          fontSize: '1.15rem', fontWeight: 700,
          padding: '0.75rem 2.8rem', borderRadius: 50,
          letterSpacing: 1,
          boxShadow: '0 4px 24px rgba(99,102,241,0.45)',
          cursor: 'pointer',
        }}
      >
        ▶ Start Game
      </button>
    </div>
  );
}
