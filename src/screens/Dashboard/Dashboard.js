import React, {useEffect, useState} from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  Alert,
  RefreshControl,
} from 'react-native'
import {useDispatch} from 'react-redux'
import Container from '../../common/Container'
import ActionBar from '../../coomon_component/ActionBar'
import ImageAssets from '../../common/ImageAssets'
import Colors from '../../common/Colors'
import {font_style} from '../../common/MyStyles'
import Adapter from './Adapter'
import {clearAll, getPrefs} from '../../common/Prefs'
import {StackActions} from '@react-navigation/native'
import {recentlyAddedFacility} from '../../API/APICall'
import {setLoading} from '../../redux_store/actions/indexActions'
import {showToast} from '../../common/common'
const Dashboard = props => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [logindata, setLoginData] = useState({})
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    localData()
    allFacility()
  }, [])

  const localData = async () => {
    let loginData = await getPrefs('data')
    setLoginData(JSON.parse(loginData))
  }

  const onRefresh = () => {
    allFacility()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const allFacility = () => {
    let param = {status: ''}
    dispatch(setLoading(true))
    recentlyAddedFacility(
      param,
      async res => {
        console.log(res, '================>>> Facility Api Response')
        if (res?.response === 'success') {
          setData(res?.FacilityList)
          dispatch(setLoading(false))
        } else {
          showToast(res?.message)
          dispatch(setLoading(false))
        }
      },
      error => {
        dispatch(setLoading(false))
        showToast(res?.message)
        console.log(error)
      },
    )
  }

  const logoutAlert = () => {
    Alert.alert(
      'Logout',
      'Do you really want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await clearAll()
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            })
            console.log('LOGOUT')
          },
        },
      ],
      {cancelable: false},
    )
  }

  const handleEditFacility = item => {
    props.navigation.dispatch(
      StackActions.push('EditFacility', {
        item: item,
      }),
    )
  }

  return (
    <Container>
      <ActionBar
        mainView={{backgroundColor: Colors.primaryColor}}
        wishesText={'Welcome'}
        name={logindata?.DisplayName + ' ' + logindata?.LoginId}
        rightImage={ImageAssets.logout}
        lock={ImageAssets.key}
        notificationButton={() => logoutAlert()}
        icon2={() =>
          props.navigation.dispatch(StackActions.push('ChangePassword'))
        }
      />
      <View
        style={{
          width: width - 20,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            font_style.text_13_600,
            {color: Colors.black, marginTop: 3},
            props?.wishStyle,
          ]}>
          {'Recently Added Facility'}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20, flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Adapter data={data} onPress={item => handleEditFacility(item)} />
      </ScrollView>
    </Container>
  )
}

const {width, height} = Dimensions.get('window')
export default Dashboard
