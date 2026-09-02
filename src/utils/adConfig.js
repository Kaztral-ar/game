import { TestIds } from 'react-native-google-mobile-ads';

// Production AdMob configuration.
const PRODUCTION_IDS = {
  banner: 'ca-app-pub-6906509746436244/2220867988',
  interstitial: 'ca-app-pub-6906509746436244/9574895195',
  rewarded: 'ca-app-pub-6906509746436244/6948731857',
};

// Show an interstitial after every 3 completed levels.
export const INTERSTITIAL_LEVEL_INTERVAL = 3;

export const AD_UNIT_IDS = __DEV__
  ? {
      banner: TestIds.BANNER,
      interstitial: TestIds.INTERSTITIAL,
      rewarded: TestIds.REWARDED,
    }
  : PRODUCTION_IDS;

export { PRODUCTION_IDS };
