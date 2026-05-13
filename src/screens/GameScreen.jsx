import { useState } from 'react';
import Card from '../components/Card';
import { buildDeck } from '../utils';

const TOTAL_PAIRS = 4;

export default function GameScreen({ onWin, onLose }) {
  const [deck]    = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;
    const next = [...flipped, index];
    setFlipped(next);

    if (next.length === 2) {
      const [a, b] = next;
      if (deck[a].id === deck[b].id) {
        setMatched((m) => [...m, a, b]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

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
      }}>
        {deck.map((card, i) => (
          <Card
            key={card.uid}
            card={card}
            isFlipped={flipped.includes(i)}
            isMatched={matched.includes(i)}
            onClick={() => handleCardClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
