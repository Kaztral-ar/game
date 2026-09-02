import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { useGame } from '../context/GameContext';
import { useInterstitialAd } from '../utils/useInterstitialAd';
import { INTERSTITIAL_LEVEL_INTERVAL } from '../utils/adConfig';

function formatMs(ms){if(ms==null)return '—';return `${(ms/1000).toFixed(2)}s`;}
export default function LevelCompleteScreen({navigation,route}){
  const {timeMs,maxNumber}=route.params; const {level,score,levelsSinceInterstitial,nextLevel,clearInterstitialCounter}=useGame(); const {showAd,isLoaded}=useInterstitialAd();
  const handleNext=()=>{const shouldShow=levelsSinceInterstitial>=INTERSTITIAL_LEVEL_INTERVAL && isLoaded; if(shouldShow){clearInterstitialCounter(); showAd();} nextLevel(); navigation.replace('Game');};
  return <SafeAreaView style={styles.flex}><View style={styles.content}><Text style={styles.badge}>LEVEL {level} COMPLETE</Text><Text style={styles.title}>Nice!</Text><View style={styles.statsBlock}><StatRow label="Time" value={formatMs(timeMs)}/><StatRow label="Numbers Cleared" value={`1 – ${maxNumber}`}/><StatRow label="Total Score" value={String(score)}/></View><Pressable style={styles.nextButton} onPress={handleNext}><Text style={styles.nextButtonText}>NEXT LEVEL →</Text></Pressable></View></SafeAreaView>;
}
function StatRow({label,value}){return <View style={styles.statRow}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>}
const styles=StyleSheet.create({flex:{flex:1,backgroundColor:colors.background},content:{flex:1,alignItems:'center',justifyContent:'center',paddingHorizontal:32},badge:{color:colors.accent,fontSize:13,fontWeight:'700',letterSpacing:2,marginBottom:8},title:{color:colors.textPrimary,fontSize:30,fontWeight:'800',marginBottom:32},statsBlock:{width:'100%',backgroundColor:colors.surface,borderRadius:18,paddingVertical:8,paddingHorizontal:20,marginBottom:40},statRow:{flexDirection:'row',justifyContent:'space-between',paddingVertical:12,borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.buttonIdle},statLabel:{color:colors.textSecondary,fontSize:15},statValue:{color:colors.textPrimary,fontSize:15,fontWeight:'700'},nextButton:{backgroundColor:colors.success,paddingVertical:18,paddingHorizontal:48,borderRadius:32,minWidth:240,alignItems:'center'},nextButtonText:{color:colors.background,fontSize:17,fontWeight:'800',letterSpacing:1}});
