import {
  FlatList,
  Text,
  View,
} from 'react-native'
import NoData from '../../coomon_component/NoData'
import MyRadioButton from '../../coomon_component/RadioButton'
import { font_style } from '../../common/MyStyles'
import Colors from '../../common/Colors'

const Adapter = props => {
  const render_item = ({ item }) => {
    return (
      <View>
        <Text
          style={[
            font_style.text_14_700,
            { color: Colors.black, paddingBottom: 6 },
          ]}>
          {item?.ServiceName}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MyRadioButton
            textStyle={[font_style.text_14_600, { color: Colors.black }]}
            text={'Yes'}
            onPress={() => props.onPress(item, "Yes")}
            isChecked={item?.Ischecked == "1" }
          />
          <MyRadioButton
            textStyle={[font_style.text_14_600, { color: Colors.black }]}
            text={'No'}
            onPress={() => props.onPress(item, "No")}
            isChecked={item?.Ischecked == "2" }
          />
        </View>
      </View>
    )
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={props?.data}
      renderItem={render_item}
      numColumns={1}
      showsHorizontalScrollIndicator={false}
      alwaysBounceVertical={true}
      ListEmptyComponent={<NoData />}
    />
  )
}

export default Adapter
