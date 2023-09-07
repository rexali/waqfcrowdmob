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
import { useRouter } from 'expo-router';
import { deleteWaqf } from './utils/deleteWaqf';
import { useDispatch, useSelector } from 'react-redux';
import { approveWaqf } from './utils/approveWaqf';
import { getApproveResult, getDeleteResult } from './waqfsSlice';
import { showToast } from '../../utils/showToast';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { shareCPW } from '../../utils/shareWaqfItem';
import { getToken } from '../../utils/getToken';
import { getUser } from '../(users)/usersSlice';

export default function WaqfItem({ waqf, navigation }: { waqf: any, navigation: any }) {

    const WAQF_DETAILS: string = '/(waqfs)/ViewWaqf';
    const router = useRouter();
    const dispatch = useDispatch();
    const deleteResult = useSelector(getDeleteResult);
    const approveResult = useSelector(getApproveResult);
    const user = useSelector(getUser);

    const deleteItem = (callback: any, data: { waqfId: any; }, dispatch: Dispatch<AnyAction>) => {

        Alert.alert("DELETE", "Want to really delete this?",
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        callback(data, dispatch);
                        if (deleteResult?.affectedRows === 1) {
                            showToast("Success")
                        }
                    },
                    style: 'default',
                },
            ],
        );
    };

    const approveItem = (callback: any, data: { waqfId: any; }, dispatch: Dispatch<AnyAction>) => {
        Alert.alert("APPROVE", "Want to really approve this?",
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        callback(data, dispatch);
                        if (approveResult?.affectedRows === 1) {
                            alert("Success");
                            showToast("Success")
                        }
                    },
                    style: 'default',
                },
            ],
        );
    };




    return (
        <Card>
            <View style={styles.contentWrap}>
                <FontAwesome5 name="edit" color={'green'} size={30} onPress={() => router.push({ pathname: "EditWaqf", params: { waqfId: waqf.waqfId } })} />
                <MaterialCommunityIcons name="trash-can" color={'red'} size={30} onPress={() => deleteItem(deleteWaqf, { waqfId: waqf.waqfId }, dispatch)} />
            </View>

            <TouchableHighlight onPress={() => router.push({ pathname: WAQF_DETAILS, params: { waqfId: waqf.waqfId } })}>
                <Image source={require('../../assets/awf-logo.png')} style={styles.image} />
            </TouchableHighlight>

            <View style={styles.contentWrap}>
                <View>
                    <Text numberOfLines={1}><Octicons name="project" color={'green'} size={15} />  {waqf?.name ?? "Ibarahim"}</Text>
                    <Text><Entypo name="progress-two" color={'green'} size={15} />  Status: {waqf?.status}</Text>
                    <Text ><MaterialIcons name="location-on" color={'green'} size={15} />  Location: {waqf?.state ?? "Kano"} </Text>
                </View>
            </View>
            <View style={styles.btnWrap}>
                <Pressable style={styles.commentBtn} onPress={() => approveItem(approveWaqf, { waqfId: waqf.waqfId }, dispatch)}>
                    <Text style={styles.commentText}>Approve</Text>
                </Pressable>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <MaterialCommunityIcons
                        name="update"
                        color={'green'}
                        size={20}
                        style={{ alignSelf: "center" }}
                    />
                    <Text onPress={() => router.push({ pathname: "updates/AddUpdate", params: { waqfId: waqf.waqfId } })} style={{ alignSelf: "center" }}>Add update</Text>
                </View>
                <MaterialCommunityIcons
                    name="share-variant"
                    color={'green'} size={30}
                    onPress={async () => shareCPW(waqf.waqfId, {
                        waqfId: waqf.waqfId,
                        userId: user.userId || await getToken("userId"),
                        category: "waqf"
                    }, dispatch)}
                />
            </View>
        </Card>
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