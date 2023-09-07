import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateTimePickers = ({dateCallback}:{dateCallback:any}) => {
    
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    dateCallback(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
    <View>
      <Button onPress={showDatepicker} title="Pick date" color={'green'} />
    </View>
      {/* <View><Button onPress={showTimepicker} title="Show time picker!" /></View> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};