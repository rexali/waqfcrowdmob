import React from 'react';
import {
    TouchableHighlight, Image, View, Text, Pressable, StyleSheet, Alert
} from 'react-native';
import Card from '../../components/Card';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
import {useRouter } from 'expo-router';

export default function WaqfItem({ waqf }: { waqf: any}) {

    const WAQF_DETAILS: string = '/(waqfs)/details';
    const router = useRouter();

    return (
        <TouchableHighlight onPress={() => router.push({ pathname: WAQF_DETAILS, params: { waqfId: waqf.waqfId } })}>
            <Card>
                <View style={{ position: 'absolute', zIndex: 2, left: 0 }}>
                    <FontAwesome5 name="edit" color={'green'} size={30} onPress={() => Alert.alert("EDIT")} />
                </View>
                <Image source={require('../../assets/awf-logo.png')} style={styles.image} />
                <View style={{ position: 'absolute', zIndex: 2, right: 0 }}>
                    <MaterialCommunityIcons name="trash-can" color={'red'} size={30}
                        onPress={
                            () => Alert.alert("DELETE", "Want to really delete this?", [
                                {
                                    text: 'Cancel',
                                    onPress: () => Alert.alert('canceled'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes',
                                    onPress: () => Alert.alert('Ok'),
                                    style: 'default',
                                },
                            ],)}
                    />
                </View>
                <View style={styles.contentWrap}>
                    <View>
                        <Text numberOfLines={1}><Octicons name="project" color={'green'} size={15} />  {waqf?.name ?? "Ibarahim"}</Text>
                        <Text><Entypo name="progress-two" color={'green'} size={15} />  Status: {waqf?.status}</Text>
                        <Text ><MaterialIcons name="location-on" color={'green'} size={15} />  Location: {waqf?.state ?? "Kano"} </Text>
                    </View>
                </View>
                <View style={styles.btnWrap}>
                    <Pressable style={styles.commentBtn} onPress={
                        () => Alert.alert("Approve", "Want to really approve this?", [
                            {
                                text: 'Cancel',
                                onPress: () => Alert.alert('canceled'),
                                style: 'cancel',
                            },
                            {
                                text: 'Yes',
                                onPress: () => Alert.alert('Ok'),
                                style: 'default',
                            },
                        ],)}>
                        <Text style={styles.commentText}>Approve</Text>
                    </Pressable>
                    <MaterialCommunityIcons name="share-variant" color={'green'} size={30} />
                </View>
            </Card>
        </TouchableHighlight>
    )

}

const styles = StyleSheet.create({
    projectContent: {
        marginLeft: 10
    },
    waqf: {
        fontWeight: 'bold',
        margin: 5,
    },
    image: {
        maxWidth: '100%', height: 250, marginRight: 'auto', marginLeft: 'auto'
    },
    btnWrap: {
        justifyContent: 'space-between', flexDirection: 'row',
        // marginTop: 5, 
        marginVertical: 10
    },
    btnView: {},
    title: {
        fontWeight: 'bold',
        margin: 10,
    },
    contentWrap: {
        flexDirection: 'row', justifyContent: 'space-between',
    },

    donateText: {
        color: 'white', textAlign: 'center'
    },
    commentText: {
        color: 'white', textAlign: 'center'
    },
    donateBtn: {
        backgroundColor: 'green',
        width: 80,
        height: 30,
        padding: 4,
        borderRadius: 10
    },
    commentBtn: {
        backgroundColor: 'green',
        minWidth: 80,
        height: 30,
        padding: 4,
        borderRadius: 10
    },
    commentNo: {
        marginTop: 7
    },

})