import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Platform,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import MyButton from './MyButton';
import SearchView from './SearchView';
import { font_style } from './../common/MyStyles';

const MyListPicker = props => {
  console.log(props.data)
  const [data, setData] = useState(props.data)
  const [search, setSearch] = useState('')
  const [maxSelection, setMaxSelection] = useState()
  const isMultiple = props.isMultiple;
  const renderPickerItem = ({ item, index }) => {
    {
      return (<TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#0003' }}
        onPress={() => {
          onClickPickers(item[props.id_key])
        }}
      >
        <Text style={[font_style.text_13_400,{color:Colors.gray_color}]}>
          {item[props.title_key]}
        </Text>
        {item.isSelected && <Image
          source={ImageAssets.ok}
          style={{ width: 10, height: 10 }}
          resizeMode={'contain'}
        />}

      </TouchableOpacity>)
    }
  }
  function handleBackButtonClick() {
    props.onClose()
    return true;
  }

  useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  },[])
  const onClickPickers = (id) => { 
    let _data = [...props.data]
    _data.map(item => {
      if (item[props.id_key] != id) {
        if (!isMultiple) {
          item.isSelected = false
        }
      } else
        item.isSelected = !item.isSelected
    })
    let __data = props.data.filter(item => item[props.title_key].toLowerCase().includes(search.toLowerCase()))
    setData(__data);
    if (!isMultiple) 
      onDone()

  }
  const onDone = ()=>{
    let data = props.data.filter(item=>item.isSelected)
    props.onDone(data)
    props.onClose()
  }
  return (
    <SafeAreaView style={styles.safe_container}>
      <View style={{ backgroundColor: Colors.white, flex: 1, width }}>
        <SearchView
          placeholder={'Search'}
          onSearch={(text) => {
            setSearch(text)
            if (text == '') {
              setData(props.data)
              return;
            }
            let _data = props.data.filter(item => item[props.title_key].toLowerCase().includes(text.toLowerCase()))
            setData(_data)
          }}
        />

        <FlatList
          style={{ backgroundColor: Colors.white, flex: 1 }}
          contentContainerStyle={{ width, backgroundColor: Colors.white }}
          data={data}
          renderItem={renderPickerItem}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,}}>
        <MyButton
          btnstyle={{
            width: '40%',
            marginBottom: 10
          }}
          btnText={'Done'}
          onPress={onDone} />
          <MyButton
          btnstyle={{
            width: '40%',
            marginBottom: 10
          }}
          btnText={'Close'}
          onPress={props.onClose} />
          </View>
      </View>
    </SafeAreaView>
  );
};

export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  safe_container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#0004',
    zIndex:1000,
    elevation:10,
    alignItems: 'center',
    top:Platform.OS === 'ios' ? 40:20,
  },
});

export default MyListPicker;
