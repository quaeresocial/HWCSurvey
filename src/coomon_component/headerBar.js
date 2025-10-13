import React from 'react';
import {
  Image,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import { font_style } from '../common/MyStyles';

export default HeaderBar = props => {
  return (
    <View style={{height:height*0.080, width: width, flexDirection: "row", justifyContent: "space-between", alignSelf: "center", backgroundColor:Colors.primaryColor }}>
      <TouchableOpacity style={{ height: '100%', width: '15%', justifyContent: 'center',alignItems:'center' }} onPress={() => props.onBack()}>
        <Image source={ImageAssets.left} resizeMode='contain' style={{ width: 25, height: 25, tintColor: Colors.white, }} />
      </TouchableOpacity>
      <View style={{width:'70%',height:'100%',justifyContent:'center'}}>
      <Text style={[font_style.text_14_400, { color: Colors.white }]}>{props?.title}</Text>
      </View>
    <TouchableOpacity style={{ alignSelf: "center", flexDirection: 'row', }} onPress={props.notificationButton}>
        <Image resizeMode='center' source={props?.rightIcon} style={{ height: 28, width: 28, }} />
        {props?.count && <Text style={[font_style.text_10_500, {
            fontSize: 10, textAlignVertical: 'center', width: 20, height: 20, padding: 2,
            textAlign: 'center', color: Colors.white, marginTop: -8, backgroundColor: Colors.red, borderRadius: 100, marginStart: -15
          }]} >{props?.count ? props?.count : ""}</Text>}
      </TouchableOpacity>

    </View>
  );
};

export const { width, height } = Dimensions.get('window');

