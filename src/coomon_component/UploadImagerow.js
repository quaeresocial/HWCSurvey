import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import {getWidth} from '../common/common';
import {font_style} from '../common/MyStyles';

const UploadImageRow = props => {
  return (
    <View
      style={[{width: width - 40, alignSelf: 'center'}, props.container_style]}
    >
      {!!props.title && (
        <Text
          style={[font_style.text_14_700, {marginTop: 8, color:Colors.black}]}
          numberOfLines={1}
        >
          {props.title}
        </Text>
      )}
      <TouchableOpacity style={[styles.container, {marginTop: 10}, props?.uploadStyle]} {...props} onBlur={props?.onBlur} >
        {!!props.image ? (
          <View>
            <Image
              source={{uri: props.image}}
              
              style={[{
                width: width-70,
                height: '100%',
                borderRadius: 20,
                alignSelf:"center",
                resizeMode: 'stretch',
              },props?.uploadStyle]}
            />

            {props.isDelete ? (
              <View></View>
            ) : (
              <TouchableOpacity
                style={[{
                  width: getWidth(22),
                  height: getWidth(22),
                  backgroundColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: getWidth(12),            
                  borderWidth: 2,
                  borderColor: Colors.btncolor,
                  position: 'absolute',
                  right: -5,
                  top: -10,
                }, props?.deleteIconStyle]}
                onPress={props.onDelete}
              >
                <Image
                  source={ImageAssets.cross}
                  resizeMode={'center'}
                  style={{width: getWidth(12), height: getWidth(12), tintColor:Colors.btncolor}}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View
            style={[{
              backgroundColor: Colors.white,
              borderColor: Colors.black,
              borderStyle:"dashed",
              borderWidth: 0.5,
              width: width-70,
              alignSelf:"center",
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
            }, props?.styleImage]}
          >
            <View
              style={{
                backgroundColor: Colors.transparent_lightblack_bg,
                width: width - 40,
                height: '100%',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={props?.iconcamera ? props?.iconcamera : ImageAssets.upload}
                style={{width: 24, height: 26, }}
                resizeMode="contain"
              />
              <Text style={[font_style.text_14_400, {color: Colors.black, textAlign:"center", width:width/1.5}]}>
                {props.text}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    
    borderWidth: 0.1,
    borderColor: 'red',
    width: width - 40,
    height: height / 6,
    marginTop: 20,
    marginBottom: 10,
  },
});
export default UploadImageRow;
