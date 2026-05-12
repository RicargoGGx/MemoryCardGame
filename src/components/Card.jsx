export default function Card({ card, isFlipped, isMatched, onClick }) {
  const flipped = isFlipped || isMatched;

  return (
    <div
      className="card-scene"
      onClick={onClick}
      role="button"
    >
      <div className="card-inner">
        <div className="card-face card-back">?</div>
        <div className="card-face card-front">
          <img src={card.img} alt={card.label} draggable="false" />
        </div>
      </div>
    </div>
  );
}
