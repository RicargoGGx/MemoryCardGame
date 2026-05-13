# 🃏 Memory Card Game

A browser-based memory card game built with **React + Vite**, styled with **Tailwind CSS v4** and **Bootstrap 5**.

## 🚀 Live Demo

> Deploy URL will go here (Vercel)

---

## ⚙️ Installation & Running

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/MemoryCardGame.git
cd MemoryCardGame

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

---

## 🎮 How to Play

1. Click **Start Game** on the first screen.
2. Eight cards are laid face-down in random order (4 pairs: ⭐ Star, 🌙 Moon, ☀️ Sun, ☄️ Comet).
3. Click a card to flip it, then click a second card:
   - **Match** → cards stay face-up, a success modal appears briefly.
   - **No match** → a failure modal appears and cards flip back.
4. You have **30 seconds** to find all 4 pairs.
5. At 10 s remaining a ticking sound warns you.
6. Find all pairs → **"You did it!"** screen. Time runs out → **"Oops…"** screen.
7. Click **Play Again** to start a new round, or **Main Menu** to go back to the start.

---

## 🛠 Technical Decisions

| Decision | Rationale |
|---|---|
| **React + Vite** | Fast HMR, minimal config, native ESM — ideal for a small interactive app. |
| **Tailwind CSS v4 (Vite plugin)** | Utility-first with zero extra config; all custom design tokens live in CSS variables. |
| **Bootstrap 5** | Used for responsive grid helpers and base button resets. |
| **CSS variables for theming** | `data-theme` on `<html>` switches the full dark/light palette with no JS overhead. |
| **`playSFX` per call** | Creates a fresh `Audio` instance every invocation, eliminating the browser "interrupted" error that caused SFX to stop working after the first play. |
| **`callbacksRef` in `useTimer`** | Stores `onTick`/`onExpire` in a ref updated every render, preventing stale-closure bugs inside the `setInterval`. |
| **React Context for i18n + theme** | Keeps language and theme state globally accessible without prop-drilling or a heavy library. |
| **No state-management library** | Game state is simple enough for `useState` + the context above. No Redux/Zustand overhead. |
| **Assets in `/public`** | Audio and SVG files served as static assets; referenced by absolute path strings to avoid bundling costs. |

---

## 📁 Project Structure

```
src/
  context/
    AppContext.jsx      — Global lang + theme state, t() helper
  hooks/
    useTimer.js         — Stale-closure-safe countdown timer
    useSound.js         — playSFX() always-on SFX helper
  components/
    Card.jsx            — Single card with 3-D CSS flip
    FeedbackModal.jsx   — Match / no-match overlay (auto-dismisses after 1 s)
    MuteButton.jsx      — Background music toggle
  screens/
    StartScreen.jsx     — Landing: slide-in logo, lang & theme toggles
    GameScreen.jsx      — Game board, timer, score, exit button
    ResultScreen.jsx    — Win / lose end screen with final score
  utils.js              — Deck builder + Fisher–Yates shuffle
  i18n.js               — English & Spanish string tables
  App.jsx               — Screen router
  index.css             — CSS variables, animations, component styles
public/
  *.svg  *.mp3          — Game assets (logo, card faces, sounds)
```

---

## ✨ Features

- **30-second countdown** with danger animation in the last 10 s
- **Score system** — `50 + timeLeft × 5` pts per match, displayed live and on the result screen
- **Background music** toggleable at any time (mute button); SFX always play
- **Ticking sound** fires automatically at 10 s remaining
- **Exit button** in-game returns to main menu at any point
- **Bilingual (EN / ES)** — toggle on the start screen, all UI strings update instantly
- **Dark / Light theme** — full palette swap via CSS variables, toggle on the start screen
- **Responsive grid** — 4-column card layout works on mobile and desktop
- **Keyboard accessible** — cards focusable and flippable via Enter
- **Bounce animation** on buttons — extended hover hitbox prevents the flicker bug
