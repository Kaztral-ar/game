import mobileAds, { AdsConsent } from 'react-native-google-mobile-ads';

let adsInitialized = false;
let adsInitializationPromise = null;

export async function initializeAdsWithConsent() {
  if (adsInitialized) return true;
  if (adsInitializationPromise) return adsInitializationPromise;

  adsInitializationPromise = (async () => {
    try {
      await AdsConsent.requestInfoUpdate();
      let consentInfo = await AdsConsent.getConsentInfo();

      if (consentInfo.isConsentFormAvailable && !consentInfo.canRequestAds) {
        await AdsConsent.loadAndShowConsentFormIfRequired();
        consentInfo = await AdsConsent.getConsentInfo();
      }

      if (!consentInfo.canRequestAds) {
        console.warn('[AdMob] Ads cannot be requested yet:', consentInfo);
        return false;
      }

      await mobileAds().initialize();
      adsInitialized = true;
      console.log('[AdMob] initialized successfully');
      return true;
    } catch (error) {
      console.warn('[AdMob] initialization failed', error);
      return false;
    } finally {
      adsInitializationPromise = null;
    }
  })();

  return adsInitializationPromise;
}

export async function getPrivacyOptionsRequired() {
  try {
    await AdsConsent.requestInfoUpdate();
    const info = await AdsConsent.getConsentInfo();
    return info.privacyOptionsRequirementStatus === 'REQUIRED';
  } catch (error) {
    console.warn('[AdMob] privacy options check failed', error);
    return false;
  }
}

export async function showPrivacyOptions() {
  try {
    await AdsConsent.showPrivacyOptionsForm();
    return true;
  } catch (error) {
    console.warn('[AdMob] privacy options failed', error);
    return false;
  }
}
