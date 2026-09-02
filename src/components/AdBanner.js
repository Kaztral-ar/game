import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AdsConsent, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from '../utils/adConfig';

export default function AdBanner() {
  const [canRequestAds, setCanRequestAds] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkConsent = async () => {
      try {
        const info = await AdsConsent.getConsentInfo();
        if (mounted) setCanRequestAds(info.canRequestAds === true);
      } catch (error) {
        console.warn('[AdBanner] consent check failed', error);
      }
    };

    checkConsent();
    return () => {
      mounted = false;
    };
  }, []);

  if (!canRequestAds) return null;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNIT_IDS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => console.log('[AdBanner] loaded')}
        onAdFailedToLoad={err => console.warn('[AdBanner] failed to load', err)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
