import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import { font_style } from '../common/MyStyles';


export default SearchActionBar = (props) => {
  const isDarkMode = useColorScheme() === 'light';
  const user_other_details = useSelector(state => state.indexReducer.user_other_details)
  return (

    <View style={[styles.container, styles.shadow]}>
      <StatusBar
        translucent={true}
        backgroundColor={`transparent`}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground source={ImageAssets.action_bar}>

        <View style={{
          justifyContent: 'space-between', width: '100%', height: '100%',
          alignItems: 'center', flexDirection: 'row', padding: 12,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: StatusBar.currentHeight }}>
            {props.onBack && <TouchableOpacity
              onPress={props.onBack}
            >
              <Image
                source={props?.leftImage ? props?.leftImage : ImageAssets.leftarrow}
                resizeMode={"center"}
                style={[{ width: 16, height: 12, marginRight: 15 }, { ...props.leftImageStyle }]}
              />
            </TouchableOpacity>}
            <TouchableOpacity onPress={props?.searchPress}>
              <View style={{ borderRadius: 4, backgroundColor: Colors.white, flexDirection: 'row', alignItems: 'center', padding: 10, width: width - 120, height: 36 }}>
                <Image source={ImageAssets.search} style={{ height: 12, width: 12 }} />
                <Text style={[font_style.text_10_500, { marginStart: 12, color: Colors.gray, textAlignVertical: 'center' }]} >{`Search`}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.cartPress} >
              <View style={{ borderRadius: 4, backgroundColor: Colors.white, flexDirection: 'row', padding: 8, alignItems: 'center', height: 36, marginStart: 16 }}>
                <Image resizeMode='center' source={props?.rightImage ? props?.rightImage : ImageAssets.cart} style={{ height: 12, width: 12, tintColor: Colors.blue_text }} />
                <Text style={[font_style.text_10_500, { fontSize: 8, textAlignVertical: 'center', height: 12, width: 12, textAlign: 'center', color: Colors.white, marginTop: -10, backgroundColor: Colors.red_text, borderRadius: 100, marginStart: -4 }]} >{`${user_other_details?.cartcount}`}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {props.renderLeftHeader && props.renderLeftHeader()}
        </View>
      </ImageBackground>
    </View>
  );
}

export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    width, height: StatusBar.currentHeight * 3, backgroundColor: Colors.primary_color,
    justifyContent: 'center'
  },
  shadow: {
    shadowColor: Platform.OS == "ios" ? Colors.shadowColor : Colors.shadowColorAndroid,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    zIndex: 5,
    elevation: 5,
  },
  truck_logo: { width: 320, height: 340 }

});




