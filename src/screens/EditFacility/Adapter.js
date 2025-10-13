import {
  FlatList,
} from 'react-native'
import NoData from '../../coomon_component/NoData'
import MyRadioButton from '../../coomon_component/RadioButton'

const Adapter = props => {
  const render_item = ({item}) => {
    return (
      <MyRadioButton
        text={item?.ServiceName}
        onPress={() => props.onPress(item)}
        isChecked={item?.Ischecked == "0" ? false : true}
      />
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
