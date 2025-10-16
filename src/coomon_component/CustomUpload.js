import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Colors from '../common/Colors';
import {font_style} from '../common/MyStyles';
import ImageAssets from '../common/ImageAssets';

const CustomUpload = props => {
  return (
    <View style={{marginVertical: 15, width:width-32}}>
      {props.image == '' && (
        <Pressable
          onPress={props.onPress}
          style={{
            height: height * 0.15,
            width: '100%',
            backgroundColor: Colors.white,
            borderWidth: 1.5,
            borderColor: Colors.softGray,
            borderStyle: 'dashed',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              font_style.text_14_600,
              {color: Colors.softGray, textAlign: 'center', width: '90%'},
            ]}>
            {props.title}
            <Text
              style={[
                font_style.text_14_600,
                {color: Colors.red, textAlign: 'center', width: '90%'},
              ]}>
              {props.required}
            </Text>
          </Text>
          <Image
            source={props.icon}
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </Pressable>
      )}
      {props.image !== '' && (
        <Pressable
          onPress={props.onPress}
          style={{
            height: height * 0.24,
            width: '100%',
            borderWidth: 1.5,
            borderColor: Colors.softGray,
            borderStyle: 'dashed',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            imageStyle={{resizeMode: 'contain'}}
            source={{uri: props.image}}
            style={{height: '95%', width: '95%', borderRadius: 5}}>
            <View
              style={{
                height: '25%',
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={props.Clear}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 100 / 2,
                }}>
                <Image
                  source={ImageAssets.exit}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Pressable>
      )}
    </View>
  );
};
export default CustomUpload;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({});
