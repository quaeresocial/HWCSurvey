import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Colors from '../common/Colors';

const MyLoadingFull = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.transparent_black_bg,
      }}>
      <ActivityIndicator size={'large'} color={Colors.primaryColor}  />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 20,
  },
});

export default MyLoadingFull;
