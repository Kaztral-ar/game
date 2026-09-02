import { TestIds } from 'react-native-google-mobile-ads';

const PRODUCTION_IDS = {
  banner: '',
  interstitial: '',
  rewarded: '',
};

export const AD_UNIT_IDS = __DEV__ ? {
  banner: TestIds.BANNER,
  interstitial: TestIds.INTERSTITIAL,
  rewarded: TestIds.REWARDED,
} : {
  banner: PRODUCTION_IDS.banner || TestIds.BANNER,
  interstitial: PRODUCTION_IDS.interstitial || TestIds.INTERSTITIAL,
  rewarded: PRODUCTION_IDS.rewarded || TestIds.REWARDED,
};

export { PRODUCTION_IDS };
