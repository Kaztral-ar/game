import { useEffect, useRef, useState, useCallback } from 'react';
import { AdsConsent, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from './adConfig';

export function useInterstitialAd() {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const loadAd = useCallback(() => {
    let cleanup;
    AdsConsent.getConsentInfo().then(info => {
      if (!info.canRequestAds) return;

      const ad = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial, {
        requestNonPersonalizedAdsOnly: false,
      });
      adRef.current = ad;
      setLoaded(false);

      const a = ad.addAdEventListener(AdEventType.LOADED, () => setLoaded(true));
      const b = ad.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded(false);
        loadAd();
      });
      const c = ad.addAdEventListener(AdEventType.ERROR, err => {
        console.warn('[Interstitial] error', err);
        setLoaded(false);
      });

      cleanup = () => { a(); b(); c(); };
      ad.load();
    }).catch(() => setLoaded(false));

    return () => cleanup?.();
  }, []);

  useEffect(() => loadAd(), [loadAd]);

  const showAd = useCallback(() => {
    if (loaded && adRef.current) {
      adRef.current.show();
      return true;
    }
    return false;
  }, [loaded]);

  return { showAd, isLoaded: loaded };
}
