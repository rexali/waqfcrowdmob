import { View, StyleSheet } from 'react-native';
import ZakatDonation from '../(donations)/ZakatDonation';
import WaqfDonation from '../(donations)/WaqfDonation';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDonationsData, getWaqfDonations, getZakatDonations } from '../(donations)/donationsSlice';
import SplashScreen from '../../components/common/SplashScreen';
import { getWaqfData } from '../(waqfs)/waqfsSlice';

export default function Home() {
  const dispatch = useDispatch<any>();
  const mountRef = useRef(true);
  const waqfDonations = useSelector(getWaqfDonations);
  const zakatDonations = useSelector(getZakatDonations);

  const dispatchGetDonationData = async () => {
    dispatch(getDonationsData()).unwrap();
    dispatch(getWaqfData()).unwrap();

  }

  React.useEffect(() => {
    if (mountRef.current) {
      dispatchGetDonationData();
    }
    return () => {
      mountRef.current = false; 
    } 
  });

  if (!waqfDonations.length) {
    return <SplashScreen flex={1} />
  }

  return (
    <View>
      <WaqfDonation donations={waqfDonations} />
      <View style={styles.separator} />
      <ZakatDonation donations={zakatDonations} />
    </View>
  )
}

const styles = StyleSheet.create({

  separator: {
    marginVertical: 7,
    height: 1,
    width: '100%',
    backgroundColor: 'green',
    textAlign: 'center'
  },
});
