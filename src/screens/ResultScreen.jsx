import { useApp } from '../context/AppContext';

export default function ResultScreen({ won, onPlayAgain, onMainMenu }) {
  return (
    <div className="screen" style={{ gap: '2rem', textAlign: 'center' }}>
      <div className="slide-down" style={{ zIndex: 1 }}>
        <div style={{ fontSize: 'clamp(3rem,12vw,6rem)', marginBottom: '0.5rem' }}>
          {won ? '🏆' : '😔'}
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem,5vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>
          {won ? 'You did it!' : 'Oops, time is up!'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          {won ? 'Amazing memory!' : 'Better luck next time!'}
        </p>
      </div>

      <div className="slide-up" style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className="btn btn-bounce"
          onClick={onPlayAgain}
          style={{
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            border: 'none', color: '#fff',
            fontSize: '1.1rem', fontWeight: 700,
            padding: '0.7rem 2.5rem', borderRadius: 50,
            letterSpacing: 1, boxShadow: '0 4px 24px rgba(99,102,241,0.45)',
            cursor: 'pointer', minWidth: 200,
          }}
        >
          Play Again
        </button>
        <button
          className="btn btn-bounce"
          onClick={onMainMenu}
          style={{
            background: 'transparent',
            border: '2px solid var(--border)',
            color: 'var(--text)',
            fontSize: '1rem', fontWeight: 600,
            padding: '0.65rem 2.5rem', borderRadius: 50,
            cursor: 'pointer', minWidth: 200,
          }}
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}
