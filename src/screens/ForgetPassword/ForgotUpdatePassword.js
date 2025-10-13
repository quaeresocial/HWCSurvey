import React, {useState} from 'react';
import {Dimensions, View, Image, ScrollView} from 'react-native';
import Colors from '../../common/Colors';
import {useDispatch} from 'react-redux';
import {isEmpty, showToast} from '../../common/common';
import MyButton from '../../coomon_component/MyButton';
import {changePasswordApi} from '../../API/APICall';
import {setLoading} from '../../redux_store/actions/indexActions';
import Container from '../../common/Container';
import Strings from '../../common/Strings';
import ImageAssets from '../../common/ImageAssets';
import KeyBoardType from '../../common/KeyBoardType';
import CustomInput from '../../coomon_component/CustomInput';
import HeaderBar from '../../coomon_component/headerBar';

const ForgotUpdatePassword = props => {
  const dispatch = useDispatch();
  const mobile = props?.route?.params?.mobile;
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const validate = () => {
    if (isEmpty(newpassword)) {
      showToast('Please enter new password');
    } else if (isEmpty(confirmpassword)) {
      showToast('Please enter confirm password');
    } else if (newpassword !== confirmpassword) {
      showToast('Passwords do not match');
    } else {
      changePassword();
    }
  };

  const changePassword = () => {
    let param = {
      OldPassword: newpassword,
      NewPassword: confirmpassword,
    };
    dispatch(setLoading(true));
    changePasswordApi(
      param,
      async res => {
        console.log('CHANGE PASSWORD API RESPONSE ======>>>>>', res);
        if (res?.response === Strings.success1) {
          showToast('Password change successfully');
          dispatch(setLoading(false));
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
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
                height: '90%',
                width: '90%',
                elevation: 2,
                borderRadius: 15,
                alignItems: 'center',
                shadowColor: Colors.primaryColor,
                paddingVertical: 30,
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
                inputTitle={'New Password'}
                container_style={{width: '90%', marginTop: 12}}
                righticon={ImageAssets.eNumber}
                placeholder={'Enter New Password'}
                keyboardType={KeyBoardType.default}
                value={newpassword}
                onValue={val => setNewPassword(val)}
              />
              <CustomInput
                inputTitle={'Confirm Password'}
                container_style={{width: '90%', marginTop: 12}}
                righticon={ImageAssets.eNumber}
                placeholder={'Enter Confirm Password'}
                keyboardType={KeyBoardType.default}
                value={confirmpassword}
                onValue={val => setConfirmPassword(val)}
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
export default ForgotUpdatePassword;
