import React from 'react';
import {
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import {font_style} from '../common/MyStyles';


const NoData = props => {
  return (
    <SafeAreaView style={{height:600,alignItems:'center',justifyContent:'center'}}>
      <Text 
        style={[
          font_style.text_14_600,
          {
            color: Colors.primaryColor,
            alignSelf: 'center',
            marginBottom:5
          },
          props.textstyle,
        ]}>
        {'No data found ...'}
      </Text>
        <Image
          source={ImageAssets.nodata}
          resizeMode="contain"
          style={[
            {
              width: 90,
              height: 90,
              tintColor:Colors.primaryColor
            },
            props.iconstyle,
          ]}
        />
    </SafeAreaView>
  );
};
export default NoData;
