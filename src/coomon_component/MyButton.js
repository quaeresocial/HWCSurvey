import React from 'react'
import {Text, TouchableOpacity, Dimensions} from 'react-native'
import Colors from '../common/Colors'
import {font_style} from '../common/MyStyles'

const {width} = Dimensions.get('window')
const MyButton = props => (
  <TouchableOpacity
    activeOpacity={0.8}
    {...props}
    style={[
      {
        width: width - 70,
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
        elevation: 1,
        padding: 14,
      },
      props.btnstyle,
    ]}>
    <Text
      style={[
        font_style.text_16_500,
        {textAlign: 'center', color: Colors.white},
        props.textStyle,
      ]}>
      {props.btnText}
    </Text>
  </TouchableOpacity>
)

export default MyButton
