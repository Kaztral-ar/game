import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { getMaxLives, getPointsPerTap, getWrongTapPenalty, getTimeBonusPerSecond } from '../utils/difficulty';

const initialState = { level: 1, score: 0, lives: getMaxLives(), levelsSinceInterstitial: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'RESET_RUN': return { ...initialState };
    case 'CORRECT_TAP': return { ...state, score: state.score + getPointsPerTap(state.level) };
    case 'WRONG_TAP': return { ...state, score: Math.max(0, state.score - getWrongTapPenalty()), lives: Math.max(0, state.lives - 1) };
    case 'LEVEL_COMPLETE': {
      const { remainingSeconds } = action.payload;
      const bonus = remainingSeconds != null ? Math.round(remainingSeconds * getTimeBonusPerSecond(state.level)) : 0;
      return { ...state, score: state.score + bonus, levelsSinceInterstitial: state.levelsSinceInterstitial + 1 };
    }
    case 'NEXT_LEVEL': return { ...state, level: state.level + 1 };
    case 'CLEAR_INTERSTITIAL_COUNTER': return { ...state, levelsSinceInterstitial: 0 };
    case 'CONTINUE_AFTER_AD': return { ...state, lives: getMaxLives() };
    default: return state;
  }
}
const GameContext = createContext(null);
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
}
export function useGame() {
  const ctx = useContext(GameContext); if (!ctx) throw new Error('useGame must be used within GameProvider');
  const { state, dispatch } = ctx;
  const resetRun = useCallback(() => dispatch({ type: 'RESET_RUN' }), []);
  const registerCorrectTap = useCallback(() => dispatch({ type: 'CORRECT_TAP' }), []);
  const registerWrongTap = useCallback(() => dispatch({ type: 'WRONG_TAP' }), []);
  const completeLevel = useCallback((remainingSeconds) => dispatch({ type: 'LEVEL_COMPLETE', payload: { remainingSeconds } }), []);
  const nextLevel = useCallback(() => dispatch({ type: 'NEXT_LEVEL' }), []);
  const clearInterstitialCounter = useCallback(() => dispatch({ type: 'CLEAR_INTERSTITIAL_COUNTER' }), []);
  const continueAfterAd = useCallback(() => dispatch({ type: 'CONTINUE_AFTER_AD' }), []);
  return { ...state, resetRun, registerCorrectTap, registerWrongTap, completeLevel, nextLevel, clearInterstitialCounter, continueAfterAd };
}
