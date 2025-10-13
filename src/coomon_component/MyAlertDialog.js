import React, {  useRef, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    Pressable,
    Animated,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Colors from '../common/Colors';
import { Text } from 'react-native-paper';
import { font_style } from '../common/MyStyles';
import ImageAssets from '../common/ImageAssets';
const { width, height } = Dimensions.get("window")

const MyAlertDialog = props => {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Pressable
            onPress={props?.onPress}
            style={[
                {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    backgroundColor: '#0007',
                    zIndex: 10000,
                },
                props,
            ]}>
            <Animated.View
                style={[
                    {
                        transform: [{ scale: scaleAnim }],
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.white,
                        borderRadius: 8,
                        padding: 10,
                        borderWidth: 1,
                        borderColor: Colors.primaryColor,
                        width: width - 40,
                        paddingVertical: 10
                    },
                    props.insideStyle,
                ]}>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.softGray, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[font_style.text_14_600, { color: Colors.darkGray }]}>
                        Kindly ready these documents
                    </Text>
                    <TouchableOpacity onPress={props?.onClose}>
                        <Image source={ImageAssets.close} style={{
                            height: 20, width: 20, resizeMode: 'contain', tintColor: Colors.red
                        }} />
                    </TouchableOpacity>
                </View>
                {props.data &&
                    <View style={{ width: '100%', paddingVertical: 5, marginVertical: 10 }}>
                        <FlatList
                            data={props.data}
                            numColumns={1}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                                        <Image source={ImageAssets.iconCheck} style={{
                                            height: 15, width: 15, resizeMode: 'contain', tintColor: Colors.softGray
                                        }} />
                                        <Text style={[font_style.text_13_600, { color: Colors.softGray, paddingVertical: 5,paddingLeft:5 }]}>
                                            {item?.title}
                                        </Text>
                                    </View>
                                );
                            }}
                        />

                    </View>}
                <View style={{ width: '100%', backgroundColor: Colors.lighYellow, paddingVertical: 15, borderRadius: 10, }}>
                    <Text style={[font_style.text_13_600, { color: Colors.softGray, paddingHorizontal: 5, textAlign: 'center' }]}>
                        {'Note : - All document should be (jpg/jpeg/png) formate and not more then 200KB.'}
                    </Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.softGray, height: 10, width: '100%' }}></View>
                <View style={{ width: '100%', paddingVertical: 10, alignItems: 'flex-end', justifyContent: 'flex-end', paddingVertical: 5, marginTop: 8 }}>
                    <TouchableOpacity onPress={props?.onClose} style={{ width: '30%', paddingVertical: 10, backgroundColor: Colors.red, borderRadius: 5 }}>
                        <Text style={[font_style.text_13_600, { color: Colors.white, paddingHorizontal: 5, textAlign: 'center' }]}>
                            {'CLOSE'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'red',
        fontSize: 20,
    },
});

export default MyAlertDialog;
