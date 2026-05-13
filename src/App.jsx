import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import StartScreen  from './screens/StartScreen';
import GameScreen   from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [finalScore, setFinalScore] = useState(0);
  const [lastScore,  setLastScore]  = useState(() => Number(localStorage.getItem('lastScore') ?? 0));
  const [bestScore,  setBestScore]  = useState(() => Number(localStorage.getItem('bestScore') ?? 0));

  const handleGameEnd = (score) => {
    setFinalScore(score);
    setLastScore(score);
    localStorage.setItem('lastScore', score);
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('bestScore', score);
    }
  };

  return (
    <AppProvider>
      {screen === 'start' && (
        <StartScreen
          onStart={() => setScreen('game')}
          bestScore={bestScore}
          lastScore={lastScore}
        />
      )}
      {screen === 'game' && (
        <GameScreen
          key={Date.now()}
          onWin={(score) => { handleGameEnd(score); setScreen('win'); }}
          onLose={(score) => { handleGameEnd(score); setScreen('lose'); }}
          onMainMenu={() => setScreen('start')}
        />
      )}
      {(screen === 'win' || screen === 'lose') && (
        <ResultScreen
          won={screen === 'win'}
          score={finalScore}
          onPlayAgain={() => setScreen('game')}
          onMainMenu={() => setScreen('start')}
        />
      )}
    </AppProvider>
  );
}
