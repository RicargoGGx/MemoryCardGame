import { useState, useCallback } from 'react';
import Card from '../components/Card';
import FeedbackModal from '../components/FeedbackModal';
import { buildDeck } from '../utils';

const TOTAL_PAIRS = 4;

export default function GameScreen({ onWin, onLose }) {
  const [deck]                = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [locked,  setLocked]  = useState(false);
  const [modal,   setModal]   = useState(null);

  const dismissModal = useCallback(() => {
    if (!modal) return;
    if (modal.type === 'nomatch') {
      setFlipped([]);
      setLocked(false);
    }
    setModal(null);
  }, [modal]);

  const handleCardClick = useCallback((index) => {
    if (locked) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      setLocked(true);
      const [a, b] = next;
      const isMatch = deck[a].id === deck[b].id;

      setTimeout(() => {
        if (isMatch) {
          const newMatched = [...matched, a, b];
          setMatched(newMatched);
          setFlipped([]);
          setLocked(false);

          if (newMatched.length === TOTAL_PAIRS * 2) {
            setModal({ message: "Nice! It's a match! 🎉", emoji: '✅', type: 'win' });
            setTimeout(() => { setModal(null); onWin(0); }, 1400);
          } else {
            setModal({ message: "Nice! It's a match! 🎉", emoji: '✅', type: 'match' });
          }
        } else {
          setModal({ message: 'Sorry, not a match 😢', emoji: '❌', type: 'nomatch' });
        }
      }, 600);
    }
  }, [locked, flipped, matched, deck, onWin]);

  return (
    <div className="screen" style={{ padding: '1rem', gap: '1.2rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Matches: {matched.length / 2} / {TOTAL_PAIRS}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
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
