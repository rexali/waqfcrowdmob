import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import WaqfsList from './WaqfsList';
import { useSelector, useDispatch } from 'react-redux';
import { getStatus, getWaqfData, getWaqfs } from './waqfsSlice';
import Search from '../searchs/Search';
import SplashScreen from '../../components/common/SplashScreen';

const Waqfs = ({ navigation }: { navigation: any }) => {

  const waqfs = useSelector(getWaqfs);
  const dispatch = useDispatch<any>();
  const status = useSelector(getStatus);
  let mountRef = React.useRef(true);

  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getWaqfData()).unwrap();
    };

    return () => {
      mountRef.current = false
    }
  }, []);

  if (!waqfs.length) {
    return <SplashScreen flex={1} />
  }

  return (
    <View style={styles.container}>
      <Search />
      <View style={styles.createWaqf}>
        <Text style={styles.title}>AWQAF</Text>
      </View>
      <WaqfsList waqfs={waqfs} navigation={navigation} />
    </View>
  );
}

export default Waqfs;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
  },
  createWaqf: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  image: {
    maxWidth: '100%', height: 250, marginRight: 'auto', marginLeft: 'auto'
  },
  btnWrap: {
    justifyContent: 'space-between', flexDirection: 'row', marginTop: 5,
  },
  btnView: {},
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  contentWrap: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  edit: {
    color: 'white', textAlign: 'center',
  },
  editPressable: {
    backgroundColor: 'green',
    width: 70,
    height: 30,
    padding: 3,
    borderRadius: 10,
  },
})

