import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../common/Colors';
import {font_style} from '../../common/MyStyles';
import {useDispatch} from 'react-redux';
import {isEmpty, showToast} from '../../common/common';
import MyButton from '../../coomon_component/MyButton';
import {
  allBlockApi,
  allDistrictApi,
  allFacilityApi,
  loginApi,
} from '../../API/APICall';
import {setLoading} from '../../redux_store/actions/indexActions';
import Container from '../../common/Container';
import Strings from '../../common/Strings';
import ImageAssets from '../../common/ImageAssets';
import KeyBoardType from '../../common/KeyBoardType';
import Constants from '../../common/Constants';
import {setPrefs, setToken} from '../../common/Prefs';
import CustomInput from '../../coomon_component/CustomInput';
import CustomDropDown from '../../coomon_component/CustomDropDown';
import MyDialog from '../../coomon_component/MyDialog';
import DropDownAdapter from '../../common/DropDownAdapter';
import {StackActions} from '@react-navigation/native';

const Login = props => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [districtname, setDistrictName] = useState('');
  const [districtid, setDistrictId] = useState('');
  const [blockname, setBlockName] = useState('');
  const [blockid, setBlockId] = useState('');
  const [facilityname, setFacilityName] = useState('');
  const [facilityid, setFacilityId] = useState('');
  const [facilitycode, setFacilityCode] = useState('');
  const [districtData, setDistrictData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [facilityData, setFacilityData] = useState([]);

  useEffect(() => {
    allDistrict();
  }, []);

  const allDistrict = () => {
    dispatch(setLoading(true));
    allDistrictApi(
      async res => {
        // console.log(res?.allDistrictLists, '================>>> District Api Response')
        if (res?.response === 'success') {
          setDistrictData(res?.allDistrictLists);
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast(res?.message);
        console.log(error);
      },
    );
  };

  const allBlock = districtId => {
    dispatch(setLoading(true));
    const params = {
      StateId: '1',
      District: districtId,
    };
    allBlockApi(
      params,
      async res => {
        // console.log(
        //   res?.allBlockLists,
        //   '================>>> Block Api Response',
        // )
        if (res?.response === 'success') {
          setBlockData(res?.allBlockLists);
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast(res?.message);
        console.log(error);
      },
    );
  };

  const allFacility = blockId => {
    dispatch(setLoading(true));
    const params = {
      StateId: '1',
      DistrictId: districtid,
      BlockId: blockId,
      Page: '1',
      Size: '10000000',
      FacilityTypeId: '5',
    };
    allFacilityApi(
      params,
      async res => {
        // console.log(
        //   res?.allBlockLists,
        //   '================>>> Block Api Response',
        // )
        if (res?.response === 'success') {
          setFacilityData(res?.facililityNameandAdresses);
          dispatch(setLoading(false));
        } else {
          showToast(res?.message);
          dispatch(setLoading(false));
        }
      },
      error => {
        dispatch(setLoading(false));
        showToast(res?.message);
        console.log(error);
      },
    );
  };

  const validate = () => {
    if (isEmpty(districtid)) {
      showToast('Please select District');
    } else if (isEmpty(blockid)) {
      showToast('Please select Block');
    } else if (isEmpty(facilityid)) {
      showToast('Please select Facility');
    } else if (isEmpty(password)) {
      showToast('Please enter Password');
    } else {
      handleLogin();
    }
  };

  const handleLogin = () => {
    let param = {
      LoginId: facilityid,
      Password: password,
    };
    dispatch(setLoading(true));
    loginApi(
      param,
      async res => {
        console.log('LOGIN API RESPONSE ======>>>>>', res);
        if (res?.response === Strings.success1) {
          let token = res?.Token;
          Constants.access_token = token;
          await setToken(token);
          await setPrefs('data', JSON.stringify(res));
          showToast(Strings.text3);
          dispatch(setLoading(false));
          if (res?.IsChangePassword) {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            });
          } else {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'ChangePassword'}],
            });
          }
        } else showToast(res?.message);
        dispatch(setLoading(false));
      },
      error => {
        dispatch(setLoading(false));
      },
    );
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ensures correct positioning above the keyboard
          style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              height: height * 0.7,
              width: width,
              backgroundColor: Colors.white,
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: Colors.primaryColor,
                borderBottomRightRadius: 200,
                borderBottomLeftRadius: 200,
              }}></View>
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '10%',
              }}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: '100%',
                  width: '90%',
                  elevation: 2,
                  borderRadius: 15,
                  alignItems: 'center',
                  shadowColor: Colors.primaryColor,
                }}>
                <Image
                  source={ImageAssets.logo}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                    marginTop: 15,
                  }}
                />
                <Text
                  style={[
                    font_style.text_16_600,
                    {
                      color: Colors.black,
                      width: '60%',
                      textAlign: 'center',
                      marginBottom: 30,
                      marginTop: 10,
                    },
                  ]}>
                  {Strings.text2}
                </Text>
                <CustomDropDown
                  container_style={{width: width - 80}}
                  onPress={() => setShow1(true)}
                  inputTitle={'District'}
                  value={districtname ? districtname : 'Select District'}
                  righticon={ImageAssets.down}
                />
                <CustomDropDown
                  container_style={{width: width - 80}}
                  onPress={() => {
                    setShow2(true);
                  }}
                  inputTitle={'Block'}
                  value={blockname ? blockname : 'Select Block'}
                  righticon={ImageAssets.down}
                />
                <CustomDropDown
                  container_style={{width: width - 80}}
                  onPress={() => setShow3(true)}
                  inputTitle={'Facility'}
                  value={
                    facilityname
                      ? facilityname + ' ' + facilitycode
                      : 'Select Facility'
                  }
                  righticon={ImageAssets.down}
                />
                <CustomInput
                  inputTitle={'Enter Password'}
                  container_style={{width: '90%', marginTop: 12}}
                  righticon={ImageAssets.eNumber}
                  placeholder={'Password'}
                  keyboardType={KeyBoardType.default}
                  value={password}
                  onValue={val => setPassword(val)}
                />
                <MyButton btnText={Strings.text5} onPress={() => validate()} />
                {/* <TouchableOpacity
                onPress={() =>
                  props.navigation.dispatch(StackActions.push('ForgetPassword'))
                }>
                <Text
                  style={[
                    font_style.text_14_600,
                    {
                      color: Colors.black,
                      width: '60%',
                      textAlign: 'center',
                      marginBottom: 30,
                      marginTop: 10,
                    },
                  ]}>
                  {'Forgot Password'}
                </Text>
              </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {show1 && (
        <MyDialog
          children={
            <DropDownAdapter
              heading={'All District'}
              data={districtData}
              onClose={() => setShow1(false)}
              onSelect={item => {
                console.log(item);
                setDistrictName(item?.DistrictName);
                setDistrictId(item?.DistrictCode);
                allBlock(item?.DistrictCode);
                setBlockName('');
                setBlockId('');
                setShow1(false);
              }}
              keyName={'DistrictName'}
            />
          }
        />
      )}
      {show2 && (
        <MyDialog
          children={
            <DropDownAdapter
              heading={'All Block'}
              data={blockData}
              onClose={() => setShow2(false)}
              onSelect={item => {
                console.log(item);
                setBlockName(item?.BlockName);
                setBlockId(item?.BlockCode);
                allFacility(item?.BlockCode);
                setFacilityName('');
                setFacilityId('');
                setFacilityCode('');
                setShow2(false);
              }}
              keyName={'BlockName'}
            />
          }
        />
      )}
      {show3 && (
        <MyDialog
          children={
            <DropDownAdapter
              heading={'All Facility'}
              data={facilityData}
              onClose={() => setShow3(false)}
              onSelect={item => {
                console.log(item);
                setFacilityName(item?.FacilityName);
                setFacilityId(item?.FacilityId);
                setFacilityCode(item?.FacilityCode);
                setShow3(false);
              }}
              keyName={'FacilityName'}
            />
          }
        />
      )}
    </Container>
  );
};

const {width, height} = Dimensions.get('window');
export default Login;
