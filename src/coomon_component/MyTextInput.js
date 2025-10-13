import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Colors from '../common/Colors';
import {font_style} from '../common/MyStyles';

const MyTextInput = props => {
  return (
    <SafeAreaView style={props.viewStyle}>
      <View
        style={[
          {
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
          },
        ]}
      >
        {props.inputTitle && (
          <View style={{width:'85%',marginTop:8}}>
          <Text
            style={[
              font_style.text_13_600,
              {color: Colors.black, marginStart: -6},
              props.textstyle,
            ]}
          >
            {props.inputTitle}
          </Text>
          </View>
        )}
      </View>
      <Pressable
        onPress={props?.Nav}
        style={[styles.sectionStyle, props.inputStyle]}
      >
        {props?.source && (
          <Image source={props?.source} style={styles.imageStyle} />
        )}
        <TextInput
          value={props.value}
          numberOfLines={props.numberOfLines}
          returnKeyType={props.returnKeyType ? props.returnKeyType : 'next'}
          multiline={props.multiline}
          maxLength={props?.maxLength}
          placeholderTextColor={
            props.placeholderTextColor
              ? props.placeholderTextColor
              : Colors.softGray
          }
          style={[
            {
              flex: 1,
              marginStart: 15,
              color: Colors.black,
              fontSize: 13,
              fontFamily:'Montserrat-SemiBold'
            },
            props.textcolor,
            ,
            props?.textInputStyle,
          ]}
          editable={props.editable}
          placeholder={props.placeholder}
          keyboardType={props?.keyboardType ? props?.keyboardType : 'default'}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            props?.onValue(text);
          }}
          {...props}
        />
        {props.linktext && (
          <TouchableOpacity onPress={props.onPress}>
            <Text
              style={[
                font_style.text_12_600,
                {color: Colors.theme_color, marginRight: 12},
              ]}
            >
              {props.linktext}
            </Text>
          </TouchableOpacity>
        )}
        {props.righticon && (
          <TouchableOpacity onPress={props?.onClickIcon}>
            <Image
              source={props.righticon}
              resizeMode="contain"
              style={{
                marginRight: 8,
                height: 20,
                width: 26,
                tintColor: Colors.grey,
              }}
            ></Image>
          </TouchableOpacity>
        )}
      </Pressable>
      {props?.hintText && (
        <Text
          style={[
            font_style.text_12_500,
            {color: Colors.red, marginTop: 2, marginStart: 8},
          ]}
        >{`${props?.hintText}`}</Text>
      )}
    </SafeAreaView>
  );
};
export default MyTextInput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionStyle: {
    marginTop:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderWidth:1.5,
    borderColor: Colors.softGray,
    height: 55,
    elevation: 1,
    borderRadius: 10,
  },
  imageStyle: {
    tintColor: Colors.darkGray,
    height: 25,
    width: 25,
    resizeMode: 'center',
  },
});
