# Number Rush 🎯

**Number Rush** is a fast-paced number-order game built with **React Native** and **Expo**. Tap the numbers in the correct sequence as quickly as possible and try to beat your best score and level.

## 🎮 Game Features

- 🔢 **Number-order gameplay** — tap numbers in the correct sequence.
- 📈 **Progressive levels** — advance through increasingly challenging rounds.
- 🏆 **Best Score & Best Level** — your personal records are saved locally.
- ▶️ **Quick Play** — start a new run directly from the home screen.
- ⚙️ **Settings** — access app settings from the home screen.
- 📢 **Google AdMob** — production banner, interstitial, and rewarded ads.
- 🔐 **Consent handling** — Google Mobile Ads consent flow is integrated before ad initialization where required.
- 📱 **Android APK support** — the EAS production profile is configured to generate an APK.

## 🕹️ How to Play

1. Open **Number Rush**.
2. Tap **PLAY**.
3. Find and tap the numbers in order: **1 → 2 → 3 → …**.
4. Complete the round as quickly as possible.
5. Continue through levels and try to improve your score.

## 📢 Advertising

The app uses Google Mobile Ads with separate production ad units for:

- Banner ads
- Interstitial ads
- Rewarded ads

The banner is displayed at the **top of the home screen**.

## 🛠️ Tech Stack

- React Native
- Expo SDK 51
- React Navigation
- `expo-linear-gradient`
- `react-native-google-mobile-ads`
- Async/local storage utilities
- Expo Application Services (EAS)

## 📦 Project Structure

```text
.
├── App.js
├── app.json
├── eas.json
├── package.json
└── src/
    ├── components/    # Reusable UI components such as ads
    ├── context/       # Game state and providers
    ├── navigation/    # App navigation
    ├── screens/       # Home, game, settings, and other screens
    ├── theme/         # Colors and visual theme
    └── utils/         # Ads, consent, storage, and game utilities
```

## 🚀 Development

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

## 📱 Build Android APK

The repository is configured for an Android APK build with EAS:

```bash
eas build -p android --profile production
```

For an internal preview APK:

```bash
eas build -p android --profile preview
```

## 🔐 Ad & Privacy Notes

Production advertising depends on the Google AdMob account, app status, ad-unit serving status, consent requirements, network availability, and Google's ad-serving systems. Correct application code and ad-unit IDs do not guarantee that a live ad will be returned for every request.

## 📄 License

No license has been specified for this repository yet.
