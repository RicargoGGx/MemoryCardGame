/**
 * Play a short SFX. Always plays regardless of mute state.
 * Creates a fresh Audio instance every call to avoid the
 * "interrupted" / "play() was called while paused" browser bug.
 */
export function playSFX(src) {
  const audio = new Audio(src);
  audio.play().catch(() => {});
}
