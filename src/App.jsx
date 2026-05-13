import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import StartScreen  from './screens/StartScreen';
import GameScreen   from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [finalScore, setFinalScore] = useState(0);

  return (
    <AppProvider>
      {screen === 'start' && (
        <StartScreen onStart={() => setScreen('game')} />
      )}
      {screen === 'game' && (
        <GameScreen
          key={Date.now()}
          onWin={(score) => { setFinalScore(score); setScreen('win'); }}
          onLose={(score) => { setFinalScore(score); setScreen('lose'); }}
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
