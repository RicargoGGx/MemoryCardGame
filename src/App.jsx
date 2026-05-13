import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import StartScreen from './screens/StartScreen';
import GameScreen  from './screens/GameScreen';

export default function App() {
  const [screen, setScreen] = useState('start');

  return (
    <AppProvider>
      {screen === 'start' && (
        <StartScreen onStart={() => setScreen('game')} />
      )}
      {screen === 'game' && (
        <GameScreen
          onWin={() => setScreen('start')}
          onLose={() => setScreen('start')}
          onMainMenu={() => setScreen('start')}
        />
      )}
    </AppProvider>
  );
}
