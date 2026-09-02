import React, { useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import AppNavigator from './src/navigation/AppNavigator';
import { GameProvider } from './src/context/GameContext';

export default function App() {
  useEffect(() => {
    mobileAds().initialize().catch((error) => {
      console.warn('[AdMob] initialization failed', error);
    });
  }, []);

  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
}
