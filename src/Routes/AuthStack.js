import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Easing} from 'react-native';
import Splash from '../screens/Splash';
import Login from '../screens/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import EditFacility from '../screens/EditFacility/EditFacility';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import ForgotUpdatePassword from '../screens/ForgetPassword/ForgotUpdatePassword';

const Stack = createStackNavigator();

export const AuthStack = () => {
  const slideFromRight = ({current, layouts}) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1],
      }),
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    },
  });

  const customEasingStart = Easing.bezier(0.25, 0.25, 0.25, 0.25);
  const customEasingEnd = Easing.out(Easing.exp);

  const transitionSpec = {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: customEasingStart,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: customEasingEnd,
      },
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        presentation: 'transparentModal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_left',
        animationEnabled: true,
      }}
      initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
      <Stack.Screen
        name="ForgotUpdatePassword"
        component={ForgotUpdatePassword}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
      <Stack.Screen
        name="EditFacility"
        component={EditFacility}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          cardStyleInterpolator: slideFromRight,
          transitionSpec: {
            open: transitionSpec,
            close: transitionSpec,
          },
        }}
      />
    </Stack.Navigator>
  );
};
