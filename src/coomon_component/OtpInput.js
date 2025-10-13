import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Colors from '../common/Colors';
import { font_style } from '../common/MyStyles';
export const {width, height} = Dimensions.get('window');
function OtpInput(props) {
  return (
    <View style={styles.container}>
      <SmoothPinCodeInput
        cellStyle={{
          borderWidth: 1,
          borderColor: Colors.primaryColor,
          borderRadius: 8,
        }}
        cellStyleFocused={{
          borderColor: Colors.primaryColor,

        }}
        autoFocus={props.autoFocus}
        cellSpacing={5}
        codeLength={props.codeLength}
        cellSize={40}
        maskDelay={500}
        password={true}
        textStyle={[font_style.text_16_600, { color: Colors.black, }]}
        onTextChange={props.onTextChange}
        value={props.value}
        onFulfill={props.onFulfill}
        keyboardType="number-pad"
      />
    </View>
  );
}
OtpInput.propTypes = {};
OtpInput.defaultProps = {};
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default OtpInput;