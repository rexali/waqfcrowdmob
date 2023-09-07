import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Card from "../../components/Card";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteNotificationData, getNotificationData } from "./notificationsSlice";

const NotificationItem = ({ notificationItem }: { notificationItem: any }) => {
    const router = useRouter();
    const dispatch = useDispatch<any>();


    const deleteNotification = (id: any) => {
        Alert.alert("DELETE", "Want to really delete this?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(deleteNotificationData({ notificationId: id })).unwrap();
                        setTimeout(() => {
                            dispatch(getNotificationData()).unwrap()
                        }, 1000);
                    },
                    style: 'default',
                },
            ],
        );
    }

    return (
        <View>
            <Card>
                <TouchableOpacity onPress={() => router.push({ pathname: "ViewNotification", params: { ...notificationItem } })}>
                    <View>
                        <Text style={styles.title}>{notificationItem.subject}</Text>
                        <Text numberOfLines={1}>{notificationItem.body}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.content}>
                    <MaterialCommunityIcons name="trash-can" size={30} color={"red"} onPress={() => deleteNotification(notificationItem.notificationId)} />
                    <MaterialCommunityIcons name="pencil" size={30} color={"red"} onPress={() => router.push({ pathname: "/(notifications)/EditNotification", params: { id: notificationItem.notificationId, ...notificationItem } })} />
                </View>
            </Card>
        </View>

    )

}

export default NotificationItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textShadowColor: 'green'
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    }
});