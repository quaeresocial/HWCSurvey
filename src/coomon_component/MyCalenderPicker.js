import moment from 'moment';
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../common/Colors';
import * as MyStyles from '../common/MyStyles';
import CalendarPicker from 'react-native-calendar-picker';
import MyFont from '../common/MyFont';
import { getWidth } from '../common/common';
const MyCalenderPicker = (props) => {

  return (

    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={[MyStyles.font_style.text_16_600, { color: Colors.primaryColor }]}>
          {"Today"}
        </Text>
        <Text style={[MyStyles.font_style.text_16_600, { color: Colors.primaryColor, marginTop: 8 }]}>
          {moment().format('DD MMM, YYYY')}
        </Text>

        <View style={{ borderWidth: 1, marginVertical: 15, borderRadius: 8, borderColor: Colors.primaryColor }}>

          <CalendarPicker
            width={getWidth(296)}
            allowRangeSelection={false}
            enableDateChange={true}
            showDayStragglers
            minDate={props?.minDate ? props?.minDate : new Date()}
            maxDate={props?.maxDate ? props?.maxDate : new Date()}
            todayBackgroundColor="#0000"
            selectedStartDate={moment().add(props.years, 'years')}
            initialDate={new Date()}
            selectedDayColor="#f001"
            dayLabelsWrapper={{
              borderTopWidth: 0,
              borderBottomWidth: 0
            }}
            customDayHeaderStyles={() => {
              return {
                textStyle: { color: Colors.primaryColor, opacity: 0.5, fontSize: 12, fontFamily: MyFont.Roboto400 },
              };
            }}
            textStyle={{
              fontFamily: MyFont.Roboto500,
              color: Colors.primaryColor,
              fontSize: 14
            }
            }

            selectedDayTextColor={Colors.primaryColor}
            onDateChange={(date, type) => {
              if (type === 'END_DATE') {
              } else {
                props.onSelectedDate(moment(date).format("yyyy-MM-DD"))
                props.onClose()
              }
            }}
          />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          <TouchableOpacity
            onPress={props.onClose}
            style={{ padding: 10, width: getWidth(135), backgroundColor: Colors.primaryColor, borderRadius: 6, marginBottom: 15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[MyStyles.font_style.text_16_500, { color: Colors.white }]}>
              {"Cancel"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

  container: {
    height: '100%',
    width,
    padding: 15,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: Colors.transparent_black_bg,
    elevation: 6
  },
  inner_container: { backgroundColor: Colors.white, borderRadius: 6, width: '98%', padding: 20,alignSelf:'center' },
  heading_container: { backgroundColor: Colors.primaryColor, borderTopEndRadius: 6, borderTopStartRadius: 6, width: '100%', padding: 15, justifyContent: 'center', alignItems: 'center' },
  calenderViewRight: { flexDirection: 'row', marginTop: 10, alignItems: 'center', },
  icon: { width: 24, height: 24 },
  leftView: { flexDirection: 'row' },

  rightView: {}

});



export default MyCalenderPicker;
