export default function Card({ card, isFlipped, isMatched, isDisabled, onClick }) {
  const flipped = isFlipped || isMatched;

  return (
    <div
      className={`card-scene${isDisabled && !flipped ? ' disabled' : ''}`}
      onClick={!isDisabled ? onClick : undefined}
      role="button"
    >
      <div className={`card-inner${flipped ? ' flipped' : ''}`}>
        {/* Back face */}
        <div className="card-face card-back">?</div>
        {/* Front face */}
        <div className="card-face card-front">
          <img src={card.img} alt={card.label} draggable="false" />
        </div>
      </div>
    </div>
  );
}
