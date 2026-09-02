# Number Rush 🎯

**Number Rush** is a fast-paced number-order game built with **React Native** and **Expo**. Tap the numbers in the correct sequence as quickly as possible and try to beat your best score and level.

## 🎮 Game Features

- 🔢 **Number-order gameplay** — tap numbers in the correct sequence.
- 📈 **Progressive levels** — advance through increasingly challenging rounds.
- 🏆 **Best Score & Best Level** — your personal records are saved locally.
- ▶️ **Quick Play** — start a new run directly from the home screen.
- ⚙️ **Settings** — access app settings from the home screen.
- 🔐 **Consent handling** — Google Mobile Ads consent flow is integrated before ad initialization where required.
- 📱 **Android APK support** — the EAS production profile is configured to generate an APK.

## 🕹️ How to Play

1. Open **Number Rush**.
2. Tap **PLAY**.
3. Find and tap the numbers in order: **1 → 2 → 3 → …**.
4. Complete the round as quickly as possible.
5. Continue through levels and try to improve your score.

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
    ├── components/    # Reusable UI components
    ├── context/       # Game state and providers
    ├── navigation/    # App navigation
    ├── screens/       # Home, game, settings, and other screens
    ├── theme/         # Colors and visual theme
    └── utils/          # Consent, storage, and game utilities
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

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for the full license text.
