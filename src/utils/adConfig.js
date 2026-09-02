import { TestIds } from 'react-native-google-mobile-ads';

// Production AdMob configuration.
const PRODUCTION_IDS = {
  banner: 'ca-app-pub-6906509746436244/2220867988',
  interstitial: 'ca-app-pub-6906509746436244/9574895195',
  rewarded: '',
};

export const AD_UNIT_IDS = __DEV__
  ? {
      banner: TestIds.BANNER,
      interstitial: TestIds.INTERSTITIAL,
      rewarded: TestIds.REWARDED,
    }
  : {
      banner: PRODUCTION_IDS.banner || TestIds.BANNER,
      interstitial: PRODUCTION_IDS.interstitial || TestIds.INTERSTITIAL,
      rewarded: PRODUCTION_IDS.rewarded || TestIds.REWARDED,
    };

export { PRODUCTION_IDS };
