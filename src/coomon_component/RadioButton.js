import React, { useState } from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import ImageAssets from '../common/ImageAssets';
import Colors from '../common/Colors';
import { font_style } from '../common/MyStyles';

const MyRadioButton = (props) => {
  // const [checked, setChecked] = useState(props.isChecked)
  return(
    <TouchableOpacity style={{ flexDirection: 'row', padding:10, alignItems: 'center', }}
          onPress={props.onPress}>           
          <Image
            style={{ width: 22, height: 22,tintColor:Colors.primaryColor,resizeMode:'contain' }}
            source={props.isChecked ? ImageAssets.fill : ImageAssets.empty} />
          <Text style={[font_style.text_14_500, { color: Colors.black, marginLeft: 10 }, props.textStyle]}>
            {props.text}
          </Text>
    </TouchableOpacity>      
  )
}
  
  export default MyRadioButton;
  