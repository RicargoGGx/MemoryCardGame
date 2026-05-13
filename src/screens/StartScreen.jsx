import { Globe, Sun, Moon, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function StartScreen({ onStart }) {
  const { t, lang, toggleLang, theme, toggleTheme } = useApp();

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
        <button className="settings-btn" onClick={toggleLang}
          title={lang === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}>
          <Globe size={15} style={{ marginRight: 4 }} />{lang === 'en' ? 'ES' : 'EN'}
        </button>
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
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <Play size={18} fill="#fff" /> {t('startBtn')}
        </button>
      </div>
    </div>
  );
}
