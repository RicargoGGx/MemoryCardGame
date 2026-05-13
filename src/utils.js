// Shuffle an array in-place using Fisher–Yates and return a new array.
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const CARD_TYPES = [
  { id: 'star',  img: '/star.svg',  label: 'Star'  },
  { id: 'moon',  img: '/moon.svg',  label: 'Moon'  },
  { id: 'sun',   img: '/sun.svg',   label: 'Sun'   },
  { id: 'comet', img: '/comet.svg', label: 'Comet' },
];

export function buildDeck() {
  // Each type gets 2 cards → 8 cards total
  const pairs = CARD_TYPES.flatMap((type) => [
    { ...type, uid: `${type.id}-a` },
    { ...type, uid: `${type.id}-b` },
  ]);
  return shuffle(pairs);
}
