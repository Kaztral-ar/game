import AsyncStorage from '@react-native-async-storage/async-storage';
const KEYS={BEST_SCORE:'@number_rush/best_score',BEST_LEVEL:'@number_rush/best_level',BEST_TIME:'@number_rush/best_level_time_ms',SETTINGS:'@number_rush/settings'};
const DEFAULT_SETTINGS={soundEnabled:true,hapticsEnabled:true};
async function safeGet(key,fallback){try{const raw=await AsyncStorage.getItem(key);return raw!=null?JSON.parse(raw):fallback;}catch(err){console.warn(`[storage] failed to read ${key}:`,err);return fallback;}}
async function safeSet(key,value){try{await AsyncStorage.setItem(key,JSON.stringify(value));return true;}catch(err){console.warn(`[storage] failed to write ${key}:`,err);return false;}}
export function getBestScore(){return safeGet(KEYS.BEST_SCORE,0)}
export function getBestLevel(){return safeGet(KEYS.BEST_LEVEL,1)}
export function getBestLevelTimeMs(){return safeGet(KEYS.BEST_TIME,null)}
export async function saveRunResult({score,level,bestLevelTimeMs}){const [prevScore,prevLevel,prevTime]=await Promise.all([getBestScore(),getBestLevel(),getBestLevelTimeMs()]);const result={isNewBestScore:false,isNewBestLevel:false};if(score>prevScore){await safeSet(KEYS.BEST_SCORE,score);result.isNewBestScore=true;}if(level>prevLevel){await safeSet(KEYS.BEST_LEVEL,level);result.isNewBestLevel=true;}if(bestLevelTimeMs!=null&&(prevTime==null||bestLevelTimeMs<prevTime))await safeSet(KEYS.BEST_TIME,bestLevelTimeMs);return result;}
export function getSettings(){return safeGet(KEYS.SETTINGS,DEFAULT_SETTINGS)}
export function saveSettings(settings){return safeSet(KEYS.SETTINGS,settings)}
