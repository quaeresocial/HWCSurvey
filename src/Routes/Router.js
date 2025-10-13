import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {useSelector} from 'react-redux'
import MyLoadingFull from '../common/MyLoadingFull'
import {AuthStack} from './AuthStack'
import Colors from '../common/Colors'
import {StatusBar, useColorScheme} from 'react-native'

const TAG = ' Router'

export const Router = () => {
  const isDarkMode = useColorScheme() === 'dark'
  let isLoading = useSelector(state => state.indexReducer.is_loading)

  const authorized = false

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.primaryColor}
      />
      <AuthStack />
      {isLoading && <MyLoadingFull />}
    </NavigationContainer>
  )
}
