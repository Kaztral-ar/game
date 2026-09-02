import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
function formatTime(ms) { const totalSeconds = Math.max(0, ms / 1000); const minutes = Math.floor(totalSeconds / 60); const seconds = (totalSeconds % 60).toFixed(1); return minutes > 0 ? `${minutes}:${seconds.padStart(4, '0')}` : `${seconds}s`; }
export default function Timer({ elapsedMs, remainingMs }) { const isLow = remainingMs != null && remainingMs <= 5000; return <Text style={[styles.text, isLow && styles.low]}>{remainingMs != null ? formatTime(remainingMs) : formatTime(elapsedMs)}</Text>; }
const styles = StyleSheet.create({ text: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, fontVariant: ['tabular-nums'] }, low: { color: colors.danger } });
