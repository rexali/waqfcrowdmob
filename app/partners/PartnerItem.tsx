import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Card from '../../components/common/Card';
import { callSmsEmailUrl } from '../../utils/callSmsEmailUrl';
import { BASE_URL } from '../../constants/Url';
import { useRouter } from 'expo-router';

const PartnerItem = ({ partner}: { partner: any }) => {

  const PARTNER_DETAILS: string = '/ViewPartner';
  const image = { uri: BASE_URL + "/uploads/" + partner.image };
  const URI = 'https://via.placeholder.com/50x50.jpg';
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push({ pathname: PARTNER_DETAILS, params: { id: partner.partnerId } })}>
      <Card>
        <View style={styles.contentWrap}>
          <Image source={partner.image ? image : { uri: URI }} style={styles.image} />
          <Text style={styles.title}>{partner.organisation}</Text>
          <MaterialCommunityIcons name="email" color={'green'} size={30} onPress={() => callSmsEmailUrl(`mailto:${partner.email}`)} />
        </View>
      </Card>
    </TouchableOpacity>

  )
}

export default PartnerItem;


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

