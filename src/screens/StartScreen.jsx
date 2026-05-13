import { Globe, Sun, Moon, Play, Trophy, History } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StartScreen({ onStart, bestScore, lastScore }) {
  const { t, lang, setLang, theme, toggleTheme } = useApp();

  return (
    <div className="screen" style={{ gap: '2.5rem' }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 50% 0%, var(--bg-glow) 0%, transparent 70%)`,
        zIndex: 0,
      }} />

      {/* Settings bar — language + theme toggles */}
      <div className="settings-bar">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Globe size={15} style={{ position: 'absolute', left: 10, pointerEvents: 'none', color: 'var(--text)' }} />
          <select
            className="settings-btn"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{ paddingLeft: 28, appearance: 'none', cursor: 'pointer' }}
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
        <button className="settings-btn" onClick={toggleTheme}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Logo + title – slides in from top */}
      <div className="slide-down" style={{
        zIndex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1rem',
      }}>
        <img
          src="/logo.svg"
          alt="Memory Card Game logo"
          style={{ width: 'min(180px, 45vw)', filter: 'var(--logo-filter)' }}
        />
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
          letterSpacing: 2, margin: 0, color: 'var(--text)',
        }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Start button – slides in from bottom */}
      <div className="slide-up" style={{ zIndex: 1 }}>
        <button
          className="btn-bounce"
          onClick={onStart}
        >
          <span
            className="btn-bounce-visual"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff',
              fontSize: '1.15rem', fontWeight: 700,
              padding: '0.75rem 2.8rem', borderRadius: 50,
              letterSpacing: 1,
              boxShadow: '0 4px 24px rgba(99,102,241,0.45)',
            }}
          >
            <Play size={18} fill="#fff" /> {t('startBtn')}
          </span>
        </button>
      </div>

      {/* Score stats */}
      <div className="slide-up" style={{ zIndex: 1, display: 'flex', gap: '1.5rem' }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '0.5rem 1.2rem', textAlign: 'center', minWidth: 110,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 2 }}>
            <Trophy size={13} color="#fbbf24" />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('bestScore')}
            </span>
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24' }}>
            {bestScore > 0 ? bestScore : t('noScore')}
          </span>
        </div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '0.5rem 1.2rem', textAlign: 'center', minWidth: 110,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 2 }}>
            <History size={13} color="var(--text-muted)" />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('lastScore')}
            </span>
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)' }}>
            {lastScore > 0 ? lastScore : t('noScore')}
          </span>
        </div>
      </div>
    </div>
  );
}
