import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, Pressable } from 'react-native';
import BeneficiariesList from './BeneficiariesList';
import { useSelector, useDispatch } from 'react-redux';
import { getBeneficiaries, getBeneficiariesData } from './beneficiariesSlice';
import { useRouter } from 'expo-router';

const Beneficiaries = () => {

  const ADD_BENEFICIARY: string = 'beneficiaries/AddBeneficiary';
  const router = useRouter()

  const beneficiaries = useSelector(getBeneficiaries);
  const dispatch = useDispatch<any>();
  let mountRef = React.useRef(true);

  React.useEffect(() => {
    if (mountRef.current) {
      dispatch(getBeneficiariesData()).unwrap();
    };
    return () => {
      mountRef.current = false
    }
  }, [])

  return <View style={styles.container}>
    <View style={[styles.create]}>
      <Text numberOfLines={2} style={[styles.title, { width: 220 }]}>Apply as a Beneficiary to Almubarak Waqf Foundation (AWF)</Text>
      <Pressable
        style={[styles.editPressable, { alignSelf: 'center' }]}
        onPress={() => router.push(ADD_BENEFICIARY)}>
        <Text style={styles.edit}>Create</Text>
      </Pressable>
    </View>
    {beneficiaries.length > 0 && <BeneficiariesList beneficiaries={beneficiaries} />}
  </View>

}
export default Beneficiaries;


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

