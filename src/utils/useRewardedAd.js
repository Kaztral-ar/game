import { useEffect, useRef, useState, useCallback } from 'react';
import { AdsConsent, RewardedAd, RewardedAdEventType, AdEventType } from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from './adConfig';

export function useRewardedAd() {
  const adRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const loadAd = useCallback(() => {
    let cleanup;
    AdsConsent.getConsentInfo().then(info => {
      if (!info.canRequestAds) return;

      const ad = RewardedAd.createForAdRequest(AD_UNIT_IDS.rewarded, {
        requestNonPersonalizedAdsOnly: false,
      });
      adRef.current = ad;
      setLoaded(false);

      const a = ad.addAdEventListener(RewardedAdEventType.LOADED, () => setLoaded(true));
      const b = ad.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded(false);
        loadAd();
      });
      const c = ad.addAdEventListener(AdEventType.ERROR, err => {
        console.warn('[Rewarded] error', err);
        setLoaded(false);
      });

      cleanup = () => { a(); b(); c(); };
      ad.load();
    }).catch(() => setLoaded(false));

    return () => cleanup?.();
  }, []);

  useEffect(() => loadAd(), [loadAd]);

  const showAd = useCallback((onEarned) => {
    if (!loaded || !adRef.current) return false;
    const unsub = adRef.current.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      onEarned();
      unsub();
    });
    adRef.current.show();
    return true;
  }, [loaded]);

  return { showAd, isLoaded: loaded };
}
