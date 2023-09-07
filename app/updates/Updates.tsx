import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UpdatesList from './UpdatesList';
import SplashScreen from '../../components/common/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdatesData, getUpdates, } from './updatesSlice';
import { useSearchParams } from 'expo-router';

export default function Updates() {

  const updates = useSelector(getUpdates);
  const mountRef = React.useRef(true);
  const dispatch = useDispatch<any>();
  const { waqfId } = useSearchParams();


  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getUpdatesData(waqfId)).unwrap();
    };
    return () => {
      mountRef.current = false
    }
  }, [])

  if (!updates.length) {
    return <SplashScreen />
  }

  return (
    <View style={styles.container}>
      <UpdatesList updatesData={updates} />
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
  updates: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    textShadowColor: 'green'
  }

});