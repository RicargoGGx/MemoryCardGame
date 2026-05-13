export default function Card({ card, isFlipped, isMatched, isDisabled, isShaking, onClick }) {
  const flipped = isFlipped || isMatched;

  return (
    <div
      className={`card-scene${isDisabled && !flipped ? ' disabled' : ''}${isShaking ? ' shake' : ''}`}
      onClick={!isDisabled ? onClick : undefined}
      role="button"
      aria-label={isMatched ? `${card.label}, matched` : flipped ? card.label : 'Hidden card'}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={(e) => e.key === 'Enter' && !isDisabled && onClick?.()}
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
