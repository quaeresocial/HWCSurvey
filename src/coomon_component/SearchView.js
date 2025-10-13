import React, {useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import {font_style, search_bg} from '../common/MyStyles';
import {input_edittext_Icon} from './../common/MyStyles';

const SearchView = ({onChange, placeholder}) => {
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: Colors.bgColor,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:10
      }}
    >
      <View style={[search_bg.search_]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Image
            style={[
              input_edittext_Icon.edit_icon,
              {height: 22, width: 22,resizeMode:'contain',marginStart: 15 },
            ]}
            source={ImageAssets.search}
          />
          <TextInput
            onChangeText={text => {
              setValue(text);
              onChange(text);
            }}
            placeholder={placeholder ? placeholder : 'Search Here...'}
            placeholderTextColor={Colors.primaryColor}
            style={
              ([font_style.text_16_500],
              {flex: 1, color: Colors.black, marginStart: 5})
            }
          />
        </View>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
export default SearchView;
