import React, {useEffect} from 'react';
import Container from '../common/Container';
import {Dimensions, Image, Text, View} from 'react-native';
import Colors from '../common/Colors';
import ImageAssets from '../common/ImageAssets';
import {getPrefs, getToken} from '../common/Prefs';
import {useNavigation} from '@react-navigation/native';
import Constants from '../common/Constants';
import {font_style} from '../common/MyStyles';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';

const Splash = props => {
  const navigation = useNavigation();
  const navigateScreen = async () => {
    let token = await getToken();
    let loginData = await getPrefs('data');
    const parsedLoginData =
      typeof loginData === 'string' ? JSON.parse(loginData) : loginData;
    console.log('token', token);
    console.log('loginData', parsedLoginData);
    if (!!token) {
      Constants.access_token = token;
      if (parsedLoginData?.IsChangePassword) {
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
    } else {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  useEffect(() => {
    appUpadte();
    const redirectTimeout = setTimeout(() => {
      navigateScreen();
    }, 2000);
    return () => clearTimeout(redirectTimeout);
  }, [navigation]);

  const inAppUpdates = new SpInAppUpdates(
    true, // isDebug
  );
  const appUpadte = () => {
    inAppUpdates.checkNeedsUpdate().then(result => {
      if (result.shouldUpdate) {
        let updateOptions;
        if (Platform.OS === 'android') {
          updateOptions = {
            updateType: IAUUpdateKind.IMMEDIATE,
          };
        }
        console.log('available');
        inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      } else {
      }
    });
  };

  return (
    <Container>
      <View
        style={{
          height: height,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.grey,
          borderBottomRightRadius: 200,
          borderBottomLeftRadius: 200,
          paddingTop: 40,
          marginBottom: '100%',
        }}>
        <Image
          source={ImageAssets.logo}
          style={{
            height: '40%',
            width: '40%',
            resizeMode: 'contain',
            marginTop: 150,
            // tintColor:Colors.red
          }}
        />
        <Text
          style={[
            font_style.text_18_500,
            {
              color: Colors.primaryColor,
              textAlign: 'center',
              marginTop: -60,
            },
          ]}>
          {'HWC Survey'}
        </Text>
      </View>
    </Container>
  );
};

export default Splash;
const {width, height} = Dimensions.get('window');
