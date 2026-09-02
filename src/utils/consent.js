import mobileAds, { AdsConsent } from 'react-native-google-mobile-ads';

let adsInitialized = false;

export async function initializeAdsWithConsent() {
  try {
    await AdsConsent.requestInfoUpdate();
    await AdsConsent.loadAndShowConsentFormIfRequired();

    const consentInfo = await AdsConsent.getConsentInfo();

    if (consentInfo.canRequestAds && !adsInitialized) {
      await mobileAds().initialize();
      adsInitialized = true;
      return true;
    }

    return consentInfo.canRequestAds;
  } catch (error) {
    console.warn('[AdMob] consent flow failed', error);

    try {
      const consentInfo = await AdsConsent.getConsentInfo();
      if (consentInfo.canRequestAds && !adsInitialized) {
        await mobileAds().initialize();
        adsInitialized = true;
        return true;
      }
      return consentInfo.canRequestAds;
    } catch (fallbackError) {
      console.warn('[AdMob] consent fallback failed', fallbackError);
      return false;
    }
  }
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
  } catch (error) {
    console.warn('[AdMob] privacy options failed', error);
  }
}
