import React, {useState} from 'react'
import {Image, Dimensions, View, Text, TouchableOpacity} from 'react-native'
import Colors from '../common/Colors'
import ImageAssets from '../common/ImageAssets'
import {font_style} from '../common/MyStyles'
import {useSelector} from 'react-redux'
import {Tooltip, Button} from 'react-native-paper'

export default ActionBar = props => {
  const user_profile = useSelector(state => state.indexReducer.user_profile)
  const [show, setShow] = useState(true)
  return (
    <View
      style={[
        {
          width: width,
          alignSelf: 'center',
          flexDirection: 'row',
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.1,
        },
        props?.mainView,
      ]}>
      {/* <TouchableOpacity style={{ alignSelf: "center", justifyContent: "flex-end" }} onPress={props.menubutton}>
        <Image source={ImageAssets.menu} resizeMode="cover" style={{ width: 28, height: 40,resizeMode:'contain' }} />
      </TouchableOpacity> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width - 30,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row',width:'70%'}}>
          <View style={{}}>
            <Text
              style={[
                font_style.text_12_500,
                {color: Colors.white, marginTop: 3},
                props?.wishStyle,
              ]}>
              {props.wishesText}
            </Text>
            <Text
              style={[
                font_style.text_15_500,
                {color: Colors.white, marginTop: 2},
              ]}>
              {props.name}
            </Text>
          </View>
        </View>

        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        {props?.lock && (
            <TouchableOpacity onPress={props.icon2}>
                <Image
                  resizeMode='center'
                  source={props?.lock}
                  style={{
                    height: 22,
                    width: 22,
                    resizeMode: 'contain',
                    tintColor: Colors.white,
                  }}
                />
            </TouchableOpacity>
          )}
          {props?.rightImage && (
            <TouchableOpacity onPress={props.notificationButton}>
              <Image
                resizeMode='center'
                source={props?.rightImage}
                style={{
                  height: 22,
                  width: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.white,
                  marginLeft: 18,

                }}
              />
            </TouchableOpacity>
          )}
         
          {props?.count && (
            <Text
              style={[
                font_style.text_10_500,
                {
                  fontSize: 10,
                  textAlignVertical: 'center',
                  width: 20,
                  height: 20,
                  padding: 2,
                  textAlign: 'center',
                  color: Colors.white,
                  marginTop: -8,
                  backgroundColor: Colors.mediumblue,
                  borderRadius: 100,
                  marginStart: -20,
                },
              ]}>
              {props?.count ? props?.count : ''}
            </Text>
          )}
        </View>
      </View>
    </View>
  )
}

export const {width, height} = Dimensions.get('window')
