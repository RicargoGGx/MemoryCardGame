import { Trophy, Frown, Star, RotateCcw, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ResultScreen({ won, score, onPlayAgain, onMainMenu }) {
  const { t } = useApp();

  return (
    <div className="screen" style={{ gap: '2rem', textAlign: 'center' }}>
      {/* Glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: won
          ? 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.2) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.2) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      {/* Message */}
      <div className="slide-down" style={{ zIndex: 1 }}>
        <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
          {won
            ? <Trophy size={80} color="#fbbf24" strokeWidth={1.5} />
            : <Frown size={80} color="#94a3b8" strokeWidth={1.5} />}
        </div>
        <h2 style={{ fontSize: 'clamp(1.6rem,5vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>
          {won ? t('winTitle') : t('loseTitle')}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          {won ? t('winSub') : t('loseSub')}
        </p>
        <div style={{
          marginTop: '1.25rem', display: 'inline-block',
          background: 'rgba(251,191,36,0.12)',
          border: '1px solid rgba(251,191,36,0.35)',
          borderRadius: 12, padding: '0.6rem 1.8rem',
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
            {t('finalScore')}
          </span>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <Star size={28} fill="#fbbf24" color="#fbbf24" /> {score} pts
          </span>
        </div>
      </div>

      {/* Buttons */}
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
            display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
          }}
        >
          <RotateCcw size={18} /> {t('playAgain')}
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
            display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
          }}
        >
          <Home size={18} /> {t('mainMenu')}
        </button>
      </div>
    </div>
  );
}
