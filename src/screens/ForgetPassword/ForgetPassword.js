import React, {useState} from 'react';
import {Dimensions, View, Image, ScrollView} from 'react-native';
import Colors from '../../common/Colors';
import {useDispatch} from 'react-redux';
import {
  isEmpty,
  isValidIndianMobileNumber,
  showToast,
} from '../../common/common';
import MyButton from '../../coomon_component/MyButton';
import {changePasswordApi} from '../../API/APICall';
import {setLoading} from '../../redux_store/actions/indexActions';
import Container from '../../common/Container';
import Strings from '../../common/Strings';
import ImageAssets from '../../common/ImageAssets';
import KeyBoardType from '../../common/KeyBoardType';
import CustomInput from '../../coomon_component/CustomInput';
import HeaderBar from '../../coomon_component/headerBar';
import {StackActions} from '@react-navigation/native';
const ForgetPassword = props => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');

  const validate = () => {
    if (isEmpty(mobile)) {
      showToast('Please enter mobile number');
    } else if (!isValidIndianMobileNumber(mobile)) {
      showToast('Please enter valid mobile number');
    } else {
      //   handleChange();
      props.navigation.dispatch(StackActions.push('ForgotUpdatePassword'));
    }
  };

  const handleChange = () => {
    let param = {
      mobile: mobile,
    };
    dispatch(setLoading(true));
    changePasswordApi(
      param,
      async res => {
        console.log('FORGET PASSWORD API RESPONSE ======>>>>>', res);
        if (res?.response === Strings.success1) {
          showToast('OTP send successfully');
          dispatch(setLoading(false));
          props.navigation.dispatch(
            StackActions.push('ForgotUpdatePassword', {mobile: mobile}),
          );
        } else showToast(res?.message);
        dispatch(setLoading(false));
      },
      error => {
        showToast('Something went wrong');
        dispatch(setLoading(false));
      },
    );
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: height * 0.75,
            width: width,
            backgroundColor: Colors.white,
          }}>
          <HeaderBar
            title={'Forgot Password'}
            onBack={() => props.navigation.goBack()}
          />

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
                height: '80%',
                width: '90%',
                elevation: 2,
                borderRadius: 15,
                alignItems: 'center',
                shadowColor: Colors.primaryColor,
                paddingVertical: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={ImageAssets.logo}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'contain',
                  marginBottom: 30,
                }}
              />

              <CustomInput
                inputTitle={'Mobile number'}
                container_style={{width: '90%', marginTop: 12}}
                righticon={ImageAssets.eNumber}
                placeholder={'Enter mobile number'}
                keyboardType={KeyBoardType.mobile}
                value={mobile}
                onValue={val => setMobile(val)}
                maxLength={10}
              />
              <MyButton btnText={'Submit'} onPress={() => validate()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const {width, height} = Dimensions.get('window');
export default ForgetPassword;
