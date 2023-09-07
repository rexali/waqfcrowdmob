import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import PartnersList from './PartnersList';
import { useSelector, useDispatch } from 'react-redux';
import { getPartners, getPartnersData } from './PartnersSlice';
import { useRouter } from 'expo-router';

const Volunteers = () => {

  const ADD_PARTNER: string = 'partners/AddPartner';
  const partners = useSelector(getPartners);
  const dispatch = useDispatch<any>();
  let mountRef = React.useRef(true);
  const router = useRouter();

  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getPartnersData()).unwrap();
    };
    return () => {
      mountRef.current = false;
    }
  }, []);

  return <View style={styles.container}>
    <View style={[styles.create]}>
      <Text numberOfLines={2} style={[styles.title, { width: 220 }]}>Apply as a Volunteer to Almubarak Waqf Foundation (AWF)</Text>
      <Pressable
        style={[styles.editPressable, { alignSelf: 'center' }]}
        onPress={() => router.push(ADD_PARTNER)}>
        <Text style={styles.edit}>Create</Text>
      </Pressable>
    </View>
    {partners.length > 0 && <PartnersList partners={partners}/>}
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

