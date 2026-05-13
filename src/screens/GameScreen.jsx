import { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../components/Card';
import FeedbackModal from '../components/FeedbackModal';
import MuteButton from '../components/MuteButton';
import { buildDeck } from '../utils';
import { useTimer } from '../hooks/useTimer';
import { playSFX } from '../hooks/useSound';
import { useApp } from '../context/AppContext';

const TOTAL_PAIRS = 4;
const scoreForMatch = (timeLeft) => 50 + timeLeft * 5;

export default function GameScreen({ onWin, onLose, onMainMenu }) {
  const { t } = useApp();
  const [muted,   setMuted]   = useState(true);
  const [deck]                = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [locked,  setLocked]  = useState(false);
  const [score,   setScore]   = useState(0);
  const [modal,   setModal]   = useState(null);

  const bgRef         = useRef(null);
  const timeLeftRef   = useRef(30);
  const scoreRef      = useRef(0);        // always-current score for callbacks

  // ── Background music (only this respects mute) ──
  useEffect(() => {
    bgRef.current = new Audio('/background.mp3');
    bgRef.current.loop = true;
    return () => { bgRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (!muted) bgRef.current?.play().catch(() => {});
    else        bgRef.current?.pause();
  }, [muted]);

  // ── Exit ──
  const handleExit = () => {
    bgRef.current?.pause();
    onMainMenu();
  };

  // ── Timer ──
  const { timeLeft, start: startTimer } = useTimer(30, {
    onTick: (tick) => {
      timeLeftRef.current = tick;
      if (tick <= 10 && tick > 0) {
        playSFX('/ticking.mp3');  // plays every second from 10 down to 1
      }
    },
    onExpire: () => {
      bgRef.current?.pause();
      onLose(scoreRef.current);
    },
  });
  useEffect(() => { startTimer(); }, []); // eslint-disable-line

  // ── Dismiss modal ──
  const dismissModal = useCallback(() => {
    if (!modal) return;
    if (modal.type === 'win') return;
    if (modal.type === 'nomatch') {
      setFlipped([]);
      setLocked(false);
    }
    setModal(null);
  }, [modal]);

  // ── Card click ──
  const handleCardClick = useCallback((index) => {
    if (locked) return;
    if (flipped.includes(index)) return;
    if (matched.includes(index)) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      const [a, b] = next;
      const isMatch = deck[a].id === deck[b].id;

      setTimeout(() => {
        if (isMatch) {
          playSFX('/correct.mp3');
          const pts = scoreForMatch(timeLeftRef.current);
          scoreRef.current += pts;
          setScore(scoreRef.current);
          const newMatched = [...matched, a, b];
          setMatched(newMatched);
          setFlipped([]);
          setLocked(false);

          if (newMatched.length === TOTAL_PAIRS * 2) {
            bgRef.current?.pause();
            setModal({ message: t('modalMatch'), emoji: '✅', type: 'win' });
            setTimeout(() => { setModal(null); onWin(scoreRef.current); }, 1400);
          } else {
            setModal({ message: t('modalMatch'), emoji: '✅', type: 'match' });
          }
        } else {
          playSFX('/incorrect.mp3');
          setModal({ message: t('modalNoMatch'), emoji: '❌', type: 'nomatch' });
        }
      }, 600);
    }
  }, [locked, flipped, matched, deck, onWin, t]); // eslint-disable-line

  const timerDanger = timeLeft <= 10;

  return (
    <div className="screen" style={{ padding: '1rem', gap: '1.2rem' }}>

      {/* ── Top bar ── */}
      <div className="topbar">
        {/* Exit button */}
        <button
          onClick={handleExit}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: 8,
            padding: '0.3rem 0.8rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          ← {t('exitBtn')}
        </button>

        {/* Score */}
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fbbf24', letterSpacing: 1 }}>
          ⭐ {score} pts
        </span>

        {/* Timer */}
        <span className={`timer${timerDanger ? ' danger' : ''}`}>{timeLeft}s</span>

        {/* Mute (BG music only) */}
        <MuteButton muted={muted} onToggle={() => setMuted((m) => !m)} />
      </div>

      {/* Progress */}
      <p style={{ marginTop: '3.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        {t('matchesLabel')}: {matched.length / 2} / {TOTAL_PAIRS}
      </p>

      {/* Card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '0.75rem',
        width: '100%',
        maxWidth: 680,
      }} className="px-2">
        {deck.map((card, i) => (
          <Card
            key={card.uid}
            card={card}
            isFlipped={flipped.includes(i)}
            isMatched={matched.includes(i)}
            isDisabled={locked && !flipped.includes(i) && !matched.includes(i)}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </div>

      {/* Feedback modal */}
      {modal && (
        <FeedbackModal
          message={modal.message}
          emoji={modal.emoji}
          onDismiss={dismissModal}
        />
      )}
    </div>
  );
}
