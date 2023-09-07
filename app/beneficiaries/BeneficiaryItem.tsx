import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Card from '../../components/common/Card';
import { callSmsEmailUrl } from '../../utils/callSmsEmailUrl';
import { BASE_URL } from '../../constants/Url';
import { useRouter } from 'expo-router';

const BeneficiaryItem = ({ beneficiary, }: { beneficiary: any,}) => {

  const BENEFICIARY_DETAILS: string = 'ViewBeneficiary';
  const image = { uri: BASE_URL + "/uploads/" + beneficiary.image };
  const URI = 'https://via.placeholder.com/50x50.jpg';
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push({pathname:BENEFICIARY_DETAILS, params:{id:beneficiary.beneficiaryId}})}>
      <Card>
        <View style={styles.contentWrap}>
          <Image source={beneficiary.image ? image : {uri:URI}} style={styles.image} />
          <Text style={styles.title}>{beneficiary.firstName + " " + beneficiary.lastName}</Text>
          <MaterialCommunityIcons name="email" color={'green'} size={30} onPress={() => callSmsEmailUrl(`mailto:${beneficiary.email}`)} />
        </View>
      </Card>
    </TouchableOpacity>

  )
}

export default BeneficiaryItem;


const styles = StyleSheet.create({

  image: {
    width: 50, height: 50
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
  },
  contentWrap: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
})

