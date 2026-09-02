import mobileAds, { AdsConsent } from 'react-native-google-mobile-ads';

export async function initializeAdsWithConsent() {
  try {
    await AdsConsent.requestInfoUpdate();
    const consentInfo = await AdsConsent.loadAndShowConsentFormIfRequired();

    if (consentInfo.canRequestAds) {
      await mobileAds().initialize();
      return true;
    }

    return false;
  } catch (error) {
    console.warn('[AdMob] consent flow failed', error);

    try {
      const consentInfo = await AdsConsent.getConsentInfo();
      if (consentInfo.canRequestAds) {
        await mobileAds().initialize();
        return true;
      }
    } catch (fallbackError) {
      console.warn('[AdMob] consent fallback failed', fallbackError);
    }

    return false;
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
