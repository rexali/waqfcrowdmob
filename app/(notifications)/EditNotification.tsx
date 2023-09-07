import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/getToken';
import { getNotificationData, getStatus, updateNotificationData } from './notificationsSlice';
import { Stack, useSearchParams } from 'expo-router';

const EditNotification = () => {

  const [userId, setUserId] = React.useState<any>('');
  const { id, subject, body } = useSearchParams<any>();

  ((async () => setUserId(await getToken("userId"))))();

  const status = useSelector(getStatus);
  const dispatch = useDispatch<any>()
  const [title, setTitle] = React.useState(subject);
  const [message, setMessage] = React.useState(body);

  const notificationData = {
    subject: title,
    body: message,
    userId,
    notificationId: id
  };

  const handleSendNotification = () => {
    dispatch(updateNotificationData(notificationData)).unwrap();
    setTimeout(() => {
    dispatch(getNotificationData()).unwrap();  
    }, 1000); 
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Edit Notification",}}/>

      <Text style={styles.contact}>Notification</Text>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View>
          <Text>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            keyboardType='default'
            defaultValue={title}
            onChangeText={setTitle}
          />
        </View>

        <View>
          <Text>Message</Text>
          <MultilineTextInput
            multiline
            numberOfLines={4}
            defaultValue={message}
            placeholder="Notice here"
            onChangeText={setMessage}
          />
        </View>

        <View style={styles.btnSend}>
          {status === "succeeded" && <Text style={styles.status}>{status}</Text>}
          <Button title='Update Notice' color={'green'} onPress={handleSendNotification} />
        </View>

      </ScrollView>
    </View>
  );
};

export default EditNotification;

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
    textAlign: 'center',
    textTransform: 'uppercase'

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
