import React from 'react'
import {
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native'
import {useDispatch} from 'react-redux'
import Colors from './Colors'
import {font_style} from './MyStyles'

const DropDownAdapter = props => {
  const dispatch = useDispatch()

  const render_item = ({item}) => {
    return (
      <Pressable
        onPress={() => props.onSelect(item)}
        style={{
          width: width / 1,
          backgroundColor: Colors.white,
          elevation: 1,
          paddingVertical: 10,
          marginVertical: 2,
        }}>
        <Text
          numberOfLines={1}
          style={[
            font_style.text_12_600,
            {color: Colors.black, marginVertical: 3},
          ]}>
          {item[props.keyName]}
        </Text>
      </Pressable>
    )
  }

  const dialogHeight = Math.min(height * 0.8, props.data.length * 50)

  return (
    <View
      style={{
        width: width - 60,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{width: '100%'}}>
        <Text
          style={[
            font_style.text_18_600,
            {color: Colors.primaryColor, paddingLeft: 12, textAlign: 'left'},
          ]}>
          {props.heading}
        </Text>
      </View>
      {props?.data && (
        <View style={{height: dialogHeight, width: '85%'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props?.data}
            renderItem={render_item}
            numColumns={1}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      <View style={{width: '95%', paddingVertical: 5, alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={props.onClose}
          style={{
            backgroundColor: Colors.primaryColor,
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 7,
            borderRadius: 5,
          }}>
          <Text style={[font_style.text_14_500, {color: Colors.white}]}>
            CLOSE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const {width, height} = Dimensions.get('window')
export default DropDownAdapter
