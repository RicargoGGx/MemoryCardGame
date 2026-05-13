/**
 * Mute / Unmute toggle button.
 * Props: muted (bool), onToggle (fn)
 */
export default function MuteButton({ muted, onToggle }) {
  return (
    <button
      className="mute-btn"
      onClick={onToggle}
      aria-label={muted ? 'Unmute' : 'Mute'}
      title={muted ? 'Unmute' : 'Mute'}
    >
      <img
        src={muted ? '/sound--off.svg' : '/sound--on.svg'}
        alt={muted ? 'Muted' : 'Sound on'}
        style={{ width: 22, height: 22, filter: 'var(--icon-filter)' }}
      />
    </button>
  );
}
