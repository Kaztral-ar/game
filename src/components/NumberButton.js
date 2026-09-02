import React, { useRef, useEffect, memo } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
function NumberButton({ value, x, y, size, status, onPress, disabled }) {
  const scale = useRef(new Animated.Value(1)).current; const opacity = useRef(new Animated.Value(1)).current; const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (status === 'correct') Animated.parallel([Animated.spring(scale,{toValue:1.25,friction:4,useNativeDriver:true}),Animated.timing(opacity,{toValue:0,duration:220,delay:60,useNativeDriver:true})]).start(); else if (status === 'wrong') { shake.setValue(0); Animated.sequence([1,-1,1,0].map((v,i)=>Animated.timing(shake,{toValue:v,duration:45,useNativeDriver:true}))).start(); } }, [status]);
  const translateX = shake.interpolate({inputRange:[-1,1],outputRange:[-6,6]});
  const backgroundColor = status === 'correct' ? colors.buttonTapped : status === 'wrong' ? colors.danger : colors.buttonIdle;
  return <Animated.View pointerEvents={status==='correct'?'none':'auto'} style={[styles.wrapper,{left:x,top:y,width:size,height:size,borderRadius:size/2,transform:[{scale},{translateX}],opacity}]}><Pressable onPress={()=>onPress(value)} disabled={disabled||status==='correct'} style={[styles.pressable,{backgroundColor,borderRadius:size/2}]} hitSlop={6}><Text style={[styles.label,{fontSize:Math.max(size*0.36,16)}]}>{value}</Text></Pressable></Animated.View>;
}
const styles=StyleSheet.create({wrapper:{position:'absolute'},pressable:{flex:1,alignItems:'center',justifyContent:'center',shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.3,shadowRadius:3,elevation:4},label:{color:colors.textPrimary,fontWeight:'700'}});
export default memo(NumberButton);
