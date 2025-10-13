

import { Platform, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import Colors from './Colors';

const Container = (props) => {
    const defaultStyle = {
        flex: 1,
        backgroundColor: Colors.white1,alignItems: "center", justifyContent: "center",
    };

    const mergedStyle = { ...defaultStyle, ...props.style };

    const statusBarStyle =
        Platform.OS === 'android' ? 'light-content' : 'dark-content';


    return (
        <SafeAreaView style={mergedStyle}>
            <StatusBar barStyle={statusBarStyle} backgroundColor={Colors.primaryColor} />
            {props.children}
        </SafeAreaView>
    );
};

export default Container;
