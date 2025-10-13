import React, {useRef,useEffect} from 'react';
import {
  Pressable,
  Animated
} from 'react-native';
import Colors from '../common/Colors';

const MyDialog = props => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Pressable
      onPress={props?.onPress}
      style={[
        {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: '#0007',
          zIndex: 10000,
        },
        props,
      ]}>
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderRadius: 8,
            padding: 10,
            borderWidth:1,
            borderColor:Colors.primaryColor
          },
          props.insideStyle,
        ]}>
        {props.children}
      </Animated.View>
    </Pressable>
  );
};


export default MyDialog;
