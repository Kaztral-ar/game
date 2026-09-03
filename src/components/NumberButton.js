import React, { useRef, useEffect, memo } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const TROLL_MESSAGES = [
  'Nice try! 😏',
  'Wrong one! 😂',
  'Almost! 👀',
  'Gotcha! 😈',
  'Nope! 🤭',
  'Try again! 🎯',
  'Too slow! 😎',
  'Baited! 🪤',
  'Not this one! 😜',
  'You fell for it! 🤣',
];

const FAKE_CORRECT_MESSAGES = [
  'CORRECT! 🎉',
  'PERFECT! ✨',
  'GREAT! 🔥',
  'NICE! 😎',
  'YES! 🏆',
];

function NumberButton({ value, x, y, size, status, decoy, onPress, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const messageOpacity = useRef(new Animated.Value(0)).current;
  const messageScale = useRef(new Animated.Value(0.7)).current;
  const [trollMessage, setTrollMessage] = React.useState('');
  const [fakeCorrect, setFakeCorrect] = React.useState('');

  useEffect(() => {
    if (status === 'correct') {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1.25, friction: 4, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 220, delay: 60, useNativeDriver: true }),
      ]).start();
    } else if (status === 'wrong') {
      const troll = TROLL_MESSAGES[Math.floor(Math.random() * TROLL_MESSAGES.length)];
      const fake = FAKE_CORRECT_MESSAGES[Math.floor(Math.random() * FAKE_CORRECT_MESSAGES.length)];
      setTrollMessage(troll);
      setFakeCorrect(fake);
      shake.setValue(0);
      messageOpacity.setValue(0);
      messageScale.setValue(0.7);

      Animated.sequence([
        Animated.parallel([
          Animated.sequence([1, -1, 1, 0].map((v, i) => Animated.timing(shake, { toValue: v, duration: 45, useNativeDriver: true }))),
          Animated.sequence([
            Animated.delay(30),
            Animated.parallel([
              Animated.timing(messageOpacity, { toValue: 1, duration: 120, useNativeDriver: true }),
              Animated.spring(messageScale, { toValue: 1, friction: 5, useNativeDriver: true }),
            ]),
            Animated.delay(650),
            Animated.timing(messageOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
          ]),
        ]),
      ]).start();
    }
  }, [status]);

  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });
  const backgroundColor = status === 'correct' ? colors.buttonTapped : status === 'wrong' ? colors.danger : decoy ? colors.primary : colors.buttonIdle;
  const borderWidth = decoy ? 3 : 0;

  return (
    <Animated.View pointerEvents={status === 'correct' ? 'none' : 'auto'} style={[styles.wrapper, { left: x, top: y, width: size, height: size, borderRadius: size / 2, transform: [{ scale }, { translateX }], opacity }, decoy && styles.decoyWrapper]}>
      <Pressable onPress={() => onPress(value)} disabled={disabled || status === 'correct'} style={[styles.pressable, { backgroundColor, borderRadius: size / 2, borderWidth }]} hitSlop={6}>
        <Text style={[styles.label, { fontSize: Math.max(size * 0.36, 16) }]}>{value}</Text>
      </Pressable>
      {status === 'wrong' && (
        <Animated.View pointerEvents="none" style={[styles.messageContainer, { opacity: messageOpacity, transform: [{ scale: messageScale }] }]}>
          <Text style={styles.fakeCorrect}>{fakeCorrect}</Text>
          <Text style={styles.troll}>{trollMessage}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'absolute' },
  decoyWrapper: { shadowColor: '#fff', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 8, elevation: 8 },
  pressable: { flex: 1, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 4, borderColor: '#fff' },
  label: { color: colors.textPrimary, fontWeight: '700' },
  messageContainer: { position: 'absolute', zIndex: 20, left: -70, right: -70, top: -52, alignItems: 'center', justifyContent: 'center' },
  fakeCorrect: { color: '#35e06f', fontSize: 18, fontWeight: '900', textAlign: 'center', textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  troll: { color: '#fff', fontSize: 13, fontWeight: '800', marginTop: 2, textAlign: 'center', textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
});

export default memo(NumberButton);
