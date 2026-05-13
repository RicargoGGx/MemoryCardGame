import { useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

/**
 * Feedback modal.
 * Auto-dismisses after 1 s OR immediately on any click.
 * Props: message, emoji, onDismiss
 */
export default function FeedbackModal({ message, type, onDismiss }) {
  const isMatch = type === 'match' || type === 'win';
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
        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
          {isMatch
            ? <CheckCircle2 size={44} color="#22c55e" strokeWidth={2} />
            : <XCircle size={44} color="#ef4444" strokeWidth={2} />}
        </div>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{message}</p>
      </div>
    </div>
  );
}
