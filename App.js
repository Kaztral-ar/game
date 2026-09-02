import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { GameProvider } from './src/context/GameContext';
import { colors } from './src/theme/colors';
import { initializeAdsWithConsent } from './src/utils/consent';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeAdsWithConsent().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
}
