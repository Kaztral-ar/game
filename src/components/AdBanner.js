import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from '../utils/adConfig';

export default function AdBanner() {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_IDS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: false }}
        onAdLoaded={() => console.log('[AdBanner] loaded')}
        onAdFailedToLoad={error => console.warn('[AdBanner] failed to load', error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
