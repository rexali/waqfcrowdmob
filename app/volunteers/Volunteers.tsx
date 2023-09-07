import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import VolunteersList from './VolunteersList';
import { useSelector, useDispatch } from 'react-redux';
import { getVolunteers, getVolunteersData } from './VolunteersSlice';
import SplashScreen from '../../components/common/SplashScreen';
import { useRouter } from 'expo-router';

const Volunteers = ({ navigation }: { navigation: any }) => {

  const ADD_VOLUNTEER: string = 'volunteers/AddVolunteer';

  const volunteers = useSelector(getVolunteers);
  const dispatch = useDispatch<any>();
  let mountRef = React.useRef(true);
  const router = useRouter();

  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getVolunteersData()).unwrap();
    };
    return () => {
      mountRef.current = false
    }
  }, [])

  return <View style={styles.container}>
    <View style={[styles.create]}>
      <Text numberOfLines={2} style={[styles.title, { width: 220 }]}>Apply as a Volunteer to Almubarak Waqf Foundation (AWF)</Text>
      <Pressable
        style={[styles.editPressable, { alignSelf: 'center' }]}
        onPress={() => router.push(ADD_VOLUNTEER)}>
        <Text style={styles.edit}>Create</Text>
      </Pressable>
    </View>

    {volunteers.length ? <VolunteersList volunteers={volunteers} navigation={navigation} /> : <SplashScreen />}
  </View>
}
export default Volunteers;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
  },
  create: {
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

