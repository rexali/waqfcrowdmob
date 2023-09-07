import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { callSmsEmailUrl } from '../../utils/callSmsEmailUrl';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { isEmail } from '../../utils/checkParameters';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../(users)/usersSlice';
import { getToken } from '../../utils/getToken';
import { addMessageData, getMessagesData, getStatus } from './messagesSlice';
import Card from '../../components/Card';
import { Stack } from 'expo-router';

const AddMessage = () => {

  const [userEmail, setUserEmail] = React.useState<any>('');
  const [userId, setUserId] = React.useState<any>('');

  ((async () => setUserEmail(await getToken("email"))))();

  ((async () => setUserId(await getToken("userId"))))();

  const user = useSelector(getUser);
  const status = useSelector(getStatus);
  const dispatch = useDispatch<any>()

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [from, setFrom] = React.useState(user.email || userEmail);

  const messageData = {
    firstName,
    lastName,
    email,
    subject,
    message,
    userId,
    from
  };
  console.log(from);


  const handleSendMessage = () => {
    if (!isEmail(messageData.email)) {
      alert("Wrong email");
    } else {
      dispatch(addMessageData(messageData)).unwrap();
      setTimeout(() => {
      dispatch(getMessagesData()).unwrap();
      }, 1000);
    }
  };

  function getEmail(param: string) {
    if (!param) {
      alert("Empty email: Pls enter 'To' email in above input and click again");
    } else {
      return param;
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Send Message",}}/>
      <Card>
        <Text style={styles.contact}>SEND MESSAGE</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              keyboardType='default'
              onChangeText={setFirstName}
            />
          </View>

          <View>
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              keyboardType='default'
              onChangeText={setLastName}
            />
          </View>

          <View>
            <Text>From</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType='email-address'
              defaultValue={from}
              onChangeText={setFrom}
            />
          </View>

          <View>
            <Text>To</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email to send message to"
              keyboardType='email-address'
              defaultValue={email}
              onChangeText={setEmail}
            />
          </View>

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
            <Button title='Send Now' color={'green'} onPress={handleSendMessage} />
          </View>

          <View style={styles.btnView}><Button title={'Send Email'} color={'green'} onPress={() => getEmail(email) ? callSmsEmailUrl('mailto:' + getEmail(email)) : ""} /></View>

        </ScrollView>
      </Card>
    </View>
  );
};

export default AddMessage;

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
     textAlign:'center'
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
