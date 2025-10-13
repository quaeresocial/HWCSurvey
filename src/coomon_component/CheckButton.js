import React, { useState } from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import ImageAssets from '../common/ImageAssets';
import Colors from '../common/Colors';
import { font_style } from '../common/MyStyles';

const CheckButton = (props) => {
  const [checked, setChecked] = useState(props.isChecked)
  console.log(checked)
  return(
          <TouchableOpacity style={{ flexDirection: 'row', padding:12, alignItems: 'center', marginTop:12, }}
          onPress={()=>setChecked(!checked)}>           
              <Image
                style={{ width: 22, height: 22, }}
                source={checked ? ImageAssets.check_selected : ImageAssets.check}
              />
            <Text style={[font_style.text_12_400, { color: Colors.black, marginLeft: 10 }]}>
              {props.text}
            </Text>
          </TouchableOpacity>
  )
}
  
  export default CheckButton;
  