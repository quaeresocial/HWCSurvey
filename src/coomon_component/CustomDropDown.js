import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from 'react-native';
import Colors from '../common/Colors';
import {font_style} from '../common/MyStyles';

const CustomDropDown = props => {
  return (
    <View>
      <Pressable
        onPress={props?.onPress}
        style={[
          {
            width: width - 30,
            backgroundColor: Colors.white,
            paddingVertical: 15,
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
              font_style.text_14_600,
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
            {props.inputTitle}
            <Text
              style={[
                font_style.text_14_600,
                {color: Colors.red},
                props.textstyle,
              ]}>
              {props.required}
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
          {props.value && (
            <Text
              numberOfLines={2}
              style={[
                font_style.text_14_500,
                {
                  color: Colors.darkGray,
                  left: 10,
                  paddingHorizontal: 8,
                  width: '90%',
                },
                props.textstyle,
              ]}>
              {props.value}
            </Text>
          )}
          {props.righticon && (
            <View onPress={props?.onClickIcon}>
              <Image
                source={props.righticon}
                resizeMode="contain"
                style={{
                  marginRight: 15,
                  height: 18,
                  width: 18,
                }}></Image>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};
export default CustomDropDown;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({});
