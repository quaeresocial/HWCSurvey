import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TextInput,
} from 'react-native'
import Colors from '../common/Colors'
import {font_style} from '../common/MyStyles'

const CustomInput = props => {
  return (
    <View>
      <Pressable
        onPress={props?.onPress}
        style={[
          {
            width: width - 30,
            backgroundColor: Colors.white,
            paddingVertical: 2,
            marginVertical: 11,
            borderWidth: 1.5,
            borderRadius: 10,
            borderColor: Colors.softGray,
          },
          props.container_style,
        ]}>
        {props.inputTitle && (
          <Text
            numberOfLines={1}
            style={[
              font_style.text_13_600,
              {
                color: Colors.black,
                backgroundColor: Colors.white,
                position: 'absolute',
                left: 15,
                top: -10,
                paddingHorizontal: 5,
              },
              props.textstyle,
            ]}>
            {props.inputTitle}{' '}
            <Text
              style={[
                font_style.text_13_600,
                {
                  color: Colors.red,
                },
                props.textstyle,
              ]}>
              {'*'}
            </Text>
          </Text>
        )}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            value={props.value}
            numberOfLines={props.numberOfLines}
            returnKeyType={props.returnKeyType ? props.returnKeyType : 'next'}
            multiline={props.multiline}
            maxLength={props?.maxLength}
            placeholderTextColor={
              props.placeholderTextColor
                ? props.placeholderTextColor
                : Colors.grey
            }
            style={[
              font_style.text_14_600,
              {
                flex: 1,
                marginStart: 15,
                color: Colors.darkGray,
              },
              props.textcolor,
              ,
              props?.textInputStyle,
            ]}
            editable={props.editable}
            placeholder={props.placeholder}
            keyboardType={props?.keyboardType ? props?.keyboardType : 'default'}
            underlineColorAndroid='transparent'
            onChangeText={text => {
              props?.onValue(text)
            }}
            {...props}
          />
        </View>
      </Pressable>
    </View>
  )
}
export default CustomInput
const {width, height} = Dimensions.get('window')
