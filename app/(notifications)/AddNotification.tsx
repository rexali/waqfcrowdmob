import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/getToken';
import { addNotificationData, getNotificationData, getStatus } from './notificationsSlice';
import Card from '../../components/Card';
import { Stack } from 'expo-router';

const AddNotification = () => {

  const [userId, setUserId] = React.useState<any>('');

  ((async () => setUserId(await getToken("userId"))))();

  const status = useSelector(getStatus);
  const dispatch = useDispatch<any>()
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const notificationData = {
    subject,
    message,
    userId
  };

  const handleSendNotification = () => {
    dispatch(addNotificationData(notificationData)).unwrap()
    setTimeout(() => {
      dispatch(getNotificationData()).unwrap();  
      }, 1000); 
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Add Notification",}}/>

      <Card>
      <Text style={styles.contact}>SEND NOTICE</Text>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View>
          <Text>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            keyboardType='default'
            onChangeText={setSubject}
          />
        </View>

        <View>
          <Text>Message</Text>
          <MultilineTextInput
            multiline
            numberOfLines={4}
            placeholder="Message"
            onChangeText={setMessage}
          />
        </View>

        <View style={styles.btnSend}>
          {status === "succeeded" && <Text style={styles.status}>{status}</Text>}
          <Button title='Send Notice' color={'green'} onPress={handleSendNotification} />
        </View>


      </ScrollView>
      </Card>
    </View>
  );
};

export default AddNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  logo: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  contact: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:"center",
  },
  btnView: {
    margin: 10,
  },
  btnSend: {
    width: 250,
    margin: 10,
    marginBottom: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    maxWidth: '100%',
  },
  status: {
    textAlign: 'center'
  }
});
