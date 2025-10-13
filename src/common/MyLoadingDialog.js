import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Colors from './Colors';
import {getWidth} from './common';
import MyFont from './MyFont';

const MyLoadingDialog = props => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#0007',
        zIndex: 10000,
      }}>
      <View
        style={{
          width: getWidth(300),
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
          borderRadius: 10,
        }}>
        <ActivityIndicator size={'large'} color={Colors.primary_color} />
        <Text
          style={{
            color: Colors.primary_color,
            fontSize: 14,
            fontFamily: MyFont.Roboto700,
            marginTop: 15,
          }}>
          {props.loading_msg?props.loading_msg:'Processing...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 20,
  },
});

export default MyLoadingDialog;
