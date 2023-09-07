import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NotificationsList from './NotificationsList';
import { useDispatch, useSelector} from 'react-redux';
import { getNotificationData, getNotifications, getStatus, setStatus } from './notificationsSlice';
import SplashScreen from '../../components/common/SplashScreen';

export default function Notifications() {
  const status = useSelector(getStatus);
  const notifications = useSelector(getNotifications)
  const mountRef = React.useRef(true);
  const dispatch = useDispatch<any>();


  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getNotificationData()).unwrap();
      setTimeout(() => {
        dispatch(setStatus({}));
      }, 1000);
    };
    return () => {
      mountRef.current = false;
    }
  }, [])

  if (!notifications.length) {
    return <SplashScreen flex={1}/>
  }


  return (
    <View style={styles.container}>
      <NotificationsList notificationsData={notifications} />
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