import { useEffect } from 'react';

/**
 * Feedback modal.
 * Auto-dismisses after 1 s OR immediately on any click.
 * Props: message, emoji, onDismiss
 */
export default function FeedbackModal({ message, emoji, onDismiss }) {
  // Auto-dismiss after 1 second
  useEffect(() => {
    const id = setTimeout(onDismiss, 1000);
    return () => clearTimeout(id);
  }, [onDismiss]);

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
