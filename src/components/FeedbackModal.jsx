export default function FeedbackModal({ message, emoji, onDismiss }) {
  return (
    <div
      className="result-modal"
      style={{ alignItems: 'flex-start', paddingTop: '72px' }}
      onClick={onDismiss}
    >
      <div
        className="result-modal-box"
        style={{ cursor: 'pointer' }}
        onClick={onDismiss}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{emoji}</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{message}</p>
      </div>
    </div>
  );
}
