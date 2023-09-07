import * as React from 'react';
import { StyleSheet,View } from 'react-native';
import MessagesList from './MessagesList';
import { SplashScreen, Stack } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesData, getMessages, getStatus, setStatus } from './messagesSlice';

export default function Messages() {
  const status = useSelector(getStatus);
  const messages = useSelector(getMessages)
  const mountRef = React.useRef(true);
  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getMessagesData()).unwrap();
    };
    setTimeout(() => {
      dispatch(setStatus({}));
    }, 1000);

    return () => {
      mountRef.current = false
    }
  }, [])

  if (!messages.length) {
    return <SplashScreen />
  }


  return (
    <View style={styles.container}>
      <MessagesList messages={messages} />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontWeight: 'bold'
  },
  notification: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    textShadowColor: 'green'
  }
});