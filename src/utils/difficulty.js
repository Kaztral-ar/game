export const INTERSTITIAL_LEVEL_INTERVAL = 3;
export function getNumberCount(level){ return level<=3?10:level<=6?12:level<=9?15:20; }
export function getButtonSize(level){ return level<=3?72:level<=6?64:level<=9?56:48; }
export function getTimeLimitMs(level){ if(level<5)return null; return Math.max(12000,45000-(level-5)*3000); }
export function getMaxLives(){ return 3; }
export function getPointsPerTap(level){ return 10+Math.min(level-1,20)*2; }
export function getWrongTapPenalty(){ return 5; }
export function getTimeBonusPerSecond(level){ return 2+Math.min(level,10); }
