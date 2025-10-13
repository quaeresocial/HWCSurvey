import {
  Text,
  Dimensions,
  FlatList,
  View,
  Image,
  Pressable,
} from 'react-native'
import Colors from '../../common/Colors'
import { font_style } from '../../common/MyStyles'
import NoData from '../../coomon_component/NoData'
import ImageAssets from '../../common/ImageAssets'

const Adapter = props => {
  const render_item = ({ item }) => {
    const getStatusColor = status => {
      switch (status) {
        case 'Pending':
          return Colors.orange;  
        case 'Approved':
          return Colors.green;  
        case 'Declined':
          return Colors.red; 
        default:
          return Colors.darkGreen; 
      }
    };

    return (
      <Pressable onPress={() => item?.Iseditable == '0' ? props.onPress(item) : console.log("Noooo")}
        style={{
          marginHorizontal: 5,
          backgroundColor: Colors.white,
          width: width - 20,
          paddingVertical: 16,
          elevation: 2,
          borderRadius: 4,
          marginVertical: 5,
          alignItems: 'center',
          paddingHorizontal: 12
        }}>
        <View style={{ width: '100%' }}>
          <Text style={[
            font_style.text_14_600,
            { color: Colors.black },
          ]}>
            {item?.FacilityName}
          </Text>
          
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[
              font_style.text_13_500,
              { color: Colors.black, width: '92%' },
            ]}>
              {item?.FacilityAddress}
            </Text>
            {item?.Iseditable == '0' &&
              <Image source={ImageAssets.edit} style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: Colors.red }} />}
          </View>
          
          <Text style={[
            font_style.text_13_500,
            { color: Colors.black, width: '92%' },
          ]}>
            {item?.DivisionName} - {item?.DistrictName}
          </Text>

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
            <Text style={[
              font_style.text_16_700,
              { color: Colors.blue },
            ]}>
              {item?.FacilityType}
            </Text>

            <Text style={[
              font_style.text_16_700,
              { color: getStatusColor(item?.Status) },  
            ]}>
              {item?.Status}
            </Text>
          </View>
        </View>
      </Pressable>
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

const { width, height } = Dimensions.get('window')
export default Adapter
